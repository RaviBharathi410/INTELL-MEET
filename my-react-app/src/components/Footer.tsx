import { Send, MessageCircle, Briefcase, Code2, Video } from 'lucide-react';
import { useState } from 'react';

export function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-black relative pt-32 pb-16 overflow-hidden">
      
      {/* Animated Wave Divider */}
      <div className="absolute top-0 inset-x-0 w-full overflow-hidden leading-none z-0 opacity-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-[calc(100%+1.3px)] h-[50px] md:h-[100px] text-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-current"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Col */}
        <div className="flex flex-col space-y-4">
          <div className="text-2xl font-black text-white w-max">
            IntellMeet
          </div>
          <p className="text-white/50 text-sm leading-relaxed max-w-sm">
            Transforming corporate meetings into highly actionable intelligence. 
            Automate notes, transcripts, and insights seamlessly.
          </p>
          <div className="flex space-x-4 mt-6">
            {[MessageCircle, Briefcase, Code2, Video].map((Icon, idx) => (
              <a 
                key={idx} 
                href="#" 
                className="text-white/50 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Links Col 1 */}
        <div>
          <h4 className="text-white font-semibold mb-6">Product</h4>
          <ul className="space-y-3">
            {['Features', 'Integrations', 'Pricing', 'Changelog', 'Docs'].map((link, idx) => (
              <li key={idx}>
                <a href="#" className="text-white/50 hover:text-white transition-colors text-sm">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Links Col 2 */}
        <div>
          <h4 className="text-white font-semibold mb-6">Company</h4>
          <ul className="space-y-3">
            {['About Us', 'Careers', 'Blog', 'Contact', 'Partners'].map((link, idx) => (
              <li key={idx}>
                <a href="#" className="text-white/50 hover:text-white transition-colors text-sm">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Col */}
        <div>
          <h4 className="text-white font-semibold mb-6">Stay Updated</h4>
          <p className="text-white/50 text-sm mb-4">
            Get the latest updates on new features and product releases.
          </p>
          <form 
            onSubmit={(e) => { e.preventDefault(); setEmail(''); }}
            className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full p-1 pl-4 focus-within:border-white/50 focus-within:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all"
          >
            <input 
              type="email" 
              placeholder="Enter your email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent text-sm text-white focus:outline-none w-full"
            />
            <button 
              type="submit"
              className="p-2 bg-white rounded-full text-black hover:scale-105 transition-transform"
            >
              <Send size={16} />
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-white/30 text-sm">
        <p>&copy; {new Date().getFullYear()} IntellMeet Inc. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white/80 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white/80 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white/80 transition-colors">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
}
