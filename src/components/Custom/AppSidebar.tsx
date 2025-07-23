import * as React from "react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, useSidebar } from "@/components/ui/sidebar"
import { NavMain } from "./temp/nav-main"
import { NavUser } from "./temp/nav-user"
import { TeamSwitcher } from "./temp/team-switcher"
import { Card, CardContent, CardHeader } from "../ui/card"
import logo from "@/assets/login_image.png"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const {state} = useSidebar();
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
							<img
								src={logo}
								alt="KBC Logo"
								className="mx-auto h-16 w-16 rounded-full"
							/>
						</CardHeader>
						<CardContent className="text-center">
							<h2 className="text-lg font-semibold">Welcome to KBC</h2>
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
