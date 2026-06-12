import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../../lib/api";
import QuizPlayer from "../../components/quiz/QuizPlayer";
import Loading from "../../components/common/Loading";
import { ArrowLeft } from "lucide-react";

export default function QuizDetail() {
  const { id } = useParams();
  const [q, setQ] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/quizzes/${id}`).then(r => setQ(r.data)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading />;
  if (!q) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-8">
      <Link to="/quizzes" className="text-sm text-muted hover:text-mint inline-flex items-center gap-1 mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to quizzes
      </Link>
      <div className="card p-6 mb-6">
        <span className="badge-mint">{q.track}</span>
        <h1 className="mt-2 text-2xl md:text-3xl font-sora font-semibold">{q.title}</h1>
        <p className="text-muted mt-1">{q.description}</p>
      </div>
      <QuizPlayer quiz={q} />
    </div>
  );
}
