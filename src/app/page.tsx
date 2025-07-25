"use client";

import InitialScreen from "@/components/Initial";
import SplashScreen from "@/components/SplashScreen";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const [load, setLoad] = useState(true);
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const timeout = setTimeout(() => {
      if (token && role) {
        if (role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/user");
        }
        return;
      }
      setLoad(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return <>{load ? <SplashScreen /> : <InitialScreen />}</>;
}
