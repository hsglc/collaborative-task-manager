"use client";

import { Logo } from "@/icons/Logo";
import {
  Link as NextUILink,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Notifications } from "@/app/components/Notifications";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Button as CustomButton } from "@/app/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover";
import { Skeleton } from "@/app/components/ui/skeleton";
import clsx from "clsx";

import { ToastAction } from "@/app/components/ui/toast";
import { useToast } from "@/app/components/ui/use-toast";

import { getCurrentFormattedDate } from "@/app/lib/shared";
import type { Notification } from "@/types/notifications";
import type { User } from "@/types/users";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";

type EventType = "INSERT" | "UPDATE" | "DELETE";

export function NavigationBar({ user }: { user: User }) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { toast } = useToast();

  const menuItems = ["Dashboard", "Friends", "Log Out"];

  const pathname = usePathname();

  const fetchNotifications = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data: notifications } = await supabase
      .from("notifications")
      .select(
        `
				id,
				created_at,
				is_read,
				target_id,
				sender_id,
				type,
			profiles!notifications_sender_id_fkey (
			  id,
			  user_email,
			  avatar_url,
			  full_name
			)`,
      )
      .eq("target_id", user?.id)
      .neq("is_read", true)
      .returns<Notification[]>();

    setNotifications(notifications as Notification[]);
  };

  const markAsRead = async (notificationId: number) => {
    const { error } = await supabase.from("notifications").delete().eq("id", notificationId);
    if (!error) {
      setNotifications((notifications) => notifications.filter((nf) => nf.id !== notificationId));

      toast({
        title: "Notification marked as read!",
        duration: 3000,
        description: getCurrentFormattedDate(),
        action: <ToastAction altText="Close this toast!">Close</ToastAction>,
      });
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("notifications-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
          filter: `target_id=eq.${user?.id}`,
        },
        (payload) => {
          const evenType: EventType = payload.eventType;
          const newNotification = payload.new as Notification;
          const oldNotification = payload.old as Notification;

          if (evenType === "INSERT") {
            fetchNotifications();
          } else if (evenType === "UPDATE") {
            setNotifications((notifications) => [
              ...notifications.filter((nf) => nf.id !== newNotification.id),
              newNotification,
            ]);
          } else if (evenType === "DELETE") {
            setNotifications((notifications) => notifications.filter((nf) => nf.id !== oldNotification.id));
          }
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, notifications]);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="full">
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
        <NavbarBrand>
          <Logo />
          <p className="font-bold text-inherit">COLLABORAMATE</p>
        </NavbarBrand>
      </NavbarContent>

      {user ? (
        <div className="flex-center gap-12">
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <Link
                className={clsx(
                  "flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                  {
                    " text-blue-600": pathname === "/friends",
                  },
                )}
                href="/friends"
              >
                Friends
              </Link>
            </NavbarItem>

            <NavbarItem>
              <Link
                className={clsx(
                  "flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                  {
                    " text-blue-600": pathname === "/dashboard",
                  },
                )}
                href="/dashboard"
              >
                Dashboard
              </Link>
            </NavbarItem>
            <NavbarItem>
              <div className="flex-center gap-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <CustomButton
                      variant="outline"
                      className="relative bg-transparent hover:bg-black group text-black hover:text-white border-2 hover:border-black"
                    >
                      <svg
                        className=" w-5 h-5 group-hover:text-white "
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                      </svg>
                      {notifications.length > 0 ? (
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1.5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full ">
                          {notifications.length}
                        </span>
                      ) : null}
                    </CustomButton>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0">
                    <Notifications notifications={notifications} markAsRead={markAsRead} />
                  </PopoverContent>
                </Popover>
                <Avatar>
                  <AvatarImage src={user.user_metadata.avatar_url} />
                  <AvatarFallback>
                    <Skeleton className="w-[100px] h-[20px] rounded-full" />
                  </AvatarFallback>
                </Avatar>
              </div>
            </NavbarItem>
          </NavbarContent>
        </div>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="/login">Login</Link>
          </NavbarItem>
        </NavbarContent>
      )}
      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarMenuItem key={item}>
            <NextUILink
              color={
                pathname === `/${item.toLocaleLowerCase()}` ? "primary" : item === "Log Out" ? "danger" : "foreground"
              }
              className="w-full"
              href={`/${item.toLowerCase()}`}
              size="lg"
            >
              {item}
            </NextUILink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
