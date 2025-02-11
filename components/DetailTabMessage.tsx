"use client";

import { Separator } from "./ui/separator";
import React from "react";
import CustomCombobox from "./CustomCombobox";
import { Bold, Italic, Underline } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Textarea } from "./ui/textarea";

const sendUsers = [
  {
    value: "Jhon Doe(john@greenfield.com)",
    label: "Jhon Doe(john@greenfield.com)",
  },
  {
    value: "Jacob Jones(jacob@greenfield.com)",
    label: "Jacob Jones(jacob@greenfield.com)",
  },
  {
    value: "Dianne Russell(dianne@greenfield.com)",
    label: "Dianne Russell(dianne@greenfield.com)",
  },
  {
    value: "Darrell Steward(darell@greenfield.com)",
    label: "Darrell Steward(darell@greenfield.com)",
  },
];

const receiveUsers = [
  {
    value: "Talan Curtis (talan@hotmail.com)",
    label: "Talan Curtis (talan@hotmail.com)",
  },
  {
    value: "Jacob Jones(jacob@greenfield.com)",
    label: "Jacob Jones(jacob@greenfield.com)",
  },
  {
    value: "Dianne Russell(dianne@greenfield.com)",
    label: "Dianne Russell(dianne@greenfield.com)",
  },
  {
    value: "Darrell Steward(darell@greenfield.com)",
    label: "Darrell Steward(darell@greenfield.com)",
  },
];

const templates = [
  {
    value: "Do not use template",
    label: "Do not use template",
  },
  {
    value: "Property Inquiry Form",
    label: "Property Inquiry Form",
  },
  {
    value: "Open House Registration",
    label: "Open House Registration",
  },
  {
    value: "Virtual Tour Request",
    label: "Virtual Tour Request",
  },
  {
    value: "Mortgage Pre-Approval Application",
    label: "Mortgage Pre-Approval Application",
  },
];
const DetailTabMessage: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <div className="flex items-center px-3 py-2">
          <h2 className="text-sm font-normal text-muted-foreground">From</h2>
          <CustomCombobox data={sendUsers} title="user" avatar={true} />
        </div>
        <Separator />
        <div className="flex items-center px-3 py-2">
          <h2 className="text-sm font-normal text-muted-foreground">To</h2>
          <CustomCombobox data={receiveUsers} title="user" avatar={false} />
        </div>
        <Separator />
        <div className="flex items-center py-2">
          <CustomCombobox data={templates} title="Template" avatar={false} />
        </div>
        <Separator />
        <div className="flex items-center px-3 py-2">
          <h2 className="text-base font-sans font-normal leading-normal text-muted-foreground py-2">
            Subject
          </h2>
        </div>
        <Separator />
      </div>
      <div className="">
        <ToggleGroup type="multiple" className="justify-start">
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="strikethrough"
            aria-label="Toggle strikethrough"
          >
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
        <Textarea
          placeholder="Your message"
          className="h-[278px] min-h-[60px] px-3 py-2 overflow-hidden text-muted-foreground text-ellipse whitespace-nowrap text-sm leading-normal font-sans font-normal bg-white border-none shadow-none"
        />
      </div>
    </div>
  );
};

export default DetailTabMessage;
