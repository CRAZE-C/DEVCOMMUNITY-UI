import React from "react";

const NavBar = () => {
    return (
        <nav className="flex justify-between navbar bg-base-300 shadow-sm">
            <a href="/" className="flex items-center gap-2 px-5">
                <img
                    src="/DevCommunity2.png"
                    alt="DevCommunity logo"
                    className="h-8 w-auto"
                />
                <span className="text-lg font-semibold">DevCommunity</span>
            </a>

            <div className="flex items-center gap-2 pr-5">
                <div className="dropdown dropdown-end mx-5">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full overflow-hidden">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                alt="User avatar"
                            />
                        </div>
                    </div>

                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-base-100 p-2 shadow z-10"
                    >
                        <li>
                            <a className="justify-between">
                                Profile <span className="badge">New</span>
                            </a>
                        </li>
                        <li>
                            <a>Settings</a>
                        </li>
                        <li>
                            <a>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
