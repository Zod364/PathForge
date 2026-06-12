export default function StatCard({ label, value, icon: Icon, delta }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted uppercase tracking-wide">{label}</span>
        {Icon && (
          <span className="w-8 h-8 rounded-lg bg-mint-soft grid place-items-center">
            <Icon className="w-4 h-4 text-mint" />
          </span>
        )}
      </div>
      <div className="mt-3 text-3xl font-sora font-semibold">{value}</div>
      {delta !== undefined && (
        <div className={`mt-1 text-xs ${delta >= 0 ? "text-mint" : "text-danger"}`}>
          {delta >= 0 ? "▲" : "▼"} {Math.abs(delta)}%
        </div>
      )}
    </div>
  );
}
