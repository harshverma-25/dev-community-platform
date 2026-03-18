"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signupUser } from "@/src/features/auth/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function SignupPage() {
  const { register, handleSubmit } = useForm<FormData>();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      toast.success("Account created 🎉");
      router.push("/login");
    },
    onError: () => {
      toast.error("Signup failed ❌");
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-6 border rounded-xl w-80"
      >
        <h2 className="text-xl font-bold">Signup</h2>

        <input
          {...register("name")}
          placeholder="Name"
          className="border p-2 rounded"
        />

        <input
          {...register("email")}
          placeholder="Email"
          className="border p-2 rounded"
        />

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
        />

        <button className="bg-black text-white p-2 rounded">
          Signup
        </button>
      </form>
    </div>
  );
}