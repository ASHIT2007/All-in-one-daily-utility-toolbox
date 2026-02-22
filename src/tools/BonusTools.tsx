import React, { useState } from "react";
import { Sparkles, Activity, Calendar, DollarSign } from "lucide-react";
import { ToolPage } from "../components/ToolPage";

export const BonusTools = () => {
    const [tab, setTab] = useState<"bmi" | "age" | "tip">("bmi");
    const [weight, setWeight] = useState(70);
    const [height, setHeight] = useState(170);
    const [birth, setBirth] = useState("2000-01-01");
    const [bill, setBill] = useState(100);
    const [tipPct, setTipPct] = useState(15);
    const [split, setSplit] = useState(1);

    const bmi = () => {
        const h = height / 100;
        const v = +(weight / (h * h)).toFixed(1);
        let cat = "Normal", color = "text-success";
        if (v < 18.5) { cat = "Underweight"; color = "text-blue-400"; }
        else if (v >= 25 && v < 30) { cat = "Overweight"; color = "text-warning"; }
        else if (v >= 30) { cat = "Obese"; color = "text-destructive"; }
        return { v, cat, color };
    };

    const age = () => {
        const b = new Date(birth);
        if (isNaN(b.getTime())) return "—";
        const t = new Date();
        let a = t.getFullYear() - b.getFullYear();
        if (t.getMonth() < b.getMonth() || (t.getMonth() === b.getMonth() && t.getDate() < b.getDate())) a--;
        return a;
    };

    const tip = () => {
        const t = (bill * tipPct) / 100;
        return { tip: t.toFixed(2), total: (bill + t).toFixed(2), pp: ((bill + t) / split).toFixed(2) };
    };

    const tabs = [
        { id: "bmi" as const, icon: Activity, label: "BMI" },
        { id: "age" as const, icon: Calendar, label: "Age" },
        { id: "tip" as const, icon: DollarSign, label: "Tip" },
    ];

    const tabCls = (active: boolean) => `flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`;

    return (
        <ToolPage icon={Sparkles} title="Bonus Tools" description="BMI, age & tip calculators" maxWidth="max-w-md">
            <div className="space-y-5">
                {/* Tabs */}
                <div className="flex gap-1 p-1 rounded-xl bg-secondary border border-border">
                    {tabs.map((t) => (
                        <button key={t.id} onClick={() => setTab(t.id)} className={tabCls(tab === t.id)}><t.icon size={16} />{t.label}</button>
                    ))}
                </div>

                <div className="rounded-xl bg-card border border-border p-6 min-h-[280px]">
                    {tab === "bmi" && (
                        <div className="space-y-6">
                            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest text-center">BMI Calculator</p>
                            <div className="space-y-4">
                                <div className="space-y-2"><div className="flex justify-between text-xs"><span className="text-muted-foreground">Weight</span><span className="font-mono font-semibold text-foreground">{weight} kg</span></div><input type="range" min="30" max="200" value={weight} onChange={(e) => setWeight(+e.target.value)} className="w-full accent-[hsl(239,84%,67%)]" /></div>
                                <div className="space-y-2"><div className="flex justify-between text-xs"><span className="text-muted-foreground">Height</span><span className="font-mono font-semibold text-foreground">{height} cm</span></div><input type="range" min="100" max="250" value={height} onChange={(e) => setHeight(+e.target.value)} className="w-full accent-[hsl(239,84%,67%)]" /></div>
                            </div>
                            <div className="text-center pt-4 animate-scale-in"><div className="text-5xl font-bold font-mono text-foreground">{bmi().v}</div><div className={`${bmi().color} font-semibold mt-1 text-sm`}>{bmi().cat}</div></div>
                        </div>
                    )}

                    {tab === "age" && (
                        <div className="space-y-6 flex flex-col items-center">
                            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Age Calculator</p>
                            <input type="date" className="w-full rounded-lg bg-background border border-border p-3 text-foreground" value={birth} onChange={(e) => setBirth(e.target.value)} />
                            <div className="text-center pt-6 animate-scale-in"><div className="text-7xl font-bold font-mono text-foreground">{age()}</div><div className="text-muted-foreground mt-2 text-sm font-medium">years old</div></div>
                        </div>
                    )}

                    {tab === "tip" && (
                        <div className="space-y-4">
                            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest text-center">Tip Calculator</p>
                            <div className="space-y-3">
                                <div className="space-y-1.5"><label className="text-xs text-muted-foreground">Bill ($)</label><input type="number" className="w-full rounded-lg bg-background border border-border p-2.5 font-mono text-foreground" value={bill} onChange={(e) => setBill(+e.target.value || 0)} /></div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5"><label className="text-xs text-muted-foreground">Tip %</label><input type="number" className="w-full rounded-lg bg-background border border-border p-2.5 font-mono text-foreground" value={tipPct} onChange={(e) => setTipPct(+e.target.value || 0)} /></div>
                                    <div className="space-y-1.5"><label className="text-xs text-muted-foreground">Split</label><input type="number" min="1" className="w-full rounded-lg bg-background border border-border p-2.5 font-mono text-foreground" value={split} onChange={(e) => setSplit(+e.target.value || 1)} /></div>
                                </div>
                            </div>
                            <div className="rounded-lg bg-muted/30 p-4 space-y-2 mt-2">
                                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Tip</span><span className="text-success font-mono font-semibold">${tip().tip}</span></div>
                                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Total</span><span className="text-foreground font-mono font-semibold">${tip().total}</span></div>
                                <div className="flex justify-between text-base font-bold border-t border-border pt-2"><span className="text-foreground">Per Person</span><span className="text-primary font-mono">${tip().pp}</span></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ToolPage>
    );
};
