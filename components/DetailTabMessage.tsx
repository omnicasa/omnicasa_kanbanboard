"use client";

import { Separator } from "./ui/separator";
import React, { useState } from "react";
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

interface User {
  value: string;
  label: string;
}

interface Template {
  value: string;
  label: string;
}

const DetailTabMessage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );

  const handleSendUserSelect = (user: User) => {
    console.log(user);
  };

  const handleReceiveUserSelect = (user: User) => {
    console.log(user);
  };

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
  };

  let subject = "Subject";
  let message = "";

  switch (selectedTemplate?.value) {
    case "Do not use template":
      subject = "Subject";
      break;
    case "Property Inquiry Form":
      subject = "Your Property Inquiry Form is Ready!";
      message =
        "Dear [Customer Name], We hope this message finds you in great spirits! We're thrilled to reach out and share an exciting property opportunity that we believe perfectly aligns with your preferences and needs. Our team has carefully selected this property based on your previous discussions with us, and we think you'll find it quite appealing.";
      break;
    case "Open House Registration":
      subject = "Your Open House Registration is Confirmed!";
      message =
        "Dear [Customer Name], Thank you for registering for our open house event. We look forward to seeing you there!";
      break;
    case "Virtual Tour Request":
      subject = "Your Virtual Tour Request is Scheduled!";
      message =
        "Dear [Customer Name], Your virtual tour request has been scheduled. We will send you the details shortly.";
      break;
    case "Mortgage Pre-Approval Application":
      subject = "Your Mortgage Pre-Approval Application is Received!";
      message =
        "Dear [Customer Name], We have received your mortgage pre-approval application. Our team will review it and get back to you soon.";
      break;
    default:
      subject = "Subject";
      break;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <div className="flex items-center px-3 py-2">
          <h2 className="text-sm font-normal text-muted-foreground">From</h2>
          <CustomCombobox
            data={sendUsers}
            title="user"
            avatar={true}
            onItemSelect={handleSendUserSelect}
          />
        </div>
        <Separator />
        <div className="flex items-center px-3 py-2">
          <h2 className="text-sm font-normal text-muted-foreground">To</h2>
          <CustomCombobox
            data={receiveUsers}
            title="user"
            avatar={false}
            onItemSelect={handleReceiveUserSelect}
          />
        </div>
        <Separator />
        <div className="flex items-center py-2">
          <CustomCombobox
            data={templates}
            title="Template"
            avatar={false}
            onItemSelect={handleTemplateSelect}
          />
        </div>
        <Separator />
        <div className="flex items-center px-3 py-2">
          <h2 className="text-base font-sans font-normal leading-normal text-muted-foreground py-2">
            {subject}
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
          value={message}
          className="h-[278px] min-h-[60px] px-3 py-2 text-muted-foreground whitespace-normal text-sm leading-normal font-sans font-normal bg-white border-none shadow-none"
        />
      </div>
    </div>
  );
};

export default DetailTabMessage;
