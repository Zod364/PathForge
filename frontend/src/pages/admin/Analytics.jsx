import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import UserGrowthChart from "../../components/charts/UserGrowthChart";
import PopularRoadmapsChart from "../../components/charts/PopularRoadmapsChart";
import CompletionRateChart from "../../components/charts/CompletionRateChart";

export default function Analytics() {
  const [growth, setGrowth] = useState([]);
  const [popular, setPopular] = useState([]);
  const [completion, setCompletion] = useState([]);
  useEffect(() => {
    api.get("/api/admin/analytics/user-growth").then(r => setGrowth(r.data));
    api.get("/api/admin/analytics/popular-roadmaps").then(r => setPopular(r.data));
    api.get("/api/admin/analytics/completion-rate").then(r => setCompletion(r.data));
  }, []);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-sora font-semibold">Analytics</h1>
        <p className="text-muted text-sm mt-1">Signal over vanity.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <UserGrowthChart data={growth} />
        <PopularRoadmapsChart data={popular} />
      </div>
      <CompletionRateChart data={completion} />
    </div>
  );
}
