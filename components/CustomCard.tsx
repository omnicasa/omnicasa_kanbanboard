import Image from "next/image";
import React from "react";
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

export default function CustomCard() {
  const images = [
    "/images/picture1.png",
    "/images/picture2.png",
    "/images/picture3.png",
  ];
  return (
    <Card className="w-[310px] p-4 border flex flex-col items-start gap-4 rounded-lg bg-white shadow-sm">
      <CardHeader className="p-0">
        <div className="flex items-start justify-between">
          <CardTitle className="text-primary font-sans text-base font-semibold leading-6 tracking-tight">
            99 Boulevard de I&apos;Innovation, Ghent, Belgium
          </CardTitle>
          <span className="text-right text-gray-500 font-sans text-sm font-normal leading-5">
            1d
          </span>
        </div>
        <CardDescription className="text-gray-500 font-sans text-sm font-normal leading-5">
          Talan Curtis
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
        <Badge variant="destructive">Lower in price</Badge>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-0.5">
            <Image
              src="/images/outgoing-call.svg"
              width={16}
              height={16}
              alt="property"
            />
            <span className="text-sm font-sans font-normal leading-5 text-primary">
              4
            </span>
          </div>
          <div className="flex items-center gap-0.5">
            <Image
              src="/images/missed-call.svg"
              width={16}
              height={16}
              alt="property"
            />
            <span className="text-sm font-sans font-normal leading-5 text-primary">
              1
            </span>
          </div>
          <div className="flex items-center gap-0.5">
            <Image
              src="/images/chat-message.svg"
              width={16}
              height={16}
              alt="property"
            />
            <span className="text-sm font-sans font-normal leading-5 text-primary">
              0
            </span>
          </div>
          <div className="flex items-center gap-0.5">
            <Image
              src="/images/schedule.svg"
              width={16}
              height={16}
              alt="property"
            />
            <span className="text-sm font-sans font-normal leading-5 text-primary">
              2
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between w-full p-0">
        <div>
          <span className="text-center text-muted-foreground font-sans text-sm font-normal leading-5">
            From
          </span>
          <span className="ml-2 overflow-hidden text-ellipsis text-primary font-sans text-sm font-medium leading-5">
            Other Agent
          </span>
        </div>
        <Image
          src="/images/avatar.png"
          width={20}
          height={20}
          alt="property"
          className="rounded-full"
        />
      </CardFooter>
    </Card>
  );
}
