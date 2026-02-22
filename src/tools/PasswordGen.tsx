import React, { useState, useEffect } from "react";
import { KeyRound, Copy, RefreshCw, Check, Shield } from "lucide-react";
import { ToolPage } from "../components/ToolPage";

export const PasswordGen = () => {
    const [len, setLen] = useState(16);
    const [upper, setUpper] = useState(true);
    const [nums, setNums] = useState(true);
    const [syms, setSyms] = useState(true);
    const [pw, setPw] = useState("");
    const [copied, setCopied] = useState(false);

    const gen = () => {
        let ch = "abcdefghijklmnopqrstuvwxyz";
        if (upper) ch += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (nums) ch += "0123456789";
        if (syms) ch += "!@#$%^&*()_+-=[]{}|;:,.<>?";
        let r = "";
        for (let i = 0; i < len; i++) r += ch[Math.floor(Math.random() * ch.length)];
        setPw(r);
        setCopied(false);
    };

    const copy = () => { navigator.clipboard.writeText(pw); setCopied(true); setTimeout(() => setCopied(false), 2000); };

    const strength = (() => {
        let s = 0; if (len >= 12) s++; if (len >= 20) s++; if (upper) s++; if (nums) s++; if (syms) s++;
        if (s <= 2) return { label: "Weak", color: "bg-destructive", pct: 30 };
        if (s <= 3) return { label: "Medium", color: "bg-warning", pct: 55 };
        if (s <= 4) return { label: "Strong", color: "bg-success", pct: 80 };
        return { label: "Very Strong", color: "bg-primary", pct: 100 };
    })();

    useEffect(gen, []);

    const Toggle = ({ on, toggle, label }: { on: boolean; toggle: () => void; label: string }) => (
        <label className="flex items-center justify-between cursor-pointer py-2 group">
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
            <button type="button" onClick={toggle} role="switch" aria-checked={on} className={`relative w-9 h-5 rounded-full transition-colors ${on ? "bg-primary" : "bg-muted"}`}>
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${on ? "translate-x-4" : "translate-x-0.5"}`} />
            </button>
        </label>
    );

    return (
        <ToolPage icon={KeyRound} title="Password Generator" description="Secure passwords with strength meter" maxWidth="max-w-md">
            <div className="space-y-5">
                {/* Output */}
                <div className="relative">
                    <input type="text" readOnly className="w-full rounded-lg bg-card border border-border px-4 py-3.5 pr-12 font-mono text-foreground tracking-wide" value={pw} />
                    <button onClick={copy} className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-accent text-muted-foreground transition-colors">
                        {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                    </button>
                </div>

                {/* Strength */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                        <span className="text-muted-foreground flex items-center gap-1"><Shield size={12} />Strength</span>
                        <span className="text-foreground">{strength.label}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full rounded-full ${strength.color} transition-all duration-500`} style={{ width: `${strength.pct}%` }} />
                    </div>
                </div>

                {/* Settings */}
                <div className="rounded-lg bg-card border border-border p-4 space-y-1">
                    <div className="space-y-2 pb-3 border-b border-border">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Length</span>
                            <span className="font-mono font-semibold text-foreground">{len}</span>
                        </div>
                        <input type="range" min="8" max="64" value={len} onChange={(e) => setLen(+e.target.value)} className="w-full accent-[hsl(239,84%,67%)]" />
                    </div>
                    <Toggle on={upper} toggle={() => setUpper(!upper)} label="Uppercase (A-Z)" />
                    <Toggle on={nums} toggle={() => setNums(!nums)} label="Numbers (0-9)" />
                    <Toggle on={syms} toggle={() => setSyms(!syms)} label="Symbols (!@#)" />
                </div>

                <button onClick={gen} className="w-full py-2.5 rounded-lg bg-secondary text-secondary-foreground font-semibold text-sm hover:bg-secondary/80 transition-colors inline-flex items-center justify-center gap-2">
                    <RefreshCw size={15} /> Generate New
                </button>
            </div>
        </ToolPage>
    );
};
