import { createBrowserRouter } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout";
import Home from "./pages/Home";
import Experiments from "./pages/Experiments";
import Contact from "./pages/Contact"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SiteLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/experiments", element: <Experiments /> },
      { path: "contact", element: <Contact /> }
    ],
  },
]);
