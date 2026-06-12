import { Loader2 } from "lucide-react";
export default function Loading({ label = "Loading…" }) {
  return (
    <div className="flex items-center justify-center py-16 text-muted">
      <Loader2 className="w-4 h-4 animate-spin mr-2 text-mint" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
