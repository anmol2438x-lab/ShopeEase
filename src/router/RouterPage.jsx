import AppLayout from "../appLayout/AppLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  About,
  Contact,
  Home,
  Shop,
  SingleProduct,
  Cart,
  ErrorPage,
  Wishlist,
  Orders
} from "../page/index";

function RouterPage() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/shop",
          element: <Shop />,
        },
        {
          path: "/shop/:id",
          element: <SingleProduct />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/wishlist",
          element: <Wishlist />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default RouterPage;
