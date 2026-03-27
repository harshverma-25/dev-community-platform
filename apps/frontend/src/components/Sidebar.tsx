"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  Newspaper,
  PlusSquare,
  UserCircle2,
  Bot,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuthStore } from "@/src/features/auth/store";

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  highlight?: boolean;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

const navigation: NavSection[] = [
  {
    title: "Main",
    items: [
      { href: "/", label: "Home", icon: Home },
      { href: "/posts", label: "Developers post", icon: Newspaper },
    ],
  },
  {
    title: "Create",
    items: [
      { href: "/new-post", label: "New Post", icon: PlusSquare, highlight: true },
    ],
  },
  {
    title: "Account",
    items: [
      { href: "/create-profile", label: "Create Profile", icon: UserCircle2 },
    ],
  },
  {
    title: "Tools",
    items: [
      { href: "/ai-resume", label: "AI Resume Builder", icon: Bot },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const token = useAuthStore((state) => state.token);
  const isLoggedIn = Boolean(token);

  return (
    <aside className="h-full w-full rounded-[2rem] bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200 dark:border-white/10 shadow-sm flex flex-col overflow-hidden">
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/10 scrollbar-track-transparent">
        <div className="p-4 sm:p-5 space-y-6 md:space-y-8">
          
          {navigation.map((section) => (
            <div key={section.title} className="flex flex-col gap-2">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 pl-3">
                {section.title}
              </h3>
              <div className="flex flex-col gap-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "group relative flex items-center gap-3.5 rounded-2xl px-3 py-2.5 transition-all duration-300 font-medium",
                        isActive
                          ? "bg-slate-900 dark:bg-slate-800 text-white shadow-md shadow-slate-900/10"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      {/* Highlighted item special style */}
                      {item.highlight && !isActive && (
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      )}

                      <div
                        className={cn(
                          "flex size-8 items-center justify-center rounded-xl transition-all duration-300 relative z-10",
                          isActive
                            ? "bg-white/20 text-white"
                            : item.highlight
                            ? "bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 group-hover:bg-violet-200 dark:group-hover:bg-violet-500/30"
                            : "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 group-hover:bg-white dark:group-hover:bg-white/10 group-hover:text-slate-900 dark:group-hover:text-white"
                        )}
                      >
                        <Icon className={cn("size-[18px]", isActive && "stroke-[2.5px]")} />
                      </div>
                      
                      <span className="text-[14px] truncate relative z-10">{item.label}</span>
                      
                      {/* Active indicator dot */}
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active"
                          className="absolute right-3 size-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

        </div>
      </div>
    </aside>
  );
}