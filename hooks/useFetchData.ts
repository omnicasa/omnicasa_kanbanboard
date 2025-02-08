import { useQuery } from "@tanstack/react-query";

const BASE_URL = process.env.BASE_URL;
const OAUTH_TOKEN = process.env.OAUTH_TOKEN;

const fetchProperties = async (
  statusesID: number,
  siteIds: number[],
  managerIds: number[]
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
      OrderBy: "",
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

export const useFetchProperties = (
  statusesID: number,
  siteIds: number[],
  managerIds: number[]
) => {
  return useQuery({
    queryKey: ["properties"],
    queryFn: () => fetchProperties(statusesID, siteIds, managerIds),
  });
};

export const useFetchSites = () => {
  return useQuery({
    queryKey: ["sites"],
    queryFn: fetchSites,
  });
};

export const useFetchManagers = () => {
  return useQuery({
    queryKey: ["managers"],
    queryFn: fetchManagers,
  });
};
