"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createProfile } from "@/src/features/user/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type FormData = {
  username: string;
  bio: string;
  techStack: string;
};

export default function CreateProfilePage() {
  const { register, handleSubmit } = useForm<FormData>();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: FormData) =>
      createProfile({
        username: data.username,
        bio: data.bio,
        techStack: data.techStack.split(","),
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
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-6 border rounded-xl w-96"
      >
        <h2 className="text-xl font-bold">Create Profile</h2>

        <input
          {...register("username")}
          placeholder="Username"
          className="border p-2 rounded"
        />

        <textarea
          {...register("bio")}
          placeholder="Bio"
          className="border p-2 rounded"
        />

        <input
          {...register("techStack")}
          placeholder="Tech Stack (comma separated)"
          className="border p-2 rounded"
        />

        <button className="bg-black text-white p-2 rounded">
          Create Profile
        </button>
      </form>
    </div>
  );
}