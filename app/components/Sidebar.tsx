import { LogOut, Settings, User, Users } from "lucide-react";

import { SidebarLinks } from "@/app/components/SidebarLinks";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

import LogoutButton from "@/app/components/LogoutButton";
import { CreateTaskDialog } from "@/app/features/createTask/components/CreateTaskDialog";
import type { Task } from "@/types/tasks";
import Link from "next/link";

type Props = {
  tasks: {
    myTasks: Task[];
    sharedByOthers: Task[];
    sharedWithMe: Task[];
  };
};

export const Sidebar = ({ tasks }: Props) => {
  return (
    <div className="col-span-3  h-full p-4 rounded-xl rounded-b-none ml-4 flex flex-col justify-between">
      <div className="space-y-12">
        <CreateTaskDialog />
        <SidebarLinks tasks={tasks} />
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="left-24 important-left">
              <Settings />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-72 mb-2 ml-4">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="text-lg">
                <User className="mr-2 h-4 w-4" />
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="text-lg">
                <Users className="mr-2 h-4 w-4" />
                <Link href="/friends">Friends</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-lg">
              <LogOut className="mr-2 h-4 w-4" />
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
