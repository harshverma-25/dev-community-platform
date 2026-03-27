"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createProfile } from "@/src/features/user/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthGuard } from "@/src/hooks/useAuthGuard";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";

type FormData = {
  username: string;
  bio: string;
  techStack: string;
};

export default function CreateProfilePage() {
  useAuthGuard();

  const { register, handleSubmit } = useForm<FormData>();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: FormData) =>
      createProfile({
        username: data.username.trim(),
        bio: data.bio.trim(),
        techStack: data.techStack
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      }),
    onSuccess: () => {
      toast.success("Profile created 🎉");
      router.push("/");
    },
    onError: () => {
      toast.error("Failed to create profile ❌");
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-lg flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
      >
        <h2 className="text-xl font-semibold text-white">Create Profile</h2>

        <Input
          {...register("username")}
          placeholder="Username"
        />

        <textarea
          {...register("bio")}
          placeholder="Bio"
          className="min-h-24 rounded-md bg-white/6 p-3 text-sm text-white placeholder:text-white/40 ring-1 ring-white/10 outline-none focus:ring-violet-500/60"
        />

        <Input
          {...register("techStack")}
          placeholder="Tech Stack (comma separated)"
        />

        <Button type="submit">
          Create Profile
        </Button>
      </form>
    </div>
  );
}