"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import {
  ChevronsUpDown,
  CirclePlus,
  Eye,
  Mail,
  Pencil,
  Phone,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Relation {
  Id: number;
  PersonName: string;
  RelationTypeNameEN: string;
  PersonEmail: string;
  PhoneNumber1: string;
  PropertyId: number;
}

interface DetailInformationProps {
  data: {
    Relations: Relation[];
  };
}

const DetailInformation: React.FC<DetailInformationProps> = ({ data }) => {
  const [proprietor, setProprietor] = useState(false);
  const [seller, setSeller] = useState(false);
  const [corporate, setCorporate] = useState(false);

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
  useEffect(() => {
    // Update triggerVisible if Relations changes
    setTriggerVisible(
      Relations
        ? Object.fromEntries(
            Relations.map((_, index) => [`item-${index}`, index !== 0])
          )
        : {}
    );
  }, [Relations]);

  const handleTriggerClick = (item: string) => {
    setOpenItem(item);
    setTriggerVisible((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        newState[key] = key === item ? false : true;
      });
      return newState;
    });
  };

  const handleProprietor = () => {
    setProprietor(!proprietor);
  };
  const handleSeller = () => {
    setSeller(!seller);
  };
  const handleCorporate = () => {
    setCorporate(!corporate);
  };
  return (
    <div className="flex flex-col itesm-start w-[324px] p-5 gap-5 bg-white border rounded-lg shadow-md h-full">
      <h2 className="text-card-foreground text-base font-semibold leading-normal font-sans">
        Relations{Relations?.length}
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
                  onClick={() => handleTriggerClick(`item-${index}`)}
                >
                  {relation.PersonName}
                </AccordionTrigger>
              )}
              <AccordionContent>
                {`item-${index}`} {triggerVisible[`item-${index}`]}
                <p>
                  <strong>Relation Type:</strong> {relation.RelationTypeNameEN}
                </p>
                <p>
                  <strong>Email:</strong> {relation.PersonEmail}
                </p>
                <p>
                  <strong>Phone:</strong> {relation.PhoneNumber1}
                </p>
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
