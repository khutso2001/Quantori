import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Layout from "./layouts/Layout";
import Contact from "./pages/contact/Contact";
import Login from "./pages/login/Login";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Fragment, useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

const AfterLogin = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (token) {
    return <Navigate to="/" />;
  }

  return <Fragment>{children}</Fragment>;
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        element: <About />,
        path: "/about",
      },
      {
        element: <Contact />,
        path: "/contact",
      },
      {
        element: (
          <AfterLogin>
            <Login />
          </AfterLogin>
        ),
        path: "/login",
      },
    ],
  },
]);

export default router;
