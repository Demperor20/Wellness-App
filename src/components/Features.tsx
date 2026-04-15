import { motion } from "motion/react";
import { Zap, Shield, Heart, Activity } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Peak Performance",
    description: "Optimize your daily energy levels with personalized protocols designed for your unique biology."
  },
  {
    icon: Shield,
    title: "Longevity Science",
    description: "Harness the latest breakthroughs in cellular health and anti-aging to extend your healthspan."
  },
  {
    icon: Heart,
    title: "Holistic Balance",
    description: "Integrate mental clarity, emotional resilience, and physical strength into one cohesive system."
  },
  {
    icon: Activity,
    title: "Real-time Insights",
    description: "Continuous monitoring and adaptive feedback to keep you on the path to your best self."
  }
];

export default function Features() {
  return (
    <section className="py-32 bg-brand-100/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif mb-6 text-brand-500 font-normal"
          >
            Daily <span className="serif-italic">Rituals.</span>
          </motion.h2>
          <p className="text-lg text-brand-950/60">
            We combine ancient wisdom with modern technology to deliver a comprehensive 
            wellness experience that evolves with you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-[2rem] border border-brand-200 hover:shadow-sm transition-all group"
            >
              <div className="w-10 h-10 bg-brand-300/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-500 group-hover:text-brand-50 transition-colors">
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-3 text-brand-500">{feature.title}</h3>
              <p className="text-xs text-brand-950/50 leading-relaxed uppercase tracking-wider">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
