"use client";

import Link from "next/link";
import { Bell, Search, Code2, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useAuthStore } from "@/src/features/auth/store";

export default function Navbar() {
  const token = useAuthStore((state) => state.token);
  const isLoggedIn = Boolean(token);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[60px] md:h-[64px]">
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="h-full border-b border-white/[0.08] bg-slate-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/60"
      >
        <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          {/* Logo Section */}
          <div className="flex min-w-0 items-center gap-3">
            <Link href="/" className="group relative inline-flex items-center gap-2">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-violet-500/20 to-cyan-500/20 opacity-0 blur-lg transition-all duration-500 group-hover:opacity-100" />
              <Code2 className="size-5 text-violet-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
              <span className="text-lg font-display font-bold tracking-tight bg-gradient-to-r from-violet-200 via-white to-cyan-200 bg-clip-text text-transparent">
                DevCircle
              </span>
              <span className="hidden rounded-full bg-white/8 px-2 py-0.5 text-[10px] font-medium text-white/60 ring-1 ring-white/10 sm:inline-flex items-center gap-1">
                <Sparkles className="size-2.5" />
                beta
              </span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden flex-1 items-center justify-center md:flex">
            <div className="relative w-full max-w-xl">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40 transition-colors duration-200" />
              <Input
                placeholder="Search developers, posts, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 rounded-full bg-white/5 border-white/10 pl-10 pr-4 text-white placeholder:text-white/40 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
                aria-label="Search"
              />
              <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-violet-500/20 to-cyan-500/20 opacity-0 blur-xl transition-opacity duration-300 group-focus-within:opacity-100" />
              {searchQuery && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40">
                  <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono">⌘K</kbd>
                </div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Mobile Search Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="relative md:hidden transition-all duration-200 hover:scale-105 hover:bg-white/10"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
            >
              <Search className="size-4" />
            </Button>

            {!isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Button
                  asChild
                  variant="ghost"
                  className="relative transition-all duration-200 hover:scale-105 hover:bg-white/10"
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  className="relative overflow-hidden bg-gradient-to-r from-violet-500 to-cyan-500 text-white shadow-lg shadow-violet-500/25 transition-all duration-200 hover:scale-105 hover:shadow-violet-500/40"
                >
                  <Link href="/signup">
                    <span className="relative z-10">Signup</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 opacity-0 transition-opacity duration-300 hover:opacity-100" />
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-1 sm:gap-2">
                {/* Notification Button */}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="relative transition-all duration-200 hover:scale-105 hover:bg-white/10"
                  aria-label="Notifications"
                >
                  <Bell className="size-4" />
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-1.5 top-1.5 size-2 rounded-full bg-cyan-400 shadow-[0_0_0_2px_rgba(6,182,212,0.2)]"
                  />
                </Button>

                {/* User Avatar */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  className="group relative inline-flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 ring-1 ring-white/20 backdrop-blur-sm transition-all duration-200 hover:ring-violet-500/50"
                  aria-label="User menu"
                >
                  <span className="text-xs font-semibold font-display bg-gradient-to-br from-violet-200 to-cyan-200 bg-clip-text text-transparent">
                    DC
                  </span>
                  <span className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/10 to-cyan-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Mobile Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-0 right-0 top-full mt-2 px-4 md:hidden"
          >
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40" />
              <Input
                placeholder="Search developers, posts, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 w-full rounded-xl bg-slate-900/95 border-white/10 pl-10 pr-4 text-white placeholder:text-white/40 backdrop-blur-xl focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
                autoFocus
                aria-label="Search"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white/60"
              >
                Esc
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard Shortcut Hint */}
      <div className="hidden md:block absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-white/20 font-mono">
        press <kbd className="px-1 rounded bg-white/5">⌘</kbd> + <kbd className="px-1 rounded bg-white/5">K</kbd> to search
      </div>
    </header>
  );
}