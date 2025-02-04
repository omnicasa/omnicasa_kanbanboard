"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";

const locations = ["Antwerp", "Ghent", "Bruges", "Namur", "Liege", "Leuven"];

export default function SelectSite() {
  const [isCommandVisible, setIsCommandVisible] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const toggleCommandVisibility = () => {
    setIsCommandVisible(!isCommandVisible);
  };

  const handleCheckboxChange = (location: string) => {
    setSelectedLocations((prevSelectedLocations) => {
      const newSelectedLocations = prevSelectedLocations.includes(location)
        ? prevSelectedLocations.filter((loc) => loc !== location)
        : [...prevSelectedLocations, location];

      return newSelectedLocations.length === 0 ? [] : newSelectedLocations;
    });
  };

  const selectedCount = selectedLocations.length;
  const firstSelectedLocation =
    `Greenfield Realty - Oakwood - ${selectedLocations[0]}` ||
    "Select a location";

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="inline-flex h-9 px-4 py-2 items-center gap-2 flex-shrink-0 rounded-md border text-primary bg-white shadow-sm"
        onClick={toggleCommandVisibility}
      >
        <div className="flex items-center gap-1 max-w-[150px]">
          <span className="truncate">{firstSelectedLocation}</span>
          {selectedCount > 1 && <span>+{selectedCount - 1}</span>}
        </div>
        <Image
          src="/images/down_arrow.svg"
          width={16}
          height={16}
          alt="down-arrow"
          className="w-4 h-4"
        />
      </Button>
      {isCommandVisible && (
        <Command className="absolute left-0 mt-1 rounded-lg border shadow-md md:min-w-[334px] h-auto">
          <CommandInput placeholder="Site" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {locations.map((location) => (
              <CommandItem key={location.toLowerCase()}>
                <div className="flex items-center gap-[10px] self-stretch px-1">
                  <Checkbox
                    id={location.toLowerCase()}
                    checked={selectedLocations.includes(location)}
                    onCheckedChange={() => handleCheckboxChange(location)}
                    className={`flex w-4 items-start gap-2 ${
                      selectedLocations.includes(location)
                        ? "!bg-[#0786fd] border-transparent"
                        : ""
                    }`}
                  />
                  <label
                    htmlFor={location.toLowerCase()}
                    className="text-sm font-normal leading-[1.42857] text-primary overflow-hidden text-ellipsis"
                  >
                    Greenfield Realty - Oakwood - {location}
                  </label>
                </div>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      )}
    </div>
  );
}
