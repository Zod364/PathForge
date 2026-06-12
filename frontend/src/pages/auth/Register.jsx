import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", goal: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      toast.success("Welcome to SkillMap!");
      nav("/", { replace: true });
    } catch (err) {
      toast.error(err?.response?.data?.error || "Registration failed");
    } finally { setLoading(false); }
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="min-h-screen grid place-items-center px-4">
      <div className="w-full max-w-sm">
        <Link to="/" className="flex items-center gap-2 justify-center mb-6">
          <span className="w-9 h-9 rounded-xl bg-mint-soft grid place-items-center"><Sparkles className="w-4 h-4 text-mint" /></span>
          <span className="font-sora font-semibold text-lg">SkillMap</span>
        </Link>
        <form onSubmit={submit} className="card p-6 space-y-4">
          <h1 className="text-xl font-sora font-semibold">Create your account</h1>
          <div><label className="text-xs text-muted">Name</label>
            <input className="input mt-1" value={form.name} onChange={set("name")} required data-testid="register-name" /></div>
          <div><label className="text-xs text-muted">Email</label>
            <input className="input mt-1" type="email" value={form.email} onChange={set("email")} required data-testid="register-email" /></div>
          <div><label className="text-xs text-muted">Password</label>
            <input className="input mt-1" type="password" value={form.password} onChange={set("password")} required minLength={6} data-testid="register-password" /></div>
          <div><label className="text-xs text-muted">Goal (optional)</label>
            <input className="input mt-1" placeholder="e.g., SDE, Data Scientist" value={form.goal} onChange={set("goal")} data-testid="register-goal" /></div>
          <button className="btn-primary w-full" disabled={loading} data-testid="register-submit">
            {loading ? "Creating…" : "Create account"}
          </button>
          <p className="text-xs text-muted text-center">
            Already have one? <Link to="/login" className="text-mint hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
