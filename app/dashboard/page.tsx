const metrics = [
  { label: "Critical alerts", value: "12", delta: "+3 since yesterday", tone: "rose" },
  { label: "Blocked attempts", value: "8.4K", delta: "-12% this week", tone: "cyan" },
  { label: "Mean response", value: "14m", delta: "within SLA", tone: "amber" },
  { label: "Incidents open", value: "7", delta: "2 escalated", tone: "violet" },
];

const alerts = [
  { name: "Data exfiltration spike", severity: "Critical", source: "EDR", time: "2 min ago" },
  { name: "Privilege misuse", severity: "High", source: "IAM", time: "11 min ago" },
  { name: "Suspicious PowerShell", severity: "Medium", source: "Endpoint", time: "21 min ago" },
  { name: "Failed MFA fatigue", severity: "High", source: "Identity", time: "46 min ago" },
];

const severityStyles: Record<string, string> = {
  Critical: "bg-rose-500/15 text-rose-300 ring-1 ring-inset ring-rose-500/30",
  High: "bg-amber-500/15 text-amber-300 ring-1 ring-inset ring-amber-500/30",
  Medium: "bg-cyan-500/15 text-cyan-300 ring-1 ring-inset ring-cyan-500/30",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.26em] text-slate-400">
            Overview
          </p>
          <h3 className="mt-2 text-3xl font-semibold text-slate-50">
            Security posture
          </h3>
        </div>
        <button className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-slate-500 hover:bg-slate-800">
          Export report
        </button>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/20"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">{item.label}</p>
              <span
                className={[
                  "h-2.5 w-2.5 rounded-full",
                  item.tone === "rose" && "bg-rose-400",
                  item.tone === "cyan" && "bg-cyan-400",
                  item.tone === "amber" && "bg-amber-400",
                  item.tone === "violet" && "bg-violet-400",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            </div>
            <div className="mt-5 flex items-end justify-between">
              <span className="text-3xl font-semibold text-slate-50">{item.value}</span>
            </div>
            <p className="mt-4 text-xs text-slate-400">{item.delta}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Recent alerts</p>
              <h4 className="mt-1 text-xl font-semibold text-slate-100">
                Active queue
              </h4>
            </div>
            <button className="text-sm font-medium text-cyan-300 hover:text-cyan-200">
              View all
            </button>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-800">
            <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
              <thead className="bg-slate-950/80 text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Alert</th>
                  <th className="px-4 py-3 font-medium">Severity</th>
                  <th className="px-4 py-3 font-medium">Source</th>
                  <th className="px-4 py-3 font-medium">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/60">
                {alerts.map((alert) => (
                  <tr key={alert.name} className="hover:bg-slate-800/60">
                    <td className="px-4 py-3 text-slate-100">{alert.name}</td>
                    <td className="px-4 py-3">
                      <span
                        className={[
                          "inline-flex rounded-full px-2 py-1 text-xs font-medium",
                          severityStyles[alert.severity],
                        ].join(" ")}
                      >
                        {alert.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-300">{alert.source}</td>
                    <td className="px-4 py-3 text-slate-400">{alert.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">Coverage</p>
          <h4 className="mt-1 text-xl font-semibold text-slate-100">Signal health</h4>

          <div className="mt-6 space-y-5">
            {[
              { label: "Endpoint telemetry", value: 96 },
              { label: "Identity events", value: 88 },
              { label: "Cloud audit trails", value: 82 },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950/40 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
              Response SLA
            </p>
            <div className="mt-3 flex items-end justify-between">
              <span className="text-3xl font-semibold text-emerald-300">94%</span>
              <span className="text-sm text-emerald-400">On track</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
