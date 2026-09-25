"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const palette = {
  Critical: "#f87171",
  High: "#f59e0b",
  Medium: "#38bdf8",
  Low: "#22c55e",
};

export default function AlertsBySeverityChart({
  data,
}: {
  data: { severity: string; count: number }[];
}) {
  return (
    <div className="h-80 rounded-2xl border border-white/10 bg-slate-900/80 p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">
            Threat posture
          </p>
          <h3 className="mt-2 text-xl font-semibold text-slate-50">Alerts by severity</h3>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.18)" />
          <XAxis dataKey="severity" tick={{ fill: "#cbd5e1", fontSize: 12 }} />
          <YAxis tick={{ fill: "#cbd5e1", fontSize: 12 }} allowDecimals={false} />
          <Tooltip
            cursor={{ fill: "rgba(148,163,184,0.08)" }}
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid rgba(148,163,184,0.2)",
              borderRadius: 12,
              color: "#e2e8f0",
            }}
          />
          <Bar dataKey="count" radius={[8, 8, 0, 0]}>
            {data.map((entry) => (
              <Cell
                key={entry.severity}
                fill={palette[entry.severity as keyof typeof palette] ?? "#94a3b8"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
