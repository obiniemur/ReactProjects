import {createBrowserRouter} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";
import AddPet from "../Pages/Dashboard/AddPet/AddPet";
import Dashboard from "../Layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import PetbyCategory from "../Pages/PetByCategory/PetbyCategory";
import PetDetail from "../Pages/PetDetail/PetDetail";
import Allpets from "../Pages/AllPet/Allpets";
import MyPets from "../Pages/Dashboard/MyPets/MyPets";
import Update from "../Pages/Actions/UpdatePet.jsx/Update";
import DonationCampaign from "../Pages/Donation_Campaign/DonationCampaign";
import AllDonationCamps from "../Pages/All_Donation_camps/AllDonationCamps";
import MyCampaign from "../Pages/MyCampaign/MyCampaign";
import Users from "../Pages/Users/Users";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path: '/',
            element: <Home />
        },
        {
          path:'login',
          element: <Login />
        },
        {
          path:'signup',
          element: <Signup />
        },
        {
          path: '/pet/:category',
          element: <PetbyCategory />,
          loader: ({params})=>fetch(`https://pet-adoption-server-six.vercel.app/pet/${params.category}`)
        },
        {
          path: 'pet/:category/:id',
          element: <PetDetail />,
          loader: ({params})=>fetch(`https://pet-adoption-server-six.vercel.app/pet_detail/${params.id}`)
        },
        {
          path: 'pets',
          element: <Allpets />,
          
        },
        {
          path:'allcamps',
          element:<AllDonationCamps />
        }
       
      ]
    },
    {
      path: 'dashboard',
      element:<PrivateRoute><Dashboard /></PrivateRoute>,
      children:[
        {
          path:'addpet',
          element: <PrivateRoute><AddPet /></PrivateRoute>
        },
        {
          path: 'mypets',
          element: <PrivateRoute><MyPets/></PrivateRoute>
        },
        {
          path:'updatePet/:id',
          element: <PrivateRoute><Update /></PrivateRoute>,
          loader: ({params})=>fetch(`https://pet-adoption-server-six.vercel.app/updatePet/${params.id}`)
        },
        {
          path:'deletePet/:id',
          element: <PrivateRoute><Update /></PrivateRoute>,
          loader: ({params})=>fetch(`https://pet-adoption-server-six.vercel.app/updatePet/${params.id}`)
        },
        {
          path: 'Donation_campaign',
          element: <DonationCampaign />,
          
        },
        {
          path: 'myCampaign',
          element: <MyCampaign />,
          
        },



        /**************************************************************
         * Admin Routes
         **************************************************************/


        {

          path: 'users',
          element: <AdminRoute><Users /></AdminRoute>

        }
      ]
    }
  ]);


  
