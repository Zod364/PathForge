import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function PopularRoadmapsChart({ data = [] }) {
  return (
    <div className="card p-5 h-72">
      <h3 className="font-sora font-semibold mb-3">Popular Roadmaps</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#252b38" />
          <XAxis dataKey="name" stroke="#9aa4b2" fontSize={11} />
          <YAxis stroke="#9aa4b2" fontSize={11} />
          <Tooltip contentStyle={{ background:"#161a21", border:"1px solid #252b38", borderRadius:12 }} />
          <Bar dataKey="value" fill="#4ade80" radius={[8,8,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
