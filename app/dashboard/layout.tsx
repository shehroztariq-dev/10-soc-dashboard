"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "Overview", href: "/dashboard" },
  { label: "Alerts", href: "/dashboard/alerts" },
  { label: "Incidents", href: "/dashboard/incidents" },
  { label: "Logs", href: "/dashboard/logs" },
];

function NavItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={[
        "group flex items-center justify-between rounded-xl border px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-100"
          : "border-transparent bg-slate-900/50 text-slate-300 hover:border-slate-700 hover:bg-slate-800/80 hover:text-slate-100",
      ].join(" ")}
    >
      <span>{label}</span>
      <span
        className={[
          "h-2.5 w-2.5 rounded-full",
          isActive ? "bg-cyan-400" : "bg-slate-600 group-hover:bg-slate-400",
        ].join(" ")}
      />
    </Link>
  );
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r border-slate-800 bg-slate-900/90 lg:block">
          <div className="flex h-20 items-center gap-3 border-b border-slate-800 px-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-sm font-bold text-cyan-300 ring-1 ring-cyan-500/30">
              SOC
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">
                Security
              </p>
              <h1 className="text-lg font-semibold text-slate-100">Operations</h1>
            </div>
          </div>

          <nav className="space-y-3 px-4 py-5">
            {navigation.map((item) => (
              <NavItem key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>

          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 mx-4">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
              Threat score
            </p>
            <div className="mt-3 flex items-end gap-3">
              <span className="text-3xl font-semibold text-amber-300">72</span>
              <span className="mb-1 text-sm text-emerald-400">+8.2%</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-400" />
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
            <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                  Command center
                </p>
                <h2 className="mt-1 text-xl font-semibold text-slate-50">
                  Security overview
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300">
                  Last sync 2m ago
                </div>
                <button className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-400">
                  Escalate
                </button>
              </div>
            </div>
          </header>

          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
