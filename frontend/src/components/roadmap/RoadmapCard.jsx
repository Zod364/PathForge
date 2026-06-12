import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import { Map } from "lucide-react";

export default function RoadmapCard({ r, index = 0 }) {
  const Icon = Icons[r.icon] || Map;
  return (
    <Link to={`/roadmaps/${r.slug}`} data-testid={`roadmap-card-${r.slug}`}
      className="card card-hover p-5 fade-up block"
      style={{ animationDelay: `${(index % 8) * 40}ms` }}>
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl bg-mint-soft grid place-items-center ring-1 ring-mint/20">
          <Icon className="w-5 h-5 text-mint" />
        </div>
        <span className="badge-muted">{r.category === "role" ? "Role" : "Skill"}</span>
      </div>
      <h3 className="mt-4 text-lg font-sora font-semibold">{r.title}</h3>
      <p className="mt-1 text-sm text-muted line-clamp-2">{r.description}</p>
      <div className="mt-4 flex items-center gap-2 text-xs text-muted">
        <span className="badge-mint">{r.level}</span>
        <span>·</span>
        <span>{r.duration}</span>
        <span>·</span>
        <span>{(r.phases || []).length} phases</span>
      </div>
    </Link>
  );
}
