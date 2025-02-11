"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Bath, BedDouble, CarFront, FileText, Map } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import DetailStatus from "./DetailStatus";

const pipe_status = [
  {
    value: "New",
    label: "New",
  },
  {
    value: "Contacted but No Communication",
    label: "Contacted but No Communication",
  },
  {
    value: "Call 1",
    label: "Call 1",
  },
  {
    value: "Call 2",
    label: "Call 2",
  },
  {
    value: "Appointment Set",
    label: "Appointment Set",
  },
  {
    value: "Appointment Done",
    label: "Appointment Done",
  },
  {
    value: "Follow Up 1 Month",
    label: "Follow Up 1 Month",
  },
  {
    value: "Follow Up 2 Months",
    label: "Follow Up 2 Months",
  },
  {
    value: "Follow Up 3 Months",
    label: "Follow Up 3 Months",
  },
  {
    value: "Follow Up 6 Months",
    label: "Follow Up 6 Months",
  },
];

const pipeline = [
  {
    value: "Cold Owner",
    label: "Cold Owner",
  },
  {
    value: "Cold Adoption",
    label: "Cold Adoption",
  },
  {
    value: "Warm Bought",
    label: "Warm Bought",
  },
  {
    value: "Warm Leads",
    label: "Warm Leads",
  },
];

const images = [
  "/images/picture1.png",
  "/images/picture2.png",
  "/images/picture3.png",
];

