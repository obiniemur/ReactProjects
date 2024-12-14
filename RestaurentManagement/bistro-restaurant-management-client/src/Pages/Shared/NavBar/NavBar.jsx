import {useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../../../providers/AuthProviders";
import {FaShoppingCart} from "react-icons/fa";
import UseCart from "../../../Hooks/UseCart";
import useAdmin from "../../../Hooks/useAdmin";

const NavBar = () => {
  const {user, logOut} = useContext(AuthContext);
  const [cart] = UseCart();
  const [isAdmin] = useAdmin()

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const navOptions = (
    <>
      <li className="hover:bg-red-300 hover:px-2">
        <Link to="/">Home</Link>
      </li>
      <li className="hover:bg-red-300 hover:px-2">
        <Link to="/menu">Our Menu</Link>
      </li>
      <li className="hover:bg-red-300 hover:px-2">
        <Link to="/order/salad">Order Food</Link>
      </li>
    
      <li className="hover:bg-red-300 hover:px-4">
        <Link to="/dashboard/cart">
          {/* <button className="btn btn-neutral ">
            <FaShoppingCart/>
            <div className="badge badge-secondary margin">+{cart.length}</div>
          </button> */}

          <FaShoppingCart />
          <div className="badge badge-secondary margin">+{cart.length}</div>
        </Link>
      </li>
      {user ? (
        <li className="hover:bg-red-300 px-4">
          {/* <span>{user?.displayName}</span> */}
          <button onClick={handleLogOut} >
            LogOut
          </button>
        </li>
      ) : (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <>
      <div className="navbar bg-black text-white fixed z-10 bg-opacity-30 max-w-screen-xl">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-50 text-black rounded-box w-52">
              {navOptions}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            Bistro Boss
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end">
          {
            user && isAdmin && <Link to="/dashboard/adminHome">Admin Dashboard</Link>
          }
          {
            user && !isAdmin && <Link to="/dashboard/userHome">{user.displayName} Dashboard</Link>
          }
        </div>
      </div>
    </>
  );
};

export default NavBar;
