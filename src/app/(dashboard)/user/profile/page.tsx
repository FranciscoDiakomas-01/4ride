"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  return (
    <main className="w-full flex flex-col gap-4">
      <span className="p-4 sticky top-0 shadow-md bg-white flex items-center gap-3 text-xl font-semibold">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => {
            router.back();
          }}
        />
        <h1>Notificações</h1>
      </span>
    </main>
  );
}
