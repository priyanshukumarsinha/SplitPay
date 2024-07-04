import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import LandingPage from './pages/LandingPage.jsx';
import Home from './pages/Home.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';

import {store} from './store/store.js'
import { Provider, useSelector } from 'react-redux';
import MakeaGroupPage from './pages/MakeaGroupPage.jsx';

import ErrorComponent from './components/ErrorComponent.jsx';
import SuccessComponent from './components/SuccessComponent.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path : '/login',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <SignupPage />
  },
  {
    path: '/add-group',
    element: <MakeaGroupPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} >
      </RouterProvider>
    </Provider>
  </React.StrictMode>,
)
