"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const severityStyles: Record<string, string> = {
  Critical: "bg-red-500/15 text-red-300 ring-1 ring-inset ring-red-500/30",
  High: "bg-amber-500/15 text-amber-300 ring-1 ring-inset ring-amber-500/30",
  Medium: "bg-cyan-500/15 text-cyan-300 ring-1 ring-inset ring-cyan-500/30",
  Low: "bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-500/30",
};

async function fetchAlerts() {
  const res = await fetch("/api/alerts", { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch alerts");
  }

  return res.json();
}

export default function ThreatFeed() {
  const { data, isFetching, error } = useQuery({
    queryKey: ["alerts", "feed"],
    queryFn: fetchAlerts,
    refetchInterval: 5_000,
    refetchIntervalInBackground: true,
    staleTime: 4_000,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30_000),
  });

  const alerts = Array.isArray(data) ? data : [];

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
          <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">
            Live feed
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <span>{isFetching ? "Refreshing" : "Idle"}</span>
          <span className="rounded-full border border-white/10 bg-slate-950/60 px-2 py-1">
            5s poll
          </span>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
          Feed connection degraded. Retrying in the background.
        </div>
      ) : null}

      <div className="space-y-2">
        {alerts.map((alert: any) => (
          <div
            key={alert.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2.5">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={[
                    "inline-flex rounded-full px-2 py-1 text-[10px] font-medium uppercase tracking-[0.18em]",
                    severityStyles[alert.severity] ??
                      "bg-slate-700/60 text-slate-200",
                  ].join(" ")}>
                  {alert.severity}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  {alert.id}
                </span>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <Link
                  href={`/dashboard/alerts/${alert.id}`}
                  className="truncate text-sm font-medium text-slate-100 hover:text-red-200">
                  {alert.name}
                </Link>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-400">{alert.source}</span>
              </div>
            </div>

            <div className="shrink-0 text-right">
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                {alert.time}
              </div>
              <div className="mt-1 text-xs text-slate-300">{alert.owner}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
