import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";

const SelectGroups: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <Select>
        <SelectTrigger className="w-[206px] px-4 text-primary font-medium text-sm">
          <span className="max-w-[150px] truncate !block">
            <SelectValue placeholder="Greenfield Realty - Oakwood - Antwerp" />
          </span>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Site</SelectLabel>
            <SelectItem value="antwerp">
              Greenfield Realty - Oakwood - Antwerp
            </SelectItem>
            <SelectItem value="ghent">
              Greenfield Realty - Oakwood - Ghent
            </SelectItem>
            <SelectItem value="bruges">
              Greenfield Realty - Oakwood - Bruges
            </SelectItem>
            <SelectItem value="namur">
              Greenfield Realty - Oakwood - Namur
            </SelectItem>
            <SelectItem value="liege">
              Greenfield Realty - Oakwood - Liege
            </SelectItem>
            <SelectItem value="leuven">
              Greenfield Realty - Oakwood - Leuven
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[180px] px-4 text-primary font-medium text-sm">
          <SelectValue placeholder="John Doe" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Person</SelectLabel>
            <SelectItem value="John Doe">John Doe</SelectItem>
            <SelectItem value="Raphael Aerts">Raphael Aerts</SelectItem>
            <SelectItem value="Stephane Anciaux">Stephane Anciaux</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[94px] px-4 text-primary font-medium text-sm">
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Lead Source</SelectLabel>
            <SelectItem value="lead_source">Lead Source</SelectItem>
            <SelectItem value="source">Source</SelectItem>
            <SelectItem value="notary">Notary</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="max-w-[200px] px-4 text-primary font-medium text-sm">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="most_updated">Most recently updated</SelectItem>
          <SelectItem value="least_updated">Least recently updated</SelectItem>
          <SelectItem value="most_added">Most recently added</SelectItem>
          <SelectItem value="least_added">Least recently added</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectGroups;
