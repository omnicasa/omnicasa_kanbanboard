import React from "react";
import CustomCard from "./CustomCard";
import SectionHeader from "./SectionHeader";

interface CardSectionProps {
  headerTitle: string;
  customCardContents: Array<{
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
    <div className="flex flex-col w-[342px] min-h-[calc(100vh-235px)] p-4 items-start gap-4 flex-shrink-0 self-stretch rounded-xl bg-[#F4F4F5]">
      <SectionHeader
        title={headerTitle}
        badgeCount={customCardContents.length}
      />
      {customCardContents.map((customCardContent, index) => (
        <CustomCard
          key={index}
          title={customCardContent.title}
          subtitle={customCardContent.subtitle}
          date={customCardContent.date}
          images={customCardContent.images}
          badge={customCardContent.badge}
          callInfo={customCardContent.callInfo}
          footerAgent={customCardContent.footerAgent}
          footerImage={customCardContent.footerImage}
        />
      ))}
    </div>
  );
}
