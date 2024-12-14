import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import {RouterProvider} from "react-router-dom";
import Route from "./Routes/Route.jsx";
import ContextProvider from "./Component/Authprovider/ContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={Route}>
        <App />
      </RouterProvider>
    </ContextProvider>
  </React.StrictMode>
);
