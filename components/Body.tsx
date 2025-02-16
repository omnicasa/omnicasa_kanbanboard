"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeaderSearch from "./HeaderSearch";
import SelectSite from "./SelectSite";
import SelectPerson from "./SelectPerson";
import SelectFilter from "./SelectFilter";
import SelectSort from "./SelectSort";
import Board from "./Board";

interface RecordItem {
  Id: number;
  Reference: string;
  ProprietorReference: string;
  date: string;
  images: string[];
  badge: boolean;
  ManagerShortName: string;
}

export default function Body() {
  const initialColdData = [
    { SubstatusId: 1, Stage: "New", items: [] as RecordItem[] },
    {
      SubstatusId: 37,
      Stage: "Contacted but No Communication",
      items: [] as RecordItem[],
    },
    { SubstatusId: 38, Stage: "Call 1", items: [] as RecordItem[] },
    { SubstatusId: 39, Stage: "Call 2", items: [] as RecordItem[] },
    { SubstatusId: 40, Stage: "Appointment 1 Set", items: [] as RecordItem[] },
    { SubstatusId: 41, Stage: "Appointment 1 Done", items: [] as RecordItem[] },
    { SubstatusId: 44, Stage: "Follow Up 1 Month", items: [] as RecordItem[] },
    { SubstatusId: 45, Stage: "Follow Up 2 Months", items: [] as RecordItem[] },
    { SubstatusId: 46, Stage: "Follow Up 3 Months", items: [] as RecordItem[] },
  ];

  const initialWarmData = [
    { SubstatusId: 1, Stage: "New", items: [] as RecordItem[] },
    {
      SubstatusId: 37,
      Stage: "Contacted but No Communication",
      items: [] as RecordItem[],
    },
    { SubstatusId: 40, Stage: "Appointment 1 Set", items: [] as RecordItem[] },
    { SubstatusId: 41, Stage: "Appointment 1 Done", items: [] as RecordItem[] },
    { SubstatusId: 42, Stage: "Appointment 2 Set", items: [] as RecordItem[] },
    { SubstatusId: 43, Stage: "Appointment 2 Done", items: [] as RecordItem[] },
    { SubstatusId: 44, Stage: "Follow Up 1 Month", items: [] as RecordItem[] },
    { SubstatusId: 45, Stage: "Follow Up 2 Months", items: [] as RecordItem[] },
    { SubstatusId: 46, Stage: "Follow Up 3 Months", items: [] as RecordItem[] },
    { SubstatusId: 47, Stage: "Follow Up 6 Months", items: [] as RecordItem[] },
    { SubstatusId: 48, Stage: "Follow Up 1 Year", items: [] as RecordItem[] },
  ];
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
        <div className="px-5 pb-5 w-[calc(100vw-65px)]">
          <TabsContent value="cold_owner">
            <Board statusesID={6} initialData={initialColdData} />
          </TabsContent>
          <TabsContent value="cold_adoption">
            <Board statusesID={7} initialData={initialColdData} />
          </TabsContent>
          <TabsContent value="warm_bought">
            <Board statusesID={8} initialData={initialWarmData} />
          </TabsContent>
          <TabsContent value="warm_leads">
            <Board statusesID={9} initialData={initialWarmData} />
          </TabsContent>
        </div>
      </Tabs>
    </main>
  );
}
