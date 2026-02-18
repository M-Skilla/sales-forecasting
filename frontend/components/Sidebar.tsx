"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  { href: "/", icon: "dashboard", label: "Dashboard" },
  { href: "/upload", icon: "cloud_upload", label: "Data Upload" },
  { href: "/analytics", icon: "analytics", label: "Analytics" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-20 lg:w-64 bg-white dark:bg-surface-dark border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between shrink-0 transition-all duration-300 z-50">
      <div>
        {/* Logo */}
        <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white shrink-0">
            <span className="material-icons-round text-xl">insights</span>
          </div>
          <span className="hidden lg:block ml-3 font-bold text-xl tracking-tight">
            SalesForecast
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6 flex flex-col gap-1 px-2 lg:px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group relative overflow-hidden ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-primary"
                }`}
              >
                <span
                  className={`material-icons-round z-10 ${
                    !isActive ? "group-hover:text-primary transition-colors" : ""
                  }`}
                >
                  {item.icon}
                </span>
                <span className="hidden lg:block font-medium z-10">
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="p-2 lg:p-4 border-t border-slate-200 dark:border-slate-800">
        <Link
          href="#"
          className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-primary transition-colors group"
        >
          <span className="material-icons-round group-hover:text-primary transition-colors">
            settings
          </span>
          <span className="hidden lg:block font-medium">Settings</span>
        </Link>
        <div className="mt-4 flex items-center gap-3 px-3 lg:px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-blue-400 flex items-center justify-center text-white text-sm font-bold shrink-0">
            A
          </div>
          <div className="hidden lg:block overflow-hidden">
            <p className="text-sm font-semibold truncate">Alex Morgan</p>
            <p className="text-xs text-slate-500 truncate">Lead Analyst</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
