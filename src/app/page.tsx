"use client";
import InitialScreen from "@/components/Initial";
import SplashScreen from "@/components/SplashScreen";
import { useEffect, useState } from "react";

export default function Home() {
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 3000);
  }, []);
  return <>{load ? <SplashScreen /> : <InitialScreen />}</>;
}
