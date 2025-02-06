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
    id: "board-1",
    title: "New",
    items: [
      {
        id: "item-1",
        title: "45 Rue de la Paix, Antwerp, Belgium",
        subtitle: "Lucie Moreau",
        date: "5d",
        images: [],
        badge: true,
        callInfo: [
          {
            src: "/images/outgoing-call.svg",
            count: 1,
            alt: "Outgoing call",
          },
          {
            src: "/images/missed-call.svg",
            count: 1,
            alt: "Missed call",
          },
          {
            src: "/images/chat-message.svg",
            count: 0,
            alt: "Chat message",
          },
          {
            src: "/images/schedule.svg",
            count: 2,
            alt: "Schedule",
          },
        ],
        footerAgent: "FSBO (For Sale by Owner)",
        footerImage: "/images/avatar.png",
      },
      {
        id: "item-2",
        title: "99 Boulevard de I'Innovation, Ghent, Belgium",
        subtitle: "Talan Curtis",
        date: "1d",
        images: [
          "/images/picture1.png",
          "/images/picture2.png",
          "/images/picture3.png",
        ],
        badge: false,
        callInfo: [
          {
            src: "/images/outgoing-call.svg",
            count: 4,
            alt: "Outgoing call",
          },
          {
            src: "/images/missed-call.svg",
            count: 1,
            alt: "Missed call",
          },
          {
            src: "/images/chat-message.svg",
            count: 0,
            alt: "Chat message",
          },
          {
            src: "/images/schedule.svg",
            count: 2,
            alt: "Schedule",
          },
        ],
        footerAgent: "Other Agent",
        footerImage: "/images/avatar.png",
      },
      {
        id: "item-3",
        title: "11 Place de la Republique, Bruges, Belgium",
        subtitle: "Emilie Dubois",
        date: "3w",
        images: [
          "/images/picture1.png",
          "/images/picture2.png",
          "/images/picture3.png",
        ],
        badge: false,
        callInfo: [
          {
            src: "/images/outgoing-call.svg",
            count: 2,
            alt: "Outgoing call",
          },
          {
            src: "/images/missed-call.svg",
            count: 2,
            alt: "Missed call",
          },
          {
            src: "/images/chat-message.svg",
            count: 2,
            alt: "Chat message",
          },
          {
            src: "/images/schedule.svg",
            count: 2,
            alt: "Schedule",
          },
        ],
        footerAgent: "Other Agent",
        footerImage: "/images/avatar.png",
      },
    ],
  },
  {
    id: "board-2",
    title: "Contacted but No Communication",
    items: [
      {
        id: "item-4",
        title: "200 Avenue des Arts, Leuven, Belgium",
        subtitle: "Sophie Martin",
        date: "2w",
        images: [
          "/images/picture1.png",
          "/images/picture2.png",
          "/images/picture3.png",
        ],
        badge: true,
        callInfo: [
          {
            src: "/images/outgoing-call.svg",
            count: 1,
            alt: "Outgoing call",
          },
          {
            src: "/images/missed-call.svg",
            count: 3,
            alt: "Missed call",
          },
          {
            src: "/images/chat-message.svg",
            count: 2,
            alt: "Chat message",
          },
          {
            src: "/images/schedule.svg",
            count: 2,
            alt: "Schedule",
          },
        ],
        footerAgent: "Notary",
        footerImage: "/images/avatar.png",
      },
    ],
  },
  {
    id: "board-3",
    title: "Call 1",
    items: [],
  },
  {
    id: "board-4",
    title: "Call 2",
    items: [],
  },
  {
    id: "board-5",
    title: "Appointment Set",
    items: [],
  },
  {
    id: "board-6",
    title: "Appointment Done",
    items: [],
  },
  {
    id: "board-7",
    title: "Follow Up 1 Month",
    items: [],
  },
  {
    id: "board-8",
    title: "Follow Up 2 Months",
    items: [],
  },
  {
    id: "board-9",
    title: "Follow Up 3 Months",
    items: [],
  },
];

export default function Board() {
  const [boards, setBoards] = useState(kanbanData);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const { data, error, isLoading } = useFetchProperties();

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
        {boards.map((data) => (
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
        ))}
      </div>
    </DndContext>
  );
}
