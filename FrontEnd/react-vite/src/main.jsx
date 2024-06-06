import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home';
import Enterportal from './pages/enterportal';
import Register from './pages/Register';
import Login from './pages/Login';
import CreatePage from './pages/CreatePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/EnterPortal',
    element: <Enterportal />,
  },
  {
    path: '/Register',
    element: <Register />,
  },
  {
    path: '/Login',
    element: <Login />,
  },
  {
    path: '/create',
    element: <CreatePage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
