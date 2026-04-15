import { motion } from "motion/react";
import { 
  LayoutDashboard, 
  Activity, 
  Target, 
  Settings, 
  LogOut,
  ChevronRight
} from "lucide-react";
import { useAuth } from "../lib/AuthContext";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const { logout, profile } = useAuth();

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "biometrics", label: "Biometrics", icon: Activity },
    { id: "protocols", label: "Protocols", icon: Target },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-full lg:w-72 bg-white lg:border-r border-brand-200 h-full lg:h-screen sticky top-0 flex flex-col p-8">
      <div className="mb-12">
        <div className="text-2xl font-serif font-bold tracking-tight text-brand-500">
          vitality<span className="text-brand-300">.</span>
        </div>
        <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-400">
          {profile?.vitalityGoal || "Personalized"} Focus
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${
                isActive 
                  ? "bg-brand-500 text-brand-50 shadow-lg shadow-brand-500/20" 
                  : "text-brand-950/50 hover:bg-brand-50 hover:text-brand-500"
              }`}
            >
              <div className="flex items-center gap-4">
                <Icon className={`w-5 h-5 ${isActive ? "text-brand-50" : "text-brand-400 group-hover:text-brand-500"}`} />
                <span className="font-bold text-sm uppercase tracking-widest">{item.label}</span>
              </div>
              {isActive && <motion.div layoutId="active-indicator"><ChevronRight className="w-4 h-4" /></motion.div>}
            </button>
          );
        })}
      </nav>

      <div className="pt-8 border-t border-brand-100">
        <button 
          onClick={logout}
          className="w-full flex items-center gap-4 p-4 rounded-2xl text-brand-950/50 hover:bg-red-50 hover:text-red-500 transition-all group"
        >
          <LogOut className="w-5 h-5 text-brand-400 group-hover:text-red-500" />
          <span className="font-bold text-sm uppercase tracking-widest">Logout</span>
        </button>
      </div>
    </aside>
  );
}
