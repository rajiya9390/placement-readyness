import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
import { Calendar, ChevronRight, Check } from 'lucide-react';

const radarData = [
  { subject: 'DSA', A: 75, fullMark: 100 },
  { subject: 'System Design', A: 60, fullMark: 100 },
  { subject: 'Communication', A: 80, fullMark: 100 },
  { subject: 'Resume', A: 85, fullMark: 100 },
  { subject: 'Aptitude', A: 70, fullMark: 100 },
];

const dashboardItems = [
  { title: 'DSA Mock Test', time: 'Tomorrow, 10:00 AM', type: 'Test' },
  { title: 'System Design Review', time: 'Wed, 2:00 PM', type: 'Review' },
  { title: 'HR Interview Prep', time: 'Friday, 11:00 AM', type: 'Prep' },
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const activeDays = [true, true, true, false, false, false, false];

const Dashboard = () => {
  const score = 72;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500">Track your placement journey and upcoming milestones.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Overall Readiness */}
        <Card className="flex flex-col items-center justify-center p-8">
          <CardTitle className="mb-6 text-slate-500 font-medium">Overall Readiness</CardTitle>
          <div className="relative flex items-center justify-center">
            <svg className="w-48 h-48 transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r={radius}
                className="stroke-slate-100 fill-none stroke-[12]"
              />
              <circle
                cx="96"
                cy="96"
                r={radius}
                className="stroke-primary fill-none stroke-[12] transition-all duration-1000 ease-out"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-5xl font-bold text-slate-900">{score}</span>
              <span className="text-xs text-slate-400 uppercase tracking-widest mt-1">Ready</span>
            </div>
          </div>
          <p className="mt-6 text-sm text-slate-500 italic">"You're in the top 15% of candidates this week"</p>
        </Card>

        {/* Skill Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Skill Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Skills"
                  dataKey="A"
                  stroke="var(--primary)"
                  fill="var(--primary)"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Left Column Group */}
        <div className="space-y-8">
          {/* Continue Practice */}
          <Card>
            <CardHeader>
              <CardTitle className="text-md uppercase tracking-wider text-slate-400 font-bold">Continue Practice</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-slate-900">Dynamic Programming</h4>
                  <p className="text-sm text-slate-500">3 of 10 modules completed</p>
                </div>
                <button className="bg-primary text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  <ChevronRight size={24} />
                </button>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-[30%]"></div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Goals */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-600">Problems Solved: 12/20</span>
                  <span className="text-sm text-primary font-bold">60%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-[60%]"></div>
                </div>
              </div>
              <div className="flex justify-between">
                {days.map((day, i) => (
                  <div key={day} className="flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${activeDays[i] ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
                      {activeDays[i] ? <Check size={14} /> : day[0]}
                    </div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">{day}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Assessments */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Assessments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboardItems.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-slate-50 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all cursor-pointer group">
                <div className="bg-white p-3 rounded-lg shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                  <Calendar size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.time}</p>
                </div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400 bg-white px-2 py-1 rounded border">
                  {item.type}
                </div>
              </div>
            ))}
            <button className="w-full py-4 text-sm font-bold text-primary hover:bg-indigo-50 rounded-xl transition-colors mt-2">
              View All Schedule
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;