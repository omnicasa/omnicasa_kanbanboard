"use client";

import Image from "next/image";
import React, { useState } from "react";
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

const DetailInformation: React.FC = () => {
  const [proprietor, setProprietor] = useState(false);
  const [seller, setSeller] = useState(false);
  const [corporate, setCorporate] = useState(false);
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
        Relations
      </h2>
      {proprietor && (
        <>
          <div
            onClick={() => handleProprietor()}
            className="flex items-center justify-between gap-2 w-full cursor-pointer"
          >
            <h2 className="text-card-foreground font-sans text-sm font-normal leading-5 flex-1">
              Amélie Smet
            </h2>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="px-2.5 py-0.5 border rounded-md border-transparent bg-secondary"
              >
                Proprietors
              </Badge>
              <ChevronsUpDown width={16} height={16} className="opacity-50" />
            </div>
          </div>
          <Separator className="border" />
        </>
      )}
      {seller && (
        <>
          <div
            onClick={() => handleSeller()}
            className="flex items-center justify-between gap-2 w-full cursor-pointer"
          >
            <h2 className="text-card-foreground font-sans text-sm font-normal leading-5 flex-1">
              Jeanne Reynders
            </h2>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="px-2.5 py-0.5 border rounded-md border-transparent bg-secondary"
              >
                Notary/Seller
              </Badge>
              <ChevronsUpDown width={16} height={16} className="opacity-50" />
            </div>
          </div>
          <Separator className="border" />
        </>
      )}
      {corporate && (
        <>
          <div
            onClick={() => handleCorporate()}
            className="flex items-center justify-between gap-2 w-full cursor-pointer"
          >
            <h2 className="text-card-foreground font-sans text-sm font-normal leading-5 flex-1">
              Alexandre Arnaud
            </h2>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="px-2.5 py-0.5 border rounded-md border-transparent bg-secondary"
              >
                Body corporate
              </Badge>
              <ChevronsUpDown width={16} height={16} className="opacity-50" />
            </div>
          </div>
          <Separator className="border" />
        </>
      )}
      <div className="flex gap-2 items-center">
        <Image src="/images/avatar.png" alt="avatar" width={48} height={48} />
        <div className="flex flex-col gap-1 align-start">
          <h2 className="text-card-foreground text-base font-semibold leading-normal font-sans">
            Talan Curtis
          </h2>
          <Badge
            variant="secondary"
            className="w-[54px] text-center px-2.5 py-0.5 border rounded-md border-transparent bg-secondary"
          >
            Buyer
          </Badge>
        </div>
      </div>
      <div className="flex flex-col gap-3 align-start">
        <div className="flex items-center gap-4">
          <h3 className="text-muted-foreground font-sans text-base font-normal leading-normal">
            Email
          </h3>
          <p className="text-primary font-sans text-base font-normal leading-normal">
            talan@hotmail.com
          </p>
        </div>
        <div className="flex items-center gap-4">
          <h3 className="text-muted-foreground font-sans text-base font-normal leading-normal">
            Phone
          </h3>
          <p className="text-primary font-sans text-base font-normal leading-normal">
            +32 468 799 975
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 justify-between">
        <div className="px-4 py-2 border rounded-md shadow-md">
          <Mail width={33} height={20} />
        </div>
        <div className="px-4 py-2 border rounded-md shadow-md">
          <Phone width={33} height={20} />
        </div>
        <div className="px-4 py-2 border rounded-md shadow-md">
          <Eye width={33} height={20} />
        </div>
        <div className="px-4 py-2 border rounded-md shadow-md">
          <Pencil width={33} height={20} />
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
            Dear Sir, Dear Madam
          </h3>
        </div>
        <div className="flex align-center gap-4 justify-between">
          <h3 className="text-muted-foreground font-sans text-base font-normal leading-normal flex-1">
            Address title
          </h3>
          <h3 className="text-primary font-sans text-base font-normal leading-normal flex-1-6">
            Mr. and Mrs.
          </h3>
        </div>
        <div className="flex align-center gap-4 justify-between">
          <h3 className="text-muted-foreground font-sans text-base font-normal leading-normal flex-1">
            Language
          </h3>
          <h3 className="text-primary font-sans text-base font-normal leading-normal flex-1-6">
            English
          </h3>
        </div>
        <div className="flex align-center gap-4 justify-between">
          <h3 className="text-muted-foreground font-sans text-base font-normal leading-normal flex-1">
            Category
          </h3>
          <h3 className="text-primary font-sans text-base font-normal leading-normal flex-1-6">
            Buyer
          </h3>
        </div>
        <div className="flex align-center gap-4 justify-between">
          <h3 className="text-muted-foreground font-sans text-base font-normal leading-normal flex-1">
            Lead Source
          </h3>
          <h3 className="text-primary font-sans text-base font-normal leading-normal flex-1-6">
            Immoweb
          </h3>
        </div>
      </div>
      {!proprietor && (
        <>
          <Separator className="border" />
          <div
            onClick={() => handleProprietor()}
            className="flex items-center justify-between gap-2 w-full cursor-pointer"
          >
            <h2 className="text-card-foreground font-sans text-sm font-normal leading-5 flex-1">
              Amélie Smet
            </h2>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="px-2.5 py-0.5 border rounded-md border-transparent bg-secondary"
              >
                Proprietors
              </Badge>
              <ChevronsUpDown width={16} height={16} className="opacity-50" />
            </div>
          </div>
        </>
      )}
      {!seller && (
        <>
          <Separator className="border" />
          <div
            onClick={() => handleSeller()}
            className="flex items-center justify-between gap-2 w-full cursor-pointer"
          >
            <h2 className="text-card-foreground font-sans text-sm font-normal leading-5 flex-1">
              Jeanne Reynders
            </h2>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="px-2.5 py-0.5 border rounded-md border-transparent bg-secondary"
              >
                Notary/Seller
              </Badge>
              <ChevronsUpDown width={16} height={16} className="opacity-50" />
            </div>
          </div>
        </>
      )}
      {!corporate && (
        <>
          <Separator className="border" />
          <div
            onClick={() => handleCorporate()}
            className="flex items-center justify-between gap-2 w-full cursor-pointer"
          >
            <h2 className="text-card-foreground font-sans text-sm font-normal leading-5 flex-1">
              Alexandre Arnaud
            </h2>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="px-2.5 py-0.5 border rounded-md border-transparent bg-secondary"
              >
                Body corporate
              </Badge>
              <ChevronsUpDown width={16} height={16} className="opacity-50" />
            </div>
          </div>
        </>
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
