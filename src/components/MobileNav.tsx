import { Link, useLocation } from "react-router-dom";
import {
  Calculator as CalculatorIcon,
  StickyNote,
  Timer,
  ListTodo,
  Gamepad,
  QrCode,
  RefreshCw,
  Key,
  BarChart,
  Home,
} from "lucide-react";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/calculator", icon: CalculatorIcon, label: "Calc" },
  { to: "/snake", icon: Gamepad, label: "Snake" },
  { to: "/stopwatch", icon: Timer, label: "Timer" },
  { to: "/notes", icon: StickyNote, label: "Notes" },
  { to: "/unit-converter", icon: BarChart, label: "Convert" },
  { to: "/qr-generator", icon: QrCode, label: "QR" },
  { to: "/password-generator", icon: Key, label: "Pass" },
  { to: "/random-gen", icon: RefreshCw, label: "Random" },
  { to: "/todo-list", icon: ListTodo, label: "Todo" },
];

export const MobileNav = () => {
  const loc = useLocation();
  return (
    <nav
      className="fixed bottom-0 left-0 w-full z-40 md:hidden border-t border-toolkit-border"
      style={{
        background: 'rgba(15, 15, 19, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <ul className="flex w-full justify-between overflow-x-auto px-1 py-1">
        {navItems.map((item) => {
          const isActive = loc.pathname === item.to;
          return (
            <li key={item.to} className="flex-shrink-0">
              <Link
                to={item.to}
                className={`relative flex flex-col items-center gap-0.5 px-3 py-2 transition-all duration-300 rounded-lg mx-0.5 ${isActive
                    ? "text-toolkit-primary"
                    : "text-zinc-500 hover:text-zinc-300"
                  }`}
                title={item.label}
              >
                <div className={`relative transition-transform duration-300 ${isActive ? 'scale-110 -translate-y-0.5' : ''}`}>
                  <item.icon size={20} />
                </div>
                <span className={`text-[10px] font-medium whitespace-nowrap transition-all duration-300 ${isActive ? 'text-toolkit-primary' : ''}`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-toolkit-primary shadow-glow-sm" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};