import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { History as HistoryIcon, ArrowRight, Building, Calendar, BarChart3, Trash2 } from 'lucide-react';

const History = () => {
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('placement_prep_history');
        if (saved) setHistory(JSON.parse(saved));
    }, []);

    const viewResult = (item) => {
        localStorage.setItem('placement_prep_current', JSON.stringify(item));
        navigate('/results');
    };

    const deleteItem = (e, id) => {
        e.stopPropagation();
        const updated = history.filter(item => item.id !== id);
        setHistory(updated);
        localStorage.setItem('placement_prep_history', JSON.stringify(updated));
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Analysis History</h1>
                    <p className="text-slate-500">Review your past job analysis and preparation plans.</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600">
                    Total Analyzed: {history.length}
                </div>
            </header>

            {history.length === 0 ? (
                <Card className="p-20 text-center border-dashed border-2">
                    <div className="flex flex-col items-center gap-4">
                        <div className="bg-slate-50 p-6 rounded-full">
                            <HistoryIcon size={40} className="text-slate-300" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-400">No History Found</h2>
                        <p className="text-slate-500 max-w-xs">You haven't analyzed any job descriptions yet. Start by pasting a JD in the Analyze section.</p>
                        <button
                            onClick={() => navigate('/practice')} // Assuming sidebar gets 'Analyze' link
                            className="mt-4 text-primary font-bold hover:underline"
                        >
                            Start Your First Analysis
                        </button>
                    </div>
                </Card>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {history.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => viewResult(item)}
                            className="group cursor-pointer"
                        >
                            <Card className="hover:border-primary transition-all hover:shadow-md overflow-hidden">
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <div className="p-6 flex-1 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Building size={16} className="text-primary" />
                                                <span className="font-bold text-lg text-slate-800">{item.company}</span>
                                            </div>
                                            <span className="text-xs text-slate-400 flex items-center gap-1">
                                                <Calendar size={12} />
                                                {new Date(item.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-4 items-center text-sm">
                                            <div className="text-slate-600">
                                                <span className="text-slate-400 mr-1">Role:</span>
                                                <span className="font-medium">{item.role}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-primary">
                                                <BarChart3 size={14} />
                                                <span className="font-bold">{item.readinessScore}% Readiness</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 md:bg-transparent p-4 flex items-center justify-between md:flex-col md:justify-center md:gap-2 md:border-l border-slate-100 md:w-24">
                                        <button className="p-2 text-slate-300 hover:text-primary transition-colors">
                                            <ArrowRight size={20} />
                                        </button>
                                        <button
                                            onClick={(e) => deleteItem(e, item.id)}
                                            className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;
