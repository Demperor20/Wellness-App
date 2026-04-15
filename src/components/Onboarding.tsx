import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../lib/AuthContext";
import { Zap, Shield, Heart, ArrowRight, Check, Target } from "lucide-react";

const steps = [
  {
    id: "welcome",
    title: "Welcome to Vitality",
    description: "Your journey to peak human potential begins here. Let's personalize your experience.",
    icon: Zap,
  },
  {
    id: "goal",
    title: "Choose Your Focus",
    description: "What is your primary vitality objective?",
    icon: Target,
    options: [
      { id: "longevity", label: "Longevity", desc: "Extend your healthspan and cellular health.", icon: Shield },
      { id: "performance", label: "Performance", desc: "Optimize energy, focus, and physical output.", icon: Zap },
      { id: "balance", label: "Balance", desc: "Integrate mental clarity and holistic wellness.", icon: Heart },
    ],
  },
  {
    id: "ready",
    title: "Ready to Begin",
    description: "We've curated your initial protocols based on your focus. Your sanctuary is ready.",
    icon: Check,
  }
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const { completeOnboarding } = useAuth();

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      if (selectedGoal) {
        await completeOnboarding(selectedGoal);
      }
    }
  };

  const step = steps[currentStep];
  const StepIcon = step.icon;

  return (
    <div className="fixed inset-0 z-[100] bg-brand-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-[3rem] p-12 shadow-xl border border-brand-200 text-center"
          >
            {StepIcon && (
              <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-8 text-brand-500">
                <StepIcon className="w-8 h-8" />
              </div>
            )}
            
            <h2 className="text-4xl font-serif mb-4 text-brand-500">{step.title}</h2>
            <p className="text-brand-950/60 mb-12 text-lg leading-relaxed">{step.description}</p>

            {step.options && (
              <div className="grid gap-4 mb-12">
                {step.options.map((option) => {
                  const OptionIcon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setSelectedGoal(option.id)}
                      className={`flex items-center gap-6 p-6 rounded-2xl border-2 transition-all text-left group ${
                        selectedGoal === option.id 
                          ? "border-brand-500 bg-brand-50" 
                          : "border-brand-100 hover:border-brand-200"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        selectedGoal === option.id ? "bg-brand-500 text-brand-50" : "bg-brand-100 text-brand-500 group-hover:bg-brand-200"
                      }`}>
                        <OptionIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-bold text-brand-950">{option.label}</div>
                        <div className="text-sm text-brand-950/50">{option.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            <button
              onClick={handleNext}
              disabled={step.id === "goal" && !selectedGoal}
              className="w-full bg-brand-500 text-brand-50 py-5 rounded-full text-xl font-bold hover:bg-brand-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {currentStep === steps.length - 1 ? "Enter Sanctuary" : "Continue"}
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-2 mt-8">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all ${
                i === currentStep ? "w-8 bg-brand-500" : "w-2 bg-brand-200"
              }`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
