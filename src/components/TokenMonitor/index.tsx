"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function TokenMonitor() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.warning("Token ausente, redirecionando...");
      router.push("/login");
    }

    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.warning("Token expirou, redirecionando...");
        router.push("/login");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return null;
}
