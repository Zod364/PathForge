import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function UserGrowthChart({ data = [] }) {
  return (
    <div className="card p-5 h-72">
      <h3 className="font-sora font-semibold mb-3">User Growth</h3>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="mint" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ade80" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#4ade80" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#252b38" />
          <XAxis dataKey="date" stroke="#9aa4b2" fontSize={11} />
          <YAxis stroke="#9aa4b2" fontSize={11} />
          <Tooltip contentStyle={{ background:"#161a21", border:"1px solid #252b38", borderRadius:12 }} />
          <Area type="monotone" dataKey="value" stroke="#4ade80" fill="url(#mint)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
