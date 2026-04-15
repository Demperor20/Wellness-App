import { motion } from "motion/react";

export default function Footer() {
  return (
    <footer className="bg-brand-500 text-brand-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="text-3xl font-serif font-bold mb-6">vitality.</div>
            <p className="text-brand-100/60 max-w-sm leading-relaxed">
              Redefining the boundaries of human health through science, 
              technology, and intentional living.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-[10px] text-brand-300">Platform</h4>
            <ul className="space-y-4 text-brand-100/80 text-sm uppercase tracking-wider">
              <li><a href="#" className="hover:text-brand-50 transition-colors">Method</a></li>
              <li><a href="#" className="hover:text-brand-50 transition-colors">Retreats</a></li>
              <li><a href="#" className="hover:text-brand-50 transition-colors">Journal</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-[10px] text-brand-300">Legal</h4>
            <ul className="space-y-4 text-brand-100/80 text-sm uppercase tracking-wider">
              <li><a href="#" className="hover:text-brand-50 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-brand-50 transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-brand-50 transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-brand-400/30 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-100/40 uppercase tracking-widest">
          <p>© 2024 Vitality. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-brand-50 transition-colors">Twitter</a>
            <a href="#" className="hover:text-brand-50 transition-colors">Instagram</a>
            <a href="#" className="hover:text-brand-50 transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
