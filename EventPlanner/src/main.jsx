import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {RouterProvider} from "react-router-dom";
import router from "./Route/Route.jsx";
import DataContext from "./Component/Context/DataContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <DataContext>

    <RouterProvider router={router}></RouterProvider>

    </DataContext>
   
      
    
  </React.StrictMode>
);
