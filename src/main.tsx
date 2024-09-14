import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Layout from "./components/Layout/Layout";
import { Header } from "./components/Header/Header";
import ErrorPage from "./components/Error/error-page";
import { Singup } from "./pages/Signup";
import { Login } from "./pages/Login";
import Wishlist, {
  loader as wishlistLoader,
} from "./components/Whishlist/Wishlist";
import { Cart } from "./components/Cart/Cart";
import { Checkout } from "./components/Checkout";
import { AboutUs } from "./pages/AboutUs";
import { Contact } from "./pages/Contact";

import { OurProducts } from "./components/OurProducts";
import { CartItems } from "./components/Cart/CartItems";
import Home from "./pages/Home";
import MyProfile from "./pages/MyProfile";
import Order from "./components/Order/Order";
import { ProductDetails } from "./components/ProductDetails";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Home />,
        path: "/",
        errorElement: <ErrorPage />,
      },
      {
        path: "",
        element: <Header />,
      },
      {
        path: "signup",
        element: <Singup />,
      },
      {
        path: "login",
        element: <ProductDetails />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
        loader: wishlistLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "cart",
        element: <Cart />,
        errorElement: <ErrorPage />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "aboutus",
        element: <AboutUs />,
      },
      {
        path: "contact",
        element: <Contact />,
      },

      {
        path: "cartitems",
        element: <CartItems />,
      },
      {
        path: "ourproduct",
        element: <OurProducts />,
        errorElement: <ErrorPage />,
      },
      {
        path: "myprofile",
        element: <MyProfile />,
        errorElement: <ErrorPage />,
      },
      {
        path: "order",
        element: <Order />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CartProvider>
    <ProductProvider>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </ProductProvider>
  </CartProvider>,
);
