import { Link, NavLink} from "react-router-dom";
import {useContext} from "react";
import {dataContext} from "../AuthProvider/ContextProvider";



const Navbar = () => {


  const {user, signOutUser} = useContext(dataContext)

  
  const handleSignout=()=>{
    signOutUser()
    .then(()=>{
      console.log('signedout')
    })
  }





  const navigationBar = (
    <>
      <li>
        <NavLink style={({isActive}) => ({color: isActive ? "#e65624" : "white"})} to="/">
          Home
        </NavLink>
      </li>
      {
        user && <>

<li>
        <NavLink style={({isActive}) => ({color: isActive ? "#e65624" : "white"})} to="/AddBook">
          Add Book
        </NavLink>
      </li>

      <li>
        <NavLink style={({isActive}) => ({color: isActive ? "#e65624" : "white"})} to="/borrowedBook">
          Borrowed Book
        </NavLink>
      </li>


        
        </>
      }
    </>
  );

  return (
    <div className="navbar bg-[#2b2720] text-white ">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-[#2b2720]  rounded-box w-52">
            {navigationBar}
          </ul>
        </div>
        <Link to='/' className="btn btn-ghost normal-case md:text-xl">Public Library</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu-sm menu-horizontal px-1">{navigationBar}</ul>
      </div>
      <div className="navbar-end">
        {
          !user ? 
          <Link to='/login' className="btn btn-ghost">Login</Link> 
          : 
          <div className="flex items-center">
            {user.photoURL ? <div><img className="w-[40px] h-[40px] rounded-full" src={user.photoURL} alt="User Profile" /></div>: <div><p>{user.email}</p></div>}
            <button onClick={handleSignout} className="btn btn-ghost">Log out</button>
          </div>
        }
      </div>
    </div>
  );
};

export default Navbar;
