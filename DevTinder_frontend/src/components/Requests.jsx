import React, { useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {

  const requests = useSelector((state) => state.requests);
  const dispatch = useDispatch();

  const getRequests = async () => {
    try {
      const response = await axios(`${API_BASE_URL}/user/requests/received`, {
        method: "GET",
        withCredentials: true,
      });

      dispatch(addRequests(response.data.data));

    } catch (error) {
      console.error("Failed to fetch requests:", error);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  const reviewRequest = async (status, requestId) => {
    try {

      console.log("Reviewing Request:", status, requestId); // CHECK THIS LOG
  if (!requestId) {
    console.error("RequestId is undefined!");
    return;
  }

      await axios.post(
        `${API_BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(requestId));

    } catch (error) {
      console.error("Failed to review request:", error);
    }
  };

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center my-5">
        <h1 className="text-2xl font-bold">No requests found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">

      <h1 className="text-3xl font-bold text-center mb-8">
        Connection Requests
      </h1>

      <div className="flex flex-col gap-6">

        {requests.map((request) => {

          const user = request.fromUserId;

          if (!user) return null;

          const { firstName, lastName, photoUrl, age, gender, about } = user;

          return (
            <div
              key={request._id}
              className="flex items-center bg-base-200 shadow-lg rounded-2xl p-5 hover:scale-[1.02] transition"
            >

              <img
                src={photoUrl}
                alt="profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-primary"
              />

              <div className="ml-6 flex-1">

                <h2 className="text-xl font-bold">
                  {firstName} {lastName}
                </h2>

                <p className="text-sm opacity-70">
                  {age} years old • {gender}
                </p>

                <p className="mt-2 text-sm">
                  {about}
                </p>

              </div>

              <div className="flex gap-3">

                <button
                  onClick={() => reviewRequest("accepted", request._id)}
                  className="btn btn-success btn-sm"
                >
                  Accept
                </button>

                <button
                  onClick={() => reviewRequest("rejected", request._id)}
                  className="btn btn-error btn-sm"
                >
                  Reject
                </button>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default Requests;