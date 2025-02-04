import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarContent,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <a href="#" className="p-1.5 bg-[#0786FD] rounded-lg">
          <Image src="/images/logo.svg" alt="Logo" width={20} height={20} />
        </a>
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter>
        <a href="#">
          <Avatar className="w-100 h-100 rounded-lg">
            <AvatarImage src="/images/avatar.png" className="w-8 h-8" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </a>
      </SidebarFooter>
    </Sidebar>
  );
}
