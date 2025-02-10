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

  const { data, isLoading, error } = useFetchLeadDetails(Number(id));

  console.log(data, isLoading, error);

  return (
    <main>
      <DetailHeader />
      <div className="flex p-5 gap-5 align-start flex-shrink-0 bg-secondary justify-between">
        <DetailProperty />
        <DetailBody />
        <DetailInformation />
      </div>
    </main>
  );
};

export default LeadDetails;
