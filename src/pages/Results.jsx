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
    ArrowLeft
} from 'lucide-react';

const Results = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {
        const current = localStorage.getItem('placement_prep_current');
        if (!current) {
            navigate('/practice'); // Fallback if no analysis exists
            return;
        }
        setData(JSON.parse(current));
    }, [navigate]);

    if (!data) return null;

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
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
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-6">
                    <div className="text-right">
                        <p className="text-xs uppercase font-bold tracking-widest text-slate-400">Readiness Score</p>
                        <p className="text-4xl font-black text-primary">{data.readinessScore}/100</p>
                    </div>
                    <div className="w-16 h-16 relative">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="32" cy="32" r="28" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                            <circle cx="32" cy="32" r="28" fill="none" stroke="var(--primary)" strokeWidth="8"
                                strokeDasharray={2 * Math.PI * 28}
                                strokeDashoffset={2 * Math.PI * 28 * (1 - data.readinessScore / 100)} />
                        </svg>
                        <Trophy size={20} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary" />
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
                                <CardTitle className="text-sm uppercase tracking-widest">Extracted Stack</CardTitle>
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
                                                    <span key={skill} className="bg-indigo-50 text-primary text-[11px] font-bold px-3 py-1 rounded-full border border-indigo-100">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
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
                </div>
            </div>
        </div>
    );
};

export default Results;
