import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X } from "lucide-react";

const EMPTY = { title: "", description: "", category: "skill", level: "Medium", duration: "6 weeks", icon: "Map", status: "Draft" };

export default function RoadmapsAdmin() {
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = () => api.get("/api/roadmaps").then(r => setRows(r.data));
  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      if (editing.id) await api.put(`/api/roadmaps/${editing.id}`, editing);
      else await api.post("/api/roadmaps", editing);
      toast.success("Saved"); setEditing(null); load();
    } catch (err) { toast.error(err?.response?.data?.error || "Save failed"); }
  };

  const del = async (id) => {
    if (!confirm("Delete roadmap?")) return;
    await api.delete(`/api/roadmaps/${id}`); toast.success("Deleted"); load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-sora font-semibold">Roadmaps</h1>
          <p className="text-muted text-sm mt-1">{rows.length} roadmaps · manage content and status</p>
        </div>
        <button className="btn-primary" onClick={() => setEditing({ ...EMPTY })} data-testid="add-roadmap-btn">
          <Plus className="w-4 h-4" /> Add roadmap
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="hidden md:grid grid-cols-12 px-5 py-3 text-xs uppercase text-muted border-b border-border">
          <div className="col-span-4">Title</div><div className="col-span-2">Category</div><div className="col-span-2">Level</div><div className="col-span-2">Status</div><div className="col-span-2 text-right">Actions</div>
        </div>
        <ul>
          {rows.map(r => (
            <li key={r.id} className="grid grid-cols-1 md:grid-cols-12 px-5 py-3 border-b border-border last:border-0 gap-2 md:gap-0 items-center">
              <div className="md:col-span-4 font-medium">{r.title} <span className="text-muted text-xs">/{r.slug}</span></div>
              <div className="md:col-span-2 text-sm">{r.category}</div>
              <div className="md:col-span-2 text-sm">{r.level}</div>
              <div className="md:col-span-2"><span className={r.status === "Published" ? "badge-mint" : "badge-muted"}>{r.status}</span></div>
              <div className="md:col-span-2 md:text-right flex md:justify-end gap-2">
                <button className="btn-ghost px-2 py-1" onClick={() => setEditing(r)} data-testid={`edit-${r.slug}`}><Pencil className="w-3.5 h-3.5" /></button>
                <button className="btn-danger px-2 py-1" onClick={() => del(r.id)} data-testid={`delete-${r.slug}`}><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setEditing(null)} />
          <form onSubmit={save} className="relative card w-full sm:max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-sora font-semibold text-lg">{editing.id ? "Edit" : "Add"} roadmap</h3>
              <button type="button" className="btn-ghost px-2" onClick={() => setEditing(null)}><X className="w-4 h-4" /></button>
            </div>
            <Input label="Title" value={editing.title} onChange={v => setEditing({ ...editing, title: v })} />
            <Input label="Description" value={editing.description} onChange={v => setEditing({ ...editing, description: v })} />
            <div className="grid grid-cols-2 gap-3">
              <Select label="Category" value={editing.category} onChange={v => setEditing({ ...editing, category: v })} opts={["role","skill"]} />
              <Select label="Level" value={editing.level} onChange={v => setEditing({ ...editing, level: v })} opts={["Easy","Medium","Hard"]} />
              <Input label="Duration" value={editing.duration} onChange={v => setEditing({ ...editing, duration: v })} />
              <Input label="Icon (lucide)" value={editing.icon} onChange={v => setEditing({ ...editing, icon: v })} />
            </div>
            <Select label="Status" value={editing.status} onChange={v => setEditing({ ...editing, status: v })} opts={["Draft","Published","Archived"]} />
            <div className="flex justify-end gap-2">
              <button type="button" className="btn-ghost" onClick={() => setEditing(null)}>Cancel</button>
              <button className="btn-primary" data-testid="save-roadmap">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="text-xs text-muted">{label}</span>
      <input className="input mt-1" value={value || ""} onChange={e => onChange(e.target.value)} />
    </label>
  );
}
function Select({ label, value, onChange, opts }) {
  return (
    <label className="block">
      <span className="text-xs text-muted">{label}</span>
      <select className="input mt-1" value={value} onChange={e => onChange(e.target.value)}>
        {opts.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
