import { useState } from "react";
import { motion } from "motion/react";
import { 
  User, 
  Dumbbell, 
  Users, 
  BookOpen, 
  Coffee, 
  ShoppingBag,
  Dice5,
  Clock,
  XCircle,
  CheckCircle2
} from "lucide-react";
import { useStreakTimer } from "../lib/StreakTimerContext";
import { useAuth } from "../lib/AuthContext";

const activities = [
  { id: 'physical', label: 'Physical', icon: Dumbbell, color: 'text-orange-500', bg: 'bg-orange-50' },
  { id: 'connection', label: 'Connection', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'growth', label: 'Growth', icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-50' },
  { id: 'rest', label: 'Rest', icon: Coffee, color: 'text-brand-500', bg: 'bg-brand-50' },
  { id: 'errands', label: 'Errands', icon: ShoppingBag, color: 'text-gray-500', bg: 'bg-gray-50' },
];

export default function LivingBlock() {
  const { profile } = useAuth();
  const { 
    timeLeft, 
    formatTime, 
    startTransition, 
    resetTimer, 
    completedGoals, 
    toggleGoalCompletion 
  } = useStreakTimer();
  const [suggestedActivity, setSuggestedActivity] = useState<typeof activities[0] | null>(null);

  const rollActivity = () => {
    const random = activities[Math.floor(Math.random() * activities.length)];
    setSuggestedActivity(random);
  };

  const personalGoals = profile?.streakSettings?.personalGoals || ["Family Dinner", "30m Reading"];

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Time Bank Visualization */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-brand-200 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-2xl font-serif text-brand-500">Phase B: Living Block</h3>
            <div className="flex items-center gap-2">
              <button 
                onClick={resetTimer}
                className="p-3 rounded-2xl bg-red-50 text-red-400 hover:bg-red-100 transition-all mr-2"
                title="Cancel Phase"
              >
                <XCircle className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 text-brand-400">
                <Clock className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Adaptive Flex Mode</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    fill="none"
                    stroke="#f8f7f2"
                    strokeWidth="12"
                  />
                  <motion.circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    fill="none"
                    stroke="#d1b894"
                    strokeWidth="12"
                    strokeDasharray="283"
                    initial={{ strokeDashoffset: 283 }}
                    animate={{ strokeDashoffset: 283 - (283 * (timeLeft / (8 * 3600))) }}
                    transition={{ duration: 1 }}
                  />
                </svg>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-mono font-bold text-brand-950">{formatTime(timeLeft)}</div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-400 mt-2">Remaining</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-brand-400">Personal Goals</h4>
              <div className="space-y-3">
                {personalGoals.map((goal, i) => {
                  const isCompleted = completedGoals.includes(goal);
                  return (
                    <div 
                      key={i} 
                      onClick={() => toggleGoalCompletion(goal)}
                      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer group ${isCompleted ? 'bg-brand-300 border-brand-300' : 'bg-brand-50 border-brand-100 hover:border-brand-300'}`}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isCompleted ? 'bg-white border-white' : 'border-brand-200 group-hover:border-brand-300'}`}>
                        <CheckCircle2 className={`w-4 h-4 transition-opacity ${isCompleted ? 'text-brand-300 opacity-100' : 'text-brand-300 opacity-0 group-hover:opacity-100'}`} />
                      </div>
                      <span className={`text-sm font-medium transition-colors ${isCompleted ? 'text-brand-950' : 'text-brand-950'}`}>{goal}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Adaptive Logic: Activity Selector */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[3rem] border border-brand-200 shadow-sm h-full flex flex-col">
            <h3 className="text-xl font-serif text-brand-500 mb-6">Activity Selector</h3>
            
            <div className="flex-1 space-y-4">
              {suggestedActivity ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-8 rounded-[2rem] ${suggestedActivity.bg} text-center border border-brand-100`}
                >
                  <suggestedActivity.icon className={`w-12 h-12 mx-auto mb-4 ${suggestedActivity.color}`} />
                  <h4 className={`text-xl font-bold ${suggestedActivity.color}`}>{suggestedActivity.label}</h4>
                  <p className="text-xs text-brand-950/50 mt-2">Focus on this for the next block of time.</p>
                </motion.div>
              ) : (
                <div className="p-8 rounded-[2rem] bg-brand-50 text-center border border-brand-100 border-dashed">
                  <p className="text-sm text-brand-400">Need a suggestion for your next activity?</p>
                </div>
              )}
            </div>

            <button 
              onClick={rollActivity}
              className="w-full mt-8 flex items-center justify-center gap-3 bg-brand-500 text-brand-50 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/20"
            >
              <Dice5 className="w-5 h-5" />
              Roll for Activity
            </button>
          </div>

          <button 
            onClick={startTransition}
            className="w-full bg-brand-50 p-6 rounded-[2rem] border border-brand-200 group hover:border-brand-500 transition-all text-center"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-brand-400">End Streak Early?</span>
          </button>
        </div>
      </div>
    </div>
  );
}
