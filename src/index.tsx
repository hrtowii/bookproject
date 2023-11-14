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
import Contact from './test.tsx'

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
    path: '/test',
    element:
    <>
      <Navbar />
      <Contact />
    </>,
    errorElement: <ErrorPage />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
