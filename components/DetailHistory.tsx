import {
  ArrowDownToLine,
  CalendarDays,
  Ellipsis,
  MessageCircleMore,
  PhoneForwarded,
  Play,
} from "lucide-react";
import React from "react";

const DetailHistory: React.FC = () => {
  return (
    <div className="flex flex-col itesm-start flex-1 gap-8 relative">
      <div className="absolute left-[16px] h-full w-[1px] bg-border" />
      <div className="flex items-center justify-start w-full gap-3">
        <div className="rounded-full border p-2 bg-white z-10">
          <CalendarDays className="w-4 h-4 text-muted-foreground" />
        </div>
        <h3 className="text-base font-sans font-medium text-primary leading-5">
          Tuesday, Jan 14, 2025
        </h3>
      </div>
      <div className="flex items-start justify-between w-full gap-3">
        <div className="rounded-full border p-2 bg-[#F4F9FF] z-10">
          <PhoneForwarded className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="flex items-center justify-between w-full gap-1">
          <div className="flex flex-col">
            <p className="text-base text-primary font-sans font-medium leading-small">
              Outgoing call
            </p>
            <p className="text-base text-muted-foreground font-sans font-normal leading-small">
              01/11/2025, 15:37:42 - By{" "}
              <span className="text-[#0786FD]">John Doe</span> - Contact:{" "}
              <span className="text-[#0786FD]">Talan Curtis</span> - Email/SMS
              Status: <span className="text-primary">Open</span>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between w-full gap-4 w-[124px]">
          <div className="rounded-full bg-secondary">
            <ArrowDownToLine className="w-9 h-9 p-2 text-primary" />
          </div>
          <div className="rounded-full bg-secondary">
            <Play className="w-9 h-9 p-2 text-primary" />
          </div>
          <Ellipsis className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
      <div className="flex items-start justify-between w-full gap-3">
        <div className="rounded-full border p-2 bg-[#F4F9FF] z-10">
          <MessageCircleMore className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full gap-1">
            <div className="flex flex-col">
              <p className="text-base text-primary font-sans font-medium leading-small">
                SMS Sent
              </p>
              <p className="text-base text-muted-foreground font-sans font-normal leading-small">
                01/11/2025, 15:37:42 - By{" "}
                <span className="text-[#0786FD]">John Doe</span> - Contact:{" "}
                <span className="text-[#0786FD]">Talan Curtis</span> - Email/SMS
                Status: <span className="text-primary">Open</span>
              </p>
            </div>
            <Ellipsis className="w-5 h-5 text-muted-foreground" />
          </div>
          <h2 className="text-base text-muted-foreground font-sans font-medium leading-small">
            Sent Message
          </h2>
          <div className="flex items-center justify-between w-full p-2 gap-4 border rounded-md shadow-sm">
            <p className="text-sm text-muted-foreground font-sans font-normal leading-small overflow-ellipsis">
              Hello! I have some exciting updates about your property that I
              think you&apos;ll want to know. When you have a moment, please
              reach out to me. Looking forward to hearing from you!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailHistory;
