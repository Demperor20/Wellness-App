import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

interface StreakTimerContextType {
  timeLeft: number;
  mode: 'work' | 'personal' | 'off' | 'transition';
  isActive: boolean;
  progress: number;
  hydration: number;
  stageMode: boolean;
  focusShield: boolean;
  postureTimeLeft: number;
  completedGoals: string[];
  startTimer: (mode: 'work' | 'personal') => void;
  stopTimer: () => void;
  resetTimer: () => void;
  toggleStageMode: () => void;
  toggleFocusShield: () => void;
  addHydration: (amount: number) => void;
  toggleGoalCompletion: (goal: string) => void;
  startTransition: () => void;
  formatTime: (seconds: number) => string;
}

const StreakTimerContext = createContext<StreakTimerContextType | undefined>(undefined);

export function StreakTimerProvider({ children }: { children: React.ReactNode }) {
  const { profile } = useAuth();
  const [timeLeft, setTimeLeft] = useState(0);
  const [mode, setMode] = useState<'work' | 'personal' | 'off' | 'transition'>('off');
  const [isActive, setIsActive] = useState(false);
  const [totalDuration, setTotalDuration] = useState(0);
  
  const [hydration, setHydration] = useState(0);
  const [stageMode, setStageMode] = useState(false);
  const [focusShield, setFocusShield] = useState(false);
  const [postureTimeLeft, setPostureTimeLeft] = useState(50 * 60);
  const [completedGoals, setCompletedGoals] = useState<string[]>([]);

  const startTimer = useCallback((newMode: 'work' | 'personal') => {
    const hours = newMode === 'work' 
      ? (profile?.streakSettings?.workModeHours || 8) 
      : (profile?.streakSettings?.personalModeHours || 8);
    
    const seconds = hours * 3600;
    setTimeLeft(seconds);
    setTotalDuration(seconds);
    setMode(newMode);
    setIsActive(true);
    setPostureTimeLeft((profile?.streakSettings?.postureReminderMinutes || 50) * 60);
    
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, [profile]);

  const stopTimer = useCallback(() => {
    setIsActive(false);
    setMode('off');
    setTimeLeft(0);
  }, []);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setMode('off');
    setTimeLeft(0);
    setTotalDuration(0);
  }, []);

  const startTransition = useCallback(() => {
    setMode('transition');
    setTimeLeft(5 * 60); // 5 minute decompression
    setTotalDuration(5 * 60);
    setIsActive(true);
  }, []);

  const toggleStageMode = () => setStageMode(!stageMode);
  const toggleFocusShield = () => setFocusShield(!focusShield);
  const addHydration = (amount: number) => setHydration(prev => prev + amount);
  
  const toggleGoalCompletion = (goal: string) => {
    setCompletedGoals(prev => 
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  const sendNotification = useCallback((title: string, body: string) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, { body });
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        
        // Posture Reminder Logic (only in Work mode and not in Stage Mode)
        if (mode === 'work' && !stageMode) {
          setPostureTimeLeft(prev => {
            if (prev <= 1) {
              sendNotification("Postural Shift", "Time to stand up and stretch for 2 minutes.");
              return (profile?.streakSettings?.postureReminderMinutes || 50) * 60;
            }
            return prev - 1;
          });
        }

        // Hydration Ping (every 45 mins)
        if (timeLeft % (45 * 60) === 0 && mode !== 'off') {
          sendNotification("Hydration Ping", "Time for a few sips of water to maintain cellular vitality.");
        }

      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      if (mode === 'transition') {
        sendNotification("Transition Complete", "You are now ready for your next phase.");
        setMode('off');
      } else {
        const nextMode = mode === 'work' ? 'Personal' : 'Work';
        sendNotification(
          `${mode.toUpperCase()} Mode Complete`, 
          `Time to transition to ${nextMode} mode. Start your 5-minute decompression.`
        );
        setMode('off');
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, stageMode, profile, sendNotification]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = totalDuration > 0 ? ((totalDuration - timeLeft) / totalDuration) * 100 : 0;

  return (
    <StreakTimerContext.Provider value={{ 
      timeLeft, mode, isActive, progress, hydration, stageMode, focusShield, postureTimeLeft,
      completedGoals, startTimer, stopTimer, resetTimer, toggleStageMode, toggleFocusShield, 
      addHydration, toggleGoalCompletion, startTransition, formatTime 
    }}>
      {children}
    </StreakTimerContext.Provider>
  );
}

export function useStreakTimer() {
  const context = useContext(StreakTimerContext);
  if (context === undefined) {
    throw new Error('useStreakTimer must be used within a StreakTimerProvider');
  }
  return context;
}
