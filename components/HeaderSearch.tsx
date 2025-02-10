import React from "react";
import { SearchIcon, Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const HeaderSearch = () => {
  return (
    <div className="flex justify-between items-center p-5 h-20 border-b">
      <h1 className="text-3xl font-bold text-primary">Kanban Board</h1>
      <div className="flex items-center space-x-2">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search"
            className="px-3 py-1 border rounded-md w-56 text-primary font-normal text-sm pl-10"
          />
        </div>
        <Button className="bg-[#0786FD] text-primary-foreground px-4 py-2 rounded-md w-32 items-center justify-center">
          <Plus className="!h-5 !w-5" />
          <span>New Lead</span>
        </Button>
      </div>
    </div>
  );
};

export default HeaderSearch;
