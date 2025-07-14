"use client";

import Loader from "@/components/Loader";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const [load, setLoad] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 3000);
  }, []);
  return (
    <main className="w-full flex flex-col gap-4">
      <span className="p-4 sticky top-0 shadow-md bg-white flex items-center gap-3 text-xl font-semibold">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => {
            router.back();
          }}
        />
        <h1>Pagamentos</h1>
      </span>

      {load ? (
        <div className="flex justify-center min-h-[70dvh] items-center scale-75">
          <Loader type="Spinner" />
        </div>
      ) : (
        <span></span>
      )}
    </main>
  );
}
