import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import {
    CheckCircle2,
    Calendar,
    HelpCircle,
    Trophy,
    Tag,
    Clock,
    LayoutDashboard,
    ArrowLeft,
    Download,
    Copy,
    Check,
    Zap,
    AlertCircle
} from 'lucide-react';

const Results = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [skillConfidence, setSkillConfidence] = useState({});
    const [liveScore, setLiveScore] = useState(0);
    const [copied, setCopied] = useState(null);

    useEffect(() => {
        const current = localStorage.getItem('placement_prep_current');
        if (!current) {
            navigate('/analyze');
            return;
        }
        const parsed = JSON.parse(current);
        setData(parsed);
        setSkillConfidence(parsed.skillConfidenceMap || {});
        setLiveScore(parsed.readinessScore || 0);
    }, [navigate]);

    useEffect(() => {
        if (!data) return;

        // Calculate live score
        // Base readiness score is data.readinessScore (original)
        // We update based on changes in skillConfidence
        let scoreMod = 0;
        const skills = Object.values(data.extractedSkills).flat();

        skills.forEach(skill => {
            if (skillConfidence[skill] === 'know') {
                scoreMod += 2;
            } else if (skillConfidence[skill] === 'practice') {
                scoreMod -= 2;
            }
        });

        const newScore = Math.max(0, Math.min(100, (data.readinessScore || 0) + scoreMod));
        setLiveScore(newScore);

        // Persist to localStorage
        const updatedData = {
            ...data,
            skillConfidenceMap: skillConfidence,
            readinessScore: data.readinessScore // keep original base
        };

        // We should actually update the history entry as well
        const history = JSON.parse(localStorage.getItem('placement_prep_history') || '[]');
        const index = history.findIndex(h => h.id === data.id);
        if (index !== -1) {
            history[index] = { ...history[index], skillConfidenceMap: skillConfidence, lastLiveScore: newScore };
            localStorage.setItem('placement_prep_history', JSON.stringify(history));
        }
        localStorage.setItem('placement_prep_current', JSON.stringify(updatedData));
    }, [skillConfidence, data]);

    const toggleSkill = (skill) => {
        setSkillConfidence(prev => ({
            ...prev,
            [skill]: prev[skill] === 'know' ? 'practice' : 'know'
        }));
    };

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    const downloadTxt = () => {
        if (!data) return;
        const content = `
PLACEMENT PREP ANALYSIS: ${data.company} - ${data.role}
Readiness Score: ${liveScore}/100

7-DAY PLAN:
${data.plan.map(d => `${d.day} (${d.task}): ${d.description}`).join('\n')}

ROUND-WISE CHECKLIST:
${data.checklist.map(r => `${r.round}:\n${r.items.map(i => `- ${i}`).join('\n')}`).join('\n\n')}

TOP 10 INTERVIEW QUESTIONS:
${data.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}
    `;
        const element = document.createElement("a");
        const file = new Blob([content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${data.company}_Prep_Plan.txt`;
        document.body.appendChild(element);
        element.click();
    };

    if (!data) return null;

    const weakSkills = Object.values(data.extractedSkills).flat().filter(s => skillConfidence[s] !== 'know').slice(0, 3);

    return (
        <div className="space-y-8 animate-in fade-in duration-700 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <button
                        onClick={() => navigate('/history')}
                        className="flex items-center gap-2 text-sm text-slate-400 hover:text-primary transition-colors mb-4"
                    >
                        <ArrowLeft size={16} /> Back to History
                    </button>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                        Analysis: <span className="text-primary">{data.company}</span>
                    </h1>
                    <p className="text-slate-500 font-medium">{data.role}</p>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex gap-2">
                        <button
                            onClick={downloadTxt}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-all shadow-sm"
                        >
                            <Download size={14} /> Download TXT
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-6">
                        <div className="text-right">
                            <p className="text-xs uppercase font-bold tracking-widest text-slate-400">Current Readiness</p>
                            <p className="text-4xl font-black text-primary transition-all duration-500">{liveScore}/100</p>
                        </div>
                        <div className="w-16 h-16 relative">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="32" cy="32" r="28" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                                <circle cx="32" cy="32" r="28" fill="none" stroke="var(--primary)" strokeWidth="8"
                                    className="transition-all duration-1000 ease-out"
                                    strokeDasharray={2 * Math.PI * 28}
                                    strokeDashoffset={2 * Math.PI * 28 * (1 - liveScore / 100)} />
                            </svg>
                            <Trophy size={20} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Skills & Qs */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Extracted Skills */}
                    <Card>
                        <CardHeader className="border-b border-slate-50">
                            <div className="flex items-center gap-2 text-primary">
                                <Tag size={18} />
                                <CardTitle className="text-sm uppercase tracking-widest">Confidence Scorecard</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            {Object.keys(data.extractedSkills).length === 0 ? (
                                <p className="text-slate-400 italic text-sm text-center py-4">General fresher stack detected</p>
                            ) : (
                                <div className="space-y-6">
                                    {Object.entries(data.extractedSkills).map(([cat, skills]) => (
                                        <div key={cat}>
                                            <h4 className="text-[10px] uppercase font-black text-slate-400 mb-2 tracking-tighter">{cat}</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {skills.map(skill => (
                                                    <button
                                                        key={skill}
                                                        onClick={() => toggleSkill(skill)}
                                                        className={`flex items-center gap-2 text-[11px] font-bold px-3 py-1.5 rounded-full border transition-all ${skillConfidence[skill] === 'know'
                                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                                                : 'bg-indigo-50 text-indigo-700 border-indigo-100 grayscale-[0.5] hover:grayscale-0'
                                                            }`}
                                                    >
                                                        {skill}
                                                        {skillConfidence[skill] === 'know' ? <Check size={12} /> : <Zap size={10} className="text-indigo-300" />}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="mt-6 pt-6 border-t border-slate-50">
                                <p className="text-[10px] text-slate-400 text-center uppercase font-bold tracking-widest">Score updates live as you mark skills</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Export Quick Tools */}
                    <Card className="bg-indigo-600 text-white shadow-indigo-100 shadow-xl border-none">
                        <CardHeader>
                            <CardTitle className="text-xs uppercase tracking-widest text-indigo-200">Export Tools</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <button
                                onClick={() => copyToClipboard(data.plan.map(d => `${d.day}: ${d.task}`).join('\n'), 'plan')}
                                className="w-full flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-xs font-bold"
                            >
                                Copy 7-Day Plan
                                {copied === 'plan' ? <Check size={14} className="text-emerald-300" /> : <Copy size={14} />}
                            </button>
                            <button
                                onClick={() => copyToClipboard(data.checklist.map(r => `${r.round}: ${r.items.join(', ')}`).join('\n'), 'checklist')}
                                className="w-full flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-xs font-bold"
                            >
                                Copy Round Checklist
                                {copied === 'checklist' ? <Check size={14} className="text-emerald-300" /> : <Copy size={14} />}
                            </button>
                            <button
                                onClick={() => copyToClipboard(data.questions.join('\n'), 'questions')}
                                className="w-full flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-xs font-bold"
                            >
                                Copy 10 Questions
                                {copied === 'questions' ? <Check size={14} className="text-emerald-300" /> : <Copy size={14} />}
                            </button>
                        </CardContent>
                    </Card>

                    {/* Interview Questions */}
                    <Card className="bg-slate-900 border-none">
                        <CardHeader>
                            <div className="flex items-center gap-2 text-indigo-300">
                                <HelpCircle size={18} />
                                <CardTitle className="text-sm uppercase tracking-widest">High Probability Qs</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {data.questions.map((q, i) => (
                                <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5 group hover:bg-white/10 transition-all">
                                    <div className="text-indigo-400 font-black text-xs mb-1">0{i + 1}</div>
                                    <p className="text-white text-sm leading-relaxed">{q}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Plans & Checklists */}
                <div className="lg:col-span-2 space-y-8">
                    {/* 7-Day Plan */}
                    <Card className="border-primary/20 bg-indigo-50/20">
                        <CardHeader>
                            <div className="flex items-center gap-2 text-primary">
                                <Clock size={18} />
                                <CardTitle className="text-sm uppercase tracking-widest">The 7-Day Sprint</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-5 gap-2 pb-8">
                            {data.plan.map((day, i) => (
                                <div key={i} className={`p-4 rounded-xl flex flex-col items-center text-center transition-all ${i === 0 ? 'bg-primary text-white shadow-lg scale-105' : 'bg-white border border-slate-100'}`}>
                                    <span className={`text-[10px] font-black uppercase mb-2 ${i === 0 ? 'text-white/80' : 'text-slate-400'}`}>{day.day}</span>
                                    <p className="text-xs font-bold leading-tight mb-2">{day.task}</p>
                                    <p className={`text-[9px] leading-relaxed ${i === 0 ? 'text-white/70' : 'text-slate-400'}`}>{day.description}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Checklists */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.checklist.map((round, i) => (
                            <Card key={i} className="relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <LayoutDashboard size={40} />
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-sm text-primary font-black uppercase italic">{round.round}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {round.items.map((item, j) => (
                                        <div key={j} className="flex items-start gap-3">
                                            <div className="mt-0.5 min-w-[16px]">
                                                <CheckCircle2 size={16} className="text-indigo-200" />
                                            </div>
                                            <span className="text-xs text-slate-600 font-medium leading-relaxed">{item}</span>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Action Next Box */}
                    <Card className="border-primary border-t-8 bg-white shadow-2xl">
                        <CardContent className="pt-8 pb-8 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="space-y-2 text-center md:text-left">
                                <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-black uppercase rounded-full w-fit mx-auto md:mx-0">
                                    <AlertCircle size={10} /> Focus Areas
                                </div>
                                <h3 className="text-2xl font-black text-slate-900">Action Next</h3>
                                <p className="text-slate-500 text-sm max-w-sm">
                                    You marked {weakSkills.length} key skills as "Need Practice". Suggest focusing on <span className="text-primary font-bold">{weakSkills.join(', ')}</span> first.
                                </p>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="bg-primary text-white font-black px-10 py-4 rounded-xl shadow-indigo-100 shadow-xl hover:translate-y-[-2px] hover:shadow-2xl transition-all"
                                >
                                    Start Day 1 Plan Now
                                </button>
                                <p className="text-[10px] font-bold text-slate-400 py-1 uppercase tracking-widest">Stay calm and prepared</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Results;
