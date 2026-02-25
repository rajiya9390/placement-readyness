import { Link } from 'react-router-dom';
import { Code, Video, BarChart3 } from 'lucide-react';
const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-br from-slate-50 to-indigo-50">
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">Ace Your <span className="text-primary">Placement</span></h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl">Practice, assess, and prepare for your dream job.</p>
        <Link to="/dashboard" className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg">Get Started</Link>
      </section>
      <section className="py-20 px-4 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard icon={<Code className="text-primary w-8 h-8" />} title="Practice Problems" description="Solve challenges." />
          <FeatureCard icon={<Video className="text-primary w-8 h-8" />} title="Mock Interviews" description="Real scenarios." />
          <FeatureCard icon={<BarChart3 className="text-primary w-8 h-8" />} title="Track Progress" description="Analytics." />
        </div>
      </section>
      <footer className="border-t py-8 text-center text-slate-500 text-sm"><p>© 2025 Placement Prep.</p></footer>
    </div>
  );
};
const FeatureCard = ({ icon, title, description }) => (
  <div className="p-8 rounded-2xl border border-slate-100 hover:bg-slate-50">
    <div className="bg-indigo-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">{icon}</div>
    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600">{description}</p>
  </div>
);
export default Landing;