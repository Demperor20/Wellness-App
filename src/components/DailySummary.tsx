import { motion } from "motion/react";
import { 
  Trophy, 
  Droplets, 
  CheckCircle2, 
  ArrowRight,
  RefreshCw
} from "lucide-react";
import { useStreakTimer } from "../lib/StreakTimerContext";

interface DailySummaryProps {
  onClose: () => void;
}

export default function DailySummary({ onClose }: DailySummaryProps) {
  const { hydration, completedGoals, resetTimer } = useStreakTimer();

  const handleFinish = () => {
    resetTimer();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[300] bg-brand-50/90 backdrop-blur-md flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-xl w-full bg-white rounded-[3rem] p-10 shadow-2xl border border-brand-200 text-center"
      >
        <div className="w-20 h-20 bg-brand-100 rounded-3xl flex items-center justify-center mx-auto mb-8 text-brand-500">
          <Trophy className="w-10 h-10" />
        </div>

        <h2 className="text-4xl font-serif text-brand-500 mb-2">Streak Complete</h2>
        <p className="text-brand-950/50 uppercase tracking-widest text-xs font-bold mb-12">
          Your 16-hour vitality cycle is summarized
        </p>

        <div className="grid grid-cols-2 gap-6 mb-12">
          <div className="bg-brand-50 p-6 rounded-[2rem] border border-brand-100">
            <Droplets className="w-6 h-6 text-brand-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-brand-950">{hydration}ml</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-brand-400">Hydration</div>
          </div>
          <div className="bg-brand-50 p-6 rounded-[2rem] border border-brand-100">
            <CheckCircle2 className="w-6 h-6 text-brand-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-brand-950">{completedGoals.length}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-brand-400">Goals Met</div>
          </div>
        </div>

        {completedGoals.length > 0 && (
          <div className="mb-12 text-left">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-400 mb-4 px-4">Accomplishments</h4>
            <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2">
              {completedGoals.map((goal, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-brand-50 rounded-xl text-sm text-brand-950 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                  {goal}
                </div>
              ))}
            </div>
          </div>
        )}

        <button 
          onClick={handleFinish}
          className="w-full flex items-center justify-center gap-3 bg-brand-500 text-brand-50 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-brand-600 transition-all shadow-xl shadow-brand-500/20"
        >
          Complete Cycle
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
}
