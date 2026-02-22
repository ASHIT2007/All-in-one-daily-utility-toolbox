import React, { useState } from "react";
import { Shuffle, Hash, Coins, Dices, Palette } from "lucide-react";
import { ToolPage } from "../components/ToolPage";

export const RandomGen = () => {
    const [tab, setTab] = useState<"number" | "coin" | "dice" | "color">("number");
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(100);
    const [res, setRes] = useState<any>(null);

    const go = () => {
        switch (tab) {
            case "number": setRes(Math.floor(Math.random() * (max - min + 1)) + min); break;
            case "coin": setRes(Math.random() > 0.5 ? "Heads" : "Tails"); break;
            case "dice": setRes(Math.floor(Math.random() * 6) + 1); break;
            case "color": setRes("#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")); break;
        }
    };

    const tabs = [
        { id: "number" as const, icon: Hash, label: "Number" },
        { id: "coin" as const, icon: Coins, label: "Coin" },
        { id: "dice" as const, icon: Dices, label: "Dice" },
        { id: "color" as const, icon: Palette, label: "Color" },
    ];

    return (
        <ToolPage icon={Shuffle} title="Random Tools" description="Numbers, colors, coin flip & dice" maxWidth="max-w-md">
            <div className="space-y-5">
                {/* Tabs */}
                <div className="flex gap-1 p-1 rounded-xl bg-secondary border border-border">
                    {tabs.map((t) => (
                        <button key={t.id} onClick={() => { setTab(t.id); setRes(null); }} className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-medium transition-colors ${tab === t.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                            <t.icon size={15} />{t.label}
                        </button>
                    ))}
                </div>

                {/* Result */}
                <div className="rounded-xl bg-card border border-border p-10 flex flex-col items-center justify-center min-h-[180px]">
                    {res === null ? (
                        <p className="text-muted-foreground text-sm">Click generate...</p>
                    ) : (
                        <div className="animate-scale-in flex flex-col items-center gap-4">
                            {tab === "color" && <div className="w-20 h-20 rounded-2xl border border-border shadow-soft" style={{ backgroundColor: res }} />}
                            <div className={`font-bold text-foreground ${tab === "color" ? "text-xl font-mono" : "text-5xl"}`}>
                                {tab === "dice" ? ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"][res - 1] : res}
                            </div>
                        </div>
                    )}
                </div>

                {/* Number range */}
                {tab === "number" && (
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-muted-foreground">Min</label>
                            <input type="number" className="w-full rounded-lg bg-card border border-border px-3 py-2.5 font-mono text-foreground" value={min} onChange={(e) => setMin(+e.target.value)} />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-muted-foreground">Max</label>
                            <input type="number" className="w-full rounded-lg bg-card border border-border px-3 py-2.5 font-mono text-foreground" value={max} onChange={(e) => setMax(+e.target.value)} />
                        </div>
                    </div>
                )}

                <button onClick={go} className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors active:scale-[0.98]">
                    Generate
                </button>
            </div>
        </ToolPage>
    );
};
