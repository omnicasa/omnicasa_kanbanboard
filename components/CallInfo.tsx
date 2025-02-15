"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CallInfoProps {
  id: number;
  src: string;
  count: number;
  content: string;
}

export default function CallInfo({ id, src, count, content }: CallInfoProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-0.5">
            <div className="w-4 h-4 relative">
              <Image src={src} fill className="object-contain" alt={content} />
            </div>
            <span className="text-sm font-sans font-normal leading-5 text-primary">
              {count}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="start">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
