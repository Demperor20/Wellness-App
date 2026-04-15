import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

interface StreakTimerContextType {
  timeLeft: number;
  mode: 'work' | 'personal' | 'off';
  isActive: boolean;
  progress: number;
  startTimer: (mode: 'work' | 'personal') => void;
  stopTimer: () => void;
  formatTime: (seconds: number) => string;
}

const StreakTimerContext = createContext<StreakTimerContextType | undefined>(undefined);

export function StreakTimerProvider({ children }: { children: React.ReactNode }) {
  const { profile } = useAuth();
  const [timeLeft, setTimeLeft] = useState(0);
  const [mode, setMode] = useState<'work' | 'personal' | 'off'>('off');
  const [isActive, setIsActive] = useState(false);
  const [totalDuration, setTotalDuration] = useState(0);

  const startTimer = useCallback((newMode: 'work' | 'personal') => {
    const hours = newMode === 'work' 
      ? (profile?.streakSettings?.workModeHours || 8) 
      : (profile?.streakSettings?.personalModeHours || 8);
    
    const seconds = hours * 3600;
    setTimeLeft(seconds);
    setTotalDuration(seconds);
    setMode(newMode);
    setIsActive(true);
    
    // Request notification permission
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, [profile]);

  const stopTimer = useCallback(() => {
    setIsActive(false);
    setMode('off');
    setTimeLeft(0);
  }, []);

  const sendNotification = useCallback((title: string, body: string) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, { body, icon: "/favicon.ico" });
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      const nextMode = mode === 'work' ? 'Personal' : 'Work';
      sendNotification(
        `${mode.toUpperCase()} Mode Complete`, 
        `Time to transition to ${nextMode} mode. Keep your vitality streak alive!`
      );
      setMode('off');
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, sendNotification]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = totalDuration > 0 ? ((totalDuration - timeLeft) / totalDuration) * 100 : 0;

  return (
    <StreakTimerContext.Provider value={{ timeLeft, mode, isActive, progress, startTimer, stopTimer, formatTime }}>
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
