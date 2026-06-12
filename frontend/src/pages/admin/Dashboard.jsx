import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import StatCard from "../../components/common/StatCard";
import UserGrowthChart from "../../components/charts/UserGrowthChart";
import PopularRoadmapsChart from "../../components/charts/PopularRoadmapsChart";
import CompletionRateChart from "../../components/charts/CompletionRateChart";
import { Users, Map, HelpCircle, Activity } from "lucide-react";

export default function Dashboard() {
  const [s, setS] = useState({ users: 0, roadmaps: 0, quizzes: 0, activeWeek: 0 });
  const [growth, setGrowth] = useState([]);
  const [popular, setPopular] = useState([]);
  const [completion, setCompletion] = useState([]);

  useEffect(() => {
    Promise.all([
      api.get("/api/admin/analytics/overview"),
      api.get("/api/admin/analytics/user-growth"),
      api.get("/api/admin/analytics/popular-roadmaps"),
      api.get("/api/admin/analytics/completion-rate"),
    ]).then(([a,b,c,d]) => {
      setS(a.data); setGrowth(b.data); setPopular(c.data); setCompletion(d.data);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-sora font-semibold">Dashboard</h1>
        <p className="text-muted text-sm mt-1">Overview of activity across SkillMap.</p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <StatCard label="Users" value={s.users} icon={Users} />
        <StatCard label="Roadmaps" value={s.roadmaps} icon={Map} />
        <StatCard label="Quizzes" value={s.quizzes} icon={HelpCircle} />
        <StatCard label="Active (7d)" value={s.activeWeek} icon={Activity} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <UserGrowthChart data={growth} />
        <PopularRoadmapsChart data={popular} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <CompletionRateChart data={completion} />
        <div className="card p-5">
          <h3 className="font-sora font-semibold mb-3">Tips</h3>
          <ul className="text-sm text-muted space-y-2">
            <li>◆ Use <span className="text-mint">Phases</span> to drag-and-drop the learning order per roadmap.</li>
            <li>◆ Publish a roadmap from <span className="text-mint">Roadmaps</span> by setting status to <code>Published</code>.</li>
            <li>◆ Invite learners to <span className="text-mint">/register</span> — they'll see personalized AI suggestions on the home page.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
