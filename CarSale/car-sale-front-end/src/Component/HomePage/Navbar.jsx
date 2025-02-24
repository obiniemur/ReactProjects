import { useContext } from "react";
import { dataContext } from "../Authprovider/ContextProvider";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {

  const {user,signOutUser}= useContext(dataContext)

  const handleSignout=()=>{
    signOutUser()
    .then(()=>{
      console.log('signedout')
    })
  }




  const addNav = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/cart">My Cart</Link>
      </li>
      {user&& <li>
        <Link to="/addcar">Add Product</Link>
      </li>}
      <li>
        <Link to="/signup">Register Now</Link>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {addNav}
          </ul>
        </div>
        <Link to='/' className="btn btn-ghost normal-case text-xl">Michigan Used Car</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{addNav}</ul>
      </div>
      <div className="navbar-end">
        {user ? <button className="btn" onClick={handleSignout}>Logout</button> : <Link to='/signin'><button className="btn">Login</button></Link>}
      </div>
    </div>
  );
};

export default Navbar;
