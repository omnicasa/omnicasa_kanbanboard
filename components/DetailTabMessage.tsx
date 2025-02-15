"use client";

import { Separator } from "./ui/separator";
import React, { useEffect, useState } from "react";
import CustomCombobox from "./CustomCombobox";
import { Bold, Italic, Underline } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const sendUsers = [
  {
    personId: 1,
    phoneNumber: "1234567890",
    value: "Jhon Doe(john@greenfield.com)",
    label: "Jhon Doe(john@greenfield.com)",
  },
  {
    personId: 2,
    phoneNumber: "1234567890",
    value: "Jacob Jones(jacob@greenfield.com)",
    label: "Jacob Jones(jacob@greenfield.com)",
  },
  {
    personId: 3,
    phoneNumber: "1234567890",
    value: "Dianne Russell(dianne@greenfield.com)",
    label: "Dianne Russell(dianne@greenfield.com)",
  },
  {
    personId: 4,
    phoneNumber: "1234567890",
    value: "Darrell Steward(darell@greenfield.com)",
    label: "Darrell Steward(darell@greenfield.com)",
  },
];

const receiveUsers = [
  {
    personId: 1,
    phoneNumber: "1234567890",
    value: "Talan Curtis (talan@hotmail.com)",
    label: "Talan Curtis (talan@hotmail.com)",
  },
  {
    personId: 2,
    phoneNumber: "1234567890",
    value: "Jacob Jones(jacob@greenfield.com)",
    label: "Jacob Jones(jacob@greenfield.com)",
  },
  {
    personId: 3,
    phoneNumber: "1234567890",
    value: "Dianne Russell(dianne@greenfield.com)",
    label: "Dianne Russell(dianne@greenfield.com)",
  },
  {
    personId: 4,
    phoneNumber: "1234567890",
    value: "Darrell Steward(darell@greenfield.com)",
    label: "Darrell Steward(darell@greenfield.com)",
  },
];

const templates = [
  {
    personId: 0,
    phoneNumber: "",
    value: "Do not use template",
    label: "Do not use template",
  },
  {
    personId: 0,
    phoneNumber: "",
    value: "Property Inquiry Form",
    label: "Property Inquiry Form",
  },
  {
    personId: 0,
    phoneNumber: "",
    value: "Open House Registration",
    label: "Open House Registration",
  },
  {
    personId: 0,
    phoneNumber: "",
    value: "Virtual Tour Request",
    label: "Virtual Tour Request",
  },
  {
    personId: 0,
    phoneNumber: "",
    value: "Mortgage Pre-Approval Application",
    label: "Mortgage Pre-Approval Application",
  },
];

interface User {
  personId: number;
  phoneNumber: string;
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

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!selectedTemplate) return;
    switch (selectedTemplate?.value) {
      case "Do not use template":
        setSubject("");
        setMessage("");
        break;
      case "Property Inquiry Form":
        setSubject("Your Property Inquiry Form is Ready!");
        setMessage(
          "Dear [Customer Name], We hope this message finds you in great spirits! We're thrilled to reach out and share an exciting property opportunity that we believe perfectly aligns with your preferences and needs. Our team has carefully selected this property based on your previous discussions with us, and we think you'll find it quite appealing."
        );
        break;
      case "Open House Registration":
        setSubject("Your Open House Registration is Confirmed!");
        setMessage(
          "Dear [Customer Name], Thank you for registering for our open house event. We look forward to seeing you there!"
        );
        break;
      case "Virtual Tour Request":
        setSubject("Your Virtual Tour Request is Scheduled!");
        setMessage(
          "Dear [Customer Name], Thank you for registering for our open house event. We look forward to seeing you there!"
        );
        break;
      case "Mortgage Pre-Approval Application":
        setSubject("Your Mortgage Pre-Approval Application is Received!");
        setMessage(
          "Dear [Customer Name], Thank you for registering for our open house event. We look forward to seeing you there!"
        );
        break;
      default:
        setSubject("");
        setMessage("");
        break;
    }
  }, [selectedTemplate]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <div className="flex items-center px-3 py-2 h-[52px]">
          <h2 className="text-sm font-normal text-muted-foreground">From</h2>
          <CustomCombobox
            data={sendUsers}
            title="user"
            avatar={true}
            onItemSelect={handleSendUserSelect}
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between px-3 py-2 h-[52px]">
          <div className="flex items-center flex-1">
            <h2 className="text-sm font-normal text-muted-foreground">To</h2>
            <CustomCombobox
              data={receiveUsers}
              title="user"
              avatar={false}
              onItemSelect={handleReceiveUserSelect}
            />
          </div>
          <div className="flex items-center justify-end gap-4 flex-1">
            <Button
              variant="outline"
              className="text-muted-foreground text-sm font-normal leading-small border-none shadow-none p-0 h-5"
            >
              Cc
            </Button>
            <Button
              variant="outline"
              className="text-muted-foreground text-sm font-normal leading-small border-none shadow-none p-0 h-5"
            >
              Bcc
            </Button>
          </div>
        </div>
        <Separator />
        <div className="flex items-center py-2 h-[52px]">
          <CustomCombobox
            data={templates}
            title="Template"
            avatar={false}
            onItemSelect={handleTemplateSelect}
          />
        </div>
        <Separator />
        <div className="flex items-center h-[52px]">
          <Input
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="text-base font-sans font-normal leading-normal text-muted-foreground py-2 border-none shadow-none"
          />
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
          onChange={(e) => setMessage(e.target.value)}
          className="h-[278px] min-h-[60px] px-3 py-2 text-muted-foreground whitespace-normal text-sm leading-normal font-sans font-normal bg-white border-none shadow-none"
        />
      </div>
    </div>
  );
};

export default DetailTabMessage;
