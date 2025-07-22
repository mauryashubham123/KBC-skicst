import RoleSettings from "@/pages/Authenticated/Settings/RoleSettings";
import { RouteType } from "@/types/route";
import { Cog,Users2,} from "lucide-react";


export const settingRoute:RouteType[]=[
    {
        isMenu: true,
        icon: Cog,
        label: 'Settings',
        path: "/settings",
        component: <></>,
        layout: 'main',
        middlewares: ['auth'],
        users:['admin','super_admin','staff','reciptionist'],
        children: [
            {
                isMenu: true,
                icon: Users2,
                label: 'Roles',
                path: "/setting/role",
                component: <RoleSettings />,
                layout: 'main',
                middlewares: ['auth'],
                users:['admin','super_admin','staff','reciptionist'],
            },
          
        ]
    }
]