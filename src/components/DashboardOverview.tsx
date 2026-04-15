import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  Moon, 
  Zap, 
  Heart,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Play,
  Square,
  Coffee,
  Briefcase,
  CheckCircle2,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  Plus,
  Minus
} from "lucide-react";
import { onSnapshot, doc, setDoc } from "firebase/firestore";
import { db, OperationType, handleFirestoreError } from "../lib/firebase";
import { useAuth } from "../lib/AuthContext";
import { useStreakTimer } from "../lib/StreakTimerContext";
import WorkEngine from "./WorkEngine";
import LivingBlock from "./LivingBlock";
import TransitionView from "./TransitionView";
import DailySummary from "./DailySummary";

const data = [
  { name: 'Mon', score: 82, recovery: 75 },
  { name: 'Tue', score: 85, recovery: 80 },
  { name: 'Wed', score: 84, recovery: 78 },
  { name: 'Thu', score: 88, recovery: 85 },
  { name: 'Fri', score: 92, recovery: 90 },
  { name: 'Sat', score: 94, recovery: 92 },
  { name: 'Sun', score: 91, recovery: 88 },
];

const stats = [
  { label: "Sleep Quality", value: "92%", trend: "+4%", icon: Moon, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Activity Level", value: "8.4k", trend: "+12%", icon: Zap, color: "text-orange-500", bg: "bg-orange-50" },
  { label: "HRV Status", value: "74ms", trend: "-2%", icon: Heart, color: "text-red-500", bg: "bg-red-50" },
  { label: "Vitality Score", value: "94", trend: "+8", icon: TrendingUp, color: "text-brand-500", bg: "bg-brand-50" },
];

const APP_PACKAGE_MAP = {
  facebook: 'facebook',
  instagram: 'instagram',
  twitter: 'twitter',
  whatsapp: 'whatsapp'
};

export default function DashboardOverview() {
  const { user, profile, updateProfile } = useAuth();
  const { timeLeft, mode, isActive, progress, startTimer, stopTimer, formatTime, completedGoals, toggleGoalCompletion } = useStreakTimer();
  const [showSummary, setShowSummary] = useState(false);
  const [externalUsage, setExternalUsage] = useState<any>({});

  const socialUsage = profile?.streakSettings?.socialUsage || { facebook: 0, instagram: 0, twitter: 0, whatsapp: 0 };
  const socialConnections = profile?.streakSettings?.socialConnections || {};

  // Listen for external usage stats from Android service
  useEffect(() => {
    if (!user) return;

    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const statId = `${user.uid}_${today}`;
    const path = `usage_stats/${statId}`;
    const docRef = doc(db, 'usage_stats', statId);

    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setExternalUsage(snapshot.data());
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });

    return () => unsubscribe();
  }, [user]);

  const updateSocialTime = async (platform: string, delta: number) => {
    if (!user) return;
    
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const statId = `${user.uid}_${today}`;
    const pkgName = APP_PACKAGE_MAP[platform as keyof typeof APP_PACKAGE_MAP];
    
    const currentExternal = externalUsage[pkgName] || 0;
    const newTime = Math.max(0, currentExternal + delta);
    
    const path = `usage_stats/${statId}`;
    try {
      await setDoc(doc(db, 'usage_stats', statId), {
        userId: user.uid,
        date: today,
        [pkgName]: newTime
      }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  if (mode === 'transition') return <TransitionView />;

  return (
    <div className="space-y-12">
      {showSummary && <DailySummary onClose={() => setShowSummary(false)} />}
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif text-brand-500 mb-2">
            Welcome back, <span className="serif-italic">{user?.displayName?.split(' ')[0] || 'Seeker'}</span>
          </h1>
          <p className="text-brand-950/50 uppercase tracking-widest text-[10px] md:text-xs font-bold">
            Your {profile?.vitalityGoal} journey is progressing optimally
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <button 
            onClick={() => setShowSummary(true)}
            className="flex items-center gap-2 bg-brand-50 text-brand-500 px-4 py-2 rounded-full border border-brand-200 hover:bg-brand-100 transition-all text-xs font-bold uppercase tracking-wider"
          >
            <CheckCircle2 className="w-4 h-4" />
            Daily Summary
          </button>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-brand-200 shadow-sm justify-center">
            <Calendar className="w-4 h-4 text-brand-400" />
            <span className="text-xs font-bold text-brand-950 uppercase tracking-wider">April 15, 2024</span>
          </div>
        </div>
      </div>

      {/* Phase Specific Content */}
      {mode === 'work' ? (
        <WorkEngine />
      ) : mode === 'personal' ? (
        <LivingBlock />
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-brand-500 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 text-brand-50 relative overflow-hidden shadow-xl shadow-brand-500/20"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-brand-400/30 flex items-center justify-center relative">
                <div className="text-xl md:text-2xl font-bold font-mono">0:00:00</div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-300 mb-1">Ready to Start</div>
                <h2 className="text-2xl md:text-3xl font-serif">Begin Your Streak</h2>
              </div>
            </div>

            <div className="flex gap-4 w-full md:w-auto">
              <button 
                onClick={() => startTimer('work')}
                className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-brand-600 text-brand-50 px-6 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-brand-700 transition-all border border-brand-400/30"
              >
                <Briefcase className="w-4 h-4" />
                Work
              </button>
              <button 
                onClick={() => startTimer('personal')}
                className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-brand-300 text-brand-950 px-6 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-brand-400 transition-all"
              >
                <Coffee className="w-4 h-4" />
                Personal
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2rem] border border-brand-200 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <div className="text-2xl font-bold text-brand-950 mb-1">{stat.value}</div>
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Vitality Trend Chart */}
          <div className="bg-white p-8 rounded-[3rem] border border-brand-200 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-serif text-brand-500">Vitality Trend</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-500" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-400">Score</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-300" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-400">Recovery</span>
                </div>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#5d6d53" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#5d6d53" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#a4ad95', fontWeight: 700 }}
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '16px', 
                      border: 'none', 
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#5d6d53" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorScore)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="recovery" 
                    stroke="#d1b894" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    fill="transparent" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 16-Hour Streak Progress */}
          <div className="bg-white p-8 rounded-[3rem] border border-brand-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-serif text-brand-500">16-Hour Streak</h3>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-400">8h Work + 8h Personal</span>
            </div>
            
            <div className="relative h-12 bg-brand-100 rounded-2xl overflow-hidden flex">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '50%' }}
                className="h-full bg-brand-500 relative group"
              >
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-brand-50 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Work Mode (8h)
                </div>
              </motion.div>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '50%' }}
                className="h-full bg-brand-300 relative group"
              >
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-brand-50 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Personal Mode (8h)
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-8">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-brand-400 mb-3">Work Goals</div>
                <div className="space-y-2">
                  {(profile?.streakSettings?.workGoals || ["Deep Work", "Strategic Planning"]).slice(0, 2).map((goal: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 text-xs text-brand-950 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      {goal}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-brand-400 mb-3">Personal Goals</div>
                <div className="space-y-2">
                  {(profile?.streakSettings?.personalGoals || ["Family Dinner", "30m Reading"]).slice(0, 2).map((goal: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 text-xs text-brand-950 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-300" />
                      {goal}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-brand-500 p-8 rounded-[3rem] text-brand-50 relative overflow-hidden h-fit">
          <div className="relative z-10">
            <h3 className="text-xl font-serif mb-6">Today's Protocol</h3>
            
            <div className="space-y-6">
              {/* Work Segment */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="w-4 h-4 text-brand-300" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-300">Phase A: Work Engine</span>
                </div>
                <div className="space-y-2">
                  {(profile?.streakSettings?.workGoals || ["Deep Work", "Strategic Planning"]).map((goal: string, i: number) => {
                    const isCompleted = completedGoals.includes(goal);
                    return (
                      <div 
                        key={i} 
                        onClick={() => toggleGoalCompletion(goal)}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${isCompleted ? 'bg-brand-600 border-brand-400' : 'bg-brand-600/30 border-brand-400/20 hover:border-brand-300'}`}
                      >
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isCompleted ? 'bg-brand-300 border-brand-300' : 'border-brand-300'}`}>
                          {isCompleted && <CheckCircle2 className="w-3 h-3 text-brand-500" />}
                        </div>
                        <span className={`text-xs font-medium ${isCompleted ? 'text-brand-100 line-through opacity-70' : 'text-brand-50'}`}>{goal}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Personal Segment */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Coffee className="w-4 h-4 text-brand-300" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-300">Phase B: Living Block</span>
                </div>
                <div className="space-y-2">
                  {(profile?.streakSettings?.personalGoals || ["Family Dinner", "30m Reading"]).map((goal: string, i: number) => {
                    const isCompleted = completedGoals.includes(goal);
                    return (
                      <div 
                        key={i} 
                        onClick={() => toggleGoalCompletion(goal)}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${isCompleted ? 'bg-brand-600 border-brand-400' : 'bg-brand-600/30 border-brand-400/20 hover:border-brand-300'}`}
                      >
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isCompleted ? 'bg-brand-300 border-brand-300' : 'border-brand-300'}`}>
                          {isCompleted && <CheckCircle2 className="w-3 h-3 text-brand-500" />}
                        </div>
                        <span className={`text-xs font-medium ${isCompleted ? 'text-brand-100 line-through opacity-70' : 'text-brand-50'}`}>{goal}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowSummary(true)}
              className="w-full mt-8 bg-brand-50 text-brand-500 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-brand-100 transition-all"
            >
              View Full Summary
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>

        {/* Social Usage Tracker */}
        <div className="bg-white p-8 rounded-[3rem] border border-brand-200 shadow-sm">
          <h3 className="text-xl font-serif text-brand-500 mb-6">Digital Vitality</h3>
          <div className="space-y-4">
            {[
              { id: 'facebook', label: 'Facebook', icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-50' },
              { id: 'instagram', label: 'Instagram', icon: Instagram, color: 'text-pink-600', bg: 'bg-pink-50' },
              { id: 'twitter', label: 'Twitter', icon: Twitter, color: 'text-sky-500', bg: 'bg-sky-50' },
              { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, color: 'text-green-500', bg: 'bg-green-50' },
            ].map((platform) => {
              const isConnected = socialConnections[platform.id];
              const pkgName = APP_PACKAGE_MAP[platform.id as keyof typeof APP_PACKAGE_MAP];
              const time = externalUsage[pkgName] || 0;
              
              return (
                <div key={platform.id} className={`p-4 rounded-2xl border transition-all ${isConnected ? 'bg-white border-brand-100' : 'bg-brand-50/50 border-transparent opacity-50 grayscale'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${platform.bg} ${platform.color}`}>
                        <platform.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-brand-950">{platform.label}</div>
                        <div className="text-[10px] font-bold text-brand-400 uppercase tracking-widest">
                          {isConnected ? `${time} Minutes Today` : 'Not Connected'}
                        </div>
                      </div>
                    </div>
                    
                    {isConnected && (
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => updateSocialTime(platform.id, -15)}
                          className="p-1.5 rounded-lg hover:bg-brand-50 text-brand-400 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => updateSocialTime(platform.id, 15)}
                          className="p-1.5 rounded-lg hover:bg-brand-50 text-brand-400 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-[10px] text-brand-400 text-center italic leading-relaxed">
            Connect accounts in Settings to enable tracking. <br />
            Adjust time manually to maintain your digital protocol.
          </p>
        </div>
      </div>
    </div>
  );
}
