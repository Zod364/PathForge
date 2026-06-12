import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../../lib/api";
import PhaseTimeline from "../../components/roadmap/PhaseTimeline";
import AISuggestions from "../../components/ai/AISuggestions";
import Loading from "../../components/common/Loading";
import * as Icons from "lucide-react";
import { Map, Clock, BarChart3, ArrowLeft } from "lucide-react";

export default function RoadmapDetail() {
  const { slug } = useParams();
  const [r, setR] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(() => JSON.parse(localStorage.getItem(`sm_done_${slug}`) || "[]"));
  const [queued, setQueued] = useState(() => JSON.parse(localStorage.getItem(`sm_queue_${slug}`) || "[]"));

  useEffect(() => {
    api.get(`/api/roadmaps/${slug}`).then(res => setR(res.data)).finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => { localStorage.setItem(`sm_done_${slug}`, JSON.stringify(completed)); }, [completed, slug]);
  useEffect(() => { localStorage.setItem(`sm_queue_${slug}`, JSON.stringify(queued)); }, [queued, slug]);

  const toggle = (id) => setCompleted(c => c.includes(id) ? c.filter(x=>x!==id) : [...c, id]);
  const queue = (id) => setQueued(q => q.includes(id) ? q.filter(x=>x!==id) : [...q, id]);

  if (loading) return <Loading />;
  if (!r) return null;

  const Icon = Icons[r.icon] || Map;
  const total = (r.phases || []).reduce((n, p) => n + (p.topics?.length || 0), 0);
  const pct = total === 0 ? 0 : Math.round(100 * completed.length / total);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <Link to="/roadmaps" className="text-sm text-muted hover:text-mint inline-flex items-center gap-1 mb-4">
        <ArrowLeft className="w-4 h-4" /> All roadmaps
      </Link>

      <div className="card p-6 md:p-8 mb-8">
        <div className="flex items-start gap-4">
          <span className="w-14 h-14 rounded-2xl bg-mint-soft grid place-items-center ring-1 ring-mint/20">
            <Icon className="w-6 h-6 text-mint" />
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-xs text-muted uppercase">
              {r.category === "role" ? "Role-based" : "Skill-based"} · {r.level}
            </div>
            <h1 className="text-3xl md:text-4xl font-sora font-semibold mt-1">{r.title}</h1>
            <p className="text-muted mt-2 max-w-2xl">{r.description}</p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {r.duration}</span>
              <span className="flex items-center gap-1.5"><BarChart3 className="w-4 h-4" /> {(r.phases||[]).length} phases · {total} topics</span>
            </div>
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs text-muted mb-1">
                <span>Your progress</span><span>{pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-surface2 overflow-hidden">
                <div className="h-full bg-mint transition-all" style={{ width: `${pct}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-sora font-semibold">Phases</h2>
          <PhaseTimeline phases={r.phases} onToggle={toggle} onQueue={queue} completed={completed} queued={queued} />
        </div>
        <aside className="space-y-4">
          <AISuggestions currentSlug={slug} />
          <div className="card p-5">
            <h3 className="font-sora font-semibold mb-3">My learning queue</h3>
            {queued.length === 0
              ? <p className="text-sm text-muted">Queue topics with <span className="text-mint">+</span> to build your plan.</p>
              : <ul className="space-y-1.5 text-sm">
                  {queued.map(id => {
                    const t = r.phases.flatMap(p => p.topics).find(t => t.id === id);
                    return <li key={id} className="text-muted"><span className="text-mint">◆</span> {t?.title || "Topic"}</li>;
                  })}
                </ul>}
          </div>
        </aside>
      </div>
    </div>
  );
}
