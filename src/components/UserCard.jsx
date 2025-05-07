import axios from "axios";
import React from "react";
import { FaRedoAlt, FaTimes, FaStar, FaHeart, FaPaperPlane } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants.js";
import { removeFeed } from "../utils/feedSlice.js";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const handleSendRequest = async (status, id) => {
    try {
      const res = await axios.post(`${BASE_URL}/request/${status}/${id}`, {}, { withCredentials: true });
      dispatch(removeFeed(id));
    }
    catch (err) {
      console.error("ERROR : " + err);
    }
  }

  return (
    <div className="w-[350px] h-[70vh] bg-base rounded-xl overflow-hidden relative shadow-2xl text-white font-sans">
      <div className="relative w-full h-full">
        <img
          src={user.profilePicture}
          alt="userprofile"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 w-full h-84 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      <div className="absolute bottom-0 w-full h-10 bg-gradient-to-t from-black to-transparent"></div>

      <div className="absolute w-full bottom-15 px-3">
        <h2 className="text-2xl font-semibold">{user.firstName + " " + user.lastName} <span className="italic text-sm">{user.age}</span></h2>
        <p className="pr-10 text-sm text-gray-300 line-clamp-3">{user.about === "Add about yourself..." ? "" : user.about}</p>
      </div>

      <div className="absolute bottom-1 w-full flex justify-around">
        <button 
          className="bg-white text-red-500 p-3 cursor-pointer rounded-full text-xl shadow-md transform transition-all duration-300 ease-in-out hover:scale-110 active:scale-95" 
          onClick={() => {handleSendRequest("ignored", user._id)}}
        >
          <FaTimes />
        </button>
        <button 
          className="bg-white text-green-500 p-3 cursor-pointer rounded-full text-xl shadow-md transform transition-all duration-300 ease-in-out hover:scale-110 active:scale-95" 
          onClick={() => {handleSendRequest("interested", user._id)}}
        >
          <FaHeart />
        </button>
      </div>
    </div>
  );
}

export default UserCard;