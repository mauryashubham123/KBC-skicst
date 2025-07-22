import { BookCopy, Home, LogInIcon} from 'lucide-react';
import _404 from '@/pages/Error/404';
import { RouteType } from '@/types/route';
import LandingPage from '@/pages/Public/LandingPage/Index';
import { Dashboard } from '@/pages/Authenticated/DashboardPage';
import RegisterPage from '@/pages/register-page';
import InstructionPage from '@/pages/Instruction-page';
import LoginPage from '@/pages/login-page';
import { audianceRoutes } from './modules/users';
import { settingRoute } from './modules/settingRoute';
import KBCAudiencePaper from '@/pages/Authenticated/Audiance/KBCAudiencePaper';
import { eventManagementRoutes } from './modules/eventManagementRoutes';
import QuestionPaperPage from '@/pages/Authenticated/Events/Components/set-event-question-dialog';
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
	// {
	// 	isMenu: false,
	// 	label: 'User Profile',
	// 	path: "/users/profile/:user_id",
	// 	component: <UserProfile />,
	// 	layout: 'main',
	// 	middlewares: ['auth'],
	// },
	 {
                isMenu: false,
                path: "/event-management/events/set-paper",
                label: 'Set Question Paper',
                component: <QuestionPaperPage />,
                layout: 'main',
                middlewares: ['auth'],
                users: ['admin', 'super_admin', 'staff', 'reciptionist'],
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



