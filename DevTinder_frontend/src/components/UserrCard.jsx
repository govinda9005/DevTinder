import React from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserrCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about, _id } = user || {};

  const dispatch = useDispatch();

  const validImage =
    photoUrl && photoUrl.startsWith("http")
      ? photoUrl
      : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${API_BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeFeed(userId));
    } catch (error) {
      console.error("Failed to send connection request:", error);
    }
  };

  return (
    <div className="card w-80 bg-base-100 shadow-xl mb-24">

      {/* IMAGE */}
      <figure className="h-56 overflow-hidden">
        <img
          src={validImage}
          alt="User"
          className="w-full h-full object-cover"
        />
      </figure>

      {/* CONTENT */}
      <div className="card-body text-center p-4">

        <h2 className="text-lg font-bold">
          {firstName || "First"} {lastName || "Last"}
        </h2>

        {age && gender && (
          <p className="text-sm text-gray-500">
            {age} years old • {gender}
          </p>
        )}

        {about && (
          <p className="text-sm text-gray-500 mt-2">
            {about}
          </p>
        )}

        <div className="card-actions justify-center mt-4">

          <button
            onClick={() => handleSendRequest("ignored", _id)}
            className="btn btn-outline btn-error btn-sm"
          >
            Ignore
          </button>

          <button
            onClick={() => handleSendRequest("interested", _id)}
            className="btn btn-primary btn-sm"
          >
            Interested
          </button>

        </div>

      </div>
    </div>
  );
};

export default UserrCard;