"use client";

import { Check, ChevronUp, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";

interface User {
  personId: number;
  phoneNumber: string;
  value: string;
  label: string;
}

interface CustomComboboxProps {
  data: User[];
  title: string;
  avatar?: boolean;
  onItemSelect: (item: User) => void;
}

const CustomCombobox: React.FC<CustomComboboxProps> = ({
  data,
  title,
  avatar,
  onItemSelect,
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  const getRandomColor = () => {
    const letters = "CDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  };
  const handlePopoverToggle = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };
  const handleItemClick = (item: User) => {
    onItemSelect(item);
    setIsPopoverOpen(false);
    setValue(item.value);
    setOpen(false);
  };
  return (
    <div className="flex items-center gap-[6px] px-3 py-1 self-stretch">
      {avatar && (
        <span
          className="flex items-center justify-center w-[20px] h-[20px] border rounded-full font-thin text-[10px] text-primary"
          style={{ backgroundColor: getRandomColor() }}
        >
          JD
        </span>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="p-0 border-none shadow-none justify-between"
            onClick={handlePopoverToggle}
          >
            {value
              ? data.find((item) => item.value === value)?.label
              : "Choose " + title}
            {!isPopoverOpen ? (
              <ChevronDown className="opacity-50" />
            ) : (
              <ChevronUp className="opacity-50" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" align="start">
          <Command>
            <CommandInput placeholder={`Search ${title}`} className="h-9" />
            <CommandList>
              <CommandEmpty>No {title} found.</CommandEmpty>
              <CommandGroup>
                {data.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={() => handleItemClick(item)}
                  >
                    {item.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === item.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CustomCombobox;
