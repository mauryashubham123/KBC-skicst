import { BookCopy, Home, LogInIcon, PartyPopper } from 'lucide-react';
import _404 from '@/pages/Error/404';
import { RouteType } from '@/types/route';
import LandingPage from '@/pages/Public/LandingPage/Index';
import { Dashboard } from '@/pages/Authenticated/DashboardPage';
import RegisterPage from '@/pages/register-page';
import InstructionPage from '@/pages/Instruction-page';
import LoginPage from '@/pages/login-page';
import { audianceRoutes } from './modules/users';
import { settingRoute } from './modules/settingRoute';
import {KBCAudiencePaper} from '@/pages/Authenticated/Audiance/KBCAudiencePaper';
import { eventManagementRoutes } from './modules/eventManagementRoutes';
import QuestionPaperPage from '@/pages/Authenticated/Events/Components/set-event-question-dialog';
import { PublicEventPage } from '@/pages/Authenticated/PublicEvent/publicEventPage';
import { MainEventsPage } from '@/pages/Authenticated/main-events-page';
export const routes: RouteType[] = [
	{
		isMenu: true,
		icon: Home,
		label: 'Dashboard',
		path: "/dashboard",
		component: <Dashboard />,
		layout: 'main',
		middlewares: ['auth'],
	},
	...audianceRoutes,
	...eventManagementRoutes,
	...settingRoute,
	{
		isMenu: false,
		path: "/event-management/events/set-paper",
		label: 'Set Question Paper',
		component: <QuestionPaperPage />,
		layout: 'main',
		middlewares: ['auth'],
		users: ['admin', 'super_admin', 'staff', 'reciptionist'],
	},
	{
		isMenu: true,
		path: "/events",
		icon: PartyPopper,
		label: 'Events',
		component: <PublicEventPage />,
		layout: 'main',
		middlewares: ['auth'],
		users: ['student', 'visitor'],
	},
	{
		isMenu: false,
		path: "/events/view/:event_id",
		icon: PartyPopper,
		label: 'Events',
		component: <MainEventsPage />,
		layout: 'main',
		middlewares: ['auth'],
		users: ['student', 'visitor'],
	},
	// Public Routes
	{
		isMenu: false,
		label: 'Home',
		icon: BookCopy,
		path: "/home",
		component: <LandingPage />,
		layout: 'public',
		middlewares: ['guest'],
	},
	{
		isMenu: false,
		label: 'Home',
		icon: BookCopy,
		path: "/kbc-audience-paper",
		component: <KBCAudiencePaper />,
		// layout: 'public',
		middlewares: ['guest'],
	},
	{
		isMenu: false,
		label: 'Home',
		icon: BookCopy,
		path: "/register-form",
		component: <RegisterPage />,
		middlewares: ['guest'],
	},
	{
		isMenu: false,
		label: 'Home',
		icon: BookCopy,
		path: "/login",
		component: <LoginPage />,
		middlewares: ['guest'],
	},
	{
		isMenu: false,
		label: 'Instruction',
		icon: LogInIcon,
		path: "/",
		component: <InstructionPage />,
		// layout: 'public',
		middlewares: ['guest'],
	},


	{
		path: "*",
		isMenu: false,
		component: <_404 />,
		layout: 'error',
	}
];



