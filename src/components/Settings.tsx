import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useAuth } from "../lib/AuthContext";
import { Briefcase, User, Plus, Trash2, Save } from "lucide-react";

export default function Settings() {
  const { profile, updateStreakSettings } = useAuth();
  const [workGoals, setWorkGoals] = useState<string[]>([]);
  const [personalGoals, setPersonalGoals] = useState<string[]>([]);
  const [newWorkGoal, setNewWorkGoal] = useState("");
  const [newPersonalGoal, setNewPersonalGoal] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile?.streakSettings) {
      setWorkGoals(profile.streakSettings.workGoals || []);
      setPersonalGoals(profile.streakSettings.personalGoals || []);
    }
  }, [profile]);

  const addGoal = (type: 'work' | 'personal') => {
    if (type === 'work' && newWorkGoal.trim()) {
      setWorkGoals([...workGoals, newWorkGoal.trim()]);
      setNewWorkGoal("");
    } else if (type === 'personal' && newPersonalGoal.trim()) {
      setPersonalGoals([...personalGoals, newPersonalGoal.trim()]);
      setNewPersonalGoal("");
    }
  };

  const removeGoal = (type: 'work' | 'personal', index: number) => {
    if (type === 'work') {
      setWorkGoals(workGoals.filter((_, i) => i !== index));
    } else {
      setPersonalGoals(personalGoals.filter((_, i) => i !== index));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    await updateStreakSettings({
      workModeHours: 8,
      personalModeHours: 8,
      workGoals,
      personalGoals
    });
    setIsSaving(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div>
        <h1 className="text-4xl font-serif text-brand-500 mb-2">Settings</h1>
        <p className="text-brand-950/50 uppercase tracking-widest text-xs font-bold">
          Configure your 16-hour vitality streak
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Work Mode Settings */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-[3rem] border border-brand-200 shadow-sm"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl bg-brand-100 text-brand-500">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-serif text-brand-500">Work Mode</h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-400">8 Hours Dedicated</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={newWorkGoal}
                onChange={(e) => setNewWorkGoal(e.target.value)}
                placeholder="Add a work goal..."
                className="flex-1 bg-brand-50 border border-brand-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-brand-500"
              />
              <button 
                onClick={() => addGoal('work')}
                className="p-2 bg-brand-500 text-brand-50 rounded-xl hover:bg-brand-600 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
              {workGoals.map((goal, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-brand-50 rounded-xl border border-brand-100 group">
                  <span className="text-sm text-brand-950">{goal}</span>
                  <button 
                    onClick={() => removeGoal('work', i)}
                    className="text-brand-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Personal Mode Settings */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-[3rem] border border-brand-200 shadow-sm"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl bg-brand-100 text-brand-300">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-serif text-brand-500">Personal Mode</h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-400">8 Hours Dedicated</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={newPersonalGoal}
                onChange={(e) => setNewPersonalGoal(e.target.value)}
                placeholder="Add a personal goal..."
                className="flex-1 bg-brand-50 border border-brand-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-brand-500"
              />
              <button 
                onClick={() => addGoal('personal')}
                className="p-2 bg-brand-300 text-brand-50 rounded-xl hover:bg-brand-400 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
              {personalGoals.map((goal, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-brand-50 rounded-xl border border-brand-100 group">
                  <span className="text-sm text-brand-950">{goal}</span>
                  <button 
                    onClick={() => removeGoal('personal', i)}
                    className="text-brand-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-3 bg-brand-500 text-brand-50 px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/20 disabled:opacity-50"
        >
          {isSaving ? "Saving..." : (
            <>
              <Save className="w-5 h-5" />
              Save Settings
            </>
          )}
        </button>
      </div>
    </div>
  );
}
