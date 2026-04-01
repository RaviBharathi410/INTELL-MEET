import { Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, Video, MessageSquare, CheckSquare, BarChart, Settings, Bell, Search, User } from 'lucide-react';

export function DashboardLayout() {
  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#0A1628] border-r border-[#1a2f4c] flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-black tracking-tighter text-white">IntellMeet</h1>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link to="/dashboard" className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-white/10 text-white font-medium">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/meetings" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-colors">
            <Video size={20} />
            <span>Meetings</span>
          </Link>
          <Link to="/chat" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-colors">
            <MessageSquare size={20} />
            <span>Chat</span>
          </Link>
          <Link to="/tasks" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-colors">
            <CheckSquare size={20} />
            <span>Tasks</span>
          </Link>
          <Link to="/analytics" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-colors">
            <BarChart size={20} />
            <span>Analytics</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-[#1a2f4c]">
          <Link to="/settings" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-colors">
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-black/50 backdrop-blur-md">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input 
              type="text" 
              placeholder="Search meetings, tasks..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
          <div className="flex items-center space-x-6">
            <button className="relative text-white/70 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            </button>
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Outlet */}
        <div className="flex-1 overflow-y-auto p-8 relative">
           {/* Global Background Theme matching the Dashboard */}
          <div className="fixed inset-0 z-[-1] bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,black,transparent)] pointer-events-none" />
          <Outlet />
        </div>
      </main>
    </div>
  );
}
