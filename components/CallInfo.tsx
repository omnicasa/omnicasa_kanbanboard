"use client";

import React from "react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ChevronDown, Phone, Plus } from "lucide-react";

interface CallInfoProps {
  id: number;
  src: string;
  count: number;
  content: string;
}

export default function CallInfo({ id, src, count, content }: CallInfoProps) {
  return (
    <>
      {id === 4 ? (
        <HoverCard>
          <HoverCardTrigger>
            <div className="flex items-center gap-0.5">
              <div className="w-4 h-4 relative">
                <Image
                  src={src}
                  fill
                  className="object-contain"
                  alt={content}
                />
              </div>
              <span className="text-sm font-sans font-normal leading-5 text-primary">
                {count}
              </span>
            </div>
          </HoverCardTrigger>
          <HoverCardContent
            side="bottom"
            align="start"
            className="w-[339px] flex flex-col py-1"
          >
            <div className="px-2 py-1.5 gap-[10px] text-muted-foreground overflow-hidden text-ellipse text-xs font-medium leading-normal">
              Next activities
            </div>
            <div className="gap-2 px-2 py-1.5 flex items-center">
              <div className="p-2 bg-secondary rounded-full shadow-sm relative">
                <Image
                  src="/images/calendar.svg"
                  width={20}
                  height={20}
                  className="object-contain"
                  alt="Calendar"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="overflow-hidden text-ellipsis text-primary text-sm font-sans font-medium leading-5">
                  Meeting
                </h2>
                <p className="overflow-hidden text-ellipsis text-muted-foreground text-sm font-sans font-normal leading-5">
                  Tomorrow at 7:00 AM - John Doe +1
                </p>
              </div>
            </div>
            <div className="gap-2 px-2 py-1.5 flex items-center">
              <div className="p-2 bg-secondary rounded-full shadow-sm relative">
                <Phone size={20} className="text-primary" />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="overflow-hidden text-ellipsis text-primary text-sm font-sans font-medium leading-5">
                  Call
                </h2>
                <p className="overflow-hidden text-ellipsis text-muted-foreground text-sm font-sans font-normal leading-5">
                  Tomorrow at 9:00 AM - John Doe +2
                </p>
              </div>
            </div>
            <div className="gap-2 px-2 py-1.5 flex items-center">
              <div className="p-2 bg-secondary rounded-full shadow-sm relative">
                <Plus size={20} className="text-primary" />
              </div>
              <h2 className="overflow-hidden text-ellipsis text-primary text-sm font-sans font-medium leading-5">
                Schedule a Call/ Meeting
              </h2>
              <ChevronDown size={20} className="text-primary" />
            </div>
          </HoverCardContent>
        </HoverCard>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-0.5">
                <div className="w-4 h-4 relative">
                  <Image
                    src={src}
                    fill
                    className="object-contain"
                    alt={content}
                  />
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
      )}
    </>
  );
}
