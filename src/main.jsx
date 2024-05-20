import React from 'react';
import * as ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import App from './App';
import Home from './Home';
import './index.css'
import AuthProvider from './_auth/AuthProvider/AuthProvider';
import Service_Details from './Service_Details';
import Contact from './Contact'
import Service_Card from './Service_Card';
import Diabetes from './Content/Diabetes';
import HeatStroke from './Content/HeatStroke';
import HeartAttack from './Content/HeartAttack';

const router = createBrowserRouter([
  {
     path:"/",
     element:<App></App>,
     children:[
       {
         path:'/',
         element:<Home></Home>
       },{
        path:'/signin',
         element:<SigninForm></SigninForm>
       },{
        path:'/signup',
         element:<SignupForm></SignupForm>
       },{
         path:'/contact',
         element:<Contact></Contact>
       },{
        path:'/service_details',
        element:<Service_Details></Service_Details>
       },{
        path:'/service_card',
        element:<Service_Card></Service_Card>
       },
       {
        path:'/heat_stroke',
        element:<HeatStroke></HeatStroke>
       },
       {
        path:'/diabetes',
        element:<Diabetes></Diabetes>
       },
       {
        path:'/heart_attack',
        element:<HeartAttack></HeartAttack>
       },{

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