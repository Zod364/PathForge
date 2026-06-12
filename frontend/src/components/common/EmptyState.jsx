export default function EmptyState({ title = "Nothing here yet", hint }) {
  return (
    <div className="card p-10 text-center">
      <div className="text-5xl">🌱</div>
      <h3 className="mt-4 font-sora font-semibold">{title}</h3>
      {hint && <p className="mt-2 text-muted text-sm">{hint}</p>}
    </div>
  );
}
