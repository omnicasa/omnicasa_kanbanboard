"use client";

import React from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Bath, BedDouble, CarFront, Map } from "lucide-react";
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

const DetailProperty: React.FC = () => {
  return (
    <div className="flex flex-col items-start self-stretch w-[324px] bg-white border rounded-lg shadow-md">
      <AspectRatio ratio={1.618 / 1}>
        <Image
          src="/images/picture1.png"
          alt="Image"
          width={324}
          height={200}
          className="rounded-t-sm object-cover"
        />
      </AspectRatio>
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
  );
};

export default DetailProperty;
