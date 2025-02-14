"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Badge } from "./ui/badge";
import { CirclePlus, Eye, Mail, Pencil, Phone } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { sendSMS, useFetchPersonInfo } from "@/hooks/useFetchData";
import { useMailStore } from "@/store/useStore";
import { Textarea } from "./ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Relation {
  Id: number;
  PersonName: string;
  RelationTypeNameEN: string;
  PersonEmail: string;
  PhoneNumber1: string;
  PersonId: number;
  ShortName: string;
}
interface DetailInformationProps {
  data: {
    Relations: Relation[];
  };
}

const languageEnum = {
  1: "Dutch",
  2: "French",
  3: "English",
  4: "German",
};

const DetailInformation: React.FC<DetailInformationProps> = ({ data }) => {
  const mailStore = useMailStore();
  const { Relations } = data;
  const initialTriggerVisible = Relations
    ? Object.fromEntries(
        Relations.map((_, index) => [`item-${index}`, index !== 0])
      )
    : {};
  const [openItem, setOpenItem] = useState<string>("item-0");
  const [triggerVisible, setTriggerVisible] = useState<{
    [key: string]: boolean;
  }>(initialTriggerVisible);
  const [selectedId, setSelectedId] = useState<number>(
    Relations?.[0]?.PersonId || 0
  );
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isUnansweredDialogOpen, setIsUnansweredDialogOpen] = useState(false);
  const [selectedRelation, setSelectedRelation] = useState<Relation | null>(
    null
  );
  const unMessageRef = useRef<HTMLTextAreaElement>(null);

  const { data: personInfomation, refetch } = useFetchPersonInfo(selectedId);

  useEffect(() => {
    // Update triggerVisible if Relations changes
    setTriggerVisible(
      Relations
        ? Object.fromEntries(
            Relations.map((_, index) => [`item-${index}`, index !== 0])
          )
        : {}
    );
    setSelectedId(Relations?.[0]?.PersonId);
  }, [Relations]);

  useEffect(() => {
    if (selectedId) {
      refetch();
    }
  }, [selectedId, refetch]);

  const handleTriggerClick = (item: string, id: number) => {
    setOpenItem(item);
    setTriggerVisible((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        newState[key] = key === item ? false : true;
      });
      return newState;
    });
    setSelectedId(id);
  };

  const handleMail = (relation: Relation) => {
    console.log("Mail", relation);
    const item = {
      id: relation.PersonId,
      clicked: true,
    };
    mailStore.setSelectedMailItem(item);
  };
  const handlePhone = (relation: Relation) => {
    const phoneNumber = relation.PhoneNumber1;
    window.location.href = `tel:${phoneNumber}`;
  };
  const handleMute = (relation: Relation) => {
    console.log("Mute", relation);
  };
  const handleCall = (relation: Relation) => {
    setIsCallModalOpen(false);
    setSelectedRelation(relation);
    setIsUnansweredDialogOpen(true);
  };
  const handleVideo = (relation: Relation) => {
    console.log("Video", relation);
  };
  const handleViewDetails = (relation: Relation) => {
    console.log("View", relation);
  };
  const handleEdit = (relation: Relation) => {
    console.log("Edit", relation);
    const message = { TYPE: "edit-person", ID: relation.PersonId };
    window.postMessage(message, "*");
  };
  const handleSendMail = async () => {
    setIsUnansweredDialogOpen(false);
    const message = unMessageRef.current?.value || "";
    if (selectedRelation?.PersonId && selectedRelation?.PhoneNumber1) {
      await sendSMS(
        selectedRelation.PersonId,
        selectedRelation.PhoneNumber1,
        message
      );
    }
  };
  const handleNewRelation = () => {
    console.log("New relation");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("message", (event) => {
        // Ensure the message is coming from a trusted source
        if (event.origin !== "https://qaf3web.omnicasa.com") {
          return;
        }

        const message = event.data;
        if (message.TYPE === "edit-person") {
          console.log("Person ID:", message.ID);
          // Handle the message
        }
      });

      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener("message", (event) => {
          // Ensure the message is coming from a trusted source
          if (event.origin !== "https://qaf3web.omnicasa.com") {
            return;
          }

          const message = event.data;
          if (message.TYPE === "edit-person") {
            console.log("Person ID:", message.ID);
            // Handle the message
          }
        });
      };
    }
  }, []);

  return (
    <div className="flex flex-col itesm-start w-[324px] p-5 gap-5 bg-white border rounded-lg shadow-md h-full">
      <h2 className="text-card-foreground text-base font-semibold leading-normal font-sans">
        Relations
      </h2>
      {Relations && (
        <Accordion
          type="single"
          collapsible
          className="w-full"
          value={openItem}
          onValueChange={setOpenItem}
        >
          {Relations.map((relation, index) => (
            <AccordionItem key={relation.Id} value={`item-${index}`}>
              {triggerVisible[`item-${index}`] && (
                <AccordionTrigger
                  className="hover:no-underline"
                  onClick={() =>
                    handleTriggerClick(`item-${index}`, relation.PersonId)
                  }
                >
                  <div className="flex items-center justify-between gap-2 w-full">
                    <h2 className="text-card-foreground font-sans text-sm font-normal leading-5 flex-1">
                      {relation.PersonName}
                    </h2>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="px-2.5 py-0.5 border rounded-md border-transparent bg-secondary"
                      >
                        {relation.RelationTypeNameEN}
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
              )}
              <AccordionContent>
                <div className="flex flex-col gap-5 py-5">
                  <div className="flex gap-2 items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      {relation.ShortName}
                    </div>
                    <div className="flex flex-col gap-1 align-start">
                      <h2 className="text-card-foreground text-base font-semibold leading-normal font-sans">
                        {relation.PersonName}
                      </h2>
                      <Badge
                        variant="secondary"
                        className="w-min text-center px-2.5 py-0.5 border rounded-md border-transparent bg-secondary"
                      >
                        {relation.RelationTypeNameEN}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 align-start">
                    <div className="flex items-center gap-4">
                      <h3 className="text-muted-foreground font-sans text-base font-normal leading-normal">
                        Email
                      </h3>
                      <p className="text-primary font-sans text-base font-normal leading-normal">
                        {relation.PersonEmail}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <h3 className="text-muted-foreground font-sans text-base font-normal leading-normal">
                        Phone
                      </h3>
                      <p className="text-primary font-sans text-base font-normal leading-normal">
                        {relation.PhoneNumber1}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 justify-between">
                    <div className="px-3 py-2 border rounded-md shadow-md">
                      <Mail
                        width={33}
                        height={20}
                        className="cursor-pointer"
                        onClick={() => handleMail(relation)}
                      />
                    </div>
                    <div className="px-3 py-2 border rounded-md shadow-md">
                      <Dialog
                        open={isCallModalOpen}
                        onOpenChange={setIsCallModalOpen}
                      >
                        <DialogTrigger asChild>
                          <Phone
                            width={33}
                            height={20}
                            className="cursor-pointer"
                            onClick={() => handlePhone(relation)}
                          />
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[324px] py-6 flex flex-col gap-5 bg-black">
                          <DialogHeader>
                            <DialogTitle></DialogTitle>
                          </DialogHeader>
                          <div className="flex flex-col gap-2 items-center">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center relative">
                              {relation.ShortName}
                            </div>
                            <Image
                              src="/images/call.gif"
                              width={145}
                              height={145}
                              alt="calling"
                              className="absolute top-1"
                            />
                            <h2 className="text-white text-md font-semibold leading-normal font-sans mt-2">
                              {relation.PersonName}
                            </h2>
                          </div>
                          <div className="flex items-center justify-center">
                            <p className="text-[#E4E4E7] font-normal text-base leading-md pr-1">
                              Calling
                            </p>
                            <Image
                              src="/images/dot.gif"
                              width={14}
                              height={10}
                              alt="dot calling"
                            />
                          </div>
                          <div className="flex items-end gap-4 justify-around">
                            <div className="flex flex-col items-center">
                              <Image
                                src="/images/mute.svg"
                                width={48}
                                height={48}
                                alt="mute"
                                className="cursor-pointer p-[11px] rounded-full bg-[#909399]"
                                onClick={() => handleMute(relation)}
                              />
                              <p className="text-white text-sm font-sans font-normal leading-5">
                                Mute
                              </p>
                            </div>
                            <div className="flex flex-col items-center">
                              <Image
                                src="/images/call.svg"
                                width={64}
                                height={64}
                                alt="end"
                                className="cursor-pointer p-[11px] rounded-full bg-[#B32C2C]"
                                onClick={() => handleCall(relation)}
                              />
                              <p className="text-white text-sm font-sans font-normal leading-5">
                                End
                              </p>
                            </div>
                            <div className="flex flex-col items-center">
                              <Image
                                src="/images/video.svg"
                                width={48}
                                height={48}
                                alt="video"
                                className="cursor-pointer p-[11px] rounded-full bg-[#909399]"
                                onClick={() => handleVideo(relation)}
                              />
                              <p className="text-white text-sm font-sans font-normal leading-5">
                                Video
                              </p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="px-3 py-2 border rounded-md shadow-md">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Eye
                            width={33}
                            height={20}
                            className="cursor-pointer"
                            onClick={() => handleViewDetails(relation)}
                          />
                        </SheetTrigger>
                        <SheetContent className="sm:max-w-[80%] p-0">
                          <SheetHeader>
                            <SheetTitle></SheetTitle>
                            <SheetDescription></SheetDescription>
                          </SheetHeader>
                          <div
                            id="view-details"
                            className="w-full h-full"
                          ></div>
                        </SheetContent>
                      </Sheet>
                    </div>
                    <div className="px-3 py-2 border rounded-md shadow-md">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Pencil
                            width={33}
                            height={20}
                            className="cursor-pointer"
                            onClick={() => handleEdit(relation)}
                          />
                        </SheetTrigger>
                        <SheetContent className="sm:max-w-[80%] p-0">
                          <SheetHeader>
                            <SheetTitle></SheetTitle>
                            <SheetDescription></SheetDescription>
                          </SheetHeader>
                          <div id="view-details" className="w-full h-full">
                            <iframe
                              src={`https://qaf3web.omnicasa.com/client/edit/${relation.PersonId}`}
                              width="100%"
                              height="100%"
                              className="border-none;"
                            ></iframe>
                          </div>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </div>
                  <Separator className="border" />
                  <h2 className="text-card-foreground text-base font-semibold leading-normal font-sans">
                    Information
                  </h2>
                  <div className="flex flex-col gap-3 align-start">
                    <div className="flex align-center gap-4 justify-between">
                      <h3 className="text-muted-foreground font-sans text-base font-normal leading-normal flex-1">
                        Letter title
                      </h3>
                      <h3 className="text-primary font-sans text-base font-normal leading-normal flex-1-6">
                        {personInfomation?.LetterTitle}
                      </h3>
                    </div>
                    <div className="flex align-center gap-4 justify-between">
                      <h3 className="text-muted-foreground font-sans text-base font-normal leading-normal flex-1">
                        Address title
                      </h3>
                      <h3 className="text-primary font-sans text-base font-normal leading-normal flex-1-6">
                        {personInfomation?.AddressTitle}
                      </h3>
                    </div>
                    <div className="flex align-center gap-4 justify-between">
                      <h3 className="text-muted-foreground font-sans text-base font-normal leading-normal flex-1">
                        Language
                      </h3>
                      <h3 className="text-primary font-sans text-base font-normal leading-normal flex-1-6">
                        {
                          languageEnum[
                            personInfomation?.Language as keyof typeof languageEnum
                          ]
                        }
                      </h3>
                    </div>
                    <div className="flex align-center gap-4 justify-between">
                      <h3 className="text-muted-foreground font-sans text-base font-normal leading-normal flex-1">
                        Category
                      </h3>
                      <h3 className="text-primary font-sans text-base font-normal leading-normal flex-1-6">
                        {personInfomation?.CategoriesDesc}
                      </h3>
                    </div>
                    <div className="flex align-center gap-4 justify-between">
                      <h3 className="text-muted-foreground font-sans text-base font-normal leading-normal flex-1">
                        Lead Source
                      </h3>
                      <h3 className="text-primary font-sans text-base font-normal leading-normal flex-1-6">
                        {personInfomation?.OriginContactInfo?.NameEN}
                      </h3>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="flex h-9 px-4 py-2 justify-center items-center gap-2 self-stretch rounded-md border bg-white shadow-sm"
            onClick={() => handleNewRelation()}
          >
            <CirclePlus width={20} height={20} />
            <label>New relation</label>
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-[80%] p-0">
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Dialog
        open={isUnansweredDialogOpen}
        onOpenChange={setIsUnansweredDialogOpen}
      >
        <DialogContent className="sm:max-w-[470px] p-6 gap-6">
          <DialogHeader className="flex flex-col gap-1.5">
            <DialogTitle className="text-[#09090B] font-sans text-base font-semibold leading-md">
              Unanswered Call Action
            </DialogTitle>
            <DialogDescription className="text-muted-foreground font-sans text-small font-normal leading-5">
              Looks like {selectedRelation?.PersonName} isn&apos;t available
              right now. Would you like to leave a message?
            </DialogDescription>
          </DialogHeader>
          <div className="min-h-[60px] h-[100px] w-full flex justify-start items-start">
            <Textarea
              id="unMessage"
              ref={unMessageRef}
              defaultValue="I have some important news regarding your property that you need to hear. Please get back to me as soon as you can. Thanks!"
              className="w-full h-full p-3 text-primary rounded-md border shadow-sm text-wrap"
            />
          </div>
          <DialogFooter className="flex items-center !justify-between gap-4">
            <Button
              variant={"outline"}
              className="border rounded-md px-4 py-2 shadow-sm"
              onClick={() => setIsUnansweredDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#0786FD] text-white px-4 py-2 rounded-md"
              onClick={() => handleSendMail()}
            >
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DetailInformation;
