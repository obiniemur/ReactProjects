import {NavLink, Outlet, useLocation} from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
  const location = useLocation();
  const noOutlet = location.pathname.includes("^dashboard$");
  const [isAdmin] = useAdmin();
  return (
    <>
      <Navbar />
      <div className="flex">
        <div className="drawer w-0 md:w-[15%] lg:drawer-open">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

          <div className="drawer-side z-30">
            <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-60 min-h-screen bg-[#F2C54E] text-base-content font-Roboto font-semibold text-lg">
              {/* Sidebar content here */}
              <li>
                <NavLink to="/dashboard/addpet">Add New Pet</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/mypets">My Pets</NavLink>
              </li>
              <li>
                <NavLink to="/test">Adoption Request</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/Donation_campaign">Create Donation Camps</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myCampaign">My Donation Camp</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/mydonation">My Donation</NavLink>
              </li>

              {/* Admin Routes */}
              {isAdmin && (
                <>
                  <div className="divider  mt-20">Admin Options</div>

                  <li>
                    <NavLink to="/dashboard/users">Users</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="flex-grow">
          <div className=" bg-[#F2C54E] text-center  lg:hidden">
            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn  btn-warning">
              Open Drawer
            </label>
          </div>
          {noOutlet ? (
            <p>Hello</p>
          ) : (
            <div>
              <Outlet />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
