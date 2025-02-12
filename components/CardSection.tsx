import React from "react";
import CustomCard from "./CustomCard";
import SectionHeader from "./SectionHeader";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Draggable from "./Draggable";
import Droppable from "./Droppable";

interface CardSectionProps {
  headerTitle: string;
  customCardContents: Array<{
    Id: number;
    Reference: string;
    ProprietorReference: string;
    date: string;
    images: string[];
    badge: boolean;
    callInfo: { src: string; count: number; alt: string }[];
    ManagerShortName: string;
  }>;
}

export default function CardSection({
  headerTitle,
  customCardContents,
}: CardSectionProps) {
  return (
    <div className="flex flex-col w-[342px] min-h-[calc(100vh-235px)] h-full p-4 items-start gap-4 flex-shrink-0 self-stretch rounded-xl bg-[#F4F4F5]">
      <SectionHeader
        title={headerTitle}
        badgeCount={customCardContents.length}
      />
      <SortableContext
        items={customCardContents
          .filter((card) => card && card.Id)
          .map((card) => card.Id)}
        strategy={verticalListSortingStrategy}
      >
        {customCardContents
          .filter((card) => card && card.Id)
          .map((customCardContent) => (
            <Droppable key={customCardContent.Id} id={customCardContent.Id}>
              <Draggable
                key={customCardContent.Id}
                id={customCardContent.Id}
                data={{ boardId: headerTitle }}
              >
                <CustomCard
                  id={customCardContent.Id}
                  title={customCardContent.Reference}
                  subtitle={customCardContent.ProprietorReference}
                  date={customCardContent.date}
                  images={customCardContent.images}
                  badge={customCardContent.badge}
                  callInfo={customCardContent.callInfo}
                  footerAgent={customCardContent.ManagerShortName}
                />
              </Draggable>
            </Droppable>
          ))}
      </SortableContext>
    </div>
  );
}
