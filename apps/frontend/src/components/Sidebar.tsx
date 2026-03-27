"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  House,
  Newspaper,
  PlusCircle,
  Sparkles,
  Bot,
  LayoutDashboard,
  Calendar,
  BarChart3,
  Users,
  GraduationCap,
  FileText,
  MessageSquare,
  DollarSign,
  FolderOpen,
  HelpCircle,
  Settings,
  LogOut,
  ChevronRight,
  Zap,
  TrendingUp,
  Code2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuthStore } from "@/src/features/auth/store";

// Define the navigation structure based on the screenshot
type NavSection = {
  title: string;
  items: NavItem[];
  icon?: React.ComponentType<{ className?: string }>;
};

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
  badge?: string;
  badgeColor?: string;
};


// Additional developer-specific items for Dev Circle
const devSpecificItems: NavItem[] = [
  { href: "/posts", label: "Developers post", icon: Newspaper },
  { href: "/new-post", label: "New Post", icon: PlusCircle, highlight: true },
  { href: "/ai-resume", label: "AI Resume", icon: Bot },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsedSections, setCollapsedSections] = useState<string[]>([]);
  const token = useAuthStore((state) => state.token);
  const isLoggedIn = Boolean(token);

  const toggleSection = (sectionTitle: string) => {
    setCollapsedSections(prev =>
      prev.includes(sectionTitle)
        ? prev.filter(s => s !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-16 z-40 hidden h-[calc(100vh-4rem)] w-72 lg:block">
        <div className="relative h-full">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/30 to-slate-950/50 backdrop-blur-xl" />
          <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-violet-500/20 to-transparent" />
          
          <div className="relative flex h-full flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            <div className="flex-1 space-y-6 p-4">
              {/* Developer Quick Actions */}
              <div className="mb-2 flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-500/10 to-cyan-500/10 p-3 border border-violet-500/20">
                <Code2 className="size-5 text-violet-400" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-white/80">Dev Circle Pro</p>
                  <p className="text-[10px] text-white/40">Unlock premium features</p>
                </div>
                <button className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-medium text-white/70 hover:bg-white/20 transition-all">
                  Upgrade
                </button>
              </div>


              {/* Developer Specific Section */}
              <div className="pt-4">
                <div className="mb-2 px-3 py-1.5">
                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>
                <div className="space-y-1">
                  {devSpecificItems.map((item) => {
                    const active = pathname === item.href;
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                          "text-white/70 hover:text-white hover:bg-white/8",
                          active && "bg-white/10 text-white ring-1 ring-white/10",
                          item.highlight &&
                            "bg-gradient-to-r from-violet-500/20 to-cyan-400/15 text-white ring-1 ring-violet-500/25"
                        )}
                      >
                        <span
                          className={cn(
                            "flex size-7 items-center justify-center rounded-md ring-1 ring-white/10 transition-all duration-200",
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
                </div>
              </div>

              {/* AI Tip Section */}
              <div className="mt-auto pt-4">
                <div className="rounded-xl bg-gradient-to-br from-violet-500/10 to-cyan-500/10 border border-violet-500/20 p-3 backdrop-blur-sm">
                  <div className="flex items-start gap-2">
                    <Sparkles className="size-4 text-violet-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-white/80">AI Tip</p>
                      <p className="text-[11px] text-white/40 leading-relaxed">
                        Start by creating a post to kick off the feed and get AI-powered suggestions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Drawer - You can implement this later if needed */}
    </>
  );
}