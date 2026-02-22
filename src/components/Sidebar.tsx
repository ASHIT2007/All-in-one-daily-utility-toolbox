import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Calculator,
    Gamepad2,
    Timer,
    StickyNote,
    ArrowRightLeft,
    QrCode,
    KeyRound,
    Shuffle,
    ListTodo,
    Sparkles,
    Sun,
    Moon,
    Github,
    Heart,
    Menu,
    X,
    ChevronRight,
} from "lucide-react";

interface SidebarProps {
    theme: "dark" | "light";
    setTheme: (t: "dark" | "light") => void;
}

const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/calculator", icon: Calculator, label: "Calculator" },
    { to: "/snake", icon: Gamepad2, label: "Snake Game" },
    { to: "/stopwatch", icon: Timer, label: "Timer" },
    { to: "/notes", icon: StickyNote, label: "Notes" },
    { to: "/unit-converter", icon: ArrowRightLeft, label: "Converter" },
    { to: "/qr-generator", icon: QrCode, label: "QR Code" },
    { to: "/password-generator", icon: KeyRound, label: "Passwords" },
    { to: "/random-gen", icon: Shuffle, label: "Random" },
    { to: "/todo-list", icon: ListTodo, label: "Todo List" },
    { to: "/bonus-tools", icon: Sparkles, label: "Bonus Tools" },
];

export const Sidebar: React.FC<SidebarProps> = ({ theme, setTheme }) => {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    // close mobile drawer on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    // lock body scroll when mobile drawer is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    const sidebarContent = (
        <div className="flex flex-col h-full">
            {/* ── Logo ── */}
            <div className="px-5 pt-6 pb-4">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow">
                        <Sparkles size={18} className="text-primary-foreground" />
                    </div>
                    <div>
                        <span className="font-bold text-base text-foreground tracking-tight">Daily Toolkit</span>
                        <p className="text-[10px] text-muted-foreground font-medium">All-in-one utilities</p>
                    </div>
                </Link>
            </div>

            {/* ── Nav Links ── */}
            <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5" aria-label="Main navigation">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.to;
                    return (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`
                group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                ${isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                }
              `}
                            aria-current={isActive ? "page" : undefined}
                        >
                            <item.icon size={18} strokeWidth={isActive ? 2.2 : 1.8} className="flex-shrink-0" />
                            <span className="truncate">{item.label}</span>
                            {isActive && (
                                <ChevronRight size={14} className="ml-auto opacity-50" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* ── Footer ── */}
            <div className="px-3 pb-5 space-y-3 mt-auto border-t border-sidebar-border pt-4">
                {/* Theme toggle */}
                <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-all"
                    aria-label="Toggle theme"
                >
                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                </button>

                {/* Credit */}
                <div className="px-3 pt-2 space-y-2">
                    <a
                        href="https://github.com/ASHIT2007/All-in-one-daily-utility-toolbox"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Github size={14} />
                        <span>GitHub</span>
                    </a>
                    <p className="flex items-center gap-1 text-[11px] text-muted-foreground/60">
                        Made with <Heart size={10} className="text-red-400" /> by ASHIT2007
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* ── Desktop Sidebar ── */}
            <aside className="hidden md:flex flex-col w-60 fixed left-0 top-0 bottom-0 bg-sidebar border-r border-sidebar-border z-40">
                {sidebarContent}
            </aside>

            {/* ── Mobile Header ── */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4 bg-background/80 backdrop-blur-xl border-b border-border">
                <button
                    onClick={() => setMobileOpen(true)}
                    className="p-2 -ml-2 rounded-lg hover:bg-accent transition-colors"
                    aria-label="Open navigation"
                >
                    <Menu size={20} />
                </button>
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                        <Sparkles size={14} className="text-primary-foreground" />
                    </div>
                    <span className="font-bold text-sm">Daily Toolkit</span>
                </Link>
                <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-2 -mr-2 rounded-lg hover:bg-accent transition-colors"
                    aria-label="Toggle theme"
                >
                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
            </header>

            {/* ── Mobile Overlay + Drawer ── */}
            {mobileOpen && (
                <>
                    <div
                        className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                        onClick={() => setMobileOpen(false)}
                        aria-hidden="true"
                    />
                    <aside className="md:hidden fixed left-0 top-0 bottom-0 w-72 z-50 bg-sidebar border-r border-sidebar-border animate-slide-in-left shadow-2xl">
                        <div className="absolute top-4 right-4">
                            <button
                                onClick={() => setMobileOpen(false)}
                                className="p-2 rounded-lg hover:bg-accent transition-colors"
                                aria-label="Close navigation"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        {sidebarContent}
                    </aside>
                </>
            )}
        </>
    );
};
