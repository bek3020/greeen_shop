import { createBrowserRouter } from "react-router-dom";

import Blog from "../pages/blog/Blog";
import Home from "../pages/home/Home";


export const router = createBrowserRouter([
    {
        path: '/',
        element:<Home/>
    },
    {
        path: '/blog',
        element:<Blog/>
    }
])