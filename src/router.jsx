import { createBrowserRouter } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout";
import Home from "./pages/Home";
import Lab from "./pages/Lab";
import Contact from "./pages/Contact"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SiteLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/lab", element: <Lab /> },
      { path: "contact", element: <Contact /> }
    ],
  },
]);
