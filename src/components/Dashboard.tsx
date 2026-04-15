import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";
import DashboardOverview from "./DashboardOverview";
import Settings from "./Settings";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-brand-50 relative">
      {/* Mobile Menu Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed top-6 left-6 z-50 p-3 bg-white rounded-2xl border border-brand-200 shadow-lg text-brand-500"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden fixed inset-0 bg-brand-950/20 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-y-0 left-0 w-72 z-[70] bg-white shadow-2xl"
            >
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="absolute top-6 right-6 p-2 text-brand-400 hover:text-brand-500"
              >
                <X className="w-6 h-6" />
              </button>
              <Sidebar 
                activeTab={activeTab} 
                setActiveTab={(tab) => {
                  setActiveTab(tab);
                  setIsSidebarOpen(false);
                }} 
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      
      <main className="flex-1 p-6 md:p-12 overflow-y-auto pt-24 lg:pt-12">
        <div className="max-w-6xl mx-auto">
          {activeTab === "overview" && <DashboardOverview />}
          {activeTab === "biometrics" && (
            <div className="flex items-center justify-center h-[60vh] text-brand-950/30 font-serif text-xl md:text-2xl text-center px-6">
              Biometrics Insights Coming Soon
            </div>
          )}
          {activeTab === "protocols" && (
            <div className="flex items-center justify-center h-[60vh] text-brand-950/30 font-serif text-xl md:text-2xl text-center px-6">
              Personalized Protocols Coming Soon
            </div>
          )}
          {activeTab === "settings" && <Settings />}
        </div>
      </main>
    </div>
  );
}
