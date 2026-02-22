import React, { useEffect, useRef, useState } from "react";
import { Gamepad2, RotateCcw, Trophy } from "lucide-react";
import { ToolPage } from "../components/ToolPage";

const GRID = 16;
const CELL = 20;
type Pos = { x: number; y: number };

export const SnakeGame = () => {
  const [snake, setSnake] = useState<Pos[]>([{ x: 8, y: 8 }]);
  const [food, setFood] = useState<Pos>({ x: 12, y: 8 });
  const [dir, setDir] = useState<"U" | "D" | "L" | "R">("R");
  const [nextDir, setNextDir] = useState<"U" | "D" | "L" | "R">("R");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(+localStorage.getItem("snake-best")! || 0);
  const [over, setOver] = useState(false);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLCanvasElement>(null);
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const map: Record<string, "U" | "D" | "L" | "R"> = { ArrowUp: "U", ArrowDown: "D", ArrowLeft: "L", ArrowRight: "R" };
      const n = map[e.key];
      if (!n) return;
      e.preventDefault();
      setNextDir((prev) => {
        const opp: Record<string, string> = { U: "D", D: "U", L: "R", R: "L" };
        return opp[n] === dir ? prev : n;
      });
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [dir]);

  useEffect(() => {
    if (!started || over) return;
    timer.current = setInterval(() => {
      setSnake((prev) => {
        setDir(nextDir);
        const head = prev[0];
        const moves = { U: { x: head.x, y: (head.y - 1 + GRID) % GRID }, D: { x: head.x, y: (head.y + 1) % GRID }, L: { x: (head.x - 1 + GRID) % GRID, y: head.y }, R: { x: (head.x + 1) % GRID, y: head.y } };
        const nh = moves[nextDir];
        if (prev.some((s) => s.x === nh.x && s.y === nh.y)) { setOver(true); return prev; }
        const ns = [nh, ...prev];
        if (nh.x === food.x && nh.y === food.y) {
          setScore((s) => { const n = s + 1; if (n > best) { setBest(n); localStorage.setItem("snake-best", String(n)); } return n; });
          let nf: Pos;
          do { nf = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) }; } while (ns.some((s) => s.x === nf.x && s.y === nf.y));
          setFood(nf);
        } else { ns.pop(); }
        return ns;
      });
    }, Math.max(120 - score * 3, 60));
    return () => clearInterval(timer.current);
  }, [started, over, nextDir, food, score]);

  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    const isDark = document.documentElement.classList.contains("dark");

    ctx.fillStyle = isDark ? "hsl(224, 15%, 6%)" : "hsl(0, 0%, 98%)";
    ctx.fillRect(0, 0, c.width, c.height);

    // grid dots
    ctx.fillStyle = isDark ? "hsl(224, 14%, 12%)" : "hsl(220, 13%, 93%)";
    for (let i = 0; i <= GRID; i++) for (let j = 0; j <= GRID; j++) { ctx.beginPath(); ctx.arc(i * CELL, j * CELL, 0.8, 0, Math.PI * 2); ctx.fill(); }

    // snake
    snake.forEach((s, i) => {
      const a = 1 - (i / snake.length) * 0.5;
      ctx.fillStyle = `hsla(239, 84%, 67%, ${a})`;
      if (i === 0) { ctx.shadowColor = "hsl(239, 84%, 67%)"; ctx.shadowBlur = 6; }
      ctx.beginPath(); ctx.roundRect(s.x * CELL + 1, s.y * CELL + 1, CELL - 2, CELL - 2, i === 0 ? 4 : 3); ctx.fill();
      ctx.shadowBlur = 0;
    });

    // food
    ctx.shadowColor = "hsl(142, 71%, 45%)"; ctx.shadowBlur = 8; ctx.fillStyle = "hsl(142, 71%, 45%)";
    ctx.beginPath(); ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL / 2 - 2, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
  }, [snake, food]);

  const restart = () => { setSnake([{ x: 8, y: 8 }]); setDir("R"); setNextDir("R"); setFood({ x: 12, y: 8 }); setScore(0); setOver(false); setStarted(true); };

  return (
    <ToolPage icon={Gamepad2} title="Snake Game" description="Arrow keys to move" maxWidth="max-w-lg">
      <div className="flex flex-col items-center gap-5">
        <div className="flex items-center gap-6 w-full justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold font-mono text-primary">{score}</div>
            <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Score</div>
          </div>
          <div className="text-center flex flex-col items-center">
            <div className="text-lg font-bold font-mono text-warning flex items-center gap-1"><Trophy size={14} />{best}</div>
            <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Best</div>
          </div>
        </div>

        <canvas ref={ref} width={GRID * CELL} height={GRID * CELL} className="rounded-xl border border-border shadow-card" />

        {!started ? (
          <button onClick={restart} className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors">Start Game</button>
        ) : over ? (
          <div className="text-center space-y-3 animate-scale-in">
            <p className="text-destructive font-semibold">Game Over — Score: <span className="text-foreground">{score}</span></p>
            <button onClick={restart} className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
              <RotateCcw size={14} /> Play Again
            </button>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground text-center">Use ← ↑ ↓ → arrow keys · Speed increases with score</p>
        )}
      </div>
    </ToolPage>
  );
};