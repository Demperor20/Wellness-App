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
  ArrowDownRight
} from "lucide-react";
import { useAuth } from "../lib/AuthContext";

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

export default function DashboardOverview() {
  const { user, profile } = useAuth();

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif text-brand-500 mb-2">
            Welcome back, <span className="serif-italic">{user?.displayName?.split(' ')[0] || 'Seeker'}</span>
          </h1>
          <p className="text-brand-950/50 uppercase tracking-widest text-xs font-bold">
            Your {profile?.vitalityGoal} journey is progressing optimally
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-brand-200 shadow-sm">
          <Calendar className="w-4 h-4 text-brand-400" />
          <span className="text-xs font-bold text-brand-950 uppercase tracking-wider">April 15, 2024</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-brand-200 shadow-sm">
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

        <div className="bg-brand-500 p-8 rounded-[3rem] text-brand-50 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-serif mb-6">Today's Protocol</h3>
            <div className="space-y-4">
              {[
                "20m Morning Sunlight",
                "High-Intensity Interval Training",
                "Magnesium Supplementation",
                "10m Cold Exposure"
              ].map((task, i) => (
                <div key={i} className="flex items-center gap-4 bg-brand-600/50 p-4 rounded-2xl border border-brand-400/30">
                  <div className="w-5 h-5 rounded-full border-2 border-brand-300 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-brand-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-sm font-medium">{task}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 bg-brand-50 text-brand-500 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-brand-100 transition-all">
              View All Tasks
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>
      </div>
    </div>
  );
}
