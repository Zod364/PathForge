import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import Loading from "../../components/common/Loading";
import { ExternalLink, FileText } from "lucide-react";

export default function Documentation() {
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.get("/api/docs").then(r => setAll(r.data)).finally(() => setLoading(false)); }, []);

  // group by tech
  const groups = all.reduce((m, d) => { (m[d.tech] = m[d.tech] || []).push(d); return m; }, {});

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-sora font-semibold">Documentation</h1>
      <p className="text-muted mt-1">Your source of truth for every stack.</p>

      {loading ? <Loading /> : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(groups).map(([tech, items]) => (
            <div key={tech} className="card p-5">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-mint" />
                <h3 className="font-sora font-semibold">{tech}</h3>
              </div>
              <ul className="space-y-2">
                {items.map(d => (
                  <li key={d.id}>
                    <a href={d.url} target="_blank" rel="noreferrer"
                      className="flex items-center justify-between gap-2 text-sm hover:text-mint">
                      <span className="truncate">{d.title}</span>
                      <span className="badge-muted shrink-0">{d.kind}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
