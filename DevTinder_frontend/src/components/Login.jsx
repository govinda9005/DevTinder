import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // LOGIN
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/login`,
        {
          emailId: email,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.user));
      navigate("/");

    } catch (error) {
      console.error("Login failed:", error.response?.data);
    }
  };

  // SIGNUP
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/signup`,
        {
          firstName,
          lastName,
          emailId: email,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.user));
      navigate("/profile");

    } catch (error) {
      console.error("Signup failed:", error.response?.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl">
        <div className="card-body">

          <h2 className="card-title justify-center text-2xl">
            {isLoginForm ? "Login" : "Signup"} to DevTinder
          </h2>

          <form onSubmit={(e) => e.preventDefault()}>

            {/* Signup fields */}
            {!isLoginForm && (
              <>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>

                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>

                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="input input-bordered"
                    required
                  />
                </div>
              </>
            )}

            {/* Email */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="input input-bordered"
                required
              />
            </div>

            {/* Password */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input input-bordered"
                required
              />
            </div>

            {/* Button */}
            <div className="form-control mt-6">
              <button
                type="button"
                onClick={isLoginForm ? handleLogin : handleSignup}
                className="btn btn-primary w-full"
              >
                {isLoginForm ? "Login" : "Signup"}
              </button>
            </div>

            {/* Toggle */}
            <p className="text-center mt-4">
              {isLoginForm
                ? "Don't have an account?"
                : "Already have an account?"}{" "}

              <button
                type="button"
                onClick={() => setIsLoginForm(!isLoginForm)}
                className="link link-primary"
              >
                {isLoginForm ? "Signup" : "Login"}
              </button>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;