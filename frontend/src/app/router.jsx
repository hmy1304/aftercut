import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ProtectApp from './ProtectApp'
import PublicLayout from './PublicLayout'
import Landing from '../pages/Landing/Landing'
import Login from "../pages/Auth/Login"
import Signup from '../pages/Auth/Signup'
import Dashboard from '../pages/Dashboard/Dashboard'
import ProtectRoute from '../store/ProtectRoute'

export const router = createBrowserRouter([
  {
    //공개영역
    element: <PublicLayout />,
    children: [
      {path: '/', element: <Landing/>},
      {path: '/login', element: <Login/>},
      {path: '/signup', element: <Signup/>}
    ]
  }, {
    //보호영역
    path:'/app',
    element:(
      <ProtectRoute>
        <ProtectApp />
      </ProtectRoute>
    ),
    children:[
      {
        index:true,
        element:<Dashboard/>
      }
    ]
  }
])
