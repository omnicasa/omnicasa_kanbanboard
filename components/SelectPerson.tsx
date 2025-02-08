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
import { useFetchManagers } from "@/hooks/useFetchData";
import Loading from "./Loading";

interface Manager {
  Id: number;
  Name: string;
  ShortName: string;
  Email: string;
  SiteName: string;
}

export default function SelectPerson() {
  const [open, setOpen] = React.useState(false);
  const [selectedPersons, setSelectedPersons] = useState<string[]>([]);
  const [selectedPersonsFull, setSelectedPersonsFull] = useState<
    (Manager & { avatar: string; color: string })[]
  >([]);
  const { data: managers, isLoading, error } = useFetchManagers();

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
    selectedPersons.length === 0 ? "Select managers" : selectedPersons[0];

  const getRandomColor = () => {
    const letters = "CDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  };

  useEffect(() => {
    if (managers?.Manager) {
      const updatedSelectedPersonsFull = managers.Manager.filter(
        (person: Manager) => selectedPersons.includes(person.Name)
      ).map((person: Manager) => ({
        ...person,
        color: getRandomColor(),
      }));
      setSelectedPersonsFull(updatedSelectedPersonsFull);
    }
  }, [selectedPersons, managers]);

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
                    alt={person.Name}
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <span
                    className="flex items-center justify-center w-full h-full font-thin text-[10px] text-primary"
                    style={{ backgroundColor: person.color }}
                  >
                    {person.ShortName}
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
          {isLoading && <Loading size={10} color="#123abc" />}
          {error && <div>Error: {error.message}</div>}
          <CommandInput placeholder="Person" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {managers?.Manager?.map((person: Manager) => (
                <CommandItem
                  key={person.Id}
                  value={person.Name}
                  onSelect={(currentValue: string) =>
                    handleSelectItem(currentValue)
                  }
                >
                  <div className="flex items-center gap-[10px] self-stretch p-1">
                    <Checkbox
                      id={person.Id.toString()}
                      checked={selectedPersons.includes(person.Name)}
                      className={`flex w-4 items-start gap-2 ${
                        selectedPersons.includes(person.Name)
                          ? "!bg-[#0786fd] border-transparent"
                          : "border-[#E4E4E7]"
                      }`}
                    />
                    <label
                      htmlFor={person.Id.toString()}
                      className="text-sm font-normal leading-[1.42857] text-primary overflow-hidden text-ellipsis"
                    >
                      {person.Name}
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
