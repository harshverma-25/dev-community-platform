"use client";

import Link from "next/link";
import { Bell, Search, Code2, Sparkles, PlusCircle, ChevronDown, User, LogOut, Settings } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useAuthStore } from "@/src/features/auth/store";

export default function Navbar() {
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const isLoggedIn = Boolean(token);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="relative w-full h-[60px] flex-shrink-0 z-50">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="h-full w-full rounded-[2rem] bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-between px-4 sm:px-6 md:px-8"
      >
        {/* Left: Logo */}
        <div className="flex items-center w-1/4">
          <Link href="/" className="group relative inline-flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-lg">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-md shadow-violet-500/20 transition-transform duration-300 group-hover:scale-105">
              <Code2 className="size-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-display font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                DevCircle
              </span>
              <span className="flex items-center gap-1 text-[10px] font-medium text-slate-500 dark:text-white/50 uppercase tracking-widest mt-1">
                <Sparkles className="size-2.5 text-amber-500" />
                Beta
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Search */}
        <div className="hidden md:flex flex-1 max-w-2xl justify-center items-center px-4">
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="size-5 text-slate-400 group-focus-within:text-violet-500 transition-colors duration-200" />
            </div>
            <input
              type="text"
              placeholder="Search users, posts, and tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-full bg-slate-100/80 dark:bg-white/5 border border-transparent 
                pl-12 pr-12 text-[15px] font-medium text-slate-900 dark:text-white 
                placeholder:text-slate-400 dark:placeholder:text-white/40 outline-none
                focus:bg-white dark:focus:bg-slate-800 focus:border-violet-500/30 focus:ring-4 focus:ring-violet-500/10 
                transition-all duration-300 shadow-inner"
            />
            <div className="absolute inset-y-0 right-4 flex items-center">
              <kbd className="hidden lg:inline-flex items-center justify-center h-6 px-2 rounded-md bg-slate-200 dark:bg-white/10 text-[11px] font-mono font-medium text-slate-500 dark:text-white/50 border border-slate-300 dark:border-white/10">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end gap-3 sm:gap-4 w-1/4">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden flex size-10 items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
          >
            <Search className="size-5" />
          </button>

          {!isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Link href="/login" className="hidden sm:block text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                Login
              </Link>
              <Link href="/signup" className="flex items-center justify-center h-10 px-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold hover:scale-105 active:scale-95 transition-transform shadow-md">
                Sign Up
              </Link>
            </div>
          ) : (
            <>
              {/* Important: New Post Button */}
              <Link 
                href="/new-post"
                className="hidden sm:flex items-center gap-2 h-10 px-4 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold shadow-md shadow-violet-500/20 hover:shadow-violet-500/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                <PlusCircle className="size-4" />
                <span>Create Post</span>
              </Link>

              {/* Important: Notifications */}
              <button className="relative flex size-10 items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors group">
                <Bell className="size-5 group-hover:animate-[wiggle_1s_ease-in-out_infinite]" />
                <span className="absolute top-2 right-2.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              </button>

              {/* Vertical Divider */}
              <div className="hidden sm:block w-px h-8 bg-slate-200 dark:bg-white/10" />

              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 p-1 pr-3 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-violet-500 outline-none"
                >
                  <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-bold text-xs shadow-inner">
                    HV
                  </div>
                  <div className="hidden lg:flex flex-col items-start pr-1">
                    <span className="text-[13px] font-semibold text-slate-900 dark:text-white leading-tight">Harsh Verma</span>
                    <span className="text-[11px] font-medium text-slate-500 dark:text-white/50 leading-tight">Full Stack Developer</span>
                  </div>
                  <ChevronDown className="size-4 text-slate-400 hidden sm:block" />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-3 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden z-50 p-2 py-2"
                    >
                      <div className="flex flex-col gap-1">
                        <Link href="/create-profile" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                          <User className="size-4 text-slate-400" />
                          Create Profile
                        </Link>
                        <Link href="/posts" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                          <Settings className="size-4 text-slate-400" />
                          Posts
                        </Link>
                        <div className="h-px w-full bg-slate-100 dark:bg-white/10 my-1" />
                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            setIsProfileOpen(false);
                          }}
                          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                        >
                          <LogOut className="size-4" />
                          Log Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-0 right-0 top-full mt-2 md:hidden z-40 rounded-[2rem] overflow-hidden"
          >
            <div className="relative p-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl shadow-lg">
              <Search className="absolute left-6 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 w-full rounded-full bg-slate-100 dark:bg-white/5 border-transparent pl-14 pr-4 text-[15px] font-medium text-slate-900 dark:text-white outline-none"
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}