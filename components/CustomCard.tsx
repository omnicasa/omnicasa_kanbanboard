"use client";

import React, { useEffect, useState } from "react";
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

interface CustomCardProps {
  title: string;
  subtitle: string;
  date: string;
  images: string[];
  badgeText: string;
  callInfo: { src: string; count: number; alt: string }[];
  footerText: string;
  footerAgent: string;
  footerImage: string;
}

export default function CustomCard({
  title,
  subtitle,
  date,
  images,
  badgeText,
  callInfo,
  footerText,
  footerAgent,
  footerImage,
}: CustomCardProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // const images = [
  //   "/images/picture1.png",
  //   "/images/picture2.png",
  //   "/images/picture3.png",
  // ];

  if (!isClient) {
    return null; // or a loading spinner, or some placeholder
  }

  return (
    <Card className="w-[310px] p-4 border flex flex-col items-start gap-4 rounded-lg bg-white shadow-sm">
      <CardHeader className="p-0">
        <div className="flex items-start justify-between">
          <CardTitle className="text-primary font-sans text-base font-semibold leading-6 tracking-tight">
            {title}
          </CardTitle>
          <span className="text-right text-gray-500 font-sans text-sm font-normal leading-5">
            {date}
          </span>
        </div>
        <CardDescription className="text-gray-500 font-sans text-sm font-normal leading-5">
          {subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-start gap-4 w-full p-0">
        <Carousel className="w-full max-w-xs">
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
                        alt="down-arrow"
                        className="w-full h-full object-cover rounded-md"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <Badge variant="destructive">{badgeText}</Badge>
        <div className="flex items-center gap-4">
          {callInfo.map((info, index) => (
            <CallInfo
              key={index}
              src={info.src}
              count={info.count}
              alt={info.alt}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between w-full p-0">
        <div>
          <span className="text-center text-muted-foreground font-sans text-sm font-normal leading-5">
            {footerText}
          </span>
          <span className="ml-2 overflow-hidden text-ellipsis text-primary font-sans text-sm font-medium leading-5">
            {footerAgent}
          </span>
        </div>
        <Image
          src={footerImage}
          width={20}
          height={20}
          alt="property"
          className="rounded-full"
        />
      </CardFooter>
    </Card>
  );
}
