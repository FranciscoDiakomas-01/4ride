"use client";
import InitialScreen from "@/components/Initial";
import SplashScreen from "@/components/SplashScreen";
import { useEffect, useState } from "react";

import "aos/dist/aos.css";
import AOS from "aos";
export default function Home() {
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 3000);
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);
  return <>{load ? <SplashScreen /> : <InitialScreen />}</>;
}
