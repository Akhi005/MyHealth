import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@material-tailwind/react'
import { createRoot } from 'react-dom/client'
import SigninForm from '/src/auth/forms/SigninForm'
import SignupForm from '/src/auth/forms/SignupForm'
import App from './App'
import Home from '/src/components/Home'
import '/src/styles/index.css'
import AuthProvider from '/src/auth/AuthProvider'
import ServiceDetails from '/src/components/home/services/ServiceDetails'
import ServiceCard from '/src/components/home/services/ServiceCard'
import ErrorPage from '/src/components/ErrorPage'
import CreateContent from '/src/admin/CreateContent'
import Appointment from '/src/components/form/Appointment'
import Ambulance from '/src/components/home/Ambulance'
import GenerateQuestion from '/src/admin/GenerateQuestion'
import Dashboard from '/src/admin/Dashboard'
import PatientReport from '/src/components/form/PatientReport'
import ReportSubmit from '/src/admin/ReportSubmit'
import ReportsProvider from '/src/context/ReportContext'
import UserList from './admin/UserList'
import HomeServices from '/src/components/form/HomeServices'
import FindConsultant from '/src/components/form/FindConsultant'
import PrivateRoutes from '/src/components/PrivateRoutes'
import About from '/src/components/home/About'
import SearchResults from '/src/admin/SearchTopic'
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
      },{
        path:'/questions',
        element:<GenerateQuestion/>
      },{
        path:"/search-results",
       element:<SearchResults />
      },
      {
        path: '/service_card',
        element: <ServiceCard />,
      },
      {
        path: '/appointment',
        element: (
          <PrivateRoutes>
            <Appointment />
          </PrivateRoutes>
        ),
      },
      {
        path: '/ambulance',
        element: <Ambulance />,
      },
      {
        path: '/content/:title',
        element: <ServiceDetails />,
      },
      {
        path: '/onlinereport',
        element: (
          <PrivateRoutes>
            <PatientReport />
          </PrivateRoutes>
        ),
      },
      {
        path: '/create_content',
        element: (
          <PrivateRoutes>
            <CreateContent />
          </PrivateRoutes>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        ),
      },
      {
        path: '/reportsubmit',
        element: (
          <PrivateRoutes>
            <ReportSubmit />
          </PrivateRoutes>
        ),
      },
      {
        path: '/users',
        element: (
          <PrivateRoutes>
            <UserList />
          </PrivateRoutes>
        ),
      },
      {
        path: '/homeservices',
        element: (
          <PrivateRoutes>
            <HomeServices />
          </PrivateRoutes>
        ),
      },
      {
        path: '/findconsultant',
        element: (
          <PrivateRoutes>
            <FindConsultant />
          </PrivateRoutes>
        ),
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
  )
} else {
  console.error("Root element with ID 'root' not found.")
}
