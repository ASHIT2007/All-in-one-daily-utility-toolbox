import React, { useState } from "react";
import { StickyNote, Plus, Trash2, FileText } from "lucide-react";
import { ToolPage } from "../components/ToolPage";
import { get, set } from "../lib/localStorage";

interface Note { id: string; title: string; content: string; createdAt: number; }
const KEY = "toolkit-notes";

export const Notes = () => {
  const [notes, setNotes] = useState<Note[]>(get(KEY, []));
  const [activeId, setActiveId] = useState<string | null>(notes[0]?.id ?? null);
  const active = notes.find((n) => n.id === activeId);

  const save = (updated: Note[]) => { setNotes(updated); set(KEY, updated); };
  const add = () => { const n: Note = { id: Date.now().toString(), title: "Untitled", content: "", createdAt: Date.now() }; save([n, ...notes]); setActiveId(n.id); };
  const update = (u: Partial<Note>) => { if (!active) return; save(notes.map((n) => n.id === active.id ? { ...n, ...u } : n)); };
  const remove = () => { if (!active) return; const u = notes.filter((n) => n.id !== active.id); save(u); setActiveId(u[0]?.id ?? null); };

  return (
    <ToolPage icon={StickyNote} title="Notes" description="Quick memos, locally saved" maxWidth="max-w-3xl">
      <div className="flex gap-4 min-h-[500px]">
        {/* Sidebar */}
        <div className="w-40 sm:w-48 flex-shrink-0 space-y-1">
          <button onClick={add} className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 mb-3">
            <Plus size={16} /> New Note
          </button>
          {notes.map((n) => (
            <button
              key={n.id}
              onClick={() => setActiveId(n.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm truncate transition-colors ${activeId === n.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-accent"
                }`}
            >
              <FileText className="inline mr-1.5 opacity-50" size={13} />{n.title}
            </button>
          ))}
          {notes.length === 0 && <p className="text-xs text-muted-foreground text-center py-6">No notes yet</p>}
        </div>

        {/* Editor */}
        {active ? (
          <div className="flex-1 flex flex-col gap-3 min-h-0">
            <input type="text" className="w-full px-4 py-2.5 rounded-lg bg-card border border-border text-foreground font-medium" value={active.title} onChange={(e) => update({ title: e.target.value })} placeholder="Note title..." />
            <textarea className="flex-1 w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground resize-none leading-relaxed" value={active.content} onChange={(e) => update({ content: e.target.value })} placeholder="Start writing..." />
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">Created {new Date(active.createdAt).toLocaleDateString()}</span>
              <button onClick={remove} className="text-xs text-destructive hover:text-destructive/80 transition-colors flex items-center gap-1"><Trash2 size={13} />Delete</button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">Select or create a note</div>
        )}
      </div>
    </ToolPage>
  );
};