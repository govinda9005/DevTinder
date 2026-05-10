import React, { useState } from "react";
import UserrCard from "./UserrCard";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");

  const handleSave = async () => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          photoUrl,
          age: Number(age),
          gender,
          about,
        },
        { withCredentials: true }
      );

      dispatch(addUser(response?.data?.data));

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <>
      {/* CENTER PAGE */}
      <div className="min-h-screen bg-base-200 flex items-center justify-center">

        {/* MAIN CONTAINER */}
        <div className="flex gap-10">

          {/* FORM */}
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">

              <h2 className="text-xl font-bold text-center mb-2">
                Edit Profile
              </h2>

              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input input-bordered w-full"
              />

              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered w-full"
              />

              <input
                type="text"
                placeholder="Photo URL"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="input input-bordered w-full"
              />

              {photoUrl && (
                <div className="flex justify-center">
                  <img
                    src={photoUrl}
                    className="w-16 h-16 rounded-full object-cover border"
                  />
                </div>
              )}

              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input input-bordered w-full"
              />

              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <textarea
                placeholder="About"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="textarea textarea-bordered w-full"
              />

              <button
                onClick={handleSave}
                className="btn btn-primary w-full mt-2"
              >
                Save Profile
              </button>

            </div>
          </div>

          {/* PROFILE PREVIEW */}
          <UserrCard
            user={{ firstName, lastName, photoUrl, age, gender, about }}
          />

        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;