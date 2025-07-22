"use client"

import { ChevronRight } from "lucide-react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar } from "@/components/ui/sidebar"
import { routes } from "@/lib/Routes"
import { useAuth } from "@/Auth/AuthProvider"
import { useState, useEffect } from "react"
import { RouteType } from "@/types/route"

export function NavMain() {
    const { user } = useAuth();
    const location = useLocation();
  
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Menus</SidebarGroupLabel>
                <SidebarMenu>
                    {routes.filter(r => r.isMenu).filter(r => r.layout === 'main')
                        .filter(r => r.users ? (user?.role.type && r.users.includes(user?.role.type.toLowerCase())) : true)
                        .map((item) => item.children?.length ? (
                            <CollapsibleMenuItem 
                                key={item.label} 
                                item={item} 
                                location={location} 
                            />
                        ) : (
                            <SidebarMenuItem key={item.label}>
                                <NavLink to={item.path}>
                                    {({ isActive }) => (
                                        <SidebarMenuButton tooltip={item.label} isActive={isActive} className={`hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                                            {item.icon && <item.icon />}
                                            <span>{item.label}</span>
                                        </SidebarMenuButton>
                                    )}
                                </NavLink>
                            </SidebarMenuItem>
                    ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}


function CollapsibleMenuItem({ item, location }:{item:RouteType, location:any}) {
    // Check if any child route is active
    const {user} = useAuth();
    const {state} = useSidebar();
    const navigate = useNavigate();
    const isAnyChildActive = item.children?.some(child => 
        location.pathname === child.path || 
        location.pathname.startsWith(child.path + '/')
    );
    
    // Control the open state with both manual interaction and auto-open when a child is active
    const [isOpen, setIsOpen] = useState(isAnyChildActive);
    
    // Update open state when route changes
    useEffect(() => {
        if (isAnyChildActive) {
            setIsOpen(true);
        }
    }, [isAnyChildActive, location.pathname]);

    const handleIconClick = (childRoutes:RouteType[] | undefined)=> {
        if(state === 'collapsed') {
            if(childRoutes?.length){
                navigate(childRoutes[0].path)
            }
        }
    }

    return (
        <Collapsible  asChild  open={isOpen}  onOpenChange={setIsOpen}  className="group/collapsible">
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton onClick={()=>handleIconClick(item.children)} tooltip={item.label} isActive={isAnyChildActive} className={`hover:bg-background/0 hover:text-primary ${isAnyChildActive ? "text-primary" : "text-muted-foreground"}`}>
                        {item.icon && <item.icon />}
                        <span>{item.label}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {item.children?.filter(r=>r.users ? (user?.role.type && r.users.includes(user?.role.type.toLowerCase())) : true)?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.label}>
                                <NavLink to={subItem.path} className={({ isActive }) => isActive ? "text-destructive" : ""}>
                                    {({ isActive }) => (
                                        <SidebarMenuSubButton asChild className={`hover:bg-background/0 hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"}`} >
                                            <span>{subItem.label}</span>
                                        </SidebarMenuSubButton>
                                    )}
                                </NavLink>
                            </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    );
}