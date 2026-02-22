import {
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
} from "lucide-react";
import { Card } from "../components/Card";

const tools = [
  { to: "/calculator", icon: Calculator, title: "Calculator", desc: "Basic & scientific math with history" },
  { to: "/snake", icon: Gamepad2, title: "Snake Game", desc: "Classic retro snake with speed levels" },
  { to: "/stopwatch", icon: Timer, title: "Timer & Stopwatch", desc: "Count up or down, lap tracking" },
  { to: "/notes", icon: StickyNote, title: "Notes", desc: "Quick notes with local persistence" },
  { to: "/unit-converter", icon: ArrowRightLeft, title: "Unit Converter", desc: "Length, weight, temp, currency & more" },
  { to: "/qr-generator", icon: QrCode, title: "QR Generator", desc: "Create & download custom QR codes" },
  { to: "/password-generator", icon: KeyRound, title: "Password Gen", desc: "Secure passwords with strength meter" },
  { to: "/random-gen", icon: Shuffle, title: "Random Tools", desc: "Numbers, colors, coin flip & dice" },
  { to: "/todo-list", icon: ListTodo, title: "Todo List", desc: "Task management with persistence" },
  { to: "/bonus-tools", icon: Sparkles, title: "Bonus Tools", desc: "BMI, age & tip calculators" },
];

export const Dashboard = () => (
  <div className="space-y-10">
    {/* Hero */}
    <section className="space-y-3 pt-2">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
        10+ Free Tools
      </p>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
        All-in-one Daily<br />
        <span className="text-muted-foreground font-normal">Utility Toolbox</span>
      </h1>
      <p className="text-muted-foreground text-sm max-w-lg leading-relaxed">
        Fast, modern, no-login-required utilities for everyday tasks.
        Calculator, snake, timer, notes, converters, QR, passwords & more — everything runs offline.
      </p>
    </section>

    {/* Tool Grid */}
    <section className="stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map((tool) => (
        <Card key={tool.to} {...tool} />
      ))}
    </section>
  </div>
);