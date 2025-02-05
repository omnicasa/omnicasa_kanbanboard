"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const filterTypes = [
  { id: 1, type: "Lead Source", iconUrl: "/images/tag.svg" },
  { id: 2, type: "Source", iconUrl: "/images/earth.svg" },
];

const leadSources = [
  {
    value: "Other Source",
    label: "Other Source",
  },
  {
    value: "FSBO (For Sale by Owner)",
    label: "FSBO (For Sale by Owner)",
  },
  {
    value: "Notary",
    label: "Notary",
  },
];

export default function SelectFilter() {
  const [open, setOpen] = React.useState(false);
  const [selectedLeadSources, setSelectedLeadSources] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const commandInputRef = useRef<HTMLInputElement>(null);

  const handleSelectItem = (item: string) => {
    setSelectedLeadSources((prevSelectedLeadSources) => {
      const newSelectedLeadSources = prevSelectedLeadSources.includes(item)
        ? prevSelectedLeadSources.filter((sor) => sor !== item)
        : [...prevSelectedLeadSources, item];

      return newSelectedLeadSources.length === 0 ? [] : newSelectedLeadSources;
    });
  };

  const onTypeClick = (item: string) => {
    setSelectedType(item);
  };

  const handlePopoverChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setSelectedType("");
    }
  };

  useEffect(() => {
    if (selectedType === "Lead Source" && commandInputRef.current) {
      commandInputRef.current.focus();
    }
  }, [selectedType]);

  return (
    <Popover open={open} onOpenChange={handlePopoverChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="inline-flex h-9 px-4 py-2 items-center gap-2 flex-shrink-0 rounded-md border text-primary bg-white shadow-sm font-sans"
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
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        className={`p-0 rounded-lg border shadow-md h-auto ${
          selectedType === "" ? "w-[192px]" : "w-[235px]"
        }`}
      >
        {selectedType === "Lead Source" ? (
          <Command>
            <CommandInput ref={commandInputRef} placeholder="Lead Source" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {leadSources.map((item, index) => (
                  <CommandItem
                    key={index}
                    value={item.value}
                    onSelect={(currentValue) => handleSelectItem(currentValue)}
                  >
                    <div className="flex items-center gap-[10px] self-stretch p-1">
                      <Checkbox
                        id={item.label}
                        checked={selectedLeadSources.includes(item.value)}
                        className={`flex w-4 items-start gap-2 ${
                          selectedLeadSources.includes(item.value)
                            ? "!bg-[#0786fd] border-transparent"
                            : "border-[#E4E4E7]"
                        }`}
                      />
                      <label
                        htmlFor={item.label}
                        className="text-sm font-normal leading-[1.42857] text-primary overflow-hidden text-ellipsis"
                      >
                        {item.value}
                      </label>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        ) : (
          <Command>
            <CommandList>
              <CommandGroup>
                {filterTypes.map((item, index) => (
                  <CommandItem
                    key={index}
                    value={item.type}
                    onSelect={(currentValue) => onTypeClick(currentValue)}
                  >
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
              </CommandGroup>
            </CommandList>
          </Command>
        )}
      </PopoverContent>
    </Popover>
  );
}
