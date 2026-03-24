"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/src/features/auth/store";
import { useGetMe } from "@/src/features/user/hooks";

export default function HomePage() {
  const { data, isLoading } = useGetMe();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (data) {
      console.log("SETTING USER:", data); // 🔥 DEBUG
      setUser(data); // ✅ THIS WAS MISSING
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;

  return <div>Welcome {data?.username}</div>;
}