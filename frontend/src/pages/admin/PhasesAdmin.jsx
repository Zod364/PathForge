import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { toast } from "sonner";
import DraggableList from "../../components/roadmap/DraggableList";

export default function PhasesAdmin() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [slug, setSlug] = useState("");
  const [current, setCurrent] = useState(null);

  useEffect(() => { api.get("/api/roadmaps").then(r => {
    setRoadmaps(r.data);
    if (r.data[0]) setSlug(r.data[0].slug);
  }); }, []);

  useEffect(() => {
    if (!slug) return;
    api.get(`/api/roadmaps/${slug}`).then(r => setCurrent(r.data));
  }, [slug]);

  const reorderPhases = async (orderedIds) => {
    await api.patch(`/api/roadmaps/${current.id}/phases/reorder`, { orderedIds });
    toast.success("Phase order saved");
  };
  const reorderTopics = (phaseId) => async (orderedIds) => {
    await api.patch(`/api/roadmaps/${current.id}/phases/${phaseId}/topics/reorder`, { orderedIds });
    toast.success("Topic order saved");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-sora font-semibold">Phases</h1>
        <p className="text-muted text-sm mt-1">Drag to reorder phases and topics.</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <label className="text-xs text-muted">Roadmap</label>
        <select className="input max-w-xs" value={slug} onChange={e => setSlug(e.target.value)}
          data-testid="phases-roadmap-select">
          {roadmaps.map(r => <option key={r.id} value={r.slug}>{r.title}</option>)}
        </select>
      </div>

      {current && (
        <div className="space-y-4">
          <div className="card p-5">
            <h3 className="font-sora font-semibold mb-3">Phases (drag to reorder)</h3>
            <DraggableList items={current.phases} onReorder={reorderPhases} testid="phase-dnd" />
          </div>
          {current.phases.map(p => (
            <div key={p.id} className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-sora font-semibold">{p.title}</h3>
                <span className="text-xs text-muted">{p.topics?.length || 0} topics</span>
              </div>
              <DraggableList items={p.topics} onReorder={reorderTopics(p.id)} testid={`topic-dnd-${p.id}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
