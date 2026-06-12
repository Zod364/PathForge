import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import Loading from "../../components/common/Loading";
import { Rocket, Target, Shield } from "lucide-react";

const ICONS = { Builder: Rocket, Oracle: Target, Sentinel: Shield };

export default function SkillGuidance() {
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.get("/api/skill-guides").then(r => setAll(r.data)).finally(() => setLoading(false)); }, []);

  if (loading) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-sora font-semibold">Skill guidance</h1>
      <p className="text-muted mt-1">Pick one major track. Use the others as minors to build a T-shaped skill set.</p>

      <div className="mt-10 space-y-12">
        {all.map(g => {
          const Icon = ICONS[g.track] || Rocket;
          return (
            <section key={g.id}>
              <div className="flex items-start gap-4 mb-5">
                <span className="w-12 h-12 rounded-2xl bg-mint-soft grid place-items-center">
                  <Icon className="w-6 h-6 text-mint" />
                </span>
                <div>
                  <div className="text-xs text-muted uppercase">{g.track} · {g.timeline}</div>
                  <h2 className="text-2xl font-sora font-semibold">{g.title}</h2>
                  <p className="text-muted mt-1">{g.summary}</p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {g.phases.map((p, i) => (
                  <div key={p.id || i} className="card p-5">
                    <div className="text-xs text-mint font-medium">Phase {i+1}</div>
                    <h3 className="font-sora font-semibold mt-1">{p.title}</h3>
                    <p className="text-sm text-muted mt-1">{p.summary}</p>
                    <ul className="mt-3 text-sm space-y-1.5">
                      {(p.topics || []).map((t, j) => (
                        <li key={t.id || j} className="flex gap-2 text-muted">
                          <span className="text-mint">◆</span><span>{t.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
