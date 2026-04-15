import { motion } from "motion/react";
import { useAuth } from "../lib/AuthContext";
import { LogOut, User as UserIcon } from "lucide-react";

export default function Navbar() {
  const { user, signInWithGoogle, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-50/80 backdrop-blur-md border-b border-brand-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-serif font-bold tracking-tight text-brand-500"
        >
          vitality<span className="text-brand-300">.</span>
        </motion.div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-brand-500">
          <a href="#" className="hover:text-brand-950 transition-colors">Method</a>
          <a href="#" className="hover:text-brand-950 transition-colors">Retreats</a>
          <a href="#" className="hover:text-brand-950 transition-colors">Journal</a>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-brand-100 px-4 py-2 rounded-full border border-brand-200">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="User" className="w-6 h-6 rounded-full" referrerPolicy="no-referrer" />
                ) : (
                  <UserIcon className="w-4 h-4 text-brand-500" />
                )}
                <span className="text-xs font-bold text-brand-950 truncate max-w-[100px]">
                  {user.displayName || user.email}
                </span>
              </div>
              <button 
                onClick={logout}
                className="p-2.5 rounded-full border border-brand-200 text-brand-500 hover:bg-brand-100 transition-all"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={signInWithGoogle}
              className="bg-brand-500 text-brand-50 px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-brand-600 transition-all"
            >
              Join
            </motion.button>
          )}
        </div>
      </div>
    </nav>
  );
}

