import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Make an API call to logout the user (e.g., clear session on the server)
      await axios(`${API_BASE_URL}/logout`, {
        method: "POST",
        withCredentials: true, // Important for sending cookies
      });
      // Implement logout logic here (e.g., clear user data, redirect to login)
      dispatch(removeUser());
      return navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm px-4">
      {/* Left */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          DevTinder
        </Link>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {user && (
          <>
            {/* Welcome Text */}
            <p className="text-sm font-medium">
              Welcome, <span className="font-bold">{user.firstName}</span>
            </p>

            {/* Avatar Dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    alt="Profile"
                    src={
                      user.photoUrl ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-10"
              >
                <li>
                  <Link to="/profile">Profile</Link> {/* ✅ FIXED */}
                </li>
                <li>
                  <Link to="/connections">Connections</Link> {/* ✅ FIXED */}
                  
                </li>
                <li>
                  <Link to="/requests">Requests</Link> {/* ✅ FIXED */}
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
