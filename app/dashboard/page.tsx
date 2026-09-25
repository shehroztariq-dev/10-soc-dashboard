import StatCard from "@/components/dashboard/StatCard";
import AlertsBySeverityChart from "@/components/dashboard/AlertsBySeverityChart";
import { alertsBySeverity, kpiStats, topAlerts } from "@/data/overview";

const severityStyles: Record<string, string> = {
  Critical: "bg-red-500/10 text-red-300 ring-1 ring-inset ring-red-500/30",
  High: "bg-amber-500/10 text-amber-300 ring-1 ring-inset ring-amber-500/30",
  Medium: "bg-cyan-500/10 text-cyan-300 ring-1 ring-inset ring-cyan-500/30",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
            Overview
          </p>
          <h3 className="mt-2 text-3xl font-semibold text-slate-50">
            Security posture
          </h3>
        </div>
        <button className="rounded-xl border border-white/10 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-red-500/30 hover:text-red-200">
          Export report
        </button>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpiStats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            target={stat.target}
          />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <AlertsBySeverityChart data={alertsBySeverity} />
        </div>

        <aside className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 xl:col-span-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">
                Top findings
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-50">
                Critical alerts
              </h3>
            </div>
          </div>

          <div className="space-y-3">
            {topAlerts.map((alert) => (
              <div
                key={alert.id}
                className="rounded-xl border border-white/10 bg-slate-950/40 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={[
                          "inline-flex rounded-full px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em]",
                          severityStyles[alert.severity] ??
                            "bg-slate-700/60 text-slate-200",
                        ].join(" ")}>
                        {alert.severity}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                        {alert.id}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-medium text-slate-100">
                      {alert.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {alert.source} • {alert.asset}
                    </p>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {alert.time}
                  </span>
                </div>

                <a
                  href="#"
                  className="mt-3 inline-flex text-xs font-medium text-red-300 hover:text-red-200">
                  View alert details →
                </a>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
