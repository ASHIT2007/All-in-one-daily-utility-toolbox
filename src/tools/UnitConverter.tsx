import React, { useState } from "react";
import { ArrowRightLeft } from "lucide-react";
import { ToolPage } from "../components/ToolPage";

type Cat = "length" | "weight" | "temperature" | "currency" | "data";
const convs: Record<Cat, { units: string[]; rates: number[]; formula?: (v: number, f: number, t: number) => number }> = {
  length: { units: ["Meter", "Kilometer", "Centimeter", "Foot", "Inch", "Yard", "Mile"], rates: [1, 0.001, 100, 3.28084, 39.3701, 1.09361, 0.000621371] },
  weight: { units: ["Kilogram", "Gram", "Pound", "Ounce", "Ton"], rates: [1, 1000, 2.20462, 35.274, 0.001] },
  temperature: { units: ["Celsius °C", "Fahrenheit °F", "Kelvin K"], rates: [1, 1, 1], formula: (v, f, t) => { let c = f === 1 ? (v - 32) * 5 / 9 : f === 2 ? v - 273.15 : v; return t === 0 ? c : t === 1 ? c * 1.8 + 32 : c + 273.15; } },
  currency: { units: ["USD $", "EUR €", "INR ₹", "GBP £", "JPY ¥"], rates: [1, 0.92, 83.12, 0.79, 149.5] },
  data: { units: ["Byte", "KB", "MB", "GB", "TB"], rates: [1, 1 / 1024, 1 / 1024 ** 2, 1 / 1024 ** 3, 1 / 1024 ** 4] },
};

export const UnitConverter = () => {
  const [cat, setCat] = useState<Cat>("length");
  const [val, setVal] = useState("1");
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(1);
  const d = convs[cat];

  const result = () => {
    const n = parseFloat(val); if (isNaN(n)) return "0";
    if (d.formula) return d.formula(n, from, to).toFixed(6).replace(/\.?0+$/, "");
    return ((n * d.rates[from]) / d.rates[to]).toFixed(6).replace(/\.?0+$/, "");
  };

  return (
    <ToolPage icon={ArrowRightLeft} title="Unit Converter" description="Length, weight, temp, currency & data" maxWidth="max-w-md">
      <div className="space-y-5">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2">
          {(Object.keys(convs) as Cat[]).map((c) => (
            <button key={c} onClick={() => { setCat(c); setFrom(0); setTo(1); }} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${cat === c ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>{c}</button>
          ))}
        </div>

        {/* From */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">From</label>
          <div className="flex gap-2">
            <input type="number" className="flex-1 rounded-lg bg-card border border-border px-3 py-2.5 font-mono text-foreground" value={val} onChange={(e) => setVal(e.target.value)} />
            <select className="w-1/3 rounded-lg bg-card border border-border px-2 py-2.5 text-sm text-foreground" value={from} onChange={(e) => setFrom(+e.target.value)}>
              {d.units.map((u, i) => <option key={i} value={i}>{u}</option>)}
            </select>
          </div>
        </div>

        {/* Swap */}
        <div className="flex justify-center">
          <button onClick={() => { setFrom(to); setTo(from); }} className="p-2 rounded-full bg-secondary hover:bg-secondary/80 text-primary transition-colors active:scale-90"><ArrowRightLeft size={16} /></button>
        </div>

        {/* To */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">To</label>
          <div className="flex gap-2">
            <div className="flex-1 rounded-lg bg-card border border-primary/20 px-3 py-2.5 font-mono font-semibold text-primary text-lg">{result()}</div>
            <select className="w-1/3 rounded-lg bg-card border border-border px-2 py-2.5 text-sm text-foreground" value={to} onChange={(e) => setTo(+e.target.value)}>
              {d.units.map((u, i) => <option key={i} value={i}>{u}</option>)}
            </select>
          </div>
        </div>
      </div>
    </ToolPage>
  );
};