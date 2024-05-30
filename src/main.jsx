import React from 'react';
import * as ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import App from './App';
import Home from './Home';
import './index.css';
import AuthProvider from './_auth/AuthProvider/AuthProvider';
import Service_Details from './Service_Details';
import Contact from './Contact';
import Service_Card from './Service_Card';
import Diabetes from './Content/Diabetes';
import HeatStroke from './Content/HeatStroke';
import HeartAttack from './Content/HeartAttack';
import ErrorPage from './ErrorPage';
import Create_Content from './Admin/Create_Content';
import Appointment from './Services_form/Appointment';
import Ambulance from './Ambulance';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement:<ErrorPage/>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/signin',
        element: <SigninForm />
      },
      {
        path: '/signup',
        element: <SignupForm />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/service_card/:name',
        element: <Service_Details />
      },
      {
        path: '/service_card',
        element: <Service_Card />
      },
      {
        path: '/heat_stroke',
        element: <HeatStroke />
      },
      {
        path: '/diabetes',
        element: <Diabetes />
      },
      {
        path: '/heart_attack',
        element: <HeartAttack />
      },
      {
        path:'/appointment',
        element:<Appointment></Appointment>
      },
      {
        path:'/ambulance',
        element:<Ambulance></Ambulance>
      },
      {
           path:'/create_content',
           element:<Create_Content></Create_Content>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
