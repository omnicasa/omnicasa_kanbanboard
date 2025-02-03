import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Sidebar() {
  return (
    <aside className="w-12 h-full bg-[#FAFAFA] border-r border-[#E4E4E7] border-r-[1px] border-r-outside flex flex-col justify-between">
      <div className="p-1.5 bg-[#0786FD] m-2 rounded-lg">
        <Image src="/images/logo.svg" alt="Logo" width={20} height={20} />
      </div>
      <div className="p-2 rounded-lg">
        <Avatar>
          <AvatarImage src="/images/avatar.png" className="w-8 h-8" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </aside>
  );
}
