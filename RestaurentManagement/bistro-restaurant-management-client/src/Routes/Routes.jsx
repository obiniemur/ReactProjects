import {createBrowserRouter} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SingUP/SignUp";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import PrivateRoute from "./PrivateRoute";
import Allusers from "../Pages/Dashboard/Allusers/Allusers";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../Pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "order/:category",
        element: <Order></Order>,
      },
      {
        path: "login",
        element: <Login />,
      },
      
      {
        path: "signup",
        element: <SignUp />,
      }
    ],
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children:[
      //Normal User Route
      {
        path: 'userHome',
        element: <UserHome />
      },
      {
        path: 'cart',
        element:<Cart />
      },

      {
        path:'payment',
        element:<Payment />
      },

      {
        path: 'paymentHistory',
        element: <PaymentHistory />

      },

      // Admin Routes Only
      {
        path: 'adminHome',
        element: <AdminRoute><AdminHome/></AdminRoute>

      },
      {
        path: 'additems',
        element: <AdminRoute><AddItems /></AdminRoute>

      },
      {
        path:"manageItems",
        element: <AdminRoute><ManageItems/></AdminRoute>

      },
      {
        path: 'updateItem/:id',
        element: <AdminRoute><UpdateItem/></AdminRoute>,
        loader: ({params})=>fetch(`https://obi-first-restaurant.vercel.app/menu/${params.id}`)


      },
      {
        path: 'users',
        element: <AdminRoute><Allusers/></AdminRoute>
      }
      
    ]
  }
]);
