import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { toast } from "sonner";
import { Trash2, Pencil } from "lucide-react";

export default function QuizzesAdmin() {
  const [rows, setRows] = useState([]);
  const load = () => api.get("/api/quizzes").then(r => setRows(r.data));
  useEffect(() => { load(); }, []);

  const del = async (id) => {
    if (!confirm("Delete quiz?")) return;
    await api.delete(`/api/quizzes/${id}`); toast.success("Deleted"); load();
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-sora font-semibold">Quizzes</h1>
        <p className="text-muted text-sm mt-1">MCQs and long-form interview prep.</p>
      </div>
      <div className="card overflow-hidden">
        <div className="hidden md:grid grid-cols-12 px-5 py-3 text-xs uppercase text-muted border-b border-border">
          <div className="col-span-5">Title</div><div className="col-span-2">Track</div><div className="col-span-2">Difficulty</div><div className="col-span-2">Questions</div><div className="col-span-1 text-right">Actions</div>
        </div>
        <ul>
          {rows.map(q => (
            <li key={q.id} className="grid grid-cols-1 md:grid-cols-12 px-5 py-3 border-b border-border last:border-0 gap-2 md:gap-0 items-center">
              <div className="md:col-span-5 font-medium">{q.title}</div>
              <div className="md:col-span-2"><span className="badge-mint">{q.track}</span></div>
              <div className="md:col-span-2 text-sm text-muted">{q.difficulty}</div>
              <div className="md:col-span-2 text-sm text-muted">{q.questions?.length || 0}</div>
              <div className="md:col-span-1 md:text-right flex md:justify-end gap-2">
                <a href={`/quizzes/${q.id}`} className="btn-ghost px-2 py-1" title="View"><Pencil className="w-3.5 h-3.5" /></a>
                <button className="btn-danger px-2 py-1" onClick={() => del(q.id)}><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
