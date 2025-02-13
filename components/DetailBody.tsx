"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import DetailTabMessage from "./DetailTabMessage";
import { Paperclip } from "lucide-react";
import { Separator } from "./ui/separator";
import CustomCombobox from "./CustomCombobox";
import DetailHistory from "./DetailHistory";

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

interface User {
  value: string;
  label: string;
}

const DetailBody: React.FC = () => {
  const [activeTab, setActiveTab] = useState("note");
  const [activeBottomTab, setActiveBottomTab] = useState("all");

  const handleReceiveUserSelect = (user: User) => {
    console.log(user);
  };

  return (
    <div className="flex flex-col itesm-start flex-1 gap-5">
      <Card className="flex flex-col w-full items-start gap-4 p-5 pt-2.5 rounded-xl border bg-card shadow">
        <CardContent className="p-0 w-full">
          <Tabs
            defaultValue="note"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="flex items-center justify-start bg-white border-b rounded-none h-12 p-0">
              <TabsTrigger
                value="note"
                className="h-full py-2 px-3 border-none rounded-none !shadow-none text-sm leading-normal font-sans font-normal text-muted-foreground data-[state=active]:border-b-2 data-[state=active]:border-solid data-[state=active]:border-[#0786FD] data-[state=active]:text-[#0786FD]"
              >
                New Note
              </TabsTrigger>
              <TabsTrigger
                value="message"
                className="h-full py-2 px-3 border-none rounded-none !shadow-none text-sm leading-normal font-sans font-normal text-muted-foreground data-[state=active]:border-b-2 data-[state=active]:border-solid data-[state=active]:border-[#0786FD] data-[state=active]:text-[#0786FD]"
              >
                Send Message
              </TabsTrigger>
              <TabsTrigger
                value="text"
                className="h-full py-2 px-3 border-none rounded-none !shadow-none text-sm leading-normal font-sans font-normal text-muted-foreground data-[state=active]:border-b-2 data-[state=active]:border-solid data-[state=active]:border-[#0786FD] data-[state=active]:text-[#0786FD]"
              >
                Send a Text Message
              </TabsTrigger>
            </TabsList>
            <TabsContent value="note" className="rounded-md m-0">
              <Textarea
                placeholder="Enter new note"
                className="h-[110px] min-h-[60px] px-3 py-2 overflow-hidden text-muted-foreground text-ellipse whitespace-nowrap text-sm leading-normal font-sans font-normal bg-white border-none shadow-none"
              />
            </TabsContent>
            <TabsContent value="message" className="rounded-md m-0">
              <DetailTabMessage />
            </TabsContent>
            <TabsContent value="text" className="rounded-md m-0">
              <div className="flex items-center justify-between px-3 py-2 h-[52px]">
                <div className="flex items-center flex-1">
                  <h2 className="text-sm font-normal text-muted-foreground">
                    To
                  </h2>
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
              <Textarea
                placeholder="Enter a text message"
                className="h-[110px] min-h-[60px] px-3 py-2 overflow-hidden text-muted-foreground text-ellipse whitespace-nowrap text-sm leading-normal font-sans font-normal bg-white border-none shadow-none"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between p-0 w-full">
          <div className="w-full">
            {activeTab === "message" && (
              <Paperclip className="h-5 w-5 text-primary" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="px-4 py-2 border rounded-md shadow text-primary text-sm"
            >
              Cancel
            </Button>
            <Button className="px-4 py-2 border rounded-md shadow text-primary-foreground text-sm bg-[#0786FD]">
              Save
            </Button>
          </div>
        </CardFooter>
      </Card>
      <Card className="w-full p-5 pt-2.5 rounded-xl border bg-card shadow">
        <CardContent className="flex flex-col w-full items-start p-0 gap-5 w-full">
          <Tabs
            defaultValue="all"
            value={activeBottomTab}
            onValueChange={setActiveBottomTab}
            className="w-full"
          >
            <TabsList className="flex items-center justify-start bg-white border-b rounded-none h-12 p-0">
              <TabsTrigger
                value="all"
                className="h-full py-2 px-3 border-none rounded-none !shadow-none text-sm leading-normal font-sans font-normal text-muted-foreground data-[state=active]:border-b-2 data-[state=active]:border-solid data-[state=active]:border-[#0786FD] data-[state=active]:text-[#0786FD]"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="outgoing"
                className="h-full py-2 px-3 border-none rounded-none !shadow-none text-sm leading-normal font-sans font-normal text-muted-foreground data-[state=active]:border-b-2 data-[state=active]:border-solid data-[state=active]:border-[#0786FD] data-[state=active]:text-[#0786FD]"
              >
                Outgoing calls
              </TabsTrigger>
              <TabsTrigger
                value="sms"
                className="h-full py-2 px-3 border-none rounded-none !shadow-none text-sm leading-normal font-sans font-normal text-muted-foreground data-[state=active]:border-b-2 data-[state=active]:border-solid data-[state=active]:border-[#0786FD] data-[state=active]:text-[#0786FD]"
              >
                SMS sent
              </TabsTrigger>
              <TabsTrigger
                value="call"
                className="h-full py-2 px-3 border-none rounded-none !shadow-none text-sm leading-normal font-sans font-normal text-muted-foreground data-[state=active]:border-b-2 data-[state=active]:border-solid data-[state=active]:border-[#0786FD] data-[state=active]:text-[#0786FD]"
              >
                Call attempts
              </TabsTrigger>
              <TabsTrigger
                value="emailout"
                className="h-full py-2 px-3 border-none rounded-none !shadow-none text-sm leading-normal font-sans font-normal text-muted-foreground data-[state=active]:border-b-2 data-[state=active]:border-solid data-[state=active]:border-[#0786FD] data-[state=active]:text-[#0786FD]"
              >
                Email out
              </TabsTrigger>
              <TabsTrigger
                value="notes"
                className="h-full py-2 px-3 border-none rounded-none !shadow-none text-sm leading-normal font-sans font-normal text-muted-foreground data-[state=active]:border-b-2 data-[state=active]:border-solid data-[state=active]:border-[#0786FD] data-[state=active]:text-[#0786FD]"
              >
                Notes
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="rounded-md mt-5">
              <DetailHistory />
            </TabsContent>
            <TabsContent value="outgoing" className="rounded-md mt-5">
              <DetailHistory />
            </TabsContent>
            <TabsContent value="sms" className="rounded-md mt-5">
              <DetailHistory />
            </TabsContent>
            <TabsContent value="call" className="rounded-md mt-5">
              <DetailHistory />
            </TabsContent>
            <TabsContent value="emailout" className="rounded-md mt-5">
              <DetailHistory />
            </TabsContent>
            <TabsContent value="notes" className="rounded-md mt-5">
              <DetailHistory />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailBody;
