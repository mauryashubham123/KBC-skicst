import * as React from "react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, useSidebar } from "@/components/ui/sidebar"
import { NavMain } from "./temp/nav-main"
import { NavUser } from "./temp/nav-user"
import { TeamSwitcher } from "./temp/team-switcher"
import { Card, CardContent, CardHeader } from "../ui/card"
import { useAuth } from "@/Auth/AuthProvider"
import { AssetUrl } from "@/lib/helpers/api_helper"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const {state} = useSidebar();
	 const { user } = useAuth();
	return (
		<Sidebar variant="floating" collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher  />
			</SidebarHeader>
			<SidebarContent>
				<NavMain />
				<div className={state === "collapsed" ? "hidden" : "p-4"}>
					<Card>
						<CardHeader className="text-center">
							<Avatar className="h-16 w-16 rounded-lg text-center mx-auto">
                                    <AvatarImage src={AssetUrl + user?.avatar} alt={user?.name} />
                                    <AvatarFallback className="rounded-lg"> {user?.name[0]}</AvatarFallback>
                                </Avatar>
						</CardHeader>
						<CardContent className="text-center">
							<h2 className="text-lg font-semibold"> <span className="truncate font-semibold">{user?.name}</span></h2>
							<p className="text-sm text-gray-500">Your knowledge journey starts here!</p>
						</CardContent>
					</Card>
				</div>
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	)
}
