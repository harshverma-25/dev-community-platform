"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/src/features/auth/api";
import { useAuthStore } from "@/src/features/auth/store";
import toast from "react-hot-toast";

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<FormData>();
  const setToken = useAuthStore((state) => state.setToken);

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setToken(data.token);
      toast.success("Login successful 🚀");
    },
    onError: () => {
      toast.error("Invalid credentials ❌");
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
        <h2 className="text-xl font-bold">Login</h2>

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

        <button
          type="submit"
          className="bg-black text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}