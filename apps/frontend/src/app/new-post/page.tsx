"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Button } from "@/src/components/ui/button";
import { useCreatePost } from "@/src/features/post/hooks";
import { useAuthGuard } from "@/src/hooks/useAuthGuard";

export default function NewPostPage() {
  useAuthGuard();

  const router = useRouter();
  const [content, setContent] = useState("");
  const createPost = useCreatePost();

  const submitPost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedContent = content.trim();
    if (!trimmedContent) return;

    createPost.mutate(
      { content: trimmedContent },
      {
        onSuccess: () => {
          setContent("");
          toast.success("Post created");
          router.push("/posts");
        },
        onError: () => {
          toast.error("Failed to create post");
        },
      }
    );
  };

  return (
    <section className="mx-auto max-w-2xl">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h1 className="text-xl font-semibold text-white">Create new post</h1>
        <p className="mt-1 text-sm text-white/60">
          Share what you are building with the DevCircle community.
        </p>

        <form onSubmit={submitPost} className="mt-5 space-y-4">
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="What are you working on?"
            className="min-h-36 w-full rounded-xl bg-white/8 p-3 text-sm text-white placeholder:text-white/40 ring-1 ring-white/10 outline-none transition focus:ring-violet-500/60"
          />

          <div className="flex items-center justify-end gap-2">
            <Button asChild variant="outline">
              <Link href="/posts">Cancel</Link>
            </Button>
            <Button type="submit" disabled={createPost.isPending || !content.trim()}>
              {createPost.isPending ? "Posting..." : "Post"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

