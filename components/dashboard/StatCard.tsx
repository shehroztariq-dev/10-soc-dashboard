type StatCardProps = {
  label: string;
  value: string;
  change: number;
  target: string;
};

export default function StatCard({
  label,
  value,
  change,
  target,
}: StatCardProps) {
  const isImproving = change < 0;
  const deltaText = `${Math.abs(change).toFixed(1)}%`;
  const deltaTone = isImproving ? "text-emerald-400" : "text-red-400";
  const deltaArrow = isImproving ? "↓" : "↑";

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5 shadow-[0_10px_30px_rgba(2,6,23,0.25)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">
            {label}
          </p>
          <div className="mt-4 flex items-end gap-2">
            <span className="font-mono text-3xl font-semibold tabular-nums text-slate-50">
              {value}
            </span>
          </div>
        </div>

        <div className="rounded-full border border-white/10 bg-slate-950/60 px-2 py-1">
          <span
            className={[
              "inline-flex items-center gap-1 text-[11px] font-semibold",
              deltaTone,
            ].join(" ")}>
            <span aria-hidden="true">{deltaArrow}</span>
            {deltaText}
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-3 text-xs">
        <span className="text-slate-400">Target</span>
        <span className="font-medium text-slate-200">{target}</span>
      </div>
    </div>
  );
}
