import { useQuery } from "@tanstack/react-query";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const OAUTH_TOKEN = process.env.NEXT_PUBLIC_OAUTH_TOKEN;

const fetchProperties = async (
  statusesID: number,
  siteIds: number[],
  managerIds: number[],
  sortValue: string
) => {
  const response = await fetch(`${BASE_URL}/properties/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OAUTH_TOKEN}`,
      "Accept-Language": "English",
    },
    body: JSON.stringify({
      PageIndex: 1,
      PageSize: 20,
      OrderBy: sortValue,
      Condition: {
        SiteIds: siteIds,
        PurposeIds: [],
        StatusIds: [statusesID],
        ConstructionTypes: [],
        Reference_AdvanceSearch: false,
        IsUseGeoCity: false,
        TypeOfPropIds: [],
        InteriorDecorIds: [],
        EnviromentIds: [],
        ExteriorStateIds: [],
        UsageIds: [],
        ManagerIds: managerIds,
        FilterObject: false,
        DemandUseGps: false,
        RegionEntries: [],
        InputEntries: [],
        IsMediaSelected: false,
        Ids: [],
        IsDeleted: false,
      },
      Fields: "",
      ViewMode: 0,
      Cache: true,
      FilterCondition: {
        Fields: [],
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const fetchSites = async () => {
  const response = await fetch(`${BASE_URL}/common/lookup-data/Site`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OAUTH_TOKEN}`,
      "Accept-Language": "English",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const fetchManagers = async () => {
  const response = await fetch(`${BASE_URL}/common/lookup-data/Manager`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OAUTH_TOKEN}`,
      "Accept-Language": "English",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const fetchLeadDetails = async (leadId: number) => {
  const response = await fetch(
    `${BASE_URL}/properties/${leadId}/preview?tabs=*`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OAUTH_TOKEN}`,
        "Accept-Language": "English",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const useFetchProperties = (
  statusesID: number,
  siteIds: number[],
  managerIds: number[],
  sortValue: string
) => {
  return useQuery({
    queryKey: ["properties"],
    queryFn: () => fetchProperties(statusesID, siteIds, managerIds, sortValue),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    initialData: [],
  });
};

export const useFetchSites = () => {
  return useQuery({
    queryKey: ["sites"],
    queryFn: fetchSites,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });
};

export const useFetchManagers = () => {
  return useQuery({
    queryKey: ["managers"],
    queryFn: fetchManagers,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });
};

export const useFetchLeadDetails = (leadId: number) => {
  return useQuery({
    queryKey: ["leadDetails", leadId],
    queryFn: () => fetchLeadDetails(leadId),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });
};
