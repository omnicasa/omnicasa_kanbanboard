"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const sorts = [
  "Most recently updated",
  "Least recently updated",
  "Most recently added",
  "Least recently added",
];

export default function SelectSort() {
  const [open, setOpen] = React.useState(false);
  const [selectedSort, setSelectedSort] = useState<string>("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="inline-flex h-9 px-4 py-2 items-center gap-2 flex-shrink-0 rounded-md border text-primary bg-white shadow-sm font-sans"
        >
          {selectedSort ? selectedSort : "Sort by"}
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
        align="end"
        className="p-0 rounded-lg border shadow-md w-[224px] h-auto"
      >
        <Command>
          <CommandList>
            <CommandGroup>
              {sorts.map((item: string) => (
                <CommandItem key={item} onSelect={() => setSelectedSort(item)}>
                  <div className="flex flex-1 items-center justify-between gap-[10px] self-stretch p-1">
                    <label
                      htmlFor={item}
                      className="text-sm font-normal leading-[1.42857] text-primary overflow-hidden text-ellipsis"
                    >
                      {item}
                    </label>
                    {selectedSort === item && (
                      <Image
                        src="/images/check.svg"
                        width={16}
                        height={16}
                        alt="down-arrow"
                        className="w-4 h-4"
                      />
                    )}
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
