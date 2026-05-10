import Footer from "./Footer";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import axios from "axios";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUserData = async () => {
    try {
      const response = await axios(`${API_BASE_URL}/profile/view`, {
        method: "GET",
        withCredentials: true, // Important for sending cookies
      });
      const userData = await response.data;
      dispatch(addUser(userData));
      // Do something with the fetched user data
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        navigate("/login"); // Redirect to login if fetching user data fails (e.g., not authenticated)
      }
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUserData();
    }
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
