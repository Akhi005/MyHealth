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
import Dashboard from './Admin/Dashboard';
import Patient_Report from './Services_form/Patient_Report';
import Report_Submit from './Admin/Report_Submit';
import Report_show from './Admin/Report_show';
import { ReportsProvider } from './context/ReportsContext';
import User_List from './Admin/User_List';
import Home_Services from './Services_form/Home_Services';
import FindConsultant from './FindConsultant';

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
      },{
        path:'/appointment',
        element:<Appointment></Appointment>
      },{
        path:'/ambulance',
        element:<Ambulance></Ambulance>
      },{
        path:'/content/:title',
        element:<Service_Details></Service_Details>
      },{
        path:'/onlinereport',
        element:<Patient_Report/>
      },{
        path:'/create_content',
        element:<Create_Content></Create_Content>
      },{
        path:'/dashboard',
        element:<Dashboard></Dashboard>
      },{
        path:'/reportsubmit',
        element:<Report_Submit></Report_Submit>
      },{
        path:'/reportshow',
        element:<Report_show/>
      },{
        path:'/users',
        element:<User_List/>
      },{
        path:'/homeservicess',
        element:<Home_Services/>
      },{
        path:'/findconsultant',
        element:<FindConsultant/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
   <ReportsProvider>
      <RouterProvider router={router} />
    
    </ReportsProvider>
    </AuthProvider>
  </React.StrictMode>
);
