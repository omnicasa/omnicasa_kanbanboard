"use client";

import { useSearchParams } from "next/navigation";
import { useFetchLeadDetails } from "@/hooks/useFetchData";
import DetailHeader from "@/components/DetailHeader";
import DetailProperty from "@/components/DetailProperty";
import DetailBody from "@/components/DetailBody";
import DetailInformation from "@/components/DetailInformation";

const LeadDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data } = useFetchLeadDetails(Number(id));
  const {
    Pictures,
    PurposeId,
    Reference,
    Address,
    HouseNumber,
    CityName,
    NumberOfBedRoom,
    NumberOfBathRoom,
    NumberOfGarage,
    GroundArea,
    CityPostcode,
    EPCELevel,
    Prospection,
    SiteId,
    StartCommercialisation,
    Record,
    ManagerId,
    Comment,
    Documents,
    Relations,
  } = data || {};

  const detailPropertyData = {
    Pictures,
    PurposeId,
    Reference,
    Address,
    HouseNumber,
    CityName,
    NumberOfBedRoom,
    NumberOfBathRoom,
    NumberOfGarage,
    GroundArea,
    CityPostcode,
    EPCELevel,
    Prospection,
    SiteId,
    StartCommercialisation,
    Record,
    ManagerId,
    Comment,
    Documents,
  };

  const detailInformationData = {
    Relations,
  };

  return (
    <main>
      <DetailHeader />
      <div className="flex p-5 gap-5 align-start bg-secondary justify-between">
        <DetailProperty data={detailPropertyData} />
        <DetailBody />
        <DetailInformation data={detailInformationData} />
      </div>
    </main>
  );
};

export default LeadDetails;
