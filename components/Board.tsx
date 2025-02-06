"use client";

import React, { useState } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
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
    ],
  },
  {
    id: "board-2",
    title: "Contacted but No Communication",
    items: [],
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

    if (activeBoardIndex === overBoardIndex) {
      const activeCardIndex = boards[activeBoardIndex].items.findIndex(
        (item) => item.id === active.id
      );
      const overCardIndex = boards[overBoardIndex].items.findIndex(
        (item) => item.id === over.id
      );

      if (activeCardIndex !== overCardIndex) {
        setBoards((prevBoards) => {
          const newBoards = [...prevBoards];
          newBoards[activeBoardIndex].items = arrayMove(
            newBoards[activeBoardIndex].items,
            activeCardIndex,
            overCardIndex
          );
          return newBoards;
        });
      }
    } else {
      const activeCardIndex = boards[activeBoardIndex].items.findIndex(
        (item) => item.id === active.id
      );
      const overCardIndex = boards[overBoardIndex].items.findIndex(
        (item) => item.id === over.id
      );

      setBoards((prevBoards) => {
        const newBoards = [...prevBoards];
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
        {boards.map(
          (data) =>
            data &&
            data.items && (
              <Droppable key={data.id} id={data.id}>
                <SortableContext
                  items={data.items
                    .filter((item) => item)
                    .map((item) => item.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <CardSection
                    headerTitle={data.title}
                    customCardContents={data.items}
                  />
                </SortableContext>
              </Droppable>
            )
        )}
      </div>
    </DndContext>
  );
}
