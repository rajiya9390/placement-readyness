import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { performAnalysis } from '../utils/analyzer';
import { Search, Building, User, FileText, Send } from 'lucide-react';

const Analyze = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        company: '',
        role: '',
        jdText: ''
    });

    const handleAnalyze = (e) => {
        e.preventDefault();
        if (!formData.jdText.trim()) return alert('Please enter JD text');

        const result = performAnalysis(formData);

        // Save to history
        const history = JSON.parse(localStorage.getItem('placement_prep_history') || '[]');
        localStorage.setItem('placement_prep_history', JSON.stringify([result, ...history]));

        // Save as current
        localStorage.setItem('placement_prep_current', JSON.stringify(result));

        navigate('/results');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="text-center">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Start Analysis</h1>
                <p className="text-slate-500">Paste the job description below to generate your personalized prep plan.</p>
            </header>

            <form onSubmit={handleAnalyze} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="relative overflow-hidden">
                        <CardContent className="pt-6 space-y-4">
                            <div className="flex items-center gap-3 text-primary mb-2">
                                <Building size={20} />
                                <span className="font-bold uppercase tracking-wider text-xs">Target Company</span>
                            </div>
                            <input
                                type="text"
                                placeholder="e.g. Google, Microsoft, Startup X"
                                className="w-full bg-slate-50 border-none rounded-lg p-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            />
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden">
                        <CardContent className="pt-6 space-y-4">
                            <div className="flex items-center gap-3 text-primary mb-2">
                                <User size={20} />
                                <span className="font-bold uppercase tracking-wider text-xs">Job Role</span>
                            </div>
                            <input
                                type="text"
                                placeholder="e.g. Software Engineer, Frontend Intern"
                                className="w-full bg-slate-50 border-none rounded-lg p-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            />
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3 text-primary">
                            <FileText size={20} />
                            <CardTitle className="text-sm uppercase tracking-widest">Job Description Text</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <textarea
                            placeholder="Paste the full job description here (Minimum 100 characters for best results)..."
                            className="w-full min-h-[300px] bg-slate-50 border-none rounded-xl p-6 focus:ring-2 focus:ring-primary outline-none transition-all resize-none text-slate-700 leading-relaxed"
                            value={formData.jdText}
                            onChange={(e) => setFormData({ ...formData, jdText: e.target.value })}
                        />
                        <div className="mt-6 flex justify-end">
                            <button
                                type="submit"
                                className="bg-primary text-white flex items-center gap-3 px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200 group"
                            >
                                Analyze Job Description
                                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
};

export default Analyze;
