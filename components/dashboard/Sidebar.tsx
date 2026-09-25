"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";

type SidebarProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  onClose: () => void;
};

type NavItem = {
  title: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const navItems: NavItem[] = [
  { title: "Overview", href: "/dashboard", icon: LayoutDashboardIcon },
  { title: "Alerts", href: "/dashboard/alerts", icon: BellIcon },
  { title: "Incidents", href: "/dashboard/incidents", icon: ShieldAlertIcon },
  { title: "Logs", href: "/dashboard/logs", icon: FileTextIcon },
  { title: "Threat Intel", href: "/dashboard/threat-intel", icon: RadarIcon },
];

function LayoutDashboardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}>
      <path d="M4 13.5h7.5V4H4v9.5Zm8.5 0H20V10h-7.5v3.5ZM4 20h7.5v-6.5H4V20Zm8.5 0H20v-9.5h-7.5V20Z" />
    </svg>
  );
}

function BellIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}>
      <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V10a6 6 0 1 0-12 0v4.2a2 2 0 0 1-.6 1.4L4 17h5" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
  );
}

function ShieldAlertIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}>
      <path d="M12 3l7 3v6c0 4.3-2.8 8.2-7 10-4.2-1.8-7-5.7-7-10V6l7-3Z" />
      <path d="M12 8v5" />
      <path d="M12 16h.01" />
    </svg>
  );
}

function FileTextIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}>
      <path d="M7 3.5h7l5 5V18a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2Z" />
      <path d="M14 3.5V9h5" />
      <path d="M8 13h8M8 16h8" />
    </svg>
  );
}

function RadarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}>
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 3.5v2.2M12 18.5v2.2M3.5 12h2.2M18.3 12h2.2M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M5.8 18.2l1.6-1.6M16.6 7.4l1.6-1.6" />
    </svg>
  );
}

export default function Sidebar({
  collapsed,
  mobileOpen,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={[
          "fixed inset-0 z-30 bg-slate-950/70 transition-opacity lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={onClose}
        aria-label="Close sidebar overlay"
      />

      <aside
        className={[
          "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-white/10 bg-slate-950/95 text-slate-100 shadow-2xl shadow-slate-950/60 transition-all duration-200 ease-out lg:static",
          collapsed ? "w-20" : "w-72",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}>
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-sm font-bold text-red-300 ring-1 ring-inset ring-red-500/30">
              A
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">
                  Aegis
                </p>
                <h1 className="truncate text-base font-semibold text-slate-100">
                  SOC Console
                </h1>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 space-y-2 px-3 py-5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={[
                  "group flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "border-l-2 border-red-400 bg-red-500/10 text-red-300 shadow-[inset_0_0_0_1px_rgba(248,113,113,0.08)]"
                    : "border-transparent text-slate-300 hover:border-white/10 hover:bg-slate-900/70 hover:text-slate-100",
                  collapsed ? "justify-center px-2" : "justify-start",
                ].join(" ")}>
                <Icon className={collapsed ? "h-5 w-5" : "h-4 w-4"} />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-3">
            <p className="text-[10px] uppercase tracking-[0.24em] text-amber-200/80">
              Threat Level
            </p>
            {!collapsed && (
              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="text-xl font-semibold text-amber-300">
                  ELEVATED
                </span>
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              </div>
            )}
            {collapsed && (
              <div className="mt-3 flex justify-center">
                <span className="h-3 w-3 rounded-full bg-amber-400" />
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
