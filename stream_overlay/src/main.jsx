import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "unfonts.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const niebiescyPath = "niebiescy-info"
const zolciPath = "zolci-info"
const zieloniPath = "zieloni-info"
const mistrzowiePath = "mistrzowie-info"
const ibiszPath = "ibisz-info"
const jedenNaJedenPath = "1na1"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/"+niebiescyPath,
    element: <App route={niebiescyPath}/>,
  },
  {
    path: "/"+zieloniPath,
    element: <App route={zieloniPath}/>
  },
  {
    path: "/"+zolciPath,
    element: <App route={zolciPath}/>
  },
  {
    path: "/"+mistrzowiePath,
    element: <App route={mistrzowiePath}/>
  },
  {
    path: "/"+ibiszPath,
    element: <App route={ibiszPath}/>
  },
  {
    path: "/"+jedenNaJedenPath,
    element: <App route={jedenNaJedenPath}/>
  }
]);

createRoot(document.getElementById("root")).render(
  //<StrictMode>
  <RouterProvider router={router} />
  //</StrictMode>,
);
