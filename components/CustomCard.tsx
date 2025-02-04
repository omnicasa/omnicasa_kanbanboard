import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CustomCard() {
  return (
    <Card className="w-[310px] p-4 border flex flex-col items-start gap-4 rounded-lg bg-white shadow-sm">
      <CardHeader className="p-0">
        <div className="flex items-start justify-between">
          <CardTitle className="text-primary font-sans text-base font-semibold leading-6 tracking-tight">
            99 Boulevard de I'Innovation, Ghent, Belgium
          </CardTitle>
          <span className="text-right text-gray-500 font-sans text-sm font-normal leading-5">
            1d
          </span>
        </div>
        <CardDescription className="text-gray-500 font-sans text-sm font-normal leading-5">
          Talan Curtis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" className="w-full">
          Lower in price
        </Button>
        <div className="flex items-center">
          <div className="flex items-center">
            <Image
              src="/images/outgoing-call.svg"
              width={50}
              height={50}
              alt="property"
            />
            <span className="text-sm text-gray-500 ml-2">4</span>
          </div>
          <div className="flex items-center">
            <Image
              src="/images/missed-call.svg"
              width={50}
              height={50}
              alt="property"
            />
            <span className="text-sm text-gray-500 ml-2">1</span>
          </div>
          <div className="flex items-center">
            <Image
              src="/images/chat-message.svg"
              width={50}
              height={50}
              alt="property"
            />
            <span className="text-sm text-gray-500 ml-2">0</span>
          </div>
          <div className="flex items-center">
            <Image
              src="/images/schedule.svg"
              width={50}
              height={50}
              alt="property"
            />
            <span className="text-sm text-gray-500 ml-2">2</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div>
          <span>From</span>
          <span>Other Agent</span>
        </div>
        <Image src="/images/avatar.png" width={50} height={50} alt="property" />
      </CardFooter>
    </Card>
  );
}
