"use client";

import Link from "next/link";
import { MessageSquare, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useGetPosts } from "@/src/features/post/hooks";

type Post = {
  _id: string;
  content: string;
  authorId?: string;
  createdAt?: string;
};

export default function PostsPage() {
  const { data, isLoading } = useGetPosts();
  const posts: Post[] = Array.isArray(data) ? data : [];

  if (isLoading) {
    return <p className="text-sm text-white/60">Loading posts...</p>;
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">Developers post</h1>
        <Button asChild>
          <Link href="/new-post">New Post</Link>
        </Button>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
          <p className="text-white/70">
            No posts yet. Be the first to share something 🚀
          </p>
          <Button asChild className="mt-4">
            <Link href="/new-post">Create Post</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <article
              key={post._id}
              className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition hover:bg-white/8"
            >
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/90">
                {post.content}
              </p>
              <div className="mt-4 flex items-center gap-4 text-xs text-white/50">
                <span className="inline-flex items-center gap-1">
                  <UserRound className="size-3.5" />
                  {post.authorId || "Unknown"}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MessageSquare className="size-3.5" />
                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleString()
                    : "Recently"}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

