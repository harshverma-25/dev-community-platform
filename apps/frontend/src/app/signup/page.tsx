"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signupUser } from "@/src/features/auth/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
      >
        <h2 className="text-xl font-semibold text-white">Signup</h2>

        <Input
          {...register("name")}
          placeholder="Name"
        />

        <Input
          {...register("email")}
          placeholder="Email"
        />

        <Input
          {...register("password")}
          type="password"
          placeholder="Password"
        />

        <Button type="submit">Signup</Button>

        <p className="text-center text-xs text-white/60">
          Already have an account?{" "}
          <Link href="/login" className="text-white underline underline-offset-4">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}