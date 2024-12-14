import {createBrowserRouter} from "react-router-dom";
import Root from "../Component/Root";
import Home from "../Component/Home";
import ErrorPage from "../Component/ErrorPage/ErrorPage";
import Login from "../Component/Authentication/Login";
import Registration from "../Component/Authentication/Registration";
import Services from "../Component/Services/Services";
import Aboutus from "../Component/Aboutus/Aboutus";
import Gallery from "../Component/Gallery/Gallery";
import PrivateRoute from "../Component/PrivateRoute/PrivateRoute";
import ServicesDeatils from "../Component/Services/ServicesDeatils";
import Booking from "../Component/Booking/Booking";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/aboutus",
        element: <Aboutus />,
      },
      {
        path: "/gallery",
        element: (
          <PrivateRoute>
            <Gallery />
          </PrivateRoute>
        ),
        loader: () => fetch("/events.json"),
      },
      {
        path: "/services/:id",
        element: (
          <PrivateRoute>
            <ServicesDeatils />
          </PrivateRoute>
        ),
        loader: () => fetch("/events.json"),
      },
      {
        path:'booking/:id',
        element: <PrivateRoute><Booking /></PrivateRoute>,
        loader:()=>fetch('/events.json')

      }
    ],
  },
]);

export default router;
