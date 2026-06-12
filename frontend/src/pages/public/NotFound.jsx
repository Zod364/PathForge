import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto text-center py-32 px-4">
      <div className="text-6xl font-sora font-semibold text-mint">404</div>
      <p className="mt-3 text-muted">This page hasn't been mapped yet.</p>
      <Link to="/" className="btn-primary mt-6 inline-flex">Back home</Link>
    </div>
  );
}
