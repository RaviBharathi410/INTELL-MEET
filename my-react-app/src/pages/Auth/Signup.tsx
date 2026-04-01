import { Link } from 'react-router-dom';

export function SignupPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0A1628] border border-white/10 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">Create Account</h2>
        <p className="text-white/60 mb-8 flex justify-center text-center">Join IntellMeet Today</p>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">Full Name</label>
            <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">Email</label>
            <input type="email" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30" placeholder="name@company.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">Password</label>
            <input type="password" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30" placeholder="••••••••" />
          </div>
          
          <button type="submit" className="w-full bg-white text-black font-bold rounded-lg px-4 py-3 mt-4 hover:bg-white/90 transition-colors">
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-white/60 text-sm">
          Already have an account? <Link to="/login" className="text-white hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
