import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import {Landing, LandingContent} from './pages/Landing.tsx'
import Carousel from './components/carousel.tsx'
import Navbar from './components/Navbar.tsx'
import ErrorPage from './pages/error-page.tsx';
import Signup from './pages/Signup.tsx'
import Login from './pages/Login.tsx'
import Booklist from './pages/Booklist.tsx'

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <>
      <Navbar />
      <Landing />
      <Carousel />
      <LandingContent />
    </>,
    errorElement: <ErrorPage />,
  },
  {
    path: '/booklist', /* probably will be a search for adding and searching books */
    element:
    <>
      <Navbar />
      <Booklist />
    </>,
    errorElement: <ErrorPage />,
  },
  {
    path: '/signup',
    element:
    <>
      <Navbar />
      <Signup />
    </>,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element:
    <>
      <Navbar />
      <Login />
    </>,
    errorElement: <ErrorPage />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
