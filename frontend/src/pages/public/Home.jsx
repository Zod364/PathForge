import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";
import RoadmapCard from "../../components/roadmap/RoadmapCard";
import AISuggestions from "../../components/ai/AISuggestions";
import ProjectCard from "../../components/common/ProjectCard";
import Loading from "../../components/common/Loading";
import { ArrowRight, Rocket, Target, Shield } from "lucide-react";

export default function Home() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/api/roadmaps"),
      api.get("/api/projects")
    ]).then(([r, p]) => {
      setRoadmaps(r.data); setProjects(p.data);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  const trending = roadmaps.slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden grain">
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-20 pb-24 md:pt-28 md:pb-32 relative">
          <span className="badge-mint">2026 Edition</span>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-sora font-semibold leading-tight max-w-3xl">
            Build the skills. <span className="text-mint">Ship the proof.</span>
          </h1>
          <p className="mt-5 text-muted max-w-2xl">
            Role-based and skill-based roadmaps, hands-on projects, interview-grade quizzes, and AI concept explainer — all in one clean workspace.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/roadmaps" className="btn-primary" data-testid="hero-start-btn">
              Start learning <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/skill-guides" className="btn-ghost" data-testid="hero-guides-btn">
              View master plan
            </Link>
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="grid gap-4 md:grid-cols-3">
          <TrackCard icon={Rocket} title="The Builder" desc="Full-stack software engineering · 9–12 mo" to="/skill-guides" />
          <TrackCard icon={Target} title="The Oracle" desc="Data science & AI · 12–15 mo" to="/skill-guides" />
          <TrackCard icon={Shield} title="The Sentinel" desc="Cybersecurity · 10–12 mo" to="/skill-guides" />
        </div>
      </section>

      {/* AI suggestions */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <AISuggestions goal="SDE" />
      </section>

      {/* Trending roadmaps */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="flex items-end justify-between mb-5">
          <h2 className="text-2xl font-sora font-semibold">Trending roadmaps</h2>
          <Link to="/roadmaps" className="text-sm text-mint hover:underline">See all →</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {trending.map((r, i) => <RoadmapCard key={r.id} r={r} index={i} />)}
        </div>
      </section>

      {/* Featured projects */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="flex items-end justify-between mb-5">
          <h2 className="text-2xl font-sora font-semibold">Featured projects</h2>
          <Link to="/projects" className="text-sm text-mint hover:underline">All projects →</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0,6).map(p => <ProjectCard key={p.id} p={p} />)}
        </div>
      </section>
    </div>
  );
}

function TrackCard({ icon: Icon, title, desc, to }) {
  return (
    <Link to={to} className="card card-hover p-6 block">
      <span className="w-10 h-10 rounded-xl bg-mint-soft grid place-items-center">
        <Icon className="w-5 h-5 text-mint" />
      </span>
      <h3 className="mt-4 font-sora font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted">{desc}</p>
    </Link>
  );
}
