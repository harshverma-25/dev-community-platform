"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/features/auth/store";

export const useAuthGuard = () => {
  const token = useAuthStore((state) => state.token);
  const setToken = useAuthStore((state) => state.setToken);
  const router = useRouter();

  useEffect(() => {
    if (token) return;

    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      return;
    }

    if (!storedToken) {
      router.push("/login");
    }
  }, [router, setToken, token]);
};