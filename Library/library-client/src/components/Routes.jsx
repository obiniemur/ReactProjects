import {createBrowserRouter} from "react-router-dom";
import Root from "./Root";
import Home from "./Home/Home";
import AddBook from "./Pages/AddBook";
import AllBookBasedOnCategory from "./AllBooksBasedOnCategory/AllBookBasedOnCategory";
// import BooksDetails from "./BookDetails/BooksDetails";
import Register from "./Authentication/Register/Register";
import Login from "./Authentication/Login/Login";
import BorrowedBook from "./BorrowedBook/BorrowedBook";
import PrivateRoute from "./PrivateRoute";
import UpdateBookInfo from "./Pages/UpdateBookInfo";

const Routes = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children:[
        {
            path:"/",
            element: <Home />
        },
        {
            path: '/addBook',
            element: <PrivateRoute><AddBook /></PrivateRoute>
        },
        {
          path:'/books/:category',
          element:<AllBookBasedOnCategory/>,
          loader:({params})=> fetch(`https://library-server-gilt.vercel.app/books/${params.category}`)
          
        },
        {
          path:'/Register',
          element:<Register />
        },
        {
          path:'/Login',
          element:<Login />
        },
        {
          path:'/borrowedBook',
          element:<PrivateRoute><BorrowedBook /></PrivateRoute>
        },
        {
          path:'/updateBooks/:id',
          element:<UpdateBookInfo />,
          loader: ({params})=> fetch(`https://library-server-gilt.vercel.app/bookdetails/${params.id}`)
        }
      ]
    },
  ]);

export default Routes;
