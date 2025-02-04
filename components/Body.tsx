import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { SearchIcon, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Body() {
  return (
    <main>
      <div className="flex justify-between items-center p-5 h-20 border-b">
        <h1 className="text-3xl font-bold text-primary">Kanban Board</h1>
        <div className="flex items-center space-x-4">
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
      <Tabs defaultValue="cold_owner">
        <div className="flex justify-between items-center p-5">
          <TabsList>
            <TabsTrigger
              value="cold_owner"
              className="text-muted-foreground data-[state=active]:text-primary"
            >
              Cold Owner
            </TabsTrigger>
            <TabsTrigger
              value="cold_adoption"
              className="text-muted-foreground data-[state=active]:text-primary"
            >
              Cold Adoption
            </TabsTrigger>
            <TabsTrigger
              value="warm_bought"
              className="text-muted-foreground data-[state=active]:text-primary"
            >
              Warm Bought
            </TabsTrigger>
            <TabsTrigger
              value="warm_leads"
              className="text-muted-foreground data-[state=active]:text-primary"
            >
              Warm Leads
            </TabsTrigger>
          </TabsList>
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
                  <SelectItem value="Stephane Anciaux">
                    Stephane Anciaux
                  </SelectItem>
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
                <SelectItem value="most_updated">
                  Most recently updated
                </SelectItem>
                <SelectItem value="least_updated">
                  Least recently updated
                </SelectItem>
                <SelectItem value="most_added">Most recently added</SelectItem>
                <SelectItem value="least_added">
                  Least recently added
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="px-5">
          <TabsContent value="cold_owner">Cold Owner part</TabsContent>
          <TabsContent value="cold_adoption">Cold Adoption part</TabsContent>
          <TabsContent value="warm_bought">Warm Bought part</TabsContent>
          <TabsContent value="warm_leads">Warm Leads part</TabsContent>
        </div>
      </Tabs>
    </main>
  );
}
