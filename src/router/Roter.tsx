import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import Shop from "../pages/shop";
import ShopInfo from "../pages/shop-info";
import Blogs from "../pages/blog/Blog";
import BlogDetail from "../pages/blog/[id]";
import Profile from "../pages/profile";
import Checkout from "../pages/checkout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    // ShopSwiper bilan mos kelsin:
    path: "shop-info/:category/:id",
    element: <ShopInfo />,
  },
  {
    path: "/blog",
    element: <Blogs />,
  },
  {
    path: "/blog/:id",
    element: <BlogDetail />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
]);