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
    Id,
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

  const leadDetailData = {
    Id,
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
  };

  return (
    <main>
      <DetailHeader />
      <div className="grid grid-cols-12 p-5 gap-5 align-start bg-secondary">
        <DetailProperty data={leadDetailData} />
        <DetailBody data={leadDetailData} />
        <DetailInformation data={leadDetailData} />
      </div>
    </main>
  );
};

export default LeadDetails;
