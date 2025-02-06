"use client";

import React, { useState } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
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
    headerTitle: "New",
    customCardContents: [
      {
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
    headerTitle: "Contacted but No Communication",
    customCardContents: [
      {
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
      board.customCardContents.some((card) => card.title === active.id)
    );
    const overBoardIndex = boards.findIndex((board) =>
      board.customCardContents.some((card) => card.title === over.id)
    );

    if (activeBoardIndex === -1 || overBoardIndex === -1) return;

    if (activeBoardIndex === overBoardIndex) {
      const activeCardIndex = boards[
        activeBoardIndex
      ].customCardContents.findIndex((card) => card.title === active.id);
      const overCardIndex = boards[overBoardIndex].customCardContents.findIndex(
        (card) => card.title === over.id
      );

      if (activeCardIndex !== overCardIndex) {
        setBoards((prevBoards) => {
          const newBoards = [...prevBoards];
          newBoards[activeBoardIndex].customCardContents = arrayMove(
            newBoards[activeBoardIndex].customCardContents,
            activeCardIndex,
            overCardIndex
          );
          return newBoards;
        });
      }
    } else {
      const activeCardIndex = boards[
        activeBoardIndex
      ].customCardContents.findIndex((card) => card.title === active.id);
      const overCardIndex = boards[overBoardIndex].customCardContents.findIndex(
        (card) => card.title === over.id
      );

      setBoards((prevBoards) => {
        const newBoards = [...prevBoards];
        const [movedCard] = newBoards[
          activeBoardIndex
        ].customCardContents.splice(activeCardIndex, 1);
        newBoards[overBoardIndex].customCardContents.splice(
          overCardIndex,
          0,
          movedCard
        );
        return newBoards;
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto">
        {boards.map((data) => (
          <Droppable key={data.headerTitle} id={data.headerTitle}>
            <CardSection
              headerTitle={data.headerTitle}
              customCardContents={data.customCardContents}
            />
          </Droppable>
        ))}
      </div>
    </DndContext>
  );
}
