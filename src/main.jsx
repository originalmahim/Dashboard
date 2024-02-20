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


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: '/dashboard',
    element: <PrivateRaute><MahinDashBoard/></PrivateRaute>,
  },
  {
    path: '/orders',
    element: <PrivateRaute><Tables></Tables></PrivateRaute>,
  },

  {
    path: '/Products',
    element: <PrivateRaute><Product /></PrivateRaute>
  },
  {
    path: '/Users',
    element: <PrivateRaute><Users /></PrivateRaute>
  },
  {
    path: '/profile',
    element: <PrivateRaute><Profile /></PrivateRaute>
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
