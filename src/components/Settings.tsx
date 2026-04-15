import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useAuth } from "../lib/AuthContext";
import { 
  Briefcase, 
  User, 
  Plus, 
  Trash2, 
  Save, 
  Facebook, 
  Instagram, 
  Twitter, 
  MessageCircle,
  Link2,
  CheckCircle2
} from "lucide-react";

export default function Settings() {
  const { profile, updateProfile } = useAuth();
  const [workGoals, setWorkGoals] = useState<string[]>([]);
  const [personalGoals, setPersonalGoals] = useState<string[]>([]);
  const [livingActivities, setLivingActivities] = useState<string[]>([]);
  const [newWorkGoal, setNewWorkGoal] = useState("");
  const [newPersonalGoal, setNewPersonalGoal] = useState("");
  const [newActivity, setNewActivity] = useState("");
  const [postureMinutes, setPostureMinutes] = useState(50);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile?.streakSettings) {
      setWorkGoals(profile.streakSettings.workGoals || []);
      setPersonalGoals(profile.streakSettings.personalGoals || []);
      setLivingActivities(profile.streakSettings.livingActivities || []);
      setPostureMinutes(profile.streakSettings.postureReminderMinutes || 50);
    }
  }, [profile]);

  const addGoal = (type: 'work' | 'personal' | 'activity') => {
    if (type === 'work' && newWorkGoal.trim()) {
      setWorkGoals([...workGoals, newWorkGoal.trim()]);
      setNewWorkGoal("");
    } else if (type === 'personal' && newPersonalGoal.trim()) {
      setPersonalGoals([...personalGoals, newPersonalGoal.trim()]);
      setNewPersonalGoal("");
    } else if (type === 'activity' && newActivity.trim()) {
      setLivingActivities([...livingActivities, newActivity.trim()]);
      setNewActivity("");
    }
  };

  const removeGoal = (type: 'work' | 'personal' | 'activity', index: number) => {
    if (type === 'work') {
      setWorkGoals(workGoals.filter((_, i) => i !== index));
    } else if (type === 'personal') {
      setPersonalGoals(personalGoals.filter((_, i) => i !== index));
    } else {
      setLivingActivities(livingActivities.filter((_, i) => i !== index));
    }
  };

  const toggleSocial = async (platform: string) => {
    const currentConnections = profile?.streakSettings?.socialConnections || {};
    const updatedConnections = {
      ...currentConnections,
      [platform]: !currentConnections[platform]
    };
    
    await updateProfile({
      streakSettings: {
        ...profile.streakSettings,
        socialConnections: updatedConnections
      }
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    await updateProfile({
      streakSettings: {
        ...profile.streakSettings,
        workGoals,
        personalGoals,
        livingActivities,
        postureReminderMinutes: postureMinutes,
      }
    });
    setIsSaving(false);
  };

  const socialPlatforms = [
    { id: 'facebook', label: 'Facebook', icon: Facebook, color: 'text-blue-600' },
    { id: 'instagram', label: 'Instagram', icon: Instagram, color: 'text-pink-600' },
    { id: 'twitter', label: 'Twitter', icon: Twitter, color: 'text-sky-500' },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, color: 'text-green-500' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24">
      <div>
        <h1 className="text-4xl font-serif text-brand-500 mb-2">Vitality Settings</h1>
        <p className="text-brand-950/50 uppercase tracking-widest text-xs font-bold">
          Configure your 16-hour high-performance engine
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Phase A: Work Engine */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-[3rem] border border-brand-200 shadow-sm"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl bg-brand-500 text-brand-50">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-serif text-brand-500">Phase A: Work Engine</h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-400">Deep Focus & Posture</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-brand-400 block mb-2">Posture Reminder (Minutes)</label>
              <input 
                type="number" 
                value={postureMinutes}
                onChange={(e) => setPostureMinutes(Number(e.target.value))}
                className="w-full bg-brand-50 border border-brand-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-brand-400 block mb-2">The Big 3 Work Goals</label>
              <div className="flex gap-2 mb-4">
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
          </div>
        </motion.div>

        {/* Phase B: Living Block */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-[3rem] border border-brand-200 shadow-sm"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl bg-brand-300 text-brand-950">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-serif text-brand-500">Phase B: Living Block</h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-400">Adaptive Flex & Growth</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-brand-400 block mb-2">Personal Goals</label>
              <div className="flex gap-2 mb-4">
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

              <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2">
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

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-brand-400 block mb-2">Custom Activities (Selector)</label>
              <div className="flex gap-2 mb-4">
                <input 
                  type="text" 
                  value={newActivity}
                  onChange={(e) => setNewActivity(e.target.value)}
                  placeholder="Add an activity..."
                  className="flex-1 bg-brand-50 border border-brand-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-brand-500"
                />
                <button 
                  onClick={() => addGoal('activity')}
                  className="p-2 bg-brand-300 text-brand-50 rounded-xl hover:bg-brand-400 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2">
                {livingActivities.map((activity, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-brand-50 rounded-xl border border-brand-100 group">
                    <span className="text-sm text-brand-950">{activity}</span>
                    <button 
                      onClick={() => removeGoal('activity', i)}
                      className="text-brand-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Social Integration */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-[3rem] border border-brand-200 shadow-sm"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-2xl bg-brand-50 text-brand-500">
            <Link2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-serif text-brand-500">Social Integration</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-400">Monitor Digital Vitality</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {socialPlatforms.map((platform) => {
            const isConnected = profile?.streakSettings?.socialConnections?.[platform.id];
            return (
              <div 
                key={platform.id}
                className={`p-6 rounded-[2rem] border transition-all ${isConnected ? 'bg-brand-50 border-brand-200' : 'bg-white border-brand-100'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <platform.icon className={`w-8 h-8 ${platform.color}`} />
                  {isConnected && <CheckCircle2 className="w-5 h-5 text-brand-500" />}
                </div>
                <h4 className="text-sm font-bold text-brand-950 mb-4">{platform.label}</h4>
                <button 
                  onClick={() => toggleSocial(platform.id)}
                  className={`w-full py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${isConnected ? 'bg-white text-brand-400 border border-brand-200 hover:text-red-500' : 'bg-brand-500 text-white hover:bg-brand-600'}`}
                >
                  {isConnected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            );
          })}
        </div>
        <p className="mt-6 text-[10px] text-brand-400 text-center italic">
          Note: Due to browser security, automatic usage monitoring requires account connection and manual logging for precision.
        </p>
      </motion.div>

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
