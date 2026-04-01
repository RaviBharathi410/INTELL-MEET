import { motion } from 'framer-motion';
import { Star, Shield, Lock, Activity } from 'lucide-react';

const testimonials = [
  { quote: "IntellMeet completely transformed how our decentralized team operates. The AI summaries save us hours every week.", author: "Sarah Jenkins", role: "VP of Engineering, TechFlow" },
  { quote: "Finally, a platform that feels like it was built for 2024. The 3D UI and responsiveness is unmatched.", author: "David Chen", role: "Product Director, Innovate" },
  { quote: "Our enterprise deployment went flawlessly. The OWASP compliant security gave our SOC team complete peace of mind.", author: "Emily Ross", role: "CISO, GlobalBank" }
];

const logos = [
  'TechFlow', 'Innovate', 'GlobalBank', 'NextGen', 'CloudScale'
];

export function SocialProof() {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Trust Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 mb-24"
        >
          <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-6 py-2 backdrop-blur-md">
            <Activity className="text-white" size={18} />
            <span className="text-white/50 text-sm font-medium">99.95% Uptime SLA</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-6 py-2 backdrop-blur-md">
            <Lock className="text-white" size={18} />
            <span className="text-white/50 text-sm font-medium">ISO 27001 Certified</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-6 py-2 backdrop-blur-md">
            <Shield className="text-white" size={18} />
            <span className="text-white/50 text-sm font-medium">GDPR Compliant</span>
          </div>
        </motion.div>

        {/* Company Logos */}
        <div className="mb-24 text-center">
          <p className="text-white/30 text-sm font-semibold tracking-widest uppercase mb-8">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
            {logos.map((logo, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-2xl font-black text-white/30 hover:text-white transition-colors cursor-pointer"
              >
                {logo}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors"
            >
              <div className="flex space-x-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="text-white fill-white" size={18} />
                ))}
              </div>
              <p className="text-white/80 font-light mb-8 italic">"{test.quote}"</p>
              <div>
                <h4 className="text-white font-semibold">{test.author}</h4>
                <p className="text-white/50 text-sm">{test.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
