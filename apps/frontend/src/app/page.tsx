"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/src/features/auth/store";
import { useGetMe } from "@/src/features/user/hooks";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/src/hooks/useAuthGuard";

export default function HomePage() {
  useAuthGuard();

  const { data, isLoading, isError } = useGetMe();
  const setUser = useAuthStore((state) => state.setUser);

  const router = useRouter();

  useEffect(() => {
    if (data) {
      setUser(data); // 🔥 VERY IMPORTANT
    }
  }, [data]);

  useEffect(() => {
    if (!isLoading && isError) {
      router.push("/create-profile");
    }
  }, [isLoading, isError]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1>Welcome {data?.username} 🚀</h1>
    </div>
  );
}