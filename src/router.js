import Home from "./pages/home/Home";
import About from "./pages/about/About";
import LinkLayout from "./layouts/LinkLayout";
const router = [
  {
    element: <LinkLayout />,
    path: "/",
    children: [
      {
        element: <Home />,
        path: "/home",
      },
      {
        element: <About />,
        path: "/about",
      },
    ],
  },
];
export default router;
