import axios from "axios";
import React, { useEffect } from "react";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {

    const connections = useSelector((state) => state.connections);
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {
            const response = await axios(`${API_BASE_URL}/user/connections`, {
                method: "GET",
                withCredentials: true,
            });

            const data = response.data;
            console.log("Connections fetched successfully:", data.data);

            dispatch(addConnection(data.data));

        } catch (error) {
            console.error("Failed to fetch connections:", error);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) return null;

    if (connections.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center my-5">
                <h1 className="text-2xl font-bold">No connections found</h1>
            </div>
        );
    }

    return (
  <div className="max-w-2xl mx-auto mt-10 px-4">
    
    <h1 className="text-3xl font-bold text-center mb-8">
      Connections
    </h1>

    <div className="flex flex-col gap-6">
      {connections.map((connection) => {

        const { firstName, lastName, photoUrl, age, gender, about } =
          connection.user;

        return (
          <div
            key={connection.connectionId}
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

            <button className="btn btn-primary btn-sm">
              Message
            </button>

          </div>
        );
      })}
    </div>

  </div>
);
};

export default Connections;