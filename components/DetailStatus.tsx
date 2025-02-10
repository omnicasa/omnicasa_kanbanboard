"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

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

interface DetailStatusProps {
  statuss: { value: string; label: string }[];
  title: string;
}

const DetailStatus: React.FC<DetailStatusProps> = ({ statuss, title }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[194px] h-[20px] justify-end border-none shadow-none gap-1 p-0 text-right text-primary font-sans text-sm font-normal leading-5"
        >
          {value
            ? statuss.find((status) => status.value === value)?.label
            : `Select ${title}...`}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[256px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${title}...`} className="h-9" />
          <CommandList>
            <CommandEmpty>No status found.</CommandEmpty>
            <CommandGroup>
              {statuss.map((status) => (
                <CommandItem
                  key={status.value}
                  value={status.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="overflow-hidden text-primary text-ellipsis font-sans text-sm font-normal leading-5"
                >
                  {status.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === status.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default DetailStatus;
