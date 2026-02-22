import React, { useState } from "react";
import { Calculator as CalcIcon } from "lucide-react";
import { ToolPage } from "../components/ToolPage";

export const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<{ expr: string; res: string }[]>([]);
  const [scientific, setScientific] = useState(false);

  const handleCalc = () => {
    try {
      const sanitized = input
        .replace(/×/g, "*").replace(/÷/g, "/")
        .replace(/√/g, "Math.sqrt").replace(/π/g, "Math.PI")
        .replace(/e(?![a-z])/g, "Math.E")
        .replace(/sin/g, "Math.sin").replace(/cos/g, "Math.cos").replace(/tan/g, "Math.tan")
        .replace(/\^/g, "**");
      const res = new Function("return " + sanitized)();
      const s = typeof res === "number" ? res.toFixed(8).replace(/\.?0+$/, "") : String(res);
      setResult(s);
      setHistory((h) => [...h, { expr: input, res: s }].slice(-20));
    } catch { setResult("Error"); }
  };

  const handlePress = (v: string) => {
    if (v === "=") handleCalc();
    else if (v === "C") { setInput(""); setResult(null); }
    else if (v === "⌫") setInput((p) => p.slice(0, -1));
    else setInput((p) => p + v);
  };

  const basic = [
    ["C", "⌫", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "=", ""],
  ];
  const sci = [
    ["sin", "cos", "tan", "π"],
    ["√", "^", "(", ")"],
  ];

  const btnStyle = (v: string) => {
    if (v === "=") return "bg-primary text-primary-foreground hover:bg-primary/90 col-span-1 font-bold";
    if (v === "C") return "bg-destructive/10 text-destructive hover:bg-destructive/20";
    if (["÷", "×", "-", "+", "%", "⌫"].includes(v)) return "bg-secondary text-primary hover:bg-secondary/80";
    if (v === "") return "pointer-events-none opacity-0";
    return "bg-secondary hover:bg-secondary/80 text-secondary-foreground";
  };

  return (
    <ToolPage icon={CalcIcon} title="Calculator" description="Basic & scientific calculations" maxWidth="max-w-sm">
      <div className="space-y-4">
        {/* Toggle */}
        <div className="flex justify-end">
          <button
            onClick={() => setScientific((s) => !s)}
            className="text-xs font-medium px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            {scientific ? "Basic" : "Scientific"}
          </button>
        </div>

        {/* Display */}
        <div className="rounded-xl bg-card border border-border p-5 space-y-1">
          <input
            className="w-full bg-transparent text-right text-lg font-mono text-muted-foreground focus:outline-none placeholder:text-muted-foreground/40"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCalc()}
            placeholder="0"
          />
          {result !== null && (
            <div className="text-right text-3xl font-bold text-foreground font-mono animate-scale-in">{result}</div>
          )}
        </div>

        {/* Scientific row */}
        {scientific && (
          <div className="space-y-2">
            {sci.map((row, i) => (
              <div key={i} className="grid grid-cols-4 gap-2">
                {row.map((b) => (
                  <button key={b} onClick={() => handlePress(b)} className="py-2.5 rounded-lg text-sm font-medium bg-secondary/60 hover:bg-secondary text-secondary-foreground transition-colors">
                    {b}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Main buttons */}
        <div className="space-y-2">
          {basic.map((row, i) => (
            <div key={i} className="grid grid-cols-4 gap-2">
              {row.map((b, j) => (
                <button
                  key={`${i}-${j}`}
                  onClick={() => b && handlePress(b)}
                  className={`py-3.5 rounded-lg text-sm font-semibold transition-all active:scale-95 ${btnStyle(b)}`}
                >
                  {b}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* History */}
        {history.length > 0 && (
          <details className="group">
            <summary className="text-xs font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
              History ({history.length})
            </summary>
            <div className="mt-2 rounded-lg bg-card border border-border p-3 max-h-40 overflow-y-auto space-y-1">
              {history.map((h, i) => (
                <div key={i} className="flex justify-between text-xs text-muted-foreground py-1 border-b border-border/50 last:border-0">
                  <span className="font-mono">{h.expr}</span>
                  <span className="font-semibold text-foreground font-mono">= {h.res}</span>
                </div>
              ))}
            </div>
          </details>
        )}
      </div>
    </ToolPage>
  );
};