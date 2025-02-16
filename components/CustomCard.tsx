"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import CallInfo from "./CallInfo";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFetchHistory } from "@/hooks/useFetchData";

interface CustomCardProps {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  images: string[];
  badge: boolean;
  footerAgent: string;
}

interface HistoryRecord {
  ChildId: number;
  CreateUserId: number;
  CreateUserInfo: {
    Name: string;
  };
  Date: string;
  Description: string;
  Done: boolean;
  ReferencePerson: string;
  Subject: string;
  TypeId: number;
  TypeNameNL: string;
}

export default function CustomCard({
  id,
  title,
  subtitle,
  date,
  images,
  badge,
  footerAgent,
}: CustomCardProps) {
  const { data: historys } = useFetchHistory(id);
  const countOutgoing = historys?.Records?.filter((item: HistoryRecord) =>
    ["Tel uit"].includes(item.TypeNameNL)
  ).length;
  const countMissedCalls = historys?.Records?.filter((item: HistoryRecord) =>
    ["Tel in"].includes(item.TypeNameNL)
  ).length;
  const countSentMessages = historys?.Records?.filter((item: HistoryRecord) =>
    ["SMS verzonden"].includes(item.TypeNameNL)
  ).length;
  const countAppointment = historys?.Records?.filter((item: HistoryRecord) =>
    ["Contact"].includes(item.TypeNameNL)
  ).length;

  const callInfoData = [
    {
      id: 1,
      src: "/images/outgoing-call.svg",
      count: countOutgoing,
      content: "Number of calls",
    },
    {
      id: 2,
      src: "/images/missed-call.svg",
      count: countMissedCalls,
      content: "Call attempts",
    },
    {
      id: 3,
      src: "/images/chat-message.svg",
      count: countSentMessages,
      content: "Number of SMS sent",
    },
    {
      id: 4,
      src: "/images/schedule.svg",
      count: countAppointment,
      content: "Next activities",
    },
  ];

  const formatDateDifference = (start: Date, end: string) => {
    const diffInMs = Math.abs(
      new Date(end).getTime() - new Date(start).getTime()
    );
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays < 7) {
      return `${diffInDays + 1}d`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks}w`;
    } else {
      const months = Math.floor(diffInDays / 30);
      return `${months}m`;
    }
  };
  const startDate = new Date();
  const dateDifference = formatDateDifference(startDate, date);
  return (
    <Link href={`/lead-details?id=${id}`}>
      <Card className="w-[310px] p-4 flex flex-col items-start gap-4">
        <CardHeader className="p-0 w-full">
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-primary font-sans text-base font-semibold leading-6 tracking-tight">
              {title}
            </CardTitle>
            <span className="text-right text-third font-sans text-sm font-normal leading-5">
              {dateDifference}
            </span>
          </div>
          <CardDescription className="text-muted-foreground font-sans text-sm font-normal leading-5">
            {subtitle}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-start gap-4 w-full p-0">
          {images.length === 1 ? (
            <Image
              src={images[0]}
              alt="Image"
              width={310}
              height={150}
              className="rounded-sm object-cover"
            />
          ) : (
            images.length > 1 && (
              <Carousel className={"w-full max-w-xs"}>
                <CarouselContent>
                  {images.map((src, index) => (
                    <CarouselItem key={index} className="basis-0.85">
                      <div className="w-[240px] h-[150px]">
                        <Card className="h-full rounded-md flex items-center justify-center">
                          <CardContent className="flex items-center justify-center p-0">
                            <Image
                              src={src}
                              width={240}
                              height={150}
                              alt={`image-${index}`}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            )
          )}
          {badge && <Badge variant="destructive">Lower in price</Badge>}
          <div className="flex items-center gap-4">
            {callInfoData.map((info, index) => (
              <CallInfo
                key={index}
                id={info.id}
                src={info.src}
                count={info.count}
                content={info.content}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between w-full p-0">
          <div>
            <span className="text-center text-muted-foreground font-sans text-sm font-normal leading-5">
              From
            </span>
            <span className="ml-2 overflow-hidden text-ellipsis text-primary font-sans text-sm font-medium leading-5">
              {footerAgent}
            </span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Image
                  src="/images/avatar.png"
                  width={20}
                  height={20}
                  alt="property"
                  className="rounded-full"
                />
              </TooltipTrigger>
              <TooltipContent side="right" align="center">
                <p>{footerAgent}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>
    </Link>
  );
}
