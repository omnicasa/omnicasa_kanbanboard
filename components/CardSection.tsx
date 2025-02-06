import React from "react";
import CustomCard from "./CustomCard";
import SectionHeader from "./SectionHeader";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Draggable from "./Draggable";

interface CardSectionProps {
  headerTitle: string;
  customCardContents: Array<{
    id: string;
    title: string;
    subtitle: string;
    date: string;
    images: string[];
    badge: boolean;
    callInfo: { src: string; count: number; alt: string }[];
    footerAgent: string;
    footerImage: string;
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
          .filter((card) => card && card.id)
          .map((card) => card.id)}
        strategy={verticalListSortingStrategy}
      >
        {customCardContents
          .filter((card) => card && card.id)
          .map((customCardContent) => (
            <Draggable
              key={customCardContent.id}
              id={customCardContent.id}
              data={{ boardId: headerTitle }}
            >
              <CustomCard
                title={customCardContent.title}
                subtitle={customCardContent.subtitle}
                date={customCardContent.date}
                images={customCardContent.images}
                badge={customCardContent.badge}
                callInfo={customCardContent.callInfo}
                footerAgent={customCardContent.footerAgent}
                footerImage={customCardContent.footerImage}
              />
            </Draggable>
          ))}
      </SortableContext>
    </div>
  );
}
