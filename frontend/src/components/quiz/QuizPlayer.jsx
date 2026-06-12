import { useState } from "react";
import { api } from "../../lib/api";
import { toast } from "sonner";
import { Sparkles, Check, X } from "lucide-react";

export default function QuizPlayer({ quiz }) {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const setAnswer = (qid, val) => setAnswers(a => ({ ...a, [qid]: val }));

  const submit = async () => {
    setSubmitting(true);
    try {
      const { data } = await api.post(`/api/quizzes/${quiz.id}/submit`, { answers });
      setResult(data);
    } catch (e) {
      toast.error("Failed to submit");
    } finally { setSubmitting(false); }
  };

  if (result) return <Review quiz={quiz} result={result} onRetry={() => { setResult(null); setAnswers({}); }} />;

  return (
    <div className="space-y-6">
      {quiz.questions.map((q, i) => (
        <div key={q.id} className="card p-5" data-testid={`quiz-q-${q.id}`}>
          <div className="flex items-start justify-between mb-3">
            <span className="badge-muted">Q{i+1}</span>
            <span className="badge-mint">{q.type === "MCQ" ? "MCQ" : "Long-form"}</span>
          </div>
          <p className="font-medium mb-4">{q.stem}</p>
          {q.type === "MCQ" ? (
            <div className="grid gap-2">
              {q.options.map((opt, idx) => (
                <label key={idx}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition
                    ${answers[q.id] === idx ? "border-mint bg-mint-soft" : "border-border bg-surface2 hover:border-mint/40"}`}>
                  <input type="radio" className="mt-1 accent-[#4ade80]" name={q.id}
                    checked={answers[q.id] === idx} onChange={() => setAnswer(q.id, idx)}
                    data-testid={`quiz-${q.id}-opt-${idx}`} />
                  <span className="text-sm">{opt}</span>
                </label>
              ))}
            </div>
          ) : (
            <textarea className="input min-h-[120px]" placeholder="Write your answer…"
              value={answers[q.id] || ""}
              onChange={e => setAnswer(q.id, e.target.value)}
              data-testid={`quiz-${q.id}-textarea`} />
          )}
        </div>
      ))}
      <button className="btn-primary w-full sm:w-auto" onClick={submit} disabled={submitting}
        data-testid="quiz-submit-btn">
        {submitting ? "Submitting…" : "Submit quiz"}
      </button>
    </div>
  );
}

function Review({ quiz, result, onRetry }) {
  return (
    <div className="space-y-6">
      <div className="card p-6 flex items-center justify-between">
        <div>
          <div className="text-muted text-sm">Your result</div>
          <div className="text-3xl font-sora font-semibold mt-1">
            {result.score !== null ? `${result.score}%` : "Reviewed"}
          </div>
          {result.mcqTotal > 0 && (
            <div className="text-xs text-muted mt-1">{result.correct}/{result.mcqTotal} MCQs correct</div>
          )}
        </div>
        <button className="btn-ghost" onClick={onRetry} data-testid="quiz-retry-btn">Retake</button>
      </div>
      {result.review.map((it, i) => (
        <div key={it.questionId} className="card p-5">
          <div className="flex items-start justify-between mb-2">
            <span className="badge-muted">Q{i+1}</span>
            {it.type === "MCQ" && (
              it.correct
                ? <span className="badge-mint"><Check className="w-3 h-3 mr-1" /> Correct</span>
                : <span className="badge bg-danger/10 text-danger border border-danger/30"><X className="w-3 h-3 mr-1" /> Incorrect</span>
            )}
          </div>
          <p className="font-medium mb-3">{it.stem}</p>
          {it.type === "SHORT_ANSWER" && (
            <>
              <div className="text-xs uppercase text-muted mb-1">Your answer</div>
              <div className="p-3 rounded-xl bg-surface2 border border-border text-sm mb-3">
                {it.given || <span className="text-muted italic">Not answered</span>}
              </div>
              <div className="text-xs uppercase text-muted mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-mint" /> Model answer
              </div>
              <div className="p-3 rounded-xl bg-mint-soft border border-mint/20 text-sm mb-3">{it.modelAnswer}</div>
              {it.rubric?.length > 0 && (
                <>
                  <div className="text-xs uppercase text-muted mb-1">Rubric</div>
                  <ul className="list-disc pl-5 text-sm text-muted space-y-1">
                    {it.rubric.map((r, idx) => <li key={idx}>{r}</li>)}
                  </ul>
                </>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
