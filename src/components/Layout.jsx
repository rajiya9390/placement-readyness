import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Code, ClipboardList, BookOpen, User, Bell, Search, History } from 'lucide-react';
const Layout = () => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Analyze', path: '/analyze', icon: <Search size={20} /> },
    { name: 'History', path: '/history', icon: <History size={20} /> },
    { name: 'Practice', path: '/practice', icon: <Code size={20} /> },
    { name: 'Assessments', path: '/assessments', icon: <ClipboardList size={20} /> },
    { name: 'Resources', path: '/resources', icon: <BookOpen size={20} /> },
    { name: 'Profile', path: '/profile', icon: <User size={20} /> },
  ];
  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 bg-white border-r hidden md:flex flex-col">
        <div className="p-6"><h1 className="text-xl font-bold text-primary">Placement Prep</h1></div>
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink key={item.name} to={item.path} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${isActive ? 'bg-indigo-50 text-primary' : 'text-slate-600 hover:bg-slate-50'}`}>
              {item.icon}{item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8">
          <div className="ml-auto flex items-center gap-4"><Bell size={20} /><div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs">JD</div></div>
        </header>
        <main className="flex-1 p-8 overflow-y-auto"><Outlet /></main>
      </div>
    </div>
  );
};
export default Layout;