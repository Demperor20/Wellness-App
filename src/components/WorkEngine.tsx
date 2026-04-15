import { motion } from "motion/react";
import { 
  Shield, 
  Zap, 
  Droplets, 
  Monitor, 
  BellOff, 
  RefreshCw,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { useStreakTimer } from "../lib/StreakTimerContext";
import { useAuth } from "../lib/AuthContext";

export default function WorkEngine() {
  const { profile } = useAuth();
  const { 
    timeLeft, 
    formatTime, 
    postureTimeLeft, 
    stageMode, 
    toggleStageMode, 
    focusShield, 
    toggleFocusShield,
    hydration,
    addHydration,
    startTransition,
    resetTimer,
    completedGoals,
    toggleGoalCompletion
  } = useStreakTimer();

  const big3 = profile?.streakSettings?.workGoals?.slice(0, 3) || ["Deep Work", "Strategic Planning", "Client Review"];

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Focus Shield */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-brand-200 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-serif text-brand-500">Phase A: Work Engine</h3>
            <div className="flex gap-2">
              <button 
                onClick={resetTimer}
                className="p-3 rounded-2xl bg-red-50 text-red-400 hover:bg-red-100 transition-all"
                title="Cancel Phase"
              >
                <XCircle className="w-5 h-5" />
              </button>
              <button 
                onClick={toggleFocusShield}
                className={`p-3 rounded-2xl transition-all ${focusShield ? 'bg-brand-500 text-brand-50' : 'bg-brand-50 text-brand-400'}`}
                title="Focus Shield"
              >
                <BellOff className="w-5 h-5" />
              </button>
              <button 
                onClick={toggleStageMode}
                className={`p-3 rounded-2xl transition-all ${stageMode ? 'bg-brand-500 text-brand-50' : 'bg-brand-50 text-brand-400'}`}
                title="Stage Mode"
              >
                <Monitor className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <div className="text-6xl font-mono font-bold text-brand-950 mb-2">{formatTime(timeLeft)}</div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-400">Time Remaining in Focus Block</p>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4 bg-brand-50 p-4 rounded-2xl border border-brand-100">
                  <div className="p-2 bg-white rounded-xl text-brand-500">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-950 uppercase tracking-wider">Postural Shift In</div>
                    <div className="text-lg font-mono font-bold text-brand-500">{Math.floor(postureTimeLeft / 60)}m {postureTimeLeft % 60}s</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-brand-400">The Big 3 Goals</h4>
              <div className="space-y-3">
                {big3.map((goal, i) => {
                  const isCompleted = completedGoals.includes(goal);
                  return (
                    <div 
                      key={i} 
                      onClick={() => toggleGoalCompletion(goal)}
                      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer group ${isCompleted ? 'bg-brand-500 border-brand-500' : 'bg-brand-50 border-brand-100 hover:border-brand-300'}`}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isCompleted ? 'bg-white border-white' : 'border-brand-200 group-hover:border-brand-500'}`}>
                        <CheckCircle2 className={`w-4 h-4 transition-opacity ${isCompleted ? 'text-brand-500 opacity-100' : 'text-brand-500 opacity-0 group-hover:opacity-100'}`} />
                      </div>
                      <span className={`text-sm font-medium transition-colors ${isCompleted ? 'text-brand-50' : 'text-brand-950'}`}>{goal}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Hydration & Integration */}
        <div className="space-y-8">
          <div className="bg-brand-500 p-8 rounded-[3rem] text-brand-50 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-serif">Smart Hydration</h3>
                <Droplets className="w-6 h-6 text-brand-300" />
              </div>
              <div className="text-4xl font-bold mb-2">{hydration}ml</div>
              <div className="w-full h-2 bg-brand-400/30 rounded-full mb-6 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((hydration / 2500) * 100, 100)}%` }}
                  className="h-full bg-brand-300"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => addHydration(250)}
                  className="bg-brand-600/50 hover:bg-brand-600 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                >
                  +250ml
                </button>
                <button 
                  onClick={() => addHydration(500)}
                  className="bg-brand-600/50 hover:bg-brand-600 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                >
                  +500ml
                </button>
              </div>
            </div>
          </div>

          <button 
            onClick={startTransition}
            className="w-full bg-white p-8 rounded-[3rem] border border-brand-200 shadow-sm group hover:border-brand-500 transition-all text-center"
          >
            <Zap className="w-8 h-8 text-brand-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-serif text-brand-500 mb-1">Context Switch</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-400">Trigger 5m Decompression</p>
          </button>
        </div>
      </div>
    </div>
  );
}
