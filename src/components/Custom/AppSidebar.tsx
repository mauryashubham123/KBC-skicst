import * as React from "react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar"
import { NavMain } from "./temp/nav-main"
import { NavUser } from "./temp/nav-user"
import { TeamSwitcher } from "./temp/team-switcher"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar variant="floating" collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher  />
			</SidebarHeader>
			<SidebarContent>
				<NavMain />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	)
}
