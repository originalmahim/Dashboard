import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Sidebar from './Components/Dashboard/Sidebar';
import Header from './Components/Dashboard/Header/Header';
import DefaultLayout from './Components/Dashboard/DefaultLayout/DefaultLayout';
import MahinDashBoard from './Components/Dashboard/MainDashBoard/MahinDashBoard';


const router = createBrowserRouter([
  {
    path: "/slider",
    element: <Sidebar></Sidebar>,
  },
  {
    path: '/header',
    element: <Header></Header>
  },
  {
    path: '/Layout',
    element: <DefaultLayout></DefaultLayout>
  },
  {
    path: '/',
    element: <MahinDashBoard></MahinDashBoard>
  }


]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>,
)
