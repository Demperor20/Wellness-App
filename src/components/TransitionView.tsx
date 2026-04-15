import { motion } from "motion/react";
import { Wind, Sparkles, XCircle } from "lucide-react";
import { useStreakTimer } from "../lib/StreakTimerContext";

export default function TransitionView() {
  const { timeLeft, formatTime, resetTimer } = useStreakTimer();

  return (
    <div className="fixed inset-0 z-[200] bg-brand-500 flex items-center justify-center p-6">
      <button 
        onClick={resetTimer}
        className="absolute top-8 right-8 p-4 text-brand-300 hover:text-brand-50 transition-colors group"
        title="Skip Transition"
      >
        <XCircle className="w-8 h-8" />
        <span className="sr-only">Skip Transition</span>
      </button>

      <div className="max-w-2xl w-full text-center text-brand-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-12"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-brand-300 rounded-full blur-3xl"
            />
            <Wind className="w-24 h-24 relative z-10 mx-auto" />
          </div>

          <div>
            <h2 className="text-5xl font-serif mb-6">Decompression</h2>
            <p className="text-xl text-brand-100/80 max-w-lg mx-auto leading-relaxed">
              Close your eyes. Soften your gaze. <br />
              Release the previous context. <br />
              Prepare for the next phase of your vitality.
            </p>
          </div>

          <div className="text-6xl font-mono font-bold tracking-tighter">
            {formatTime(timeLeft)}
          </div>

          <div className="flex items-center justify-center gap-3 text-brand-300">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-[0.3em]">Breathing in... Breathing out...</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
