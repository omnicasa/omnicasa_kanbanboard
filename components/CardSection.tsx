import React from "react";
import CustomCard from "./CustomCard";
import SectionHeader from "./SectionHeader";

const sectionHeaderContent = {
  title: "Contacted but No Communication",
  badgeCount: 1,
};

const customCardContent = {
  title: "99 Boulevard de I'Innovation, Ghent, Belgium",
  subtitle: "Talan Curtis",
  date: "1d",
  images: [
    "/images/picture1.png",
    "/images/picture2.png",
    "/images/picture3.png",
  ],
  badgeText: "Lower in price",
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
  footerText: "From",
  footerAgent: "Other Agent",
  footerImage: "/images/avatar.png",
};

export default function CardSection() {
  return (
    <div className="flex flex-col w-[342px] min-h-full p-4 items-start gap-4 flex-shrink-0 self-stretch rounded-xl bg-[#F4F4F5]">
      <SectionHeader
        title={sectionHeaderContent.title}
        badgeCount={sectionHeaderContent.badgeCount}
      />
      <CustomCard
        title={customCardContent.title}
        subtitle={customCardContent.subtitle}
        date={customCardContent.date}
        images={customCardContent.images}
        badgeText={customCardContent.badgeText}
        callInfo={customCardContent.callInfo}
        footerText={customCardContent.footerText}
        footerAgent={customCardContent.footerAgent}
        footerImage={customCardContent.footerImage}
      />
    </div>
  );
}
