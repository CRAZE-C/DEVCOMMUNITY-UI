import React from "react";
import { FaRedoAlt, FaTimes, FaStar, FaHeart, FaPaperPlane } from "react-icons/fa";

const UserCard = ({user}) => {
    console.log(user)
    return (
        <div className="w-[330px] h-[470px] bg-base rounded-xl overflow-hidden relative shadow-2xl text-white font-sans">
      <div className="relative w-full h-[470px]">
        <img
          src={user.profilePicture}
          alt="userprofile"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 w-full h-54 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      <div className="absolute bottom-0 w-full h-10 bg-gradient-to-t from-black to-transparent"></div>

      <div className="absolute bottom-15 px-3">
        <h2 className="text-2xl font-semibold">{user.firstName + " " + user.lastName} <span className="italic text-sm">{user.age}</span></h2>
        <p className="text-sm text-gray-300">{user.about}</p>
      </div>

      <div className="absolute bottom-0 w-full flex justify-around">
        <button className="bg-white text-red-500 p-3 rounded-full text-xl shadow-md"><FaTimes /></button>
        <button className="bg-white text-green-500 p-3 rounded-full text-xl shadow-md"><FaHeart /></button>
      </div>
    </div>
  );
}

export default UserCard;