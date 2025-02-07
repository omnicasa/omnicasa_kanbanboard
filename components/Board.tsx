"use client";

import { ClipLoader } from "react-spinners";
import React, { useRef, useState } from "react";
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

const kanbanData = [
  {
    Stage: "New",
    items: [
      {
        Id: "item-2",
        Reference: "99 Boulevard de I'Innovation, Ghent, Belgium",
        ProprietorReference: "Talan Curtis",
        date: "1d",
        images: [],
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
        ManagerShortName: "Other Agent",
        footerImage: "/images/avatar.png",
      },
    ],
  },
  {
    Stage: "Contacted but No Communication",
    items: [],
  },
  {
    Stage: "Call 1",
    items: [],
  },
  {
    Stage: "Call 2",
    items: [],
  },
  {
    Stage: "Appointment 1 Set",
    items: [],
  },
  {
    Stage: "Appointment 1 Done",
    items: [],
  },
  {
    Stage: "Appointment 2 Set",
    items: [],
  },
  {
    Stage: "Appointment 2 Done",
    items: [],
  },
  {
    Stage: "Follow Up 1 Month",
    items: [],
  },
  {
    Stage: "Follow Up 2 Months",
    items: [],
  },
  {
    Stage: "Follow Up 3 Months",
    items: [],
  },
  {
    Stage: "Follow Up 6 Months",
    items: [],
  },
  {
    Stage: "Follow Up 7 Months",
    items: [],
  },
];

interface RecordItem {
  Id: string;
  Reference: string;
  ProprietorReference: string;
  date: string;
  images: string[];
  badge: boolean;
  callInfo: { src: string; count: number; alt: string }[];
  ManagerShortName: string;
}

const initialData = [
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
  { SubstatusId: 42, Stage: "Appointment 2 Set", items: [] as RecordItem[] },
  { SubstatusId: 43, Stage: "Appointment 2 Done", items: [] as RecordItem[] },
  { SubstatusId: 44, Stage: "Follow Up 1 Month", items: [] as RecordItem[] },
  { SubstatusId: 45, Stage: "Follow Up 2 Months", items: [] as RecordItem[] },
  { SubstatusId: 46, Stage: "Follow Up 3 Months", items: [] as RecordItem[] },
  { SubstatusId: 47, Stage: "Follow Up 6 Months", items: [] as RecordItem[] },
  { SubstatusId: 48, Stage: "Follow Up 1 Year", items: [] as RecordItem[] },
];

interface BoardProps {
  statusesID: number;
}

export default function Board({ statusesID }: BoardProps) {
  console.log("statusesID=>", statusesID);
  const [boards, setBoards] = useState(kanbanData);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const { data, error, isLoading } = useFetchProperties(statusesID);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeBoardIndex = boards.findIndex((board) =>
      board.items.some((item) => item.id === active.id)
    );
    let overBoardIndex = boards.findIndex((board) =>
      board.items.some((item) => item.id === over.id)
    );
    // If overBoardIndex is -1, it means the over ID is a CardSection ID
    if (overBoardIndex === -1) {
      overBoardIndex = boards.findIndex((board) => board.id === over.id);
    }

    if (activeBoardIndex === -1 || overBoardIndex === -1) return;
    const activeCardIndex = boards[activeBoardIndex].items.findIndex(
      (item) => item.id === active.id
    );
    const overCardIndex = boards[overBoardIndex].items.findIndex(
      (item) => item.id === over.id
    );

    const newBoards = [...boards];
    const [movedCard] = newBoards[activeBoardIndex].items.splice(
      activeCardIndex,
      1
    );
    if (movedCard) {
      // Ensure movedCard is not undefined
      if (overCardIndex === -1) {
        newBoards[overBoardIndex].items.push(movedCard);
      } else {
        newBoards[overBoardIndex].items.splice(overCardIndex, 0, movedCard);
      }
    }
    setBoards(newBoards);
  };

  const swipeHandlers = useSwipeable({
    onSwiping: (eventData) => {
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
    },
    onSwiped: () => {
      setIsSwiping(false);
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
    swipeDuration: 250,
  });

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

  console.log("API response=>", data);
  const { Pagination, Records } = data;

  Records.forEach((record: any) => {
    const matchingStage = initialData.find(
      (stage) => stage.SubstatusId === record.SubStatusId
    );
    if (matchingStage) {
      matchingStage.items.push(record);
    }
  });

  console.log("Updated kanbanData=>", initialData);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div
        {...swipeHandlers}
        ref={containerRef}
        className={`flex gap-4 overflow-hidden ${
          isSwiping ? "select-none cursor-grab" : ""
        }`}
      >
        {/* {boards.map((data) => (
          <Droppable key={data.id} id={data.id}>
            <SortableContext
              items={data.items.filter((item) => item).map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <CardSection
                headerTitle={data.title}
                customCardContents={data.items}
              />
            </SortableContext>
          </Droppable>
        ))} */}
      </div>
    </DndContext>
  );
}
