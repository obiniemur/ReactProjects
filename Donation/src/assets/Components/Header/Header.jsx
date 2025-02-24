import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="navbar bg-base-100 justify-between max-w-[1320px] mx-auto">
      <li className="btn btn-ghost normal-case text-xl">
        <NavLink to="/">
          <img
            className="max-w-[150px] relative z-30 lg:max-w-full"
            src="https://i.ibb.co/mFCKSYC/Logo.png"
            alt=""
          />
        </NavLink>
      </li>

      <div className="dropdown flex">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[99] p-2 shadow bg-base-100 rounded-box w-52 absolute right-0 top-5  ">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          <li>
            <NavLink to="/donations">Donation</NavLink>
          </li>
          <li>
            <NavLink to="/statistic">Statistic</NavLink>
          </li>
        </ul>
      </div>
      {/* <a className="btn btn-ghost normal-case text-xl">daisyUI</a> */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          <li>
            <NavLink to="/donations">Donation</NavLink>
          </li>
          <li>
            <NavLink to="/statistic">Statistic</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
