import { useFetchHistory } from "@/hooks/useFetchData";
import {
  ArrowDownToLine,
  CalendarDays,
  CircleAlert,
  Ellipsis,
  Mail,
  MessageCircleMore,
  PhoneIncoming,
  PhoneOutgoing,
  Play,
} from "lucide-react";
import React, { useEffect } from "react";
import { format, isToday, parseISO } from "date-fns";
import { useSendMessageStore } from "@/store/useStore";

interface DetailHistoryProps {
  id: number;
  type: string;
}

interface HistoryRecord {
  ChildId: number;
  CreateUserId: number;
  CreateUserInfo: {
    Name: string;
  };
  Date: string;
  Description: string;
  Done: boolean;
  ReferencePerson: string;
  Subject: string;
  TypeId: number;
  TypeNameNL: string;
}

const DetailHistory: React.FC<DetailHistoryProps> = ({ id, type }) => {
  const { data: historys, refetch } = useFetchHistory(id);
  const messageItem = useSendMessageStore((state) => state.sendMessageItem);

  useEffect(() => {
    if (messageItem.state) refetch();
  }, [messageItem, refetch]);

  const filteredHistory = historys?.Records?.filter((record: HistoryRecord) => {
    switch (type) {
      case "outgoing":
        return record.TypeNameNL === "Tel uit";
      case "sms":
        return record.TypeNameNL === "SMS verzonden";
      case "call":
        return record.TypeNameNL === "Tel in";
      case "emailout":
        return record.TypeNameNL === "Email uit";
      case "notes":
        return record.TypeNameNL === "Contact";
      case "all":
      default:
        return true;
    }
  });

  // Extract relevant fields and group by Date
  const groupedHistory = filteredHistory?.reduce(
    (acc: { [key: string]: HistoryRecord[] }, record: HistoryRecord) => {
      const date = format(new Date(record.Date), "yyyy-MM-dd");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push({
        ChildId: record.ChildId,
        CreateUserId: record.CreateUserId,
        CreateUserInfo: record.CreateUserInfo,
        Date: record.Date,
        Description: record.Description,
        Done: record.Done,
        ReferencePerson: record.ReferencePerson,
        Subject: record.Subject,
        TypeId: record.TypeId,
        TypeNameNL: record.TypeNameNL,
      });
      return acc;
    },
    {}
  );

  return (
    <div className="flex flex-col itesm-start flex-1 gap-8 relative">
      <div className="absolute left-[16px] h-full w-[1px] bg-border" />
      {groupedHistory &&
        Object.keys(groupedHistory).map((date) => {
          const parsedDate = parseISO(date);
          const displayDate = isToday(parsedDate)
            ? "Today"
            : format(parsedDate, "EEEE, MMM d, yyyy");
          return (
            <div key={date} className="flex flex-col gap-4">
              <div className="flex items-center justify-start w-full gap-3">
                <div className="rounded-full border p-2 bg-white z-10">
                  <CalendarDays className="w-4 h-4 text-muted-foreground" />
                </div>
                <h3 className="text-base font-sans font-medium text-primary leading-5">
                  {displayDate}
                </h3>
              </div>
              {groupedHistory[date].map(
                (record: HistoryRecord, index: number) => {
                  if (
                    record.TypeNameNL === "Tel uit" ||
                    record.TypeNameNL === "Tel in"
                  ) {
                    return (
                      <div
                        key={index}
                        className="flex items-start justify-between w-full gap-3"
                      >
                        <div className="rounded-full border p-2 bg-[#F4F9FF] z-10">
                          {record.TypeNameNL === "Tel uit" ? (
                            <PhoneOutgoing className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <PhoneIncoming className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex items-center justify-between w-full gap-1">
                          <div className="flex flex-col">
                            <p className="text-base text-primary font-sans font-medium leading-small">
                              {record.TypeNameNL === "Tel uit"
                                ? "Outgoing calls"
                                : "Call attempts"}
                            </p>
                            <p className="text-base text-muted-foreground font-sans font-normal leading-small">
                              {format(
                                new Date(record.Date),
                                "MM/dd/yyyy, HH:mm:ss"
                              )}{" "}
                              - By{" "}
                              <span className="text-[#0786FD]">
                                {record.CreateUserInfo.Name}
                              </span>{" "}
                              - Call Status:{" "}
                              <span className="text-primary">
                                {record.Done ? "Closed" : "Open"}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-4 w-[125px]">
                          <div className="rounded-full bg-secondary">
                            <ArrowDownToLine className="w-9 h-9 p-2 text-primary" />
                          </div>
                          <div className="rounded-full bg-secondary">
                            <Play className="w-9 h-9 p-2 text-primary" />
                          </div>
                          <Ellipsis className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </div>
                    );
                  } else if (
                    record.TypeNameNL === "SMS verzonden" ||
                    record.TypeNameNL === "Email uit"
                  ) {
                    return (
                      <div
                        key={index}
                        className="flex items-start justify-between w-full gap-3"
                      >
                        {record.TypeNameNL === "SMS verzonden" ? (
                          <div className="rounded-full border p-2 bg-[#F4F9FF] z-10">
                            <MessageCircleMore className="w-4 h-4 text-primary" />
                          </div>
                        ) : (
                          <div className="rounded-full border p-2 bg-[#FEFCE8] z-10">
                            <Mail className="w-4 h-4 text-primary" />
                          </div>
                        )}
                        <div className="flex flex-col w-full gap-3">
                          <div className="flex items-center justify-between w-full gap-1">
                            <div className="flex flex-col">
                              <p className="text-base text-primary font-sans font-medium leading-small">
                                {record.TypeNameNL === "SMS verzonden"
                                  ? "SMS Sent"
                                  : "Email out"}
                              </p>
                              <p className="text-base text-muted-foreground font-sans font-normal leading-small">
                                {format(
                                  new Date(record.Date),
                                  "MM/dd/yyyy, HH:mm:ss"
                                )}{" "}
                                - By{" "}
                                <span className="text-[#0786FD]">
                                  {record.CreateUserInfo.Name}
                                </span>{" "}
                                - Contact:{" "}
                                <span className="text-[#0786FD]">
                                  {record.ReferencePerson}
                                </span>{" "}
                                - Email/SMS Status:{" "}
                                <span className="text-primary">
                                  {record.Done ? "Closed" : "Open"}
                                </span>
                              </p>
                            </div>
                            <Ellipsis className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <h2 className="text-base text-muted-foreground font-sans font-medium leading-small">
                            Sent Message
                          </h2>
                          <div className="flex items-center justify-between w-full p-2 gap-4 border rounded-md shadow-sm">
                            <p className="text-sm text-muted-foreground font-sans font-normal leading-small overflow-ellipsis">
                              {record.Description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  } else if (record.TypeNameNL === "Contact") {
                    return (
                      <div
                        key={index}
                        className="flex items-start justify-between w-full gap-3"
                      >
                        <div className="rounded-full border p-2 bg-[#F4F9FF] z-10">
                          <CircleAlert className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex flex-col w-full gap-3">
                          <div className="flex items-center justify-between w-full gap-1">
                            <div className="flex flex-col">
                              <p className="text-base text-primary font-sans font-medium leading-small">
                                Notes
                              </p>
                              <p className="text-base text-muted-foreground font-sans font-normal leading-small">
                                {format(
                                  new Date(record.Date),
                                  "MM/dd/yyyy, HH:mm:ss"
                                )}{" "}
                                - By{" "}
                                <span className="text-[#0786FD]">
                                  {record.CreateUserInfo.Name}
                                </span>{" "}
                                - Notes Status:{" "}
                                <span className="text-primary">
                                  {record.Done ? "Closed" : "Open"}
                                </span>
                              </p>
                            </div>
                            <Ellipsis className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <h2 className="text-base text-muted-foreground font-sans font-medium leading-small">
                            Sent Message
                          </h2>
                          <div className="flex items-center justify-between w-full p-2 gap-4 border rounded-md shadow-sm">
                            <p className="text-sm text-muted-foreground font-sans font-normal leading-small overflow-ellipsis">
                              {record.Description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  }
                }
              )}
            </div>
          );
        })}
    </div>
  );
};

export default DetailHistory;
