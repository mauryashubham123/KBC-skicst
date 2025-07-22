
import QuestionPaperPage from "@/pages/Authenticated/Events/Components/set-event-question-dialog";
import EventPage from "@/pages/Authenticated/Events/event-page";
import QuestionPage from "@/pages/Question/question-page";
import { RouteType } from "@/types/route";
import { FileQuestion, Gamepad, PartyPopperIcon } from "lucide-react";


export const eventManagementRoutes: RouteType[] = [
    {
        isMenu: true,
        icon: PartyPopperIcon,
        label: 'Event Management',
        path: "/event-management",
        component: <></>,
        layout: 'main',
        middlewares: ['auth'],
        users: ['admin', 'super_admin', 'staff', 'reciptionist'],
        children: [
            {
                isMenu: true,
                icon: FileQuestion,
                label: 'Questions',
                path: "/event-management/questions",
                component: <QuestionPage />,
                layout: 'main',
                middlewares: ['auth'],
                users: ['admin', 'super_admin', 'staff', 'reciptionist'],
            },
            {
                isMenu: true,
                icon: Gamepad,
                label: 'events',
                path: "/event-management/events",
                component: <EventPage />,
                layout: 'main',
                middlewares: ['auth'],
                users: ['admin', 'super_admin', 'staff', 'reciptionist'],
            },
           
        ]
    },

]