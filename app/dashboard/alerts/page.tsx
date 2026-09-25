const filters = ["All", "Critical", "High", "Medium", "Investigating"];

const alerts = [
  {
    name: "Impossible travel",
    severity: "Critical",
    owner: "A. Gomez",
    status: "Investigating",
  },
  {
    name: "Ransomware beacon",
    severity: "High",
    owner: "N. Patel",
    status: "Blocked",
  },
  {
    name: "Unusual logins",
    severity: "Medium",
    owner: "J. Silva",
    status: "Monitoring",
  },
  {
    name: "Container breakout",
    severity: "Critical",
    owner: "R. Bell",
    status: "Escalated",
  },
  {
    name: "Suspicious e-mail",
    severity: "High",
    owner: "E. Ray",
    status: "Resolved",
  },
];

const severityStyles: Record<string, string> = {
  Critical: "bg-rose-500/15 text-rose-300 ring-1 ring-inset ring-rose-500/30",
  High: "bg-amber-500/15 text-amber-300 ring-1 ring-inset ring-amber-500/30",
  Medium: "bg-cyan-500/15 text-cyan-300 ring-1 ring-inset ring-cyan-500/30",
};

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.26em] text-slate-400">
            Alerts
          </p>
          <h3 className="mt-2 text-3xl font-semibold text-slate-50">
            Alert queue
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter, index) => (
            <button
              key={filter}
              className={[
                "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                index === 0
                  ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-200"
                  : "border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500",
              ].join(" ")}>
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
            <thead className="bg-slate-950/80 text-slate-400">
              <tr>
                <th className="px-4 py-3 font-medium">Alert</th>
                <th className="px-4 py-3 font-medium">Severity</th>
                <th className="px-4 py-3 font-medium">Owner</th>
                <th className="px-4 py-3 font-medium">Status</th>
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
                      ].join(" ")}>
                      {alert.severity}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{alert.owner}</td>
                  <td className="px-4 py-3">
                    <span className="text-slate-300">{alert.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
