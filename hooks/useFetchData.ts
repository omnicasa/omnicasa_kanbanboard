import { useMutation, useQuery } from "@tanstack/react-query";

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

const fetchSourceContact = async () => {
  const response = await fetch(`${BASE_URL}/common/lookup-data/SourceContact`, {
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

const fetchPersonInfo = async (personId: number) => {
  const response = await fetch(
    `${BASE_URL}/persons/${personId}/preview?tabs=*`,
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

export const sendSMS = async (
  personId: number,
  phoneNumber: string,
  message: string
) => {
  if (personId === 0 || phoneNumber === "") {
    console.error("Invalid personId or phoneNumber");
    return;
  }

  const response = await fetch(`${BASE_URL}/persons/sms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OAUTH_TOKEN}`,
      "Accept-Language": "English",
    },
    body: JSON.stringify({
      PersonId: personId,
      phoneNumber: phoneNumber,
      Message: message,
    }),
  });

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

export const useFetchLeadDetails = (leadId: number) => {
  return useQuery({
    queryKey: ["leadDetails", leadId],
    queryFn: () => fetchLeadDetails(leadId),
  });
};

export const useFetchSourceContact = () => {
  return useQuery({
    queryKey: ["sourceContact"],
    queryFn: fetchSourceContact,
  });
};

export const useFetchPersonInfo = (personId: number) => {
  return useQuery({
    queryKey: ["personInfo", personId],
    queryFn: () => fetchPersonInfo(personId),
  });
};
