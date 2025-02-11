import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import DetailTabMessage from "./DetailTabMessage";
import { Paperclip } from "lucide-react";

const DetailBody: React.FC = () => {
  const [activeTab, setActiveTab] = useState("note");
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
            <TabsList className="flex items-center justify-start bg-white border-b rounded-none">
              <TabsTrigger
                value="note"
                className="p-1.5 border-none rounded-none !shadow-none text-sm leading-normal font-sans font-normal text-muted-foreground data-[state=active]:border-b-2 data-[state=active]:border-solid data-[state=active]:border-[#0786FD] data-[state=active]:text-[#0786FD]"
              >
                New Note
              </TabsTrigger>
              <TabsTrigger
                value="message"
                className="p-1.5 border-none rounded-none !shadow-none text-sm leading-normal font-sans font-normal text-muted-foreground data-[state=active]:border-b-2 data-[state=active]:border-solid data-[state=active]:border-[#0786FD] data-[state=active]:text-[#0786FD]"
              >
                Send Message
              </TabsTrigger>
              <TabsTrigger
                value="text"
                className="p-1.5 border-none rounded-none !shadow-none text-sm leading-normal font-sans font-normal text-muted-foreground data-[state=active]:border-b-2 data-[state=active]:border-solid data-[state=active]:border-[#0786FD] data-[state=active]:text-[#0786FD]"
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
              <Textarea
                placeholder="Enter a text message"
                className="h-[110px] min-h-[60px] px-3 py-2 overflow-hidden text-muted-foreground text-ellipse whitespace-nowrap text-sm leading-normal font-sans font-normal bg-white border border-solid border-[#D9D9D9] rounded-md shadow-sm"
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
    </div>
  );
};

export default DetailBody;
