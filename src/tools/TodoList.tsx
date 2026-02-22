import React, { useState, useEffect } from "react";
import { ListTodo, Plus, Trash2, CheckCircle, Circle } from "lucide-react";
import { ToolPage } from "../components/ToolPage";
import { get, set } from "../lib/localStorage";

interface Todo { id: string; text: string; completed: boolean; }
const KEY = "toolkit-todos";

export const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>(get(KEY, []));
    const [input, setInput] = useState("");

    useEffect(() => { set(KEY, todos); }, [todos]);

    const add = (e: React.FormEvent) => { e.preventDefault(); if (!input.trim()) return; setTodos([{ id: Date.now().toString(), text: input.trim(), completed: false }, ...todos]); setInput(""); };
    const toggle = (id: string) => setTodos(todos.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
    const remove = (id: string) => setTodos(todos.filter((t) => t.id !== id));
    const active = todos.filter((t) => !t.completed).length;

    return (
        <ToolPage icon={ListTodo} title="Todo List" description="Task management with persistence" maxWidth="max-w-lg">
            <div className="space-y-4">
                <form onSubmit={add} className="relative">
                    <input type="text" className="w-full rounded-lg bg-card border border-border px-4 py-3 pr-14 text-foreground" value={input} onChange={(e) => setInput(e.target.value)} placeholder="What needs to be done?" />
                    <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"><Plus size={16} /></button>
                </form>

                {todos.length > 0 && (
                    <p className="text-xs text-muted-foreground">{active} active · {todos.length - active} completed</p>
                )}

                <div className="space-y-1.5 max-h-[440px] overflow-y-auto pr-1">
                    {todos.length === 0 ? (
                        <div className="text-center py-16 text-muted-foreground text-sm">No tasks yet. Add one above!</div>
                    ) : (
                        todos.map((t) => (
                            <div key={t.id} className={`flex items-center gap-3 p-3 rounded-lg border transition-colors group ${t.completed ? "bg-muted/30 border-border/50" : "bg-card border-border hover:border-primary/20"}`}>
                                <button onClick={() => toggle(t.id)} className="flex-shrink-0 transition-transform active:scale-90">
                                    {t.completed ? <CheckCircle size={18} className="text-success" /> : <Circle size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />}
                                </button>
                                <span className={`flex-1 text-sm transition-colors ${t.completed ? "text-muted-foreground line-through" : "text-foreground"}`}>{t.text}</span>
                                <button onClick={() => remove(t.id)} className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={14} /></button>
                            </div>
                        ))
                    )}
                </div>

                {todos.some((t) => t.completed) && (
                    <button onClick={() => setTodos(todos.filter((t) => !t.completed))} className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors py-2 font-medium">
                        Clear completed
                    </button>
                )}
            </div>
        </ToolPage>
    );
};
