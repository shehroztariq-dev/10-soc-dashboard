"use client";

import type { ComponentType, SVGProps } from "react";

type TopNavProps = {
  collapsed: boolean;
  onToggleSidebar: () => void;
  onToggleCollapse: () => void;
};

function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}>
      <circle cx="11" cy="11" r="5.5" />
      <path d="m16 16 4.5 4.5" />
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

function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function ChevronIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export default function TopNav({
  collapsed,
  onToggleSidebar,
  onToggleCollapse,
}: TopNavProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-900/80 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-slate-950/60 text-slate-200 transition hover:border-red-500/40 hover:text-red-200 lg:hidden"
            aria-label="Toggle sidebar">
            <MenuIcon className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={onToggleCollapse}
            className="hidden h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-slate-950/60 text-slate-200 transition hover:border-red-500/40 hover:text-red-200 lg:inline-flex"
            aria-label="Collapse sidebar">
            <ChevronIcon
              className={collapsed ? "h-4 w-4 rotate-180" : "h-4 w-4"}
            />
          </button>

          <div className="hidden sm:block">
            <p className="text-[10px] uppercase tracking-[0.32em] text-slate-400">
              Command Center
            </p>
            <h2 className="mt-1 text-lg font-semibold text-slate-100">
              Tactical Overview
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-slate-300 xl:flex">
            <SearchIcon className="h-4 w-4 text-slate-400" />
            <input
              aria-label="Search alerts and assets"
              className="w-56 bg-transparent text-sm placeholder:text-slate-500 focus:outline-none"
              placeholder="Search alerts, IPs, assets"
            />
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-slate-300 transition hover:border-red-500/30 hover:text-red-200">
            <span>All Severity</span>
            <ChevronIcon className="h-4 w-4" />
          </button>

          <button
            type="button"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-slate-950/60 text-slate-200 transition hover:border-red-500/40 hover:text-red-200"
            aria-label="Notifications">
            <BellIcon className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
              3
            </span>
          </button>

          <button
            type="button"
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/60 px-2 py-1.5 text-left transition hover:border-red-500/30">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-amber-400 text-sm font-bold text-slate-950">
              AS
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-medium text-slate-100">A. Shaw</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                Analyst
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
