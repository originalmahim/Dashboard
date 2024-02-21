import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import MahinDashBoard from './Components/Dashboard/MainDashBoard/MahinDashBoard';
import Tables from './Components/Dashboard/MainDashBoard/Tables';
import Product from './Components/Dashboard/Tables/Product';
import Users from './Components/Dashboard/Tables/Users';
import Profile from './Components/Dashboard/Header/Profile';
import Login from './Components/Dashboard/Authentication/Login';
import AuthProvider from './Components/Dashboard/Authentication/AuthProvider';
import PrivateRaute from './Components/Dashboard/Authentication/PrivateRaute';
import Error from './Components/Dashboard/Authentication/Error';
import DefaultLayout from './Components/Dashboard/DefaultLayout/DefaultLayout';
import Settings from './Components/Dashboard/Header/Settings';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: '/dashboard',
    element: <PrivateRaute><DefaultLayout></DefaultLayout></PrivateRaute>,
    children: [
      {
        index: true,
        element: <PrivateRaute><MahinDashBoard></MahinDashBoard></PrivateRaute>,
      },
      {
        path: 'overview',
        element: <PrivateRaute><MahinDashBoard></MahinDashBoard></PrivateRaute>
      },
      {
        path: 'Users',
        element: <PrivateRaute><Users /></PrivateRaute>
      },
      {
        path: 'orders',
        element: <PrivateRaute><Tables></Tables></PrivateRaute>,
      },
      {
        path: 'Products',
        element: <PrivateRaute><Product /></PrivateRaute>
      },
      {
        path: 'profile',
        element: <PrivateRaute><Profile /></PrivateRaute>
      },
      {
        path: 'settings',
        element: <PrivateRaute><Settings /></PrivateRaute>
      },
    ]
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient} >
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
