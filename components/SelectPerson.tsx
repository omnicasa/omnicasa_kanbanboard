"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
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

const persons = [
  { id: 1, name: "John Doe", avatar: "/images/avatar.png" },
  { id: 2, name: "Raphael Aerts" },
  { id: 3, name: "Stephane Anciaux" },
];

export default function SelectPerson() {
  const [open, setOpen] = React.useState(false);
  const [selectedPersons, setSelectedPersons] = useState<string[]>([]);
  const [selectedPersonsFull, setSelectedPersonsFull] = useState<
    { id: number; name: string; avatar?: string; color: string }[]
  >([]);

  const handleSelectItem = (currentValue: string) => {
    setSelectedPersons((prevSelectedPersons) => {
      const newSelectedPersons = prevSelectedPersons.includes(currentValue)
        ? prevSelectedPersons.filter((per) => per !== currentValue)
        : [...prevSelectedPersons, currentValue];

      return newSelectedPersons.length === 0 ? [] : newSelectedPersons;
    });
  };

  const selectedCount = selectedPersons.length;
  const firstSelectedPerson =
    selectedPersons.length === 0 ? "Select persons" : selectedPersons[0];

  const getRandomColor = () => {
    const letters = "CDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  };

  useEffect(() => {
    const updatedSelectedPersonsFull = persons
      .filter((person) => selectedPersons.includes(person.name))
      .map((person) => ({
        ...person,
        color: getRandomColor(),
      }));
    setSelectedPersonsFull(updatedSelectedPersonsFull);
  }, [selectedPersons]);

  const getInitials = (name: string) => {
    const nameArr = name.split(" ");
    return `${nameArr[0].charAt(0)}${nameArr[1].charAt(0)}`;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="inline-flex h-9 px-4 py-2 items-center gap-2 flex-shrink-0 rounded-md border text-primary bg-white shadow-sm font-sans"
        >
          <div className="flex items-center gap-1">
            {selectedPersonsFull.map((person, index) => (
              <div
                key={index}
                className="relative flex-shrink-0 w-5 h-5 rounded-full overflow-hidden -ml-2 first:ml-0"
              >
                {person.avatar ? (
                  <Image
                    src={person.avatar}
                    alt={person.name}
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <span
                    className="flex items-center justify-center w-full h-full font-thin text-[10px] text-primary"
                    style={{ backgroundColor: person.color }}
                  >
                    {getInitials(person.name)}
                  </span>
                )}
              </div>
            ))}
            <span>{firstSelectedPerson}</span>
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
        className="p-0 rounded-lg border shadow-md w-[240px] h-auto"
      >
        <Command>
          <CommandInput placeholder="Person" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {persons.map((person) => (
                <CommandItem
                  key={person.name.toLowerCase()}
                  value={person.name}
                  onSelect={(currentValue) => handleSelectItem(currentValue)}
                >
                  <div className="flex items-center gap-[10px] self-stretch p-1">
                    <Checkbox
                      id={person.name.toLowerCase()}
                      checked={selectedPersons.includes(person.name)}
                      className={`flex w-4 items-start gap-2 ${
                        selectedPersons.includes(person.name)
                          ? "!bg-[#0786fd] border-transparent"
                          : "border-[#E4E4E7]"
                      }`}
                    />
                    <label
                      htmlFor={person.name.toLowerCase()}
                      className="text-sm font-normal leading-[1.42857] text-primary overflow-hidden text-ellipsis"
                    >
                      {person.name}
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
