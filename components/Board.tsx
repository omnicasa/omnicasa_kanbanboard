"use client";

import React, { useState } from "react";
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
    ],
  },
  {
    id: "board-2",
    title: "Contacted but No Communication",
    items: [
      {
        id: "item-3",
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
];

export default function Board() {
  const [boards, setBoards] = useState(kanbanData);

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

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto">
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
