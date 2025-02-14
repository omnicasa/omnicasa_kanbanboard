"use client";

import React from "react";
import Image from "next/image";

interface CallInfoProps {
  src: string;
  count: number;
  alt: string;
}

export default function CallInfo({ src, count, alt }: CallInfoProps) {
  return (
    <div className="flex items-center gap-0.5">
      <div className="w-4 h-4 relative">
        <Image src={src} fill className="object-contain" alt={alt} />
      </div>
      <span className="text-sm font-sans font-normal leading-5 text-primary">
        {count}
      </span>
    </div>
  );
}
