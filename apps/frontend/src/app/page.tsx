import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="relative">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-500/25 to-cyan-400/15 ring-1 ring-white/10" />
          <h2 className="text-xl font-semibold text-white">Empty feed</h2>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            No posts yet. Be the first to share something 🚀
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Button asChild>
              <Link href="/new-post">Create Post</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/posts">Browse</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}