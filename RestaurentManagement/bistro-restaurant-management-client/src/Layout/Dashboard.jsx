import {NavLink, Outlet} from "react-router-dom";
import {FaBook, FaCalendar, FaHome, FaList, FaShoppingCart, FaUser, FaUtensils} from "react-icons/fa";
import {BiSolidContact} from "react-icons/bi";
import {BiSolidFoodMenu} from "react-icons/bi";
import { MdStarRate } from "react-icons/md";
import useAdmin from "../Hooks/useAdmin";


const Dashboard = () => {
  //Todo: get isAdmin value from the database
  const [isAdmin] = useAdmin();
  return (
    <div className="flex ">
      {/* Side Navigation of dashboard*/}
      <div className="w-64 min-h-screen bg-orange-400">
        <ul className="menu p-4">
          {isAdmin ? (
            <>

              <li>
                <NavLink to="/dashboard/adminHome">
                  <FaHome />
                  Admin Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/addItems">
                  <FaUtensils />
                  Add Item
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/manageItems">
                  <FaList />
                  Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageBookings">
                  <FaBook />
                  Manage Booking
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users">
                  <FaUser />
                  All users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/cart">
                  <FaShoppingCart />
                  My Cart
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/userHome">
                  <FaHome />
                  User Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/history">
                  <FaCalendar />
                  Payment History
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/review">
                  <MdStarRate />
                  Add a Review
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentHistory">
                  <FaBook />
                 Real Payment History
                </NavLink>
              </li>
            </>
          )}

          <div className="divider"></div>

          {/* Shared Section between admin and user */}

          <li>
            <NavLink to="/">
              <FaHome />
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/order/salad">
              <BiSolidFoodMenu />
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/contact">
              <BiSolidContact />
              Contact
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Dashboard content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
