type Severity = "Critical" | "High" | "Medium" | "Low";

type AlertEntity = {
  kind: "principal" | "network" | "workflow" | "tenant";
  value: string;
  displayLabel?: string;
  pivotPath?: string;
};

type TimelineItem = {
  type: string;
  timestamp: string;
  actor: string;
  description: string;
};

type AlertDetail = {
  id: string;
  name: string;
  severity: Severity;
  owner: string;
  status: string;
  source: string;
  time: string;
  narrative: string;
  confidence: number;
  detectionRules: string[];
  entities: AlertEntity[];
  timeline: TimelineItem[];
};

const severityStyles: Record<Severity, string> = {
  Critical: "bg-red-500/15 text-red-300 ring-1 ring-inset ring-red-500/30",
  High: "bg-amber-500/15 text-amber-300 ring-1 ring-inset ring-amber-500/30",
  Medium:
    "bg-yellow-500/15 text-yellow-200 ring-1 ring-inset ring-yellow-500/30",
  Low: "bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-500/30",
};

function formatRelativeTime(value: string) {
  const diffMs = Date.now() - new Date(value).getTime();
  const mins = Math.max(1, Math.round(diffMs / 60000));

  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} hr ago`;
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function getTimelineBadge(type: string) {
  const map: Record<string, string> = {
    created: "bg-slate-700/70 text-slate-200",
    occurrence: "bg-cyan-500/15 text-cyan-200",
    acknowledged: "bg-violet-500/15 text-violet-200",
    comment: "bg-sky-500/15 text-sky-200",
    resolved: "bg-emerald-500/15 text-emerald-300",
    reopened: "bg-amber-500/15 text-amber-200",
    dismissed: "bg-gray-500/15 text-gray-200",
    escalated: "bg-red-500/15 text-red-200",
    ai_report: "bg-fuchsia-500/15 text-fuchsia-200",
  };

  return map[type] ?? "bg-slate-700/70 text-slate-200";
}

export default function AlertDetailView({ alert }: { alert: AlertDetail }) {
  const confidencePercent = Math.round(alert.confidence * 100);

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={[
                  "inline-flex rounded-full px-3 py-1.5 text-sm font-semibold uppercase tracking-[0.2em]",
                  severityStyles[alert.severity],
                ].join(" ")}>
                {alert.severity}
              </span>
              <span className="text-[10px] uppercase tracking-[0.24em] text-slate-400">
                {alert.id}
              </span>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                Alert detail
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-50">
                {alert.name}
              </h1>
            </div>
          </div>

          <div className="min-w-[220px] rounded-xl border border-white/10 bg-slate-950/50 p-3">
            <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-slate-400">
              <span>Confidence</span>
              <span>{confidencePercent}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500"
                style={{ width: `${confidencePercent}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-300">
              {alert.detectionRules.length} rules matched
            </p>
          </div>
        </div>
      </header>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">
              Narrative
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200">
              {alert.narrative}
            </p>

            <div className="mt-5 rounded-xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                Recommended next move
              </p>
              <p className="mt-2 text-sm text-slate-200">
                Validate the identity context, confirm the source IP against
                reputation feeds, and decide whether to isolate the affected
                asset or escalate for forensic investigation.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">
              Related entities
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {["principal", "network", "workflow", "tenant"].map((kind) => {
                const entities = alert.entities.filter(
                  (entity) => entity.kind === kind,
                );

                return (
                  <div
                    key={kind}
                    className="rounded-xl border border-white/10 bg-slate-950/40 p-3">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">
                      {kind}
                    </p>
                    <div className="mt-3 space-y-2">
                      {entities.length === 0 ? (
                        <span className="text-sm text-slate-500">
                          No mapped entities
                        </span>
                      ) : (
                        entities.map((entity) => (
                          <div
                            key={`${kind}-${entity.value}`}
                            className="flex items-center justify-between gap-3 rounded-lg bg-slate-900/60 px-2 py-1.5">
                            <div>
                              <div className="text-sm font-medium text-slate-100">
                                {entity.displayLabel ?? entity.value}
                              </div>
                              <div className="text-[11px] text-slate-400">
                                {entity.value}
                              </div>
                            </div>
                            {entity.pivotPath ? (
                              <a
                                href={entity.pivotPath}
                                className="text-xs text-red-300 hover:text-red-200">
                                Pivot
                              </a>
                            ) : (
                              <span className="text-[11px] text-slate-500">
                                Static
                              </span>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">
              Audit trail
            </p>
            <div className="relative mt-5 space-y-5 before:absolute before:bottom-0 before:left-[7px] before:top-0 before:w-px before:bg-slate-700">
              {alert.timeline.map((item) => (
                <div
                  key={`${item.type}-${item.timestamp}`}
                  className="relative pl-8">
                  <span
                    className={`absolute left-0 top-0.5 inline-flex rounded-full px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em] ${getTimelineBadge(item.type)}`}>
                    {item.type}
                  </span>
                  <div className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs uppercase tracking-[0.22em] text-slate-400">
                        {item.actor}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {formatRelativeTime(item.timestamp)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-200">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">
              Detection context
            </p>
            <div className="mt-4 space-y-3">
              {alert.detectionRules.map((rule) => (
                <div
                  key={rule}
                  className="rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-200">
                  {rule}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">
              Evidence
            </p>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-400">Owner</dt>
                <dd className="text-slate-200">{alert.owner}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-400">Status</dt>
                <dd className="text-slate-200">{alert.status}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-400">Source</dt>
                <dd className="text-slate-200">{alert.source}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-400">Time</dt>
                <dd className="text-slate-200">{alert.time}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </section>

      <div className="sticky bottom-0 z-20 border-t border-white/10 bg-slate-950/90 px-4 py-4 backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-end gap-3">
          {[
            { label: "Acknowledge", variant: "secondary" },
            { label: "Escalate", variant: "destructive" },
            { label: "Dismiss (False Positive)", variant: "outline" },
            { label: "Create Incident", variant: "primary" },
          ].map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => console.log(action.label)}
              className={[
                "rounded-xl px-4 py-2 text-sm font-medium transition",
                action.variant === "primary" &&
                  "bg-red-500 text-white hover:bg-red-400",
                action.variant === "destructive" &&
                  "bg-red-500/15 text-red-200 ring-1 ring-inset ring-red-500/30 hover:bg-red-500/20",
                action.variant === "secondary" &&
                  "bg-slate-800 text-slate-100 hover:bg-slate-700",
                action.variant === "outline" &&
                  "border border-white/10 bg-transparent text-slate-100 hover:bg-slate-800",
              ].join(" ")}>
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
