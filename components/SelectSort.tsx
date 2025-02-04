"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandItem, CommandList } from "@/components/ui/command";

const sorts = [
  "Most recently updated",
  "Least recently updated",
  "Most recently added",
  "Least recently added",
];

export default function SelectSort() {
  const [isCommandVisible, setIsCommandVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState<string>("");

  const commandRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      commandRef.current &&
      !commandRef.current.contains(event.target as Node)
    ) {
      setIsCommandVisible(false);
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
  };

  return (
    <div className="relative" ref={commandRef}>
      <Button
        variant="outline"
        className="inline-flex h-9 px-4 py-2 items-center gap-2 flex-shrink-0 rounded-md border text-primary bg-white shadow-sm font-sans"
        onClick={toggleCommandVisibility}
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
      {isCommandVisible && (
        <Command className="absolute right-0 mt-1 rounded-lg border shadow-md md:min-w-[220px] h-auto">
          <CommandList>
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
          </CommandList>
        </Command>
      )}
    </div>
  );
}
