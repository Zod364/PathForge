import { Outlet, Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";

const NAV = [
  { to: "/roadmaps", label: "Roadmaps" },
  { to: "/quizzes", label: "Quizzes" },
  { to: "/projects", label: "Projects" },
  { to: "/resources", label: "Resources" },
  { to: "/docs", label: "Docs" },
  { to: "/skill-guides", label: "Guidance" }
];

export default function PublicLayout() {
  const { user, isAdmin, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-sora font-semibold text-lg">
            <span className="w-8 h-8 rounded-lg bg-mint-soft grid place-items-center ring-1 ring-mint/30">
              <Sparkles className="w-4 h-4 text-mint" />
            </span>
            <span>SkillMap</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map(n => (
              <NavLink key={n.to} to={n.to}
                className={({isActive}) =>
                  `px-3 py-2 rounded-lg text-sm transition ${isActive ? "text-mint bg-mint-soft" : "text-muted hover:text-text hover:bg-surface"}`}>
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {user ? (
              <>
                {isAdmin && <Link to="/admin" className="hidden md:inline-flex btn-ghost" data-testid="admin-link">Admin</Link>}
                <button onClick={logout} className="hidden md:inline-flex btn-ghost" data-testid="logout-btn">Logout</button>
                <div className="w-8 h-8 rounded-full bg-mint-soft grid place-items-center text-mint text-xs font-semibold">
                  {user.name?.[0]?.toUpperCase()}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-ghost" data-testid="login-link">Login</Link>
                <Link to="/register" className="btn-primary hidden sm:inline-flex" data-testid="register-link">Get started</Link>
              </>
            )}
            <button className="md:hidden btn-ghost px-2" onClick={() => setOpen(!open)} aria-label="menu">
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden border-t border-border bg-surface">
            <div className="px-4 py-3 flex flex-col gap-1">
              {NAV.map(n => (
                <NavLink key={n.to} to={n.to} onClick={() => setOpen(false)}
                  className={({isActive}) =>
                    `px-3 py-2 rounded-lg text-sm ${isActive ? "text-mint bg-mint-soft" : "text-text hover:bg-surface2"}`}>
                  {n.label}
                </NavLink>
              ))}
              {isAdmin && <Link to="/admin" onClick={() => setOpen(false)} className="px-3 py-2 text-mint">Admin</Link>}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1"><Outlet /></main>

      <footer className="border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-sm text-muted flex flex-col md:flex-row items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} SkillMap · Build the skills. Ship the proof.</span>
          <span className="text-xs">Made with <span className="text-mint">●</span> mint</span>
        </div>
      </footer>
    </div>
  );
}
