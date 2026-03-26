"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Newspaper,
  PlusCircle,
  Sparkles,
  Bot,
} from "lucide-react";

import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
};

const navItems: NavItem[] = [
  { href: "/", label: "Home", icon: House },
  { href: "/posts", label: "Developers post", icon: Newspaper },
  { href: "/new-post", label: "New Post", icon: PlusCircle, highlight: true },
  { href: "/ai-resume", label: "AI Resume", icon: Bot },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 z-40 hidden h-[calc(100vh-4rem)] w-64 md:block">
      <div className="h-full border-r border-white/10 bg-slate-950/30 backdrop-blur-xl">
        <div className="flex h-full flex-col p-3">
          <div className="mb-3 flex items-center gap-2 px-3 py-2 text-xs font-medium uppercase tracking-wider text-white/50">
            <Sparkles className="size-4" />
            Menu
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                    "text-white/70 hover:text-white hover:bg-white/8",
                    active && "bg-white/10 text-white ring-1 ring-white/10",
                    item.highlight &&
                      "bg-gradient-to-r from-violet-500/20 to-cyan-400/15 text-white ring-1 ring-violet-500/25 hover:from-violet-500/25 hover:to-cyan-400/20"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-8 items-center justify-center rounded-md ring-1 ring-white/10 transition",
                      item.highlight
                        ? "bg-white/8 group-hover:bg-white/10"
                        : "bg-white/5 group-hover:bg-white/8"
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto px-3 py-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/60">
              Tip: Start by creating a post to kick off the feed.
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

