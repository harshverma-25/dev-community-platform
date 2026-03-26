"use client";

import Link from "next/link";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16">
      <div className="h-16 border-b border-white/10 bg-slate-950/40 backdrop-blur-xl">
        <div className="mx-auto flex h-full w-full max-w-6xl items-center gap-4 px-4">
          <div className="flex items-center gap-2">
            {/* Logo image can be added later */}
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-white"
            >
              DevCircle
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <div className="relative w-full max-w-xl">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/50" />
              <Input
                placeholder="Search…"
                className="pl-10"
                aria-label="Search"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link href="/login">Login</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-violet-500/90 to-cyan-400/90 text-slate-950 shadow-lg shadow-violet-500/10 ring-0 hover:from-violet-500 hover:to-cyan-400 hover:shadow-violet-500/20"
            >
              <Link href="/signup">Signup</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

