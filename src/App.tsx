/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Onboarding from "./components/Onboarding";
import Dashboard from "./components/Dashboard";
import { AuthProvider, useAuth } from "./lib/AuthContext";

function AppContent() {
  const { user, profile, loading, signInWithGoogle } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {user && !profile?.onboardingComplete && <Onboarding />}
      
      {user && profile?.onboardingComplete ? (
        <Dashboard />
      ) : (
        <>
          <Navbar />
          <main>
            <Hero />
            <Features />
            <section className="py-32 bg-brand-50">
              <div className="max-w-7xl mx-auto px-6">
                <div className="bg-brand-500 rounded-[3rem] p-12 md:p-24 text-center text-brand-50 relative overflow-hidden">
                  <div className="relative z-10">
                    <h2 className="text-4xl md:text-6xl font-serif mb-8 font-normal">
                      Nourish your <br />
                      <span className="serif-italic text-brand-300">inner nature.</span>
                    </h2>
                    <p className="text-xl text-brand-100/80 mb-12 max-w-2xl mx-auto">
                      Join a community of high-performers dedicated to living their best, longest life.
                    </p>
                    {!user && (
                      <button 
                        onClick={signInWithGoogle}
                        className="bg-brand-50 text-brand-500 px-10 py-5 rounded-full text-xl font-bold hover:bg-brand-100 transition-all uppercase tracking-widest"
                      >
                        Join the Waitlist
                      </button>
                    )}
                  </div>
                  <div className="absolute top-0 right-0 w-96 h-96 bg-brand-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}


