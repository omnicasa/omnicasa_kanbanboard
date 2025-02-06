"use client";

import Image from "next/image";
import React, { useState } from "react";
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

const locations = [
  {
    value: "Greenfield Realty - Oakwood - Antwerp",
    label: "Antwerp",
  },
  {
    value: "Greenfield Realty - Oakwood - Ghent",
    label: "Ghent",
  },
  {
    value: "Greenfield Realty - Oakwood - Bruges",
    label: "Bruges",
  },
  {
    value: "Greenfield Realty - Oakwood - Namur",
    label: "Namur",
  },
  {
    value: "Greenfield Realty - Oakwood - Liege",
    label: "Liege",
  },
  {
    value: "Greenfield Realty - Oakwood - Leuven",
    label: "Leuven",
  },
];

export default function SelectSite() {
  const [open, setOpen] = React.useState(false);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const handleSelectItem = (currentValue: string) => {
    setSelectedLocations((prevSelectedLocations) => {
      const newSelectedLocations = prevSelectedLocations.includes(currentValue)
        ? prevSelectedLocations.filter((val) => val !== currentValue)
        : [...prevSelectedLocations, currentValue];

      return newSelectedLocations.length === 0 ? [] : newSelectedLocations;
    });
  };

  const selectedCount = selectedLocations.length;
  const firstSelectedLocation =
    selectedLocations.length === 0 ? "Select sites" : selectedLocations[0];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="inline-flex h-9 px-4 py-2 items-center gap-2 flex-shrink-0 rounded-md border text-primary bg-white shadow-sm font-sans"
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
            className="w-4 h-4 mt-[2px]"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        className="p-0 rounded-lg border shadow-md w-[334px] h-auto"
      >
        <Command>
          <CommandInput placeholder="Site" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {locations.map((location) => (
                <CommandItem
                  key={location.value}
                  value={location.value}
                  onSelect={(currentValue) => handleSelectItem(currentValue)}
                >
                  <div className="flex items-center gap-[10px] self-stretch p-1">
                    <Checkbox
                      id={location.value}
                      checked={selectedLocations.includes(location.value)}
                      className={`flex w-4 items-start gap-2 ${
                        selectedLocations.includes(location.value)
                          ? "!bg-[#0786fd] border-transparent"
                          : "border-[#E4E4E7]"
                      }`}
                    />
                    <label
                      htmlFor={location.value.toLowerCase()}
                      className="text-sm font-normal leading-[1.42857] text-primary overflow-hidden text-ellipsis"
                    >
                      {location.value}
                    </label>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
