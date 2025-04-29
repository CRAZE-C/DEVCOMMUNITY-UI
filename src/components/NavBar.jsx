import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants.js";
import { removeUser } from "../utils/userSlice.js";
import axios from "axios";

const NavBar = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(BASE_URL + "/logout", {}, { withCredentials: true })
            dispatch(removeUser());
            navigate('/login');
        }
        catch(err){
            console.error(err);
        }
    }

    return (
        <nav className="flex justify-between navbar bg-base-300 shadow-sm">
            <Link to="/" className="flex items-center gap-2 px-5">
                <img
                    src="/DevCommunity.png"
                    alt="DevCommunity logo"
                    className="h-8 w-auto"
                />
                <span className="text-lg font-semibold">DevCommunity</span>
            </Link>

            {user && (<div className="flex items-center gap-2 pr-4">
                Welcome, {user.data.firstName}
                <div className="dropdown dropdown-end ">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full overflow-hidden">
                            <img
                                alt="User avatar"
                                src={user.data.profilePicture}
                            />
                        </div>
                    </div>

                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-base-100 p-2 shadow z-10"
                    >
                        <li>
                            <Link to="/profile" className="justify-between">
                                Profile
                            </Link>
                        </li>
                        <li>
                            <a>Settings</a>
                        </li>
                        <li>
                            <a onClick={handleLogout}>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>)}
        </nav>
    );
};

export default NavBar;
