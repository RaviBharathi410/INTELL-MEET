import { Link } from 'react-router-dom';

export function LoginPage() {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login logic, then open meeting in separate tab
    window.open('/room/alpha-v8', '_blank');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-zinc-200 rounded-3xl p-8 shadow-2xl relative z-10">
        <h2 className="text-3xl font-black text-zinc-950 mb-2 text-center tracking-tight">Welcome Back</h2>
        <p className="text-zinc-500 mb-8 flex justify-center text-center">Sign in to IntellMeet to continue</p>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Email</label>
            <input type="email" className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 focus:outline-none focus:border-accent shadow-sm" placeholder="name@company.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Password</label>
            <input type="password" className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 focus:outline-none focus:border-accent shadow-sm" placeholder="••••••••" />
          </div>
          
          <button type="submit" className="w-full bg-accent text-white font-bold rounded-xl px-4 py-3 mt-4 hover:bg-accent/90 transition-colors shadow-md shadow-accent/20">
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-zinc-500 text-sm font-medium">
          Don't have an account? <Link to="/signup" className="text-zinc-900 hover:text-accent font-bold transition-colors">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
