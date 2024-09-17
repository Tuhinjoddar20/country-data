
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Contact from './components/Contact';
import Home from './components/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import CountryDetail from './components/CountryDetail';


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/:country",
                element: <CountryDetail />,
            },
        ],
    }
])

const root = createRoot(document.querySelector('#root'));
root.render(<RouterProvider router={router} />);
