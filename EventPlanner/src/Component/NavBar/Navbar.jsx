import {useContext} from "react";
import {NavLink} from "react-router-dom";
import {dataProvider} from "../Context/DataContext";

const Navbar = () => {
  const {user, signOutMethod} = useContext(dataProvider);

  const signoutHandle = () => {
    signOutMethod()
      .then(() => {
        alert("You're singing out");
      })
      .catch((error) => {
        console.log(error);
      });
      
  };

  const nav = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/services">Services</NavLink>
      </li>
      <li>
        <NavLink to="/aboutus">About us</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/gallery">Gallery</NavLink>
        </li>
      )}
      <li>
        <NavLink to="/registration">Registration</NavLink>
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
            {nav}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost normal-case text-xl">
          Michigan CreativeCorner
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{nav}</ul>
      </div>

      {user ? (
        <div className="navbar-end">
          <button className="btn" onClick={signoutHandle}>
            Logout
          </button>
        </div>
      ) : (
        <div className="navbar-end">
          <NavLink className="btn" to="/login">
            Login
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
