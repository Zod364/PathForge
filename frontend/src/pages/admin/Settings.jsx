import { useAuth } from "../../context/AuthContext";

export default function Settings() {
  const { user } = useAuth();
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-sora font-semibold">Settings</h1>
        <p className="text-muted text-sm mt-1">Profile & account preferences.</p>
      </div>
      <div className="card p-6 space-y-4">
        <div>
          <div className="text-xs text-muted">Name</div>
          <div className="font-medium">{user?.name}</div>
        </div>
        <div>
          <div className="text-xs text-muted">Email</div>
          <div className="font-medium">{user?.email}</div>
        </div>
        <div>
          <div className="text-xs text-muted">Roles</div>
          <div className="flex gap-1 mt-1">
            {(user?.roles || []).map(r => <span key={r} className="badge-mint">{r.replace("ROLE_","")}</span>)}
          </div>
        </div>
      </div>
      <div className="card p-6">
        <h3 className="font-sora font-semibold mb-3">Theme</h3>
        <p className="text-sm text-muted">SkillMap ships in <span className="text-mint">dark-gray + mint</span>. More themes coming soon.</p>
      </div>
    </div>
  );
}
