const logs = [
  "[2026-09-25 09:42:11] INFO  Authentication request validated for user jsmith@acme.internal",
  "[2026-09-25 09:42:13] WARN  MFA challenge failed for 3 devices in sequence",
  "[2026-09-25 09:42:18] ALERT Threat intel match: suspicious beacon to 185.93.2.8",
  "[2026-09-25 09:42:22] INFO  Endpoint isolation executed on host WIN-45-17",
  "[2026-09-25 09:42:26] INFO  IAM policy enforcement updated for finance-admin role",
  "[2026-09-25 09:42:31] ERROR Network policy log source disconnected for 42 seconds",
  "[2026-09-25 09:42:35] INFO  SIEM correlation engine rehydrated with 2.8M events",
];

export default function LogsPage() {
  return (
    <div className="space-y-6">
      <section>
        <p className="text-xs uppercase tracking-[0.26em] text-slate-400">
          Logs
        </p>
        <h3 className="mt-2 text-3xl font-semibold text-slate-50">
          Raw log viewer
        </h3>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80">
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 text-xs uppercase tracking-[0.2em] text-slate-400">
          <span>Event stream</span>
          <span>Last 7 entries</span>
        </div>
        <pre className="overflow-x-auto p-4 font-mono text-sm leading-7 text-slate-200">
          <code>{logs.join("\n")}</code>
        </pre>
      </section>
    </div>
  );
}
