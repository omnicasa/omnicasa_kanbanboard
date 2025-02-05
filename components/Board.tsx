import React from "react";
import CardSection from "./CardSection";

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
  return (
    <div className="flex gap-4 overflow-x-auto">
      {kanbanData.map((data, index) => (
        <CardSection
          key={index}
          headerTitle={data.headerTitle}
          customCardContents={data.customCardContents}
        />
      ))}
    </div>
  );
}
