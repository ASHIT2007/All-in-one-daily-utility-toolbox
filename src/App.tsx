import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Calculator } from "./tools/Calculator";
import { SnakeGame } from "./tools/SnakeGame";
import { StopwatchTimer } from "./tools/StopwatchTimer";
import { Notes } from "./tools/Notes";
import { UnitConverter } from "./tools/UnitConverter";
import { QRCodeGen } from "./tools/QRCodeGen";
import { PasswordGen } from "./tools/PasswordGen";
import { RandomGen } from "./tools/RandomGen";
import { TodoList } from "./tools/TodoList";
import { BonusTools } from "./tools/BonusTools";
import { Sidebar } from "./components/Sidebar";

const THEME_KEY = "toolkit-theme";

function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <div key={location.pathname} className="animate-fade-in">
      {children}
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        <Sidebar theme={theme} setTheme={setTheme} />

        {/* Main content area — offset by sidebar on desktop */}
        <main className="md:ml-60 min-h-screen">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-8 pb-10">
            <PageTransition>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/snake" element={<SnakeGame />} />
                <Route path="/stopwatch" element={<StopwatchTimer />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/unit-converter" element={<UnitConverter />} />
                <Route path="/qr-generator" element={<QRCodeGen />} />
                <Route path="/password-generator" element={<PasswordGen />} />
                <Route path="/random-gen" element={<RandomGen />} />
                <Route path="/todo-list" element={<TodoList />} />
                <Route path="/bonus-tools" element={<BonusTools />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </PageTransition>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}