import {Link} from "react-router-dom";
import logo from "../../assets/Images/logo/logo.png";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const {user, logOut} = useAuth();
  console.log('test', user);
  const HandleLogout = () => {
    logOut().then(() => console.log("User is logged out"));
  };
  const NavItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <details>
          <summary>Pet Listing</summary>
          <ul className="p-2 w-[150px]">
            <li>
              <Link to='/pet/dog'>Dog Listing</Link>
            </li>
            <li>
              <Link to='/pet/cat'>Cat Listing</Link>
            </li>
            <li>
              <Link to='/pet/other'>Other Pet</Link>
            </li>
            <li>
              <Link to='/pets'>All Listing</Link>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <Link to='/allcamps'>Donation Campaign</Link>
      </li>
    </>
  );

  return (
    <div className="bg-[#FFC632]">
      <div className="navbar  max-w-7xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-Roboto">{NavItems}</ul>
          </div>
          <Link to="/" className=" bg-[#FFC632]  text-xl">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 z-50 font-Roboto">{NavItems}</ul>
        </div>
        <div className="navbar-end">
          {!user ? (
            <Link to="/login" className="btn btn-warning">
              Log In
            </Link>
          ) : (
            <div className="dropdown dropdown-bottom dropdown-end">
              <div tabIndex={0} role="button" className="m-1">
                <img className="w-14 h-14 rounded-full" src={user?.photoURL} alt="" />
              </div>
              <ul className="dropdown-content z-[1] menu p-2 shadow bg-yellow-500 rounded-box w-52">
                <p className="py-4">My Profile <span className="font-Dancing font-bold text-green-200">{user.displayName}</span></p>
                <li>
                  <Link to='/dashboard'>My Dashboard</Link>
                </li>
                <li>
                  <button onClick={HandleLogout}>Log Out</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
