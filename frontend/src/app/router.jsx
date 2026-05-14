import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ProtectApp from './ProtectApp'
import PublicLayout from './PublicLayout'
import Landing from '../pages/Landing/Landing'
import Login from "../pages/Auth/Login"
import Signup from '../pages/Auth/Signup'
import ProtectRoute from '../store/ProtectRoute'
import PostDashboard from "../pages/posts/PostDashboard"
import PostsAll from '../pages/posts/PostsAll'
import PostEdit from "../pages/posts/PostEdit"
import PostCreate from "../pages/posts/PostCreate"
import PostDetail from "../pages/posts/PostDetail"
import Profile from "../pages/profile/Profile"

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
      { index:true, element:<PostDashboard/> },
      {path:'posts/all', element: <PostsAll/>},
      {path:'posts/new', element: <PostCreate/>},
      {path:'posts/:id', element: <PostDetail/>},
      {path:'posts/:id/edit', element: <PostEdit/>},
      {path:'profile', element: <Profile/>}
    ]
  }
])
