import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#4ade80", "#fbbf24", "#64748b"];

export default function CompletionRateChart({ data = [] }) {
  return (
    <div className="card p-5 h-72">
      <h3 className="font-sora font-semibold mb-3">Completion Rate</h3>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} innerRadius={50} paddingAngle={3}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip contentStyle={{ background:"#161a21", border:"1px solid #252b38", borderRadius:12 }} />
          <Legend wrapperStyle={{ fontSize: 12, color: "#9aa4b2" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
