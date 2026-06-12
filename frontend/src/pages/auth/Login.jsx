import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from || "/";
  const [email, setEmail] = useState("admin@skillmap.dev");
  const [password, setPassword] = useState("Admin@123");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const u = await login(email, password);
      toast.success(`Welcome back, ${u.name}`);
      nav(u.roles?.includes("ROLE_ADMIN") ? "/admin" : from, { replace: true });
    } catch (err) {
      toast.error(err?.response?.data?.error || "Login failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen grid place-items-center px-4">
      <div className="w-full max-w-sm">
        <Link to="/" className="flex items-center gap-2 justify-center mb-6">
          <span className="w-9 h-9 rounded-xl bg-mint-soft grid place-items-center"><Sparkles className="w-4 h-4 text-mint" /></span>
          <span className="font-sora font-semibold text-lg">SkillMap</span>
        </Link>
        <form onSubmit={submit} className="card p-6 space-y-4">
          <h1 className="text-xl font-sora font-semibold">Sign in</h1>
          <div>
            <label className="text-xs text-muted">Email</label>
            <input className="input mt-1" value={email} onChange={e => setEmail(e.target.value)}
              type="email" required data-testid="login-email" />
          </div>
          <div>
            <label className="text-xs text-muted">Password</label>
            <input className="input mt-1" value={password} onChange={e => setPassword(e.target.value)}
              type="password" required data-testid="login-password" />
          </div>
          <button className="btn-primary w-full" disabled={loading} data-testid="login-submit">
            {loading ? "Signing in…" : "Sign in"}
          </button>
          <p className="text-xs text-muted text-center">
            No account? <Link to="/register" className="text-mint hover:underline">Register</Link>
          </p>
          <p className="text-[11px] text-muted text-center">Admin demo: <code>admin@skillmap.dev / Admin@123</code></p>
        </form>
      </div>
    </div>
  );
}
