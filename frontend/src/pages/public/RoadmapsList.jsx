import { useEffect, useMemo, useState } from "react";
import { api } from "../../lib/api";
import RoadmapCard from "../../components/roadmap/RoadmapCard";
import Loading from "../../components/common/Loading";
import EmptyState from "../../components/common/EmptyState";
import { Search } from "lucide-react";

export default function RoadmapsList() {
  const [all, setAll] = useState([]);
  const [cat, setCat] = useState("role");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/roadmaps").then(r => setAll(r.data)).finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return all.filter(r => r.category === cat && (
      !q || r.title.toLowerCase().includes(q.toLowerCase()) ||
      (r.description || "").toLowerCase().includes(q.toLowerCase())
    ));
  }, [all, cat, q]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-sora font-semibold">Roadmaps</h1>
          <p className="text-muted mt-1">Pick your path — role-based or skill-based.</p>
        </div>
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search roadmaps…"
            className="input pl-9" data-testid="roadmap-search" />
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {[{v:"role",l:"Role-based"},{v:"skill",l:"Skill-based"}].map(t => (
          <button key={t.v} onClick={() => setCat(t.v)}
            data-testid={`category-${t.v}`}
            className={`px-4 py-2 rounded-xl text-sm border transition
              ${cat === t.v ? "bg-mint-soft border-mint/40 text-mint" : "bg-surface border-border text-muted hover:text-text"}`}>
            {t.l}
          </button>
        ))}
      </div>

      {loading ? <Loading /> :
        filtered.length === 0 ? <EmptyState title="No roadmaps found" hint="Try a different search." /> :
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((r, i) => <RoadmapCard key={r.id} r={r} index={i} />)}
        </div>}
    </div>
  );
}
