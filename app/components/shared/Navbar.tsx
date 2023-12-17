"use client";

import { Logo } from "@/icons/Logo";
import {
	Button,
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
import React from "react";

import { Notifications } from "@/app/components/Notifications";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/app/components/ui/avatar";
import { Button as CustomButton } from "@/app/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/app/components/ui/popover";
import { Skeleton } from "@/app/components/ui/skeleton";
import clsx from "clsx";

import Link from "next/link";

export function NavigationBar({ user }: { user: any }) {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	const menuItems = ["Profile", "Dashboard", "Friends", "Log Out"];

	const pathname = usePathname();

	return (
		<Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="full">
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="sm:hidden"
				/>
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
						<NavbarItem isActive>
							<Link
								className={clsx(
									"flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
									{
										" text-blue-600": pathname === "/profile",
									},
								)}
								href="/profile"
							>
								Profile
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
											className="bg-transparent group text-black hover:text-white border-2 hover:border-secondaryYellow"
										>
											<svg
												className=" w-5 h-5 group-hover:text-secondaryYellow "
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
										</CustomButton>
									</PopoverTrigger>
									<PopoverContent className="w-80 p-0">
										<Notifications />
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
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={`${item}-${index}`}>
						<NextUILink
							color={
								index === 2
									? "primary"
									: index === menuItems.length - 1
									  ? "danger"
									  : "foreground"
							}
							className="w-full"
							href="#"
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
