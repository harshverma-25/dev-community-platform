"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/src/features/auth/api";
import { useAuthStore } from "@/src/features/auth/store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<FormData>();
  const setToken = useAuthStore((state) => state.setToken);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: loginUser,

    onSuccess: (data: any) => {
      // 🔥 HANDLE ALL POSSIBLE RESPONSE FORMATS
      const token =
        data?.token || data?.data?.token || data?.accessToken;

      console.log("LOGIN RESPONSE:", data);
      console.log("EXTRACTED TOKEN:", token);

      if (!token) {
        toast.error("Token not found ❌");
        return;
      }

      setToken(token); // ✅ store in localStorage
      toast.success("Login successful 🚀");

      router.push("/"); // redirect
    },

    onError: () => {
      toast.error("Invalid credentials ❌");
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
      >
        <h2 className="text-xl font-semibold text-white">Login</h2>

        <Input
          {...register("email")}
          placeholder="Email"
        />

        <Input
          {...register("password")}
          type="password"
          placeholder="Password"
        />

        <Button type="submit">Login</Button>

        <p className="text-center text-xs text-white/60">
          New here?{" "}
          <Link href="/signup" className="text-white underline underline-offset-4">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}