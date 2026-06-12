import { Rocket } from "lucide-react";

const colors = {
  Beginner: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  Intermediate: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  Advanced: "bg-rose-500/10 text-rose-400 border-rose-500/30",
  Specialized: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30",
};

export default function ProjectCard({ p }) {
  const cls = colors[p.level] || "bg-surface2 text-muted border-border";
  return (
    <div className="card card-hover p-5" data-testid={`project-card-${p.id}`}>
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl bg-mint-soft grid place-items-center">
          <Rocket className="w-5 h-5 text-mint" />
        </div>
        <span className={`badge border ${cls}`}>{p.level}</span>
      </div>
      <h3 className="mt-4 font-sora font-semibold">{p.title}</h3>
      <p className="mt-1 text-sm text-muted">{p.description}</p>
      {p.stack?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.stack.map(s => <span key={s} className="badge-muted">{s}</span>)}
        </div>
      )}
      {p.milestones?.length > 0 && (
        <ul className="mt-4 text-sm space-y-1.5">
          {p.milestones.slice(0,4).map((m,i)=>(
            <li key={i} className="flex gap-2 text-muted">
              <span className="text-mint">◆</span> <span>{m}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
