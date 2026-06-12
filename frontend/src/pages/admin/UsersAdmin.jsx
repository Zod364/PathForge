import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

export default function UsersAdmin() {
  const [rows, setRows] = useState([]);
  const load = () => api.get("/api/admin/users").then(r => setRows(r.data));
  useEffect(() => { load(); }, []);

  const del = async (id) => {
    if (!confirm("Delete user?")) return;
    await api.delete(`/api/admin/users/${id}`); toast.success("Deleted"); load();
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-sora font-semibold">Users</h1>
        <p className="text-muted text-sm mt-1">{rows.length} registered</p>
      </div>
      <div className="card overflow-hidden">
        <div className="hidden md:grid grid-cols-12 px-5 py-3 text-xs uppercase text-muted border-b border-border">
          <div className="col-span-3">Name</div><div className="col-span-3">Email</div><div className="col-span-2">Goal</div><div className="col-span-2">Roles</div><div className="col-span-2 text-right">Actions</div>
        </div>
        <ul>
          {rows.map(u => (
            <li key={u.id} className="grid grid-cols-1 md:grid-cols-12 px-5 py-3 border-b border-border last:border-0 gap-2 md:gap-0 items-center">
              <div className="md:col-span-3 font-medium">{u.name}</div>
              <div className="md:col-span-3 text-sm text-muted">{u.email}</div>
              <div className="md:col-span-2 text-sm text-muted">{u.goal}</div>
              <div className="md:col-span-2 text-xs">
                {(u.roles || []).map(r => <span key={r} className="badge-muted mr-1">{r.replace("ROLE_","")}</span>)}
              </div>
              <div className="md:col-span-2 md:text-right">
                <button className="btn-danger px-2 py-1" onClick={() => del(u.id)}><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
