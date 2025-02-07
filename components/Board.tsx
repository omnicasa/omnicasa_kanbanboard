"use client";

import { ClipLoader } from "react-spinners";
import React, { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import CardSection from "./CardSection";
import Droppable from "./Droppable";
import { useFetchProperties } from "@/hooks/useFetchData";

interface RecordItem {
  Id: number;
  Reference: string;
  ProprietorReference: string;
  date: string;
  images: string[];
  badge: boolean;
  callInfo: { src: string; count: number; alt: string }[];
  ManagerShortName: string;
}

interface BoardProps {
  statusesID: number;
  initialData: { SubstatusId: number; Stage: string; items: RecordItem[] }[];
}
interface Record {
  ConstructionType: number;
  Id: number;
  IconName: string;
  PurposeDescNL: string;
  Reference: string;
  CityName: string;
  PriceAndUnitNL: string;
  StatusDescNL: string;
  TypeDescNL: string;
  Bedrooms: number;
  Floor: number;
  SurfaceArea: number;
  TotalArea: number;
  HasBoard: boolean;
  ManagerShortName: string;
  ListingAgent: string;
  ProprietorReference: string;
  ProprietorPhones: string;
  ProprietorEmails: string;
  EPCLabelDescNL: string;
  Elevel: number;
  CO2Emission: number;
  Street: string;
  StreetNumber: string;
  IsAnnex: boolean;
  ProjectId: number;
  BuildingId: number;
  IsDeleted: boolean;
  EPCLabelId: number;
  Price: number;
  PriceUnitId: number;
  SubStatusId: number;
  ContractTypeId: number;
  PictureLargeUrl: string;
  PictureXLargeUrl: string;
  CountPictures: number;
  FirstPictureModifiedDate: string;
}

export default function Board({ initialData, statusesID }: BoardProps) {
  const [newData, setNewData] = useState(initialData);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { data, error, isLoading } = useFetchProperties(statusesID);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);
    const { active, over } = event;

    if (!over) return;

    const activeBoardIndex = newData.findIndex((board) =>
      board.items.some((item) => item.Id === active.id)
    );
    let overBoardIndex = newData.findIndex((board) =>
      board.items.some((item) => item.Id === over.id)
    );
    // If overBoardIndex is -1, it means the over ID is a CardSection ID
    if (overBoardIndex === -1) {
      overBoardIndex = newData.findIndex(
        (board) => board.SubstatusId === over.id
      );
    }

    if (activeBoardIndex === -1 || overBoardIndex === -1) return;
    const activeCardIndex = newData[activeBoardIndex].items.findIndex(
      (item) => item.Id === active.id
    );
    const overCardIndex = newData[overBoardIndex].items.findIndex(
      (item) => item.Id === over.id
    );

    const originData = [...newData];
    const [movedCard] = originData[activeBoardIndex].items.splice(
      activeCardIndex,
      1
    );
    if (movedCard) {
      // Ensure movedCard is not undefined
      if (overCardIndex === -1) {
        originData[overBoardIndex].items.push(movedCard);
      } else {
        originData[overBoardIndex].items.splice(overCardIndex, 0, movedCard);
      }
    }
    setNewData(originData);
  };

  const swipeHandlers = useSwipeable({
    onSwiping: (eventData) => {
      if (!isDragging) {
        setIsSwiping(true);
        eventData.event.preventDefault();
        if (eventData.dir === "Left") {
          if (containerRef.current) {
            containerRef.current.scrollBy({ left: 500, behavior: "smooth" });
          }
        } else if (eventData.dir === "Right") {
          if (containerRef.current) {
            containerRef.current.scrollBy({ left: -500, behavior: "smooth" });
          }
        }
      }
    },
    onSwiped: () => {
      setIsSwiping(false);
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
    swipeDuration: 250,
  });

  useEffect(() => {
    setNewData(initialData);
  }, [statusesID]);

  useEffect(() => {
    if (data && data.Records) {
      setNewData((prevData) => {
        const updatedData = [...prevData];
        data.Records.forEach((record: Record) => {
          const matchingStage = updatedData.find(
            (stage) => stage.SubstatusId === record.SubStatusId
          );
          if (matchingStage) {
            const existingItem = matchingStage.items.find(
              (item) => item.Id === record.Id
            );
            if (!existingItem) {
              matchingStage.items.push({
                Id: record.Id,
                Reference: record.Reference,
                ProprietorReference: record.ProprietorReference,
                date: record.FirstPictureModifiedDate,
                images: [record.PictureLargeUrl],
                badge: false,
                callInfo: [
                  {
                    src: "/images/outgoing-call.svg",
                    count: 0,
                    alt: "Outgoing call",
                  },
                  {
                    src: "/images/missed-call.svg",
                    count: 0,
                    alt: "Missed call",
                  },
                  {
                    src: "/images/chat-message.svg",
                    count: 0,
                    alt: "Chat message",
                  },
                  {
                    src: "/images/schedule.svg",
                    count: 0,
                    alt: "Schedule",
                  },
                ],
                ManagerShortName: record.ManagerShortName,
              });
            }
          }
        });
        return updatedData;
      });
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <ClipLoader size={50} color={"#123abc"} loading={isLoading} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        {...swipeHandlers}
        ref={containerRef}
        className={`flex gap-4 overflow-hidden ${
          isSwiping ? "select-none cursor-grab" : ""
        }`}
      >
        {newData.map((data) => (
          <Droppable key={data.SubstatusId} id={data.SubstatusId}>
            <SortableContext
              items={data.items.filter((item) => item).map((item) => item.Id)}
              strategy={verticalListSortingStrategy}
            >
              <CardSection
                headerTitle={data.Stage}
                customCardContents={data.items}
              />
            </SortableContext>
          </Droppable>
        ))}
      </div>
    </DndContext>
  );
}
