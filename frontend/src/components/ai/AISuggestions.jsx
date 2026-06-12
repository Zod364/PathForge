import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function AISuggestions({ currentSlug, goal }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.post("/api/ai/suggest", { roadmapSlug: currentSlug, goal })
      .then(r => setItems(r.data?.suggestions || []))
      .finally(() => setLoading(false));
  }, [currentSlug, goal]);

  return (
    <div className="card p-5">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-mint" />
        <h3 className="font-sora font-semibold">What to learn next</h3>
      </div>
      {loading && <div className="text-muted text-sm">Finding picks…</div>}
      {!loading && items.length === 0 && <div className="text-muted text-sm">No suggestions yet.</div>}
      <ul className="space-y-2">
        {items.map((s, i) => (
          <li key={i}>
            <Link to={`/roadmaps/${s.slug}`}
              data-testid={`ai-suggest-${s.slug}`}
              className="flex items-center justify-between gap-3 p-3 rounded-xl bg-surface2 border border-border hover:border-mint/40 transition">
              <div className="min-w-0">
                <div className="text-sm font-medium truncate">{s.title}</div>
                <div className="text-xs text-muted truncate">{s.reason}</div>
              </div>
              <ArrowRight className="w-4 h-4 text-mint shrink-0" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
