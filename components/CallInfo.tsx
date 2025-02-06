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
      <Image src={src} width={16} height={16} alt={alt} />
      <span className="text-sm font-sans font-normal leading-5 text-primary">
        {count}
      </span>
    </div>
  );
}
