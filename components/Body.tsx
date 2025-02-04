import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeaderSearch from "./HeaderSearch";
import SelectSite from "./SelectSite";
import SelectPerson from "./SelectPerson";
import SelectFilter from "./SelectFilter";
import SelectSort from "./SelectSort";
import Board from "./Board";

export default function Body() {
  return (
    <main>
      <HeaderSearch />
      <Tabs defaultValue="cold_owner">
        <div className="flex justify-between items-center p-5">
          <TabsList>
            <TabsTrigger
              value="cold_owner"
              className="text-muted-foreground data-[state=active]:text-primary w-[130px]"
            >
              Cold Owner
            </TabsTrigger>
            <TabsTrigger
              value="cold_adoption"
              className="text-muted-foreground data-[state=active]:text-primary w-[130px]"
            >
              Cold Adoption
            </TabsTrigger>
            <TabsTrigger
              value="warm_bought"
              className="text-muted-foreground data-[state=active]:text-primary w-[130px]"
            >
              Warm Bought
            </TabsTrigger>
            <TabsTrigger
              value="warm_leads"
              className="text-muted-foreground data-[state=active]:text-primary w-[130px]"
            >
              Warm Leads
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <SelectSite />
            <SelectPerson />
            <SelectFilter />
            <SelectSort />
          </div>
        </div>
        <div className="px-5">
          <TabsContent value="cold_owner">
            <Board />
          </TabsContent>
          <TabsContent value="cold_adoption">Cold Adoption part</TabsContent>
          <TabsContent value="warm_bought">Warm Bought part</TabsContent>
          <TabsContent value="warm_leads">Warm Leads part</TabsContent>
        </div>
      </Tabs>
    </main>
  );
}
