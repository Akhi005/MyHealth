import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from "@material-tailwind/react";
import { createRoot } from 'react-dom/client'
import SigninForm from '/src/auth/forms/SigninForm'
import SignupForm from '/src/auth/forms/SignupForm'
import App from './App'
import Home from './Home'
import '/src/styles/index.css'
import AuthProvider from '/src/auth/AuthProvider'
import ServiceDetails from './ServiceDetails'
import ServiceCard from '/src/ServiceCard'
import Diabetes from '/src/components/Diabetes'
import HeatStroke from '/src/components/HeatStroke'
import HeartAttack from './components/HeartAttack'
import ErrorPage from './ErrorPage'
import CreateContent from './Admin/CreateContent'
import Appointment from './components/form/Appointment'
import Ambulance from './Ambulance'
import Dashboard from './Admin/Dashboard'
import PatientReport from './components/form/PatientReport'
import ReportSubmit from './Admin/ReportSubmit'
import Report_show from './Admin/Report_show'
import ReportsProvider from '/src/context/ReportContext'
import UserList from './Admin/UserList'
import HomeServices from './components/form/HomeServices'
import FindConsultant from './FindConsultant'
import PrivateRoutes from './PrivateRoutes'
import About from './About'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/signin',
        element: <SigninForm />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/signup',
        element: <SignupForm />,
      },
      {
        path: '/service_card/:name',
        element: <ServiceDetails />,
      },
      {
        path: '/service_card',
        element: <ServiceCard />,
      },
      {
        path: '/heat_stroke',
        element: <HeatStroke />,
      },
      {
        path: '/diabetes',
        element: <Diabetes />,
      },
      {
        path: '/heart_attack',
        element: <HeartAttack />,
      },
      {
        path: '/appointment',
        element: <Appointment />
      },
      {
        path: '/ambulance',
        element: <Ambulance />
      },
      {
        path: '/content/:title',
        element: <ServiceDetails />,
      },
      {
        path: '/onlinereport',
        element: <PatientReport />
      },
      {
        path: '/create_content',
        element: <CreateContent />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/reportsubmit',
        element: <ReportSubmit />,
      },
      {
        path: '/reportshow',
        element: <Report_show />,
      },
      {
        path: '/users',
        element: <UserList />,
      },
      {
        path: '/homeservices',
        element: <HomeServices />
      },
      {
        path: '/findconsultant',
        element:  <FindConsultant />
      },
    ],
  },
])

const rootElement = document.getElementById('root')
if (rootElement) {
  const root = createRoot(rootElement)
  root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <ReportsProvider>
          <RouterProvider router={router} />
        </ReportsProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
} else {
  console.error("Root element with ID 'root' not found.")
}
