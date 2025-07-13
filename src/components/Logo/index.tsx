"use client";
import Image from "next/image";
import logo from "@/assets/logo.png";

export default function Logo( { h , w } : { w : string , h : string}) {
  return (
    <div className={` ${h} ${w}`}>
      <Image src={logo} alt="Logo 4Ride" />
    </div>
  );
}
