import { useState } from "react";
import ExplainDialog from "../ai/ExplainDialog";
import { Sparkles, Check, Plus } from "lucide-react";

export default function PhaseTimeline({ phases = [], onToggle, onQueue, completed = [], queued = [] }) {
  const [explain, setExplain] = useState(null);
  return (
    <div className="space-y-4">
      {phases.map((p, i) => (
        <div key={p.id || i} className="relative card p-5 md:p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-7 h-7 rounded-full bg-mint-soft text-mint grid place-items-center text-sm font-semibold">{i+1}</span>
            <h3 className="font-sora font-semibold text-lg">{p.title}</h3>
          </div>
          {p.summary && <p className="text-sm text-muted mb-4">{p.summary}</p>}
          <ul className="space-y-2">
            {(p.topics || []).map(t => {
              const done = completed.includes(t.id);
              const inQ = queued.includes(t.id);
              return (
                <li key={t.id} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-surface2 border border-border">
                  <div className="flex items-center gap-3 min-w-0">
                    <button onClick={() => onToggle?.(t.id)} data-testid={`topic-toggle-${t.id}`}
                      className={`w-5 h-5 rounded-md border grid place-items-center shrink-0 transition
                        ${done ? "bg-mint border-mint" : "border-border hover:border-mint"}`}>
                      {done && <Check className="w-3 h-3 text-slate-950" />}
                    </button>
                    <div className="min-w-0">
                      <div className="text-sm truncate">{t.title}</div>
                      {t.description && <div className="text-xs text-muted truncate">{t.description}</div>}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => onQueue?.(t.id)}
                      className={`btn-ghost px-2 py-1 text-xs ${inQ ? "text-mint" : ""}`}
                      data-testid={`topic-queue-${t.id}`} title="Add to learning queue">
                      <Plus className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Queue</span>
                    </button>
                    <button onClick={() => setExplain(t.title)}
                      className="btn-ghost px-2 py-1 text-xs text-mint"
                      data-testid={`topic-explain-${t.id}`}>
                      <Sparkles className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Explain</span>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <ExplainDialog topic={explain} onClose={() => setExplain(null)} />
    </div>
  );
}
