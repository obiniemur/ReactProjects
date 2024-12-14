import {
    createBrowserRouter,
   
  } from "react-router-dom";
import Home from "../Component/HomePage/Home";
import Root from "../Component/Root/Root";
import Addcar from "../addcar/Addcar";
import ErrorPage from "../Component/ErrorPage";
import Brandpage from "../Component/pages/Brandpage";
import CarDetails from "../Component/pages/CarDetails";
import MyCart from "../Component/pages/MyCart";
import Signup from "../Component/SecurityPages/Signup";
import Signin from "../Component/SecurityPages/Signin";
import PrivateRoute from "../Component/SecurityPages/PrivateRoute";



   const router = createBrowserRouter([
    {
        path:'/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children:[
            {
                path:'/',
                element:<Home />
            },
            {
              path:'/addcar',
              element: <PrivateRoute><Addcar /></PrivateRoute>
            },
            {
              path: 'brandpage/:brand_name',
              element: <Brandpage />,
              
            },
            {
              path: '/brandpage/:brand_name/details/:id',
              element:<PrivateRoute><CarDetails /></PrivateRoute>,
              loader: ({params})=>fetch(`https://obi-car-shop-backend.vercel.app/details/${params.id}`)
            },
            {
              path:'/cart',
              element: <MyCart />,
              loader: ()=>fetch('https://obi-car-shop-backend.vercel.app/cart/cars')
            },
            {
              path:'/signup',
              element: <Signup />
            },
            {
              path:'/signin',
              element: <Signin/>
            }
        ]
    }
  ])

  export default router;