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
import { useFetchSites } from "@/hooks/useFetchData";
import { useSiteStore } from "@/store/useStore";
import Loading from "./Loading";

interface Site {
  Id: number;
  NameNL: string;
}

export default function SelectSite() {
  const [open, setOpen] = React.useState(false);
  const [selectedSites, setSelectedSites] = useState<string[]>([]);
  const { data: sites, isLoading, error } = useFetchSites();
  const siteStore = useSiteStore();

  const handleSelectItem = (currentValue: string) => {
    setSelectedSites((prevSelectedSites) => {
      const newSelectedSites = prevSelectedSites.includes(currentValue)
        ? prevSelectedSites.filter((val) => val !== currentValue)
        : [...prevSelectedSites, currentValue];

      return newSelectedSites.length === 0 ? [] : newSelectedSites;
    });
  };
  useEffect(() => {
    if (sites?.Site) {
      const updatedSelectedSiteIds = sites.Site.filter((site: Site) =>
        selectedSites.includes(site.NameNL)
      ).map((site: Site) => site.Id);
      siteStore.setSelectedSiteIds(updatedSelectedSiteIds);
    }
  }, [selectedSites, sites]);

  const selectedCount = selectedSites.length;
  const firstSelectedSite =
    selectedSites.length === 0 ? "Select sites" : selectedSites[0];

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
            <span className="truncate">{firstSelectedSite}</span>
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
          {isLoading && <Loading size={10} color="#123abc" />}
          {error && <div>Error: {error.message}</div>}
          <CommandInput placeholder="Site" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {sites?.Site?.map((item: Site) => (
                <CommandItem
                  key={item.Id}
                  value={item.NameNL}
                  onSelect={(currentValue: string) =>
                    handleSelectItem(currentValue)
                  }
                >
                  <div className="flex items-center gap-[10px] self-stretch p-1">
                    <Checkbox
                      id={item.Id.toString()}
                      checked={selectedSites.includes(item.NameNL)}
                      className={`flex w-4 items-start gap-2 ${
                        selectedSites.includes(item.NameNL)
                          ? "!bg-button-primary border-transparent"
                          : "border-border"
                      }`}
                    />
                    <label
                      htmlFor={item.NameNL.toLowerCase()}
                      className="text-sm font-normal leading-[1.42857] text-primary overflow-hidden text-ellipsis"
                    >
                      {item.NameNL}
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
