import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { Sparkles, X, BookOpen, AlertTriangle } from "lucide-react";

export default function ExplainDialog({ topic, onClose }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!topic) { setData(null); return; }
    setLoading(true);
    api.post("/api/ai/explain", { topic, level: "intermediate" })
      .then(r => setData(r.data))
      .finally(() => setLoading(false));
  }, [topic]);

  if (!topic) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
         data-testid="explain-dialog">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative card w-full sm:max-w-2xl max-h-[90vh] overflow-auto p-6 fade-up">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-mint-soft grid place-items-center">
              <Sparkles className="w-4 h-4 text-mint" />
            </span>
            <div>
              <div className="text-xs text-muted">Explain with AI</div>
              <h3 className="font-sora font-semibold text-lg">{topic}</h3>
            </div>
          </div>
          <button onClick={onClose} className="btn-ghost px-2"><X className="w-4 h-4" /></button>
        </div>

        {loading && <div className="animate-pulse text-muted">Thinking…</div>}

        {!loading && data && (
          <div className="space-y-4 text-sm">
            <Section title="Summary">{data.summary}</Section>
            <Section title="Why it matters">{data.whyItMatters}</Section>
            <Section title="Analogy">{data.analogy}</Section>
            {data.codeSample && (
              <Section title="Code sample">
                <pre className="bg-[#0b0e13] border border-border rounded-xl p-3 overflow-auto text-xs"><code>{data.codeSample}</code></pre>
              </Section>
            )}
            {data.gotchas?.length > 0 && (
              <Section title="Gotchas" icon={<AlertTriangle className="w-3.5 h-3.5 text-danger" />}>
                <ul className="list-disc pl-5 space-y-1 text-muted">
                  {data.gotchas.map((g, i) => <li key={i}>{g}</li>)}
                </ul>
              </Section>
            )}
            {data.readMore?.length > 0 && (
              <Section title="Read more" icon={<BookOpen className="w-3.5 h-3.5 text-mint" />}>
                <ul className="list-disc pl-5 space-y-1 text-muted">
                  {data.readMore.map((g, i) => <li key={i}>{g}</li>)}
                </ul>
              </Section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, children, icon }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-muted flex items-center gap-1 mb-1">
        {icon} {title}
      </div>
      <div className="text-text">{children}</div>
    </div>
  );
}
