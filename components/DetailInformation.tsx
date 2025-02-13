"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFetchPersonInfo } from "@/hooks/useFetchData";
import { useMailStore } from "@/store/useStore";

interface Relation {
  Id: number;
  PersonName: string;
  RelationTypeNameEN: string;
  PersonEmail: string;
  PhoneNumber1: string;
  PersonId: number;
  ShortName: string;
}

interface Mult {
  Id: number;
  PersonId: number;
  FieldType: number;
  Value: number;
  Main: boolean;
  ItemState: number;
}

interface SiteInfo {
  Id: number;
  SiteName: string;
  CompanyName: string;
  Street: string;
  Nr: string;
  PostalCode: string;
  City: string;
  Country: string;
  Phone: string;
  Email: string;
  Website: string;
}

interface ManagerInfo {
  Id: number;
  Name: string;
  ShortName: string;
  Email: string;
  GroupId: number;
  DepartmentId: number;
  SiteId: number;
  IsActive: boolean;
}

interface StatusInfo {
  Id: number;
  NameNL: string;
  NameFR: string;
  NameEN: string;
  NameDE: string;
}

interface DepartmentInfo {
  Id: number;
  NameNL: string;
  NameFR: string;
  NameEN: string;
}

interface PreferredMediaInfo {
  Id: number;
  NameNL: string;
  NameFR: string;
  NameEN: string;
  NameDE: string;
}

interface PreferredConfirmationInfo {
  Id: number;
  NameNL: string;
  NameFR: string;
  NameEN: string;
  NameDE: string;
}

interface OriginContactInfo {
  Id: number;
  NameNL: string;
  NameFR: string;
  NameEN: string;
  NameDE: string;
}

interface DocumentTypeInfo {
  Id: number;
  NameNL: string;
  NameFR: string;
  NameEN: string;
  NameDE: string;
}

interface PublishOnInternetInfo {
  Id: number;
  NameNL: string;
  NameFR: string;
  NameEN: string;
  NameDE: string;
}
interface Document {
  Comments: string;
  CreatedDate: string;
  DocumentTypeId: number;
  DocumentTypeInfo: DocumentTypeInfo;
  FilePath: string;
  Filename: string;
  GroupId: number;
  IconURL: string;
  Id: number;
  IsConvertToPDF: boolean;
  IsExternalDocument: boolean;
  IsFolder: boolean;
  IsIncludeInMail: boolean;
  IsMissingOnCloud: boolean;
  ItemState: number;
  ModifiedDate: string;
  PropertyId: number;
  PublishOnInternetId: number;
  PublishOnInternetInfo: PublishOnInternetInfo;
  URL: string;
}

interface PersonInfo {
  EnteredDate: string;
  StatusId: number;
  EnteredId: number;
  CountryCode: string;
  Website: string;
  AltCountryCode: string;
  LastChange: string;
  LastChangedBy: number;
  CategoriesDesc: string;
  ManagerId: number;
  CityPostcode: string;
  CityName: string;
  PreferredMediaId: number;
  Alt2CountryCode: string;
  PhoneDesc1: string;
  PhoneDesc2: string;
  PhoneDesc3: string;
  PhoneNumber1: string;
  Password: string;
  ModifiedDate: string;
  SiteId: number;
  CountryId: number;
  CountryId2: number;
  CountryId3: number;
  HasPic: boolean;
  OriginContactId: number;
  DepartmentId: number;
  PreferredConfirmationId: number;
  AddressAGoogleX: number;
  AddressAGoogleY: number;
  MiddleName: string;
  Gender: number;
  Mults: Mult[];
  Relations: Relation[];
  Documents: Document[];
  CountryName: string;
  CountryName2: string;
  CountryName3: string;
  SiteInfo: SiteInfo;
  ManagerInfo: ManagerInfo;
  StatusInfo: StatusInfo;
  DepartmentInfo: DepartmentInfo;
  PreferredMediaInfo: PreferredMediaInfo;
  PreferredConfirmationInfo: PreferredConfirmationInfo;
  OriginContactInfo: OriginContactInfo;
  LastModifiedDate: string;
  Id: number;
  Name: string;
  Reference: string;
  FirstName: string;
  AddressTitle: string;
  LetterTitle: string;
  Fax: string;
  AddressA: string;
  Language: keyof typeof languageEnum;
  Email: string;
  IsDeleted: boolean;
}

export type { PersonInfo };

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
  const handleMute = (relation: Relation) => {
    console.log("Mute", relation);
  };
  const handleCall = (relation: Relation) => {
    console.log("Call", relation);
  };
  const handleVideo = (relation: Relation) => {
    console.log("Video", relation);
  };
  const handleView = (relation: Relation) => {
    console.log("View", relation);
  };
  const handleEdit = (relation: Relation) => {
    console.log("Edit", relation);
  };
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
                      <Dialog>
                        <DialogTrigger asChild>
                          <Phone
                            width={33}
                            height={20}
                            className="cursor-pointer"
                          />
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[324px] h-[300px] py-6 flex flex-col gap-5 bg-black">
                          <DialogHeader>
                            <DialogTitle></DialogTitle>
                          </DialogHeader>
                          <div className="flex flex-col gap-2 items-center">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                              {relation.ShortName}
                            </div>
                            <h2 className="text-white text-md font-semibold leading-normal font-sans">
                              {relation.PersonName}
                            </h2>
                          </div>
                          <p className="text-[#E4E4E7] text-center font-normal text-base leading-md">
                            Calling ...
                          </p>
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
                      <Eye
                        width={33}
                        height={20}
                        className="cursor-pointer"
                        onClick={() => handleView(relation)}
                      />
                    </div>
                    <div className="px-3 py-2 border rounded-md shadow-md">
                      <Pencil
                        width={33}
                        height={20}
                        className="cursor-pointer"
                        onClick={() => handleEdit(relation)}
                      />
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
      <Button
        variant="outline"
        className="flex h-9 px-4 py-2 justify-center items-center gap-2 self-stretch rounded-md border bg-white shadow-sm"
      >
        <CirclePlus width={20} height={20} />
        <label>New relation</label>
      </Button>
    </div>
  );
};

export default DetailInformation;
