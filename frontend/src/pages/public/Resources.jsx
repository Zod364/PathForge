import { useEffect, useMemo, useState } from "react";
import { api } from "../../lib/api";
import Loading from "../../components/common/Loading";
import { ExternalLink, Search } from "lucide-react";

export default function Resources() {
  const [all, setAll] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.get("/api/resources").then(r => setAll(r.data)).finally(() => setLoading(false)); }, []);
  const filtered = useMemo(() => {
    if (!q) return all;
    const s = q.toLowerCase();
    return all.filter(r => r.title.toLowerCase().includes(s) || (r.tech||"").toLowerCase().includes(s));
  }, [all, q]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-sora font-semibold">Resources</h1>
          <p className="text-muted mt-1">Curated videos, articles, and official docs.</p>
        </div>
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search resources…" className="input pl-9" />
        </div>
      </div>

      {loading ? <Loading /> :
        filtered.length === 0 ? <p className="mt-10 text-muted">No resources yet. Admin can add them.</p> :
        <div className="mt-8 card overflow-hidden">
          <div className="hidden md:grid grid-cols-12 px-5 py-3 text-xs uppercase text-muted border-b border-border">
            <div className="col-span-5">Title</div><div className="col-span-2">Type</div><div className="col-span-2">Level</div><div className="col-span-2">Tech</div><div className="col-span-1 text-right">Link</div>
          </div>
          <ul>
            {filtered.map(r => (
              <li key={r.id} className="grid grid-cols-1 md:grid-cols-12 px-5 py-3 border-b border-border last:border-0 gap-2 md:gap-0 items-center">
                <div className="md:col-span-5 font-medium">{r.title}</div>
                <div className="md:col-span-2 text-muted text-sm">{r.type}</div>
                <div className="md:col-span-2 text-muted text-sm">{r.level}</div>
                <div className="md:col-span-2 text-muted text-sm">{r.tech}</div>
                <div className="md:col-span-1 md:text-right">
                  <a href={r.url} target="_blank" rel="noreferrer" className="text-mint hover:underline inline-flex items-center gap-1 text-sm">
                    Open <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  );
}
