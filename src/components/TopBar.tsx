import { Moon, Sun, Sparkles } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface TopBarProps {
  theme: "dark" | "light";
  setTheme: (t: "dark" | "light") => void;
}

export const TopBar: React.FC<TopBarProps> = ({ theme, setTheme }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-3 border-b border-toolkit-border"
      style={{
        background: 'rgba(15, 15, 19, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <Link to="/" className="flex items-center gap-3 group">
        <div className="relative">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow transition-shadow duration-300">
            <Sparkles size={20} className="text-white" />
          </div>
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-tight gradient-text">Daily Toolkit</h1>
          <p className="text-[10px] text-zinc-500 font-medium tracking-widest uppercase">All-in-one utilities</p>
        </div>
      </Link>
      <button
        className="relative w-10 h-10 rounded-xl bg-zinc-800/60 hover:bg-zinc-700/60 border border-toolkit-border flex items-center justify-center transition-all duration-300 hover:border-toolkit-primary/40 hover:shadow-glow-sm"
        aria-label="Toggle Theme"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <div className="transition-transform duration-500" style={{ transform: theme === 'dark' ? 'rotate(0deg)' : 'rotate(180deg)' }}>
          {theme === "dark" ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-violet-400" />}
        </div>
      </button>
    </header>
  );
};