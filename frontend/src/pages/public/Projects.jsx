import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import ProjectCard from "../../components/common/ProjectCard";
import Loading from "../../components/common/Loading";

const LEVELS = ["All","Beginner","Intermediate","Advanced","Specialized"];

export default function Projects() {
  const [all, setAll] = useState([]);
  const [level, setLevel] = useState("All");
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.get("/api/projects").then(r => setAll(r.data)).finally(() => setLoading(false)); }, []);
  const items = level === "All" ? all : all.filter(p => p.level === level);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-sora font-semibold">Project ideas</h1>
      <p className="text-muted mt-1">Build the portfolio that gets you hired.</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {LEVELS.map(l => (
          <button key={l} onClick={() => setLevel(l)}
            data-testid={`project-filter-${l}`}
            className={`px-3 py-1.5 rounded-xl text-sm border ${level === l ? "bg-mint-soft border-mint/40 text-mint" : "bg-surface border-border text-muted hover:text-text"}`}>
            {l}
          </button>
        ))}
      </div>
      {loading ? <Loading /> : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(p => <ProjectCard key={p.id} p={p} />)}
        </div>
      )}
    </div>
  );
}