const DetailProperty: React.FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-start self-stretch w-[324px] bg-white border rounded-lg shadow-md">
        <div className="relative">
          {images.length === 1 ? (
            <Image
              src="/images/picture1.png"
              alt="Image"
              width={324}
              height={200}
              className="rounded-t-sm object-cover"
            />
          ) : (
            images.length > 1 && (
              <Carousel className={"w-full max-w-xs"}>
                <CarouselContent>
                  {images.map((src, index) => (
                    <CarouselItem key={index}>
                      <div className="w-[324px] h-[200px]">
                        <Card className="h-full rounded-md flex items-center justify-center">
                          <CardContent className="flex items-center justify-center p-0 flex-1">
                            <Image
                              src={src}
                              width={324}
                              height={200}
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
            )
          )}

          <Badge
            variant="outline"
            className="absolute w-[70px] px-2.5 py-1 left-3 top-3 rounded-md border border-transparent text-primary-foreground font-xs bg-[#0786FD] shadow-md"
          >
            For Sale
          </Badge>
        </div>
        <div className="flex flex-col p-5 gap-5">
          <div>
            <h1 className="text-card-foreground font-sans text-base font-semibold leading-6 capitalize">
              99 Boulevard de l&apos;Innovation, Ghent, Belgium
            </h1>
            <p className="text-muted-foreground font-sans text-sm font-normal leading-5 mt-1.5">
              Boulevard de l&apos;Innovation, 99, Ghent
            </p>
          </div>
          <div className="flex items-center justify-start space-x-4">
            <div className="flex items-center space-x-1">
              <BedDouble className="h-5 w-5 text-muted-foreground" />
              <label className="text-primary text-center font-sans text-sm font-normal leading-5">
                1
              </label>
            </div>
            <div className="flex items-center space-x-1">
              <Bath className="h-5 w-5 text-muted-foreground" />
              <label className="text-primary text-center font-sans text-sm font-normal leading-5">
                1
              </label>
            </div>
            <div className="flex items-center space-x-1">
              <CarFront className="h-5 w-5 text-muted-foreground" />
              <label className="text-primary text-center font-sans text-sm font-normal leading-5">
                1
              </label>
            </div>
            <div className="flex items-center space-x-1">
              <Map className="h-5 w-5 text-muted-foreground" />
              <label className="text-primary text-center font-sans text-sm font-normal leading-5">
                100 m²
              </label>
            </div>
          </div>
          <Separator className="border" />
          <div className="flex flex-col items-start">
            <h1 className="text-card-foreground font-sans text-base font-semibold leading-6">
              Property Details
            </h1>
            <div className="flex flex-col items-start mt-4 gap-3 w-full">
              <div className="flex items-center justify-between gap-2 w-full">
                <h2 className="text-muted-foreground font-sans text-sm font-normal leading-5 flex-1">
                  EPC
                </h2>
                <div className="flex items-center flex-1 relative">
                  <Image
                    src="/images/epc.svg"
                    alt="epc"
                    width={61}
                    height={20}
                    className="absolute right-0"
                  />
                  <Image
                    src="/images/d.svg"
                    alt="d"
                    width={30}
                    height={17}
                    className="absolute right-0"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 w-full">
                <h2 className="text-muted-foreground font-sans text-sm font-normal leading-5 flex-1">
                  Lead Source
                </h2>
                <h3 className="text-primary text-right font-sans text-sm font-normal leading-5 flex-1">
                  Other agent
                </h3>
              </div>
              <div className="flex items-center justify-between gap-2 w-full">
                <h2 className="text-muted-foreground font-sans text-sm font-normal leading-5 flex-1">
                  Listing agent
                </h2>
                <h3 className="text-primary text-right font-sans text-sm font-normal leading-5 flex-1">
                  Greenfield Realty
                </h3>
              </div>
              <div className="flex items-center justify-between gap-2 w-full">
                <h2 className="text-muted-foreground font-sans text-sm font-normal leading-5 flex-1">
                  Site
                </h2>
                <h3 className="text-primary text-right font-sans text-sm font-normal leading-5 flex-1">
                  Greenfield Realty - Oakwood
                </h3>
              </div>
              <div className="flex items-center justify-between gap-2 w-full">
                <h2 className="text-muted-foreground font-sans text-sm font-normal leading-5 flex-1">
                  Days on Market
                </h2>
                <h3 className="text-primary text-right font-sans text-sm font-normal leading-5 flex-1">
                  1 day
                </h3>
              </div>
              <div className="flex items-center justify-between gap-2 w-full">
                <h2 className="text-muted-foreground font-sans text-sm font-normal leading-5 flex-1">
                  Pipeline
                </h2>
                <DetailStatus statuss={pipeline} title="pipeline" />
              </div>
              <div className="flex items-center justify-between gap-2 w-full">
                <h2 className="text-muted-foreground font-sans text-sm font-normal leading-5 flex-1">
                  Pipe status
                </h2>
                <DetailStatus statuss={pipe_status} title="status" />
              </div>
              <div className="flex items-center justify-between gap-2 w-full">
                <h2 className="text-muted-foreground font-sans text-sm font-normal leading-5 flex-1">
                  Record
                </h2>
                <h3 className="text-primary text-right font-sans text-sm font-normal leading-5 flex-1">
                  P-BCB-00051
                </h3>
              </div>
              <div className="flex items-center justify-between gap-2 w-full">
                <h2 className="text-muted-foreground font-sans text-sm font-normal leading-5 flex-1">
                  Manager
                </h2>
                <h3 className="text-primary text-right font-sans text-sm font-normal leading-5 flex-1">
                  John Doe
                </h3>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="flex h-9 px-4 py-2 justify-center items-center gap-2 self-stretch rounded-md border bg-white shadow-sm"
          >
            Shore more
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-start self-stretch w-[324px] bg-white border rounded-lg shadow-md p-5 gap-5">
        <h1 className="text-card-foreground font-sans text-base font-semibold leading-6 capitalize">
          PDF Attachments
        </h1>
        <div className="flex flex-col items-start mt-4 gap-3 w-full">
          <div className="flex items-start justify-between p-2 gap-2.5 w-full">
            <FileText className="h-[40px] w-[40px] text-[#B30B00] p-[6.67px]" />
            <div className="flex flex-col items-start gap-1 flex-1">
              <h2 className="overflow-hidden text-primary text-ellipsis font-sans text-sm font-normal leading-5 flex-1">
                Zimmo_report_2025-01-24.pdf
              </h2>
              <h3 className="text-muted-foreground font-sans text-xs font-normal leading-none flex-1">
                Portal: Immoweb
              </h3>
              <h3 className="text-muted-foreground font-sans text-xs font-normal leading-none flex-1">
                Date: 2025-01-23
              </h3>
            </div>
          </div>
          <div className="flex items-start justify-between p-2 gap-2.5 w-full">
            <FileText className="h-[40px] w-[40px] text-[#B30B00] p-[6.67px]" />
            <div className="flex flex-col items-start gap-1 flex-1">
              <h2 className="overflow-hidden text-primary text-ellipsis font-sans text-sm font-normal leading-5 flex-1">
                Zimmo_report_2025-01-24.pdf
              </h2>
              <h3 className="text-muted-foreground font-sans text-xs font-normal leading-none flex-1">
                Portal: Immoweb
              </h3>
              <h3 className="text-muted-foreground font-sans text-xs font-normal leading-none flex-1">
                Date: 2025-01-23
              </h3>
            </div>
          </div>
          <div className="flex items-start justify-between p-2 gap-2.5 w-full">
            <FileText className="h-[40px] w-[40px] text-[#B30B00] p-[6.67px]" />
            <div className="flex flex-col items-start gap-1 flex-1">
              <h2 className="overflow-hidden text-primary text-ellipsis font-sans text-sm font-normal leading-5 flex-1">
                Zimmo_report_2025-01-24.pdf
              </h2>
              <h3 className="text-muted-foreground font-sans text-xs font-normal leading-none flex-1">
                Portal: Immoweb
              </h3>
              <h3 className="text-muted-foreground font-sans text-xs font-normal leading-none flex-1">
                Date: 2025-01-23
              </h3>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          className="flex h-9 px-4 py-2 justify-center items-center gap-2 self-stretch rounded-md border bg-white shadow-sm"
        >
          Shore more
        </Button>
      </div>
    </div>
  );
};

export default DetailProperty;
