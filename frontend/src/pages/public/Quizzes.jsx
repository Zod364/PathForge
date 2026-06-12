import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";
import Loading from "../../components/common/Loading";
import { QUIZ_TRACKS } from "../../lib/constants";
import { HelpCircle } from "lucide-react";

export default function Quizzes() {
  const [all, setAll] = useState([]);
  const [track, setTrack] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/quizzes").then(r => setAll(r.data)).finally(() => setLoading(false));
  }, []);

  const filtered = track ? all.filter(q => q.track === track) : all;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-sora font-semibold">Quizzes</h1>
      <p className="text-muted mt-1">Interview-grade MCQs and long-form questions.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <button onClick={() => setTrack("")}
          className={`px-3 py-1.5 rounded-xl text-sm border ${!track ? "bg-mint-soft border-mint/40 text-mint" : "bg-surface border-border text-muted"}`}>
          All
        </button>
        {QUIZ_TRACKS.map(t => (
          <button key={t.value} onClick={() => setTrack(t.value)}
            data-testid={`quiz-filter-${t.value}`}
            className={`px-3 py-1.5 rounded-xl text-sm border ${track === t.value ? "bg-mint-soft border-mint/40 text-mint" : "bg-surface border-border text-muted hover:text-text"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {loading ? <Loading /> : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(q => (
            <Link key={q.id} to={`/quizzes/${q.id}`}
              data-testid={`quiz-card-${q.id}`}
              className="card card-hover p-5 block">
              <div className="flex items-start justify-between">
                <span className="w-10 h-10 rounded-xl bg-mint-soft grid place-items-center"><HelpCircle className="w-5 h-5 text-mint" /></span>
                <span className="badge-mint">{q.track}</span>
              </div>
              <h3 className="mt-4 font-sora font-semibold">{q.title}</h3>
              <p className="mt-1 text-sm text-muted line-clamp-2">{q.description}</p>
              <div className="mt-3 text-xs text-muted flex items-center gap-2">
                <span className="badge-muted">{q.difficulty}</span>
                <span>·</span><span>{q.questions?.length || 0} questions</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
