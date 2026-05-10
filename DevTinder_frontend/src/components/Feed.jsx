import axios from "axios";
import { useEffect } from "react";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import UserrCard from "./UserrCard";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;

    try {
      const response = await axios.get(API_BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(response.data.data)); // 🔥 FIXED

    } catch (error) {
      console.error("Failed to fetch feed:", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return <h1 className="text-center mt-10">Loading...</h1>;

  if (feed.length === 0)
    return <h1 className="text-center mt-10">No more users</h1>;

  return (
   <div className="flex justify-center mt-10">
     <UserrCard user={feed[0]} />
   </div>
 );
};

export default Feed;