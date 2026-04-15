import { useState } from "react";
import { motion } from "motion/react";
import Sidebar from "./Sidebar";
import DashboardOverview from "./DashboardOverview";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex min-h-screen bg-brand-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {activeTab === "overview" && <DashboardOverview />}
          {activeTab === "biometrics" && (
            <div className="flex items-center justify-center h-[60vh] text-brand-950/30 font-serif text-2xl">
              Biometrics Insights Coming Soon
            </div>
          )}
          {activeTab === "protocols" && (
            <div className="flex items-center justify-center h-[60vh] text-brand-950/30 font-serif text-2xl">
              Personalized Protocols Coming Soon
            </div>
          )}
          {activeTab === "settings" && (
            <div className="flex items-center justify-center h-[60vh] text-brand-950/30 font-serif text-2xl">
              Account Settings Coming Soon
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
