import UserPage from "@/pages/Authenticated/users/userPages";
import { RouteType } from "@/types/route";
import { Users2, UserSquare } from "lucide-react";


export const audianceRoutes:RouteType[]=[
    {
		isMenu: true,
		icon: UserSquare,
		label: 'User Management',
		path: "/users",
		component: <></>,
		layout: 'main',
		middlewares: ['auth'],
        users:['admin','super_admin','staff','reciptionist'],
        children: [
            {
                isMenu: true,
                icon: Users2,
                label: 'users',
                path: "/users/list",
                component: <UserPage />,
                layout: 'main',
                middlewares: ['auth'],
                users:['admin','super_admin','staff','reciptionist'],
            },
        ]
    },
   
]