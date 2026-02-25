const Dashboard = () => (
  <div>
    <h1 className="text-2xl font-bold text-slate-900 mb-2">Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <div className="bg-white p-6 rounded-xl border shadow-sm"><p className="text-sm text-slate-500">Solved</p><p className="text-3xl font-bold">128</p></div>
      <div className="bg-white p-6 rounded-xl border shadow-sm"><p className="text-sm text-slate-500">Mock</p><p className="text-3xl font-bold">12</p></div>
      <div className="bg-white p-6 rounded-xl border shadow-sm"><p className="text-sm text-slate-500">Rank</p><p className="text-3xl font-bold">#42</p></div>
    </div>
  </div>
);
export default Dashboard;