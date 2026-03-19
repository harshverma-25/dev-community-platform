"use client";

import { useAuthGuard } from "@/src/hooks/useAuthGuard";
import { useGetMe } from "@/src/features/user/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  useAuthGuard();

  const { data, isLoading, isError } = useGetMe();
  const router = useRouter();

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