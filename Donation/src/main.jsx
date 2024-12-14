import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './assets/Components/Home/Home';
import Details from './assets/Components/Details/Details';
import Root from './assets/Components/Root/Root';
import ErrorPage from './assets/Components/Errorpages/ErrorPage';
import Donations from './assets/Components/Donations/Donations';
import Statistics from './assets/Components/Statistics/Statistics';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/details/:id',
				element: <Details />,
				loader: () => fetch('/data.json'),
			},
			{
				path: '/donations',
				element: <Donations />,
				loader: () => fetch('/data.json'),
			},
			{
				path: '/statistic',
				element: <Statistics />,
				loader: () => fetch('/data.json'),
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
