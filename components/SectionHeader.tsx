import React from "react";
import { Badge } from "@/components/ui/badge";

interface SectionHeaderProps {
  title: string;
  badgeCount: number;
}

export default function SectionHeader({
  title,
  badgeCount,
}: SectionHeaderProps) {
  return (
    <div className="flex gap-2">
      <h1 className="overflow-hidden text-muted-foreground text-ellipsis text-sm font-semibold leading-5">
        {title}
      </h1>
      <Badge
        variant="outline"
        className="p-[2px_10px] gap-[10px] rounded-md border bg-white text-primary"
      >
        {badgeCount}
      </Badge>
    </div>
  );
}
