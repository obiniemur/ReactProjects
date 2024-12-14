import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Routes from "./components/Routes.jsx";
import {RouterProvider} from "react-router-dom";
import ContextProvider from "./components/AuthProvider/ContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
    <RouterProvider router={Routes}><App /> </RouterProvider>
    </ContextProvider>
  </React.StrictMode>
);
