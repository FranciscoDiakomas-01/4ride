"use client";

import { IStats } from "@/types/stats";
import { ArrowUp } from "lucide-react";
import { Button } from "../ui/button";

interface prop {
  stats: IStats;
  iskz: boolean;
  showBtn ?: boolean
}
export default function Stats({ stats, iskz , showBtn = true}: prop) {
  return (
    <figure className="border p-3 rounded-sm border-primary/10 gap-5 min-h-[120px] flex flex-col justify-between">
      <span className="flex justify-between gap-4">
        {stats.icon}
        <div>{stats.title}</div>
      </span>
      <div className="flex gap-4 flex-col">
        <h1 className="font-semibold text-2xl text-primary">
          {Number(stats.value).toLocaleString("pt")} {iskz && "Kz"}
        </h1>

        {showBtn && (
          <Button>
            Detalhes
            <ArrowUp size={12} className="rotate-30" />
          </Button>
        )}
      </div>
    </figure>
  );
}
