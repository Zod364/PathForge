import { Outlet, NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard, Map, Layers, HelpCircle, Lightbulb, BookOpen,
  FileText, Users, BarChart3, Settings as SettingsIcon, Sparkles, Menu, X, Search, LogOut
} from "lucide-react";
import { useState } from "react";

const ITEMS = [
  { to: "/admin",          label: "Dashboard",     icon: LayoutDashboard, end: true },
  { to: "/admin/roadmaps", label: "Roadmaps",      icon: Map },
  { to: "/admin/phases",   label: "Phases",        icon: Layers },
  { to: "/admin/quizzes",  label: "Quizzes",       icon: HelpCircle },
  { to: "/admin/projects", label: "Projects",      icon: Lightbulb },
  { to: "/admin/resources",label: "Resources",     icon: BookOpen },
  { to: "/admin/docs",     label: "Documentation", icon: FileText },
  { to: "/admin/users",    label: "Users",         icon: Users },
  { to: "/admin/analytics",label: "Analytics",     icon: BarChart3 },
  { to: "/admin/settings", label: "Settings",      icon: SettingsIcon },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const NavItems = ({ onClick }) => (
    <nav className="flex flex-col gap-0.5 px-2">
      {ITEMS.map(({ to, label, icon: Icon, end }) => (
        <NavLink key={to} to={to} end={end} onClick={onClick}
          data-testid={`sidebar-${label.toLowerCase()}`}
          className={({isActive}) =>
            `group flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition
             ${isActive ? "bg-mint-soft text-mint border-l-2 border-mint pl-[10px]"
                        : "text-muted hover:text-text hover:bg-surface2"}`}>
          <Icon className="w-4 h-4" />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen flex bg-bg">
      {/* desktop sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-[#11151c]">
        <Link to="/" className="h-16 px-5 flex items-center gap-2 border-b border-border">
          <span className="w-8 h-8 rounded-lg bg-mint-soft grid place-items-center ring-1 ring-mint/30">
            <Sparkles className="w-4 h-4 text-mint" />
          </span>
          <span className="font-sora font-semibold">SkillMap <span className="text-muted text-xs">· admin</span></span>
        </Link>
        <div className="py-4 flex-1 overflow-auto"><NavItems /></div>
        <div className="p-3 border-t border-border">
          <button className="btn-ghost w-full justify-start" onClick={logout} data-testid="sidebar-logout">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-[#11151c] border-r border-border flex flex-col">
            <div className="h-16 px-5 flex items-center justify-between border-b border-border">
              <span className="font-sora font-semibold">SkillMap</span>
              <button className="btn-ghost px-2" onClick={() => setOpen(false)}><X className="w-4 h-4" /></button>
            </div>
            <div className="py-4 flex-1 overflow-auto"><NavItems onClick={() => setOpen(false)} /></div>
          </aside>
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 border-b border-border bg-surface/60 backdrop-blur sticky top-0 z-30">
          <div className="h-full px-4 md:px-6 flex items-center justify-between gap-4">
            <button className="lg:hidden btn-ghost px-2" onClick={() => setOpen(true)} aria-label="open menu">
              <Menu className="w-4 h-4" />
            </button>
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input className="input pl-9" placeholder="Search..." data-testid="admin-search" />
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end leading-tight">
                <span className="text-sm">{user?.name}</span>
                <span className="text-xs text-muted">{user?.email}</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-mint-soft grid place-items-center text-mint font-semibold">
                {user?.name?.[0]?.toUpperCase() || "A"}
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8"><Outlet /></main>
      </div>
    </div>
  );
}
