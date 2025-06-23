import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App.jsx';
import './index.css';
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/register.jsx";
import PrivateRoute from './components/PrivateRoute.jsx';
import Profile from './pages/Users/Profile.jsx';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';

// Create the router
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Layout with navigation (optional) */}
      <Route path="/" element={<App />}>
        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </>
  )
);

// Render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
