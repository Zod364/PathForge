import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { toast } from "sonner";
import { Plus, Trash2, X } from "lucide-react";

const EMPTY = { title: "", description: "", level: "Beginner", stack: [], milestones: [], track: "FullStack" };

export default function ProjectsAdmin() {
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null);
  const load = () => api.get("/api/projects").then(r => setRows(r.data));
  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    const payload = {
      ...editing,
      stack: Array.isArray(editing.stack) ? editing.stack : String(editing.stack).split(",").map(s=>s.trim()).filter(Boolean),
      milestones: Array.isArray(editing.milestones) ? editing.milestones : String(editing.milestones).split("\n").map(s=>s.trim()).filter(Boolean)
    };
    try {
      if (editing.id) await api.put(`/api/projects/${editing.id}`, payload);
      else await api.post("/api/projects", payload);
      toast.success("Saved"); setEditing(null); load();
    } catch (err) { toast.error("Save failed"); }
  };

  const del = async (id) => {
    if (!confirm("Delete project?")) return;
    await api.delete(`/api/projects/${id}`); toast.success("Deleted"); load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl md:text-3xl font-sora font-semibold">Projects</h1>
          <p className="text-muted text-sm mt-1">Ideas that build hireable portfolios.</p></div>
        <button className="btn-primary" onClick={() => setEditing({...EMPTY})}><Plus className="w-4 h-4" /> Add</button>
      </div>

      <div className="card overflow-hidden">
        <ul>
          {rows.map(p => (
            <li key={p.id} className="px-5 py-4 border-b border-border last:border-0 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="font-medium truncate">{p.title}</div>
                <div className="text-xs text-muted">{p.level} · {p.track} · {p.stack?.join(", ")}</div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button className="btn-ghost px-2 py-1" onClick={() => setEditing({ ...p, stack: p.stack?.join(", "), milestones: p.milestones?.join("\n") })}>Edit</button>
                <button className="btn-danger px-2 py-1" onClick={() => del(p.id)}><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setEditing(null)} />
          <form onSubmit={save} className="relative card w-full sm:max-w-lg p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-sora font-semibold">{editing.id ? "Edit" : "Add"} project</h3>
              <button type="button" className="btn-ghost px-2" onClick={() => setEditing(null)}><X className="w-4 h-4" /></button>
            </div>
            <input className="input" placeholder="Title" value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} required />
            <textarea className="input" placeholder="Description" value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} />
            <div className="grid grid-cols-2 gap-2">
              <select className="input" value={editing.level} onChange={e => setEditing({ ...editing, level: e.target.value })}>
                {["Beginner","Intermediate","Advanced","Specialized"].map(x => <option key={x}>{x}</option>)}
              </select>
              <select className="input" value={editing.track} onChange={e => setEditing({ ...editing, track: e.target.value })}>
                {["FullStack","DataAI","DevOps","Security"].map(x => <option key={x}>{x}</option>)}
              </select>
            </div>
            <input className="input" placeholder="Stack (comma separated)" value={editing.stack} onChange={e => setEditing({ ...editing, stack: e.target.value })} />
            <textarea className="input" placeholder="Milestones (one per line)" value={editing.milestones} onChange={e => setEditing({ ...editing, milestones: e.target.value })} />
            <div className="flex justify-end gap-2">
              <button type="button" className="btn-ghost" onClick={() => setEditing(null)}>Cancel</button>
              <button className="btn-primary">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
