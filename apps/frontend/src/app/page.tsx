"use client";

import { useAuthGuard } from "@/src/hooks/useAuthGuard";
import { useGetMe } from "@/src/features/user/hooks";

export default function HomePage() {
  useAuthGuard();

  const { data, isLoading } = useGetMe();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">
        Welcome {data?.username} 🚀
      </h1>
    </div>
  );
}