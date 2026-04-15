import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-40 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-7xl md:text-8xl font-serif leading-[0.95] tracking-tight mb-8 text-brand-500 font-normal">
              Nourish<br />
              Your Inner<br />
              <span className="serif-italic text-brand-400">Nature.</span>
            </h1>
            <p className="text-lg text-brand-950/60 leading-relaxed mb-10 max-w-md">
              A holistic sanctuary for mindful living, curated wellness practices, and organic vitality for the modern soul.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-brand-500 text-brand-50 px-10 py-4 rounded-full text-lg font-semibold hover:bg-brand-600 transition-all flex items-center gap-2 group">
                Explore Programs
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative flex items-center justify-center"
          >
            {/* Dot Pattern */}
            <div className="absolute top-0 left-0 -translate-x-8 translate-y-8 dot-pattern z-0">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-brand-300 rounded-full" />
              ))}
            </div>

            <div className="aspect-[4/5] w-full max-w-[400px] image-blob overflow-hidden shadow-2xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000" 
                alt="Wellness" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="absolute bottom-12 -right-4 bg-white p-6 rounded-3xl shadow-xl border border-brand-100 w-[220px] z-20">
              <div className="text-[11px] font-bold uppercase tracking-widest text-brand-400 mb-2">Weekly Vitality Score</div>
              <div className="text-3xl font-bold text-brand-500 mb-3">94%</div>
              <div className="h-1 bg-brand-100 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-brand-500 rounded-full" style={{ width: '94%' }} />
              </div>
              <div className="text-[11px] text-brand-400">+12% from last week</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
