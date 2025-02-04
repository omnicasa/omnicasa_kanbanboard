"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";

const filterTypes = [
  { id: 1, type: "Lead Source", iconUrl: "/images/tag.svg" },
  { id: 2, type: "Source", iconUrl: "/images/earth.svg" },
];

const leadSources = ["Other Source", "FSBO (For Sale by Owner)", "Notary"];
const sources = ["sources1", "sources2", "sources3"];

export default function SelectFilter() {
  const [isCommandVisible, setIsCommandVisible] = useState(false);
  const [isLeadSourceVisible, setIsLeadSourceVisible] = useState(false);
  const [isSourceVisible, setIsSourceVisible] = useState(false);

  const [selectedLeadSources, setSelectedLeadSources] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const commandRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      commandRef.current &&
      !commandRef.current.contains(event.target as Node)
    ) {
      setIsCommandVisible(false);
      setIsLeadSourceVisible(false);
      setIsSourceVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleCommandVisibility = () => {
    setIsCommandVisible(!isCommandVisible);
    setIsLeadSourceVisible(false);
    setIsSourceVisible(false);
  };

  const handleCheckboxChangeLead = (item: string) => {
    setSelectedLeadSources((prevSelectedLeadSources) => {
      const newSelectedLeadSources = prevSelectedLeadSources.includes(item)
        ? prevSelectedLeadSources.filter((sor) => sor !== item)
        : [...prevSelectedLeadSources, item];

      return newSelectedLeadSources.length === 0 ? [] : newSelectedLeadSources;
    });
  };

  const handleCheckboxChangeSource = (item: string) => {
    setSelectedSources((prevSelectedSources) => {
      const newSelectedSources = prevSelectedSources.includes(item)
        ? prevSelectedSources.filter((sor) => sor !== item)
        : [...prevSelectedSources, item];

      return newSelectedSources.length === 0 ? [] : newSelectedSources;
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const onTypeClick = (item: { id: number; type: string; iconUrl: string }) => {
    setIsCommandVisible(false);
    if (item.type === "Lead Source") {
      console.log("Lead Source clicked");
      setIsLeadSourceVisible(true);
    } else if (item.type === "Source") {
      console.log("Source clicked");
      setIsSourceVisible(true);
    }
  };

  const filteredLeadSources = leadSources.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredSources = sources.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative" ref={commandRef}>
      <Button
        variant="outline"
        className="inline-flex h-9 px-4 py-2 items-center gap-2 flex-shrink-0 rounded-md border text-primary bg-white shadow-sm font-sans"
        onClick={toggleCommandVisibility}
      >
        <Image
          src="/images/plus.svg"
          width={16}
          height={16}
          alt="down-arrow"
          className="w-4 h-4"
        />
        <div className="flex items-center gap-1">
          <span>Filter</span>
        </div>
      </Button>
      {isCommandVisible && (
        <Command className="absolute right-0 mt-1 rounded-lg border shadow-md md:min-w-[192px] h-auto">
          <CommandList>
            {filterTypes.map((item, index) => (
              <CommandItem key={index} onSelect={() => onTypeClick(item)}>
                <div className="flex items-center gap-[10px] self-stretch p-1">
                  <Image
                    src={item.iconUrl}
                    width={16}
                    height={16}
                    alt={item.type}
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor={item.type}
                    className="text-sm font-normal leading-[1.42857] text-primary overflow-hidden text-ellipsis"
                  >
                    {item.type}
                  </label>
                </div>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      )}
      {isLeadSourceVisible && (
        <Command className="absolute right-0 mt-1 rounded-lg border shadow-md md:min-w-[235px] h-auto">
          <CommandInput
            placeholder="Lead Source"
            value={searchTerm}
            onValueChange={(value: string) => handleSearchChange(value)}
          />
          <CommandList>
            {filteredLeadSources.length === 0 ? (
              <CommandEmpty>No results found.</CommandEmpty>
            ) : (
              filteredLeadSources.map((item, index) => (
                <CommandItem key={index}>
                  <div className="flex items-center gap-[10px] self-stretch p-1">
                    <Checkbox
                      id={item}
                      checked={selectedLeadSources.includes(item)}
                      onCheckedChange={() => handleCheckboxChangeLead(item)}
                      className={`flex w-4 items-start gap-2 ${
                        selectedLeadSources.includes(item)
                          ? "!bg-[#0786fd] border-transparent"
                          : "border-[#E4E4E7]"
                      }`}
                    />
                    <label
                      htmlFor={item}
                      className="text-sm font-normal leading-[1.42857] text-primary overflow-hidden text-ellipsis"
                    >
                      {item}
                    </label>
                  </div>
                </CommandItem>
              ))
            )}
          </CommandList>
        </Command>
      )}
      {isSourceVisible && (
        <Command className="absolute right-0 mt-1 rounded-lg border shadow-md md:min-w-[235px] h-auto">
          <CommandInput
            placeholder="Source"
            value={searchTerm}
            onValueChange={(value: string) => handleSearchChange(value)}
          />
          <CommandList>
            {filteredSources.length === 0 ? (
              <CommandEmpty>No results found.</CommandEmpty>
            ) : (
              filteredSources.map((item, index) => (
                <CommandItem key={index}>
                  <div className="flex items-center gap-[10px] self-stretch p-1">
                    <Checkbox
                      id={item}
                      checked={selectedSources.includes(item)}
                      onCheckedChange={() => handleCheckboxChangeSource(item)}
                      className={`flex w-4 items-start gap-2 ${
                        selectedSources.includes(item)
                          ? "!bg-[#0786fd] border-transparent"
                          : "border-[#E4E4E7]"
                      }`}
                    />
                    <label
                      htmlFor={item}
                      className="text-sm font-normal leading-[1.42857] text-primary overflow-hidden text-ellipsis"
                    >
                      {item}
                    </label>
                  </div>
                </CommandItem>
              ))
            )}
          </CommandList>
        </Command>
      )}
    </div>
  );
}
