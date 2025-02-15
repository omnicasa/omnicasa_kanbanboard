"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import DetailTabMessage from "./DetailTabMessage";
import { Paperclip } from "lucide-react";
import { Separator } from "./ui/separator";
import CustomCombobox from "./CustomCombobox";
import DetailHistory from "./DetailHistory";
import { useMailStore, useSendMessageStore } from "@/store/useStore";
import {
  addHistory,
  isInternational,
  useFetchAuthConfig,
  sendSMS,
} from "@/hooks/useFetchData";

interface User {
  personId: number;
  phoneNumber: string;
  value: string;
  label: string;
}

interface Relation {
  Id: number;
  PersonName: string;
  RelationTypeNameEN: string;
  PersonEmail: string;
  PhoneNumber1: string;
  PersonId: number;
  ShortName: string;
  isInternational: boolean;
  formattedPhoneNumber: string;
}

interface DetailBodyProps {
  data: {
    Id: number;
    Reference: string;
    Address: string;
    CityName: string;
    Relations: Relation[];
  };
}

const DetailBody: React.FC<DetailBodyProps> = ({ data }) => {
  const {
    Id: propertyId,
    Reference,
    Address,
    CityName,
    Relations,
  } = data || {};
  const [activeTab, setActiveTab] = useState("note");
  const [activeBottomTab, setActiveBottomTab] = useState("all");
  const selectedMailItem = useMailStore((state) => state.selectedMailItem);
  const [newNote, setNewNote] = useState("");
  const mailStore = useMailStore();
  const sendMessageStore = useSendMessageStore();
  const [textMessage, setTextMessage] = useState("");

  const { data: userInfo } = useFetchAuthConfig();
  const { Id: userId, Email, Name, PhoneNumber } = userInfo?.UserInfo || {};

  const [receiveUsers, setReceiveUsers] = useState<User[]>([]);
  const [selectUser, setSelectUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchInternationalStatus = async () => {
      if (!Relations) return;

      // Filter relations that have a phone number
      const relationsWithPhone = Relations.filter(
        (relation) => relation.PhoneNumber1
      );

      // Validate and format phone numbers
      const formattedRelations = await Promise.all(
        relationsWithPhone.map(async (relation) => {
          try {
            const result = await isInternational(relation.PhoneNumber1);
            return {
              ...relation,
              isInternational: result.PhoneNumbers[0].IsInternational,
              formattedPhoneNumber: result.PhoneNumbers[0].PhoneNumber,
            };
          } catch (error) {
            console.error(
              `Error validating phone number ${relation.PhoneNumber1}:`,
              error
            );
            return relation;
          }
        })
      );

      // Do something with formattedRelations
      // Filter items where isInternational is true
      const internationalRelations = formattedRelations.filter(
        (relation) => relation.isInternational
      );

      // Create JSON array with the specified format
      const jsonArray = internationalRelations.map((relation) => ({
        personId: relation.PersonId,
        phoneNumber: relation.formattedPhoneNumber,
        value: `${relation.PersonName} (${relation.PersonEmail})`,
        label: `${relation.PersonName} (${relation.PersonEmail})`,
      }));

      // Do something with jsonArray
      setReceiveUsers(jsonArray);
    };

    fetchInternationalStatus();
  }, [Relations, data]);

  const handleReceiveUserSelect = (user: User) => {
    setSelectUser(user);
  };

  const handleMessageSave = async () => {
    if (activeTab === "note") {
      if (newNote) {
        const response = await addHistory(
          0, // hisTypeId
          newNote, // message
          userId, // useId
          new Date().toISOString(), // currentDate
          propertyId, // propertyId
          Reference, // reference
          Address, // address
          CityName, // cityName
          Name, // ownerName
          Email, // email
          PhoneNumber // phoneNumber
        );
        if (response.Id) {
          setNewNote("");
          sendMessageStore.setSendMessageItem({
            message: newNote,
            type: "note",
            state: true,
          });
        }
      }
    } else if (activeTab === "message") {
      console.log("message");
    } else {
      if (textMessage && selectUser) {
        const sendMessages = async () => {
          try {
            // Assuming selectUser contains the selected user details
            const { phoneNumber } = selectUser;

            // Call the sendSMS API
            const response = await sendSMS(userId, phoneNumber, textMessage);

            // Handle the response
            console.log("SMS sent successfully:", response);
            if (response) {
              setTextMessage("");
              sendMessageStore.setSendMessageItem({
                message: textMessage,
                type: "text",
                state: true,
              });
            }
          } catch (error) {
            console.error("Error sending SMS:", error);
          }
        };

        sendMessages();
      }
    }
  };

  const handleMessageCancel = () => {
    setNewNote("");
    setTextMessage("");
    sendMessageStore.setSendMessageItem({
      message: "",
      type: "",
      state: false,
    });
    mailStore.setSelectedMailItem({ id: 0, clicked: false });
  };

  useEffect(() => {
    if (selectedMailItem.clicked) {
      setActiveTab("message");
    }
  }, [selectedMailItem]);

  return (
    <div className="flex flex-col itesm-start flex-1 gap-5">
      <Card className="flex flex-col w-full items-start gap-4 p-5 pt-2.5 rounded-xl bg-card">
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
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
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
                value={textMessage}
                onChange={(e) => setTextMessage(e.target.value)}
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
              onClick={handleMessageCancel}
            >
              Cancel
            </Button>
            <Button
              className="px-4 py-2 border rounded-md shadow text-primary-foreground text-sm bg-[#0786FD]"
              onClick={handleMessageSave}
            >
              Save
            </Button>
          </div>
        </CardFooter>
      </Card>
      <Card className="w-full p-5 pt-2.5 rounded-xl bg-card">
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
              <DetailHistory id={propertyId} type="all" />
            </TabsContent>
            <TabsContent value="outgoing" className="rounded-md mt-5">
              <DetailHistory id={propertyId} type="outgoing" />
            </TabsContent>
            <TabsContent value="sms" className="rounded-md mt-5">
              <DetailHistory id={propertyId} type="sms" />
            </TabsContent>
            <TabsContent value="call" className="rounded-md mt-5">
              <DetailHistory id={propertyId} type="call" />
            </TabsContent>
            <TabsContent value="emailout" className="rounded-md mt-5">
              <DetailHistory id={propertyId} type="emailout" />
            </TabsContent>
            <TabsContent value="notes" className="rounded-md mt-5">
              <DetailHistory id={propertyId} type="notes" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailBody;
