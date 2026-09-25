"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TopNav from "@/components/dashboard/TopNav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="grid min-h-screen grid-cols-[auto_1fr] bg-slate-950 text-slate-100">
      <Sidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <div className="flex min-h-screen flex-col overflow-hidden">
        <TopNav
          collapsed={sidebarCollapsed}
          onToggleSidebar={() => setMobileSidebarOpen((open) => !open)}
          onToggleCollapse={() =>
            setSidebarCollapsed((collapsed) => !collapsed)
          }
        />
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
