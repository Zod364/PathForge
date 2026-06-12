import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { toast } from "sonner";
import { Plus, Trash2, X } from "lucide-react";

const EMPTY = { title: "", url: "", type: "Article", level: "Beginner", tech: "" };

export default function ResourcesAdmin() {
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null);
  const load = () => api.get("/api/resources").then(r => setRows(r.data));
  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    if (editing.id) await api.put(`/api/resources/${editing.id}`, editing);
    else await api.post("/api/resources", editing);
    toast.success("Saved"); setEditing(null); load();
  };
  const del = async (id) => { if (!confirm("Delete?")) return; await api.delete(`/api/resources/${id}`); toast.success("Deleted"); load(); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-sora font-semibold">Resources</h1>
        <button className="btn-primary" onClick={() => setEditing({...EMPTY})}><Plus className="w-4 h-4" /> Add</button>
      </div>
      <div className="card overflow-hidden">
        <ul>
          {rows.map(r => (
            <li key={r.id} className="px-5 py-3 border-b border-border last:border-0 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="font-medium truncate">{r.title}</div>
                <div className="text-xs text-muted">{r.type} · {r.level} · {r.tech} · <a href={r.url} target="_blank" rel="noreferrer" className="text-mint hover:underline">{r.url}</a></div>
              </div>
              <div className="flex gap-2">
                <button className="btn-ghost px-2 py-1" onClick={() => setEditing(r)}>Edit</button>
                <button className="btn-danger px-2 py-1" onClick={() => del(r.id)}><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setEditing(null)} />
          <form onSubmit={save} className="relative card w-full sm:max-w-md p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-sora font-semibold">{editing.id ? "Edit" : "Add"} resource</h3>
              <button type="button" className="btn-ghost px-2" onClick={() => setEditing(null)}><X className="w-4 h-4" /></button>
            </div>
            <input className="input" placeholder="Title" value={editing.title} onChange={e => setEditing({...editing, title: e.target.value})} required />
            <input className="input" placeholder="URL" value={editing.url} onChange={e => setEditing({...editing, url: e.target.value})} required />
            <div className="grid grid-cols-2 gap-2">
              <select className="input" value={editing.type} onChange={e => setEditing({...editing, type: e.target.value})}>
                {["Video","Article","Doc","Course"].map(x => <option key={x}>{x}</option>)}
              </select>
              <select className="input" value={editing.level} onChange={e => setEditing({...editing, level: e.target.value})}>
                {["Beginner","Intermediate","Advanced"].map(x => <option key={x}>{x}</option>)}
              </select>
            </div>
            <input className="input" placeholder="Tech" value={editing.tech} onChange={e => setEditing({...editing, tech: e.target.value})} />
            <div className="flex justify-end gap-2"><button type="button" className="btn-ghost" onClick={() => setEditing(null)}>Cancel</button><button className="btn-primary">Save</button></div>
          </form>
        </div>
      )}
    </div>
  );
}
