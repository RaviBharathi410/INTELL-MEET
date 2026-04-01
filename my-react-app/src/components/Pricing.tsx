import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { MagneticButton } from './ui/MagneticButton';

const tiers = [
  {
    name: 'Starter',
    price: '$0',
    desc: 'Perfect for small teams and freelancers.',
    features: ['Up to 10 participants', '40 mins limit', 'Basic AI summaries', 'Community support'],
  },
  {
    name: 'Professional',
    price: '$29',
    desc: 'Advanced tools for scaling businesses.',
    features: ['Up to 100 participants', 'Unlimited duration', 'Advanced AI insights', 'Priority support', 'Custom branding'],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'Bespoke solutions for large organizations.',
    features: ['Unlimited everything', 'Dedicated account manager', 'On-premise deployment', '24/7 Phone support', 'SSO & Advanced Security'],
  }
];

export function Pricing() {
  return (
    <section className="py-32 bg-black relative">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white mb-6"
          >
            Transparent Pricing
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-lg max-w-2xl mx-auto"
          >
            Choose the plan that fits your needs. Scale seamlessly as you grow.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative bg-white/5 backdrop-blur-sm border rounded-3xl p-8 shadow-xl flex flex-col ${
                tier.popular ? 'border-white shadow-[0_0_30px_rgba(255,255,255,0.1)]' : 'border-white/10'
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-white text-black text-xs font-bold px-3 py-1 rounded-full animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-semibold text-white mb-2">{tier.name}</h3>
              <p className="text-white/50 text-sm mb-6 pb-6 border-b border-white/10">{tier.desc}</p>
              
              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-5xl font-black text-white">{tier.price}</span>
                {tier.price !== 'Custom' && <span className="text-white/30">/mo</span>}
              </div>

              <ul className="mb-8 space-y-4 flex-1">
                {tier.features.map((feature, j) => (
                  <li key={j} className="flex items-center space-x-3 text-white/80">
                    <Check className="text-white" size={18} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <MagneticButton className="w-full">
                <div className={`w-full py-3 rounded-full font-semibold transition-all ${
                  tier.popular 
                    ? 'bg-white text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]' 
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/5'
                }`}>
                  Get Started
                </div>
              </MagneticButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
