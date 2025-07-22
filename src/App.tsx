import React from 'react';
import Loader from './components/Custom/Loader'
import './index.css'
import './App.css'
import { sanatizedRoutes } from './lib/Routes/routes';
import { useAppSelector } from './redux/hooks'
import { Route, RouteObject, Routes } from "react-router-dom";
import { routes } from './lib/Routes';
import { Toaster } from './components/ui/sonner';
import { PwaUpdate } from './components/ui/pwa-update';
import { CommandDialogDemo } from './components/Custom/CommandSearch';
import { useAuth } from './Auth/AuthProvider';


function App() {
	const preloader = useAppSelector(state => state.ui?.preloader);
	const { authToken } = useAuth();
	const handleUpdate = () => {
		// Access the updateSW function we added to the window object
		if (typeof window.updateSW === 'function') {
		  window.updateSW();
		}
	};
	return (
		<div className=''>
			
			{authToken && (<CommandDialogDemo />)}
			<PwaUpdate onUpdate={handleUpdate} />
			<Routes>
				{sanatizedRoutes(routes).map((r: RouteObject, i) => (
					<React.Fragment key={i}>
						<Route key={i} path={r.path} element={r.element} />
						{r.children && r.children.map((cr: RouteObject, ci: number) => (
							<Route key={ci} path={cr.path} element={cr.element} />
						))}
					</React.Fragment>
				))}
			</Routes>

			<Loader message={preloader.message} show={preloader.status} />
			<Toaster
				richColors={true}
				position="top-right" 
				// toastOptions={{ style: { zIndex: 999999999999999 } }}
			/>
		</div>
	)
}

export default App
