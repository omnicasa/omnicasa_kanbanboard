import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const DetailBody: React.FC = () => {
  return (
    <div className="flex flex-col itesm-start flex-1 gap-5">
      <Card className="flex flex-col w-full items-start gap-4 p-5 pt-2.5 rounded-xl border bg-card shadow">
        <CardContent className="p-0 w-full">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="flex items-center justify-start bg-white">
              <TabsTrigger
                value="note"
                className="p-1.5 border-none rounded-none !shadow-none text-sm leading-normal font-sans font-normal text-muted-foreground data-[state=active]:border-b data-[state=active]:border-solid data-[state=active]:border-[#0786FD] data-[state=active]:text-[#0786FD]"
              >
                New Note
              </TabsTrigger>
              <TabsTrigger
                value="message"
                className="p-1.5 border-none rounded-none !shadow-none text-sm leading-normal font-sans font-normal text-muted-foreground data-[state=active]:border-b data-[state=active]:border-solid data-[state=active]:border-[#0786FD] data-[state=active]:text-[#0786FD]"
              >
                Send Message
              </TabsTrigger>
              <TabsTrigger
                value="text"
                className="p-1.5 border-none rounded-none !shadow-none text-sm leading-normal font-sans font-normal text-muted-foreground data-[state=active]:border-b data-[state=active]:border-solid data-[state=active]:border-[#0786FD] data-[state=active]:text-[#0786FD]"
              >
                Send a Text Message
              </TabsTrigger>
            </TabsList>
            <TabsContent value="note" className="rounded-md m-0 mt-0.5">
              <Textarea
                placeholder="Enter new note"
                className="h-[110px] min-h-[60px] px-3 py-2 overflow-hidden text-muted-foreground text-ellipse whitespace-nowrap text-sm leading-normal font-sans font-normal bg-white border border-solid border-[#D9D9D9] rounded-md shadow-sm"
              />
            </TabsContent>
            <TabsContent value="message" className="rounded-md m-0 mt-0.5">
              <Textarea
                placeholder="Enter new message"
                className="h-[110px] min-h-[60px] px-3 py-2 overflow-hidden text-muted-foreground text-ellipse whitespace-nowrap text-sm leading-normal font-sans font-normal bg-white border border-solid border-[#D9D9D9] rounded-md shadow-sm"
              />
            </TabsContent>
            <TabsContent value="text" className="rounded-md m-0 mt-0.5">
              <Textarea
                placeholder="Enter a text message"
                className="h-[110px] min-h-[60px] px-3 py-2 overflow-hidden text-muted-foreground text-ellipse whitespace-nowrap text-sm leading-normal font-sans font-normal bg-white border border-solid border-[#D9D9D9] rounded-md shadow-sm"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 p-0 w-full">
          <Button
            variant="outline"
            className="px-4 py-2 border rounded-md shadow text-primary text-sm"
          >
            Cancel
          </Button>
          <Button className="px-4 py-2 border rounded-md shadow text-primary-foreground text-sm bg-[#0786FD]">
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DetailBody;
