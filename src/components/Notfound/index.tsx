"use client";
import box from "@/assets/box.png";
import Image from "next/image";
import { Button } from "../ui/button";

interface prop {
  message: string;
  buttonLabel?: string;
  onclick?(): void;
}
export default function Notfound({ message, buttonLabel, onclick }: prop) {
  return (
    <main className="min-h-[50dvh] w-screen flex justify-center items-center flex-col gap-3 ">
      <div className="flex flex-col gap-4 justify-center items-center">
        <Image
          src={box}
          alt="box"
          className="h-30 w-30 object-contain animate-pulse"
        />

        <h1 className="font-semibold text-center text-primary text-[17px]">
          {message}
        </h1>
        {buttonLabel && onclick && (
          <Button
            className="w-full h-[45px] text-md"
            onClick={() => {
              onclick();
            }}
          >
            {buttonLabel}
          </Button>
        )}
      </div>
    </main>
  );
}
