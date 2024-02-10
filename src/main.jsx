import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Sidebar from './Components/Dashboard/Sidebar';
import Header from './Components/Dashboard/Header/Header';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Sidebar></Sidebar>,
  },
  {
    path: '/header',
    element: <Header></Header>
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>,
)
