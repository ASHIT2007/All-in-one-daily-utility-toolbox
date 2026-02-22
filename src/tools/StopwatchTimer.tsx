import React, { useEffect, useRef, useState } from "react";
import { Timer as TimerIcon, Clock, Pause, Play, RotateCcw } from "lucide-react";
import { ToolPage } from "../components/ToolPage";

export const StopwatchTimer = () => {
  const [mode, setMode] = useState<"sw" | "tm">("sw");
  const [swTime, setSwTime] = useState(0);
  const [swRun, setSwRun] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const swRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const [tmInput, setTmInput] = useState("01:00");
  const [tmSec, setTmSec] = useState(60);
  const [tmRun, setTmRun] = useState(false);
  const tmRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (swRun) swRef.current = setInterval(() => setSwTime((t) => t + 1), 10);
    else clearInterval(swRef.current);
    return () => clearInterval(swRef.current);
  }, [swRun]);

  useEffect(() => {
    if (tmRun && tmSec > 0) tmRef.current = setTimeout(() => setTmSec((s) => s - 1), 1000);
    else if (tmSec === 0 && tmRun) { setTmRun(false); alert("⏰ Timer finished!"); }
    return () => clearTimeout(tmRef.current);
  }, [tmSec, tmRun]);

  const fmt = (ms: number) => {
    const t = Math.floor(ms / 1000); const m = Math.floor(t / 60); const s = t % 60; const cs = Math.floor((ms % 1000) / 10);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(cs).padStart(2, "0")}`;
  };
  const tmFmt = () => { const m = Math.floor(tmSec / 60); const s = tmSec % 60; return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`; };

  const tabCls = (active: boolean) =>
    `flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`;

  return (
    <ToolPage icon={TimerIcon} title="Timer & Stopwatch" maxWidth="max-w-md">
      <div className="space-y-5">
        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl bg-secondary border border-border">
          <button className={tabCls(mode === "sw")} onClick={() => setMode("sw")}><Clock size={16} />Stopwatch</button>
          <button className={tabCls(mode === "tm")} onClick={() => setMode("tm")}><TimerIcon size={16} />Timer</button>
        </div>

        {mode === "sw" ? (
          <div className="space-y-5">
            <div className="rounded-xl bg-card border border-border p-8 text-center">
              <div className="text-5xl font-mono font-bold text-foreground tracking-tight">{fmt(swTime)}</div>
            </div>
            <div className="flex gap-2">
              {!swRun ? (
                <button className="flex-1 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2" onClick={() => setSwRun(true)}><Play size={16} />Start</button>
              ) : (
                <button className="flex-1 py-3 rounded-lg bg-warning/15 text-warning font-semibold text-sm hover:bg-warning/25 transition-colors inline-flex items-center justify-center gap-2" onClick={() => setSwRun(false)}><Pause size={16} />Pause</button>
              )}
              <button className="flex-1 py-3 rounded-lg bg-secondary text-secondary-foreground font-semibold text-sm hover:bg-secondary/80 transition-colors inline-flex items-center justify-center gap-2" onClick={() => { setSwTime(0); setSwRun(false); setLaps([]); }}><RotateCcw size={16} />Reset</button>
            </div>
            {swRun && <button className="w-full py-2.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors" onClick={() => setLaps([...laps, swTime])}>+ Lap</button>}
            {laps.length > 0 && (
              <div className="rounded-lg bg-card border border-border p-3 max-h-40 overflow-y-auto">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Laps</p>
                {laps.map((l, i) => (
                  <div key={i} className="flex justify-between text-sm text-muted-foreground py-1.5 border-b border-border/50 last:border-0">
                    <span>Lap {i + 1}</span><span className="font-mono text-foreground">{fmt(l)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-5">
            <div className="rounded-xl bg-card border border-border p-8 text-center">
              <div className={`text-5xl font-mono font-bold tracking-tight ${tmSec <= 5 && tmRun ? "text-destructive" : "text-foreground"}`}>{tmFmt()}</div>
            </div>
            <input type="text" className="w-full rounded-lg bg-card border border-border px-4 py-3 text-center font-mono text-foreground" value={tmInput} onChange={(e) => { setTmInput(e.target.value); const p = e.target.value.split(":").map(Number); setTmSec(Math.max(1, (p[0] || 0) * 60 + (p[1] || 0))); }} placeholder="mm:ss" disabled={tmRun} />
            <div className="flex gap-2">
              {!tmRun ? (
                <button className="flex-1 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2" onClick={() => setTmRun(true)}><Play size={16} />Start</button>
              ) : (
                <button className="flex-1 py-3 rounded-lg bg-warning/15 text-warning font-semibold text-sm hover:bg-warning/25 transition-colors inline-flex items-center justify-center gap-2" onClick={() => setTmRun(false)}><Pause size={16} />Pause</button>
              )}
              <button className="flex-1 py-3 rounded-lg bg-secondary text-secondary-foreground font-semibold text-sm hover:bg-secondary/80 transition-colors inline-flex items-center justify-center gap-2" onClick={() => { setTmSec(60); setTmRun(false); setTmInput("01:00"); }}><RotateCcw size={16} />Reset</button>
            </div>
          </div>
        )}
      </div>
    </ToolPage>
  );
};