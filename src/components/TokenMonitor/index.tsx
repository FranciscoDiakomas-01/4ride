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
      router.push("/");
    }

    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.warning("Token expirou, redirecionando...");
        router.push("/");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return null;
}
