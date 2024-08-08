import Home from "./pages/home/Home";
import About from "./pages/about/About";
import LinkLayout from "./layouts/LinkLayout";
import Contact from "./pages/contact/Contact";
import Login from "./pages/login/Login";
const router = [
  {
    element: <LinkLayout />,
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
        element: <Login />,
        path: "/login",
      },
    ],
  },
];
export default router;
