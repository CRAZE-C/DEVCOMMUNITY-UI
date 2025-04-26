import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("dharanraj@gmail.com");
  const [password, setPassword] = useState("Dharanraj@123");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:1010/login", {
        email,
        password
      }, { withCredentials: true })
    }
    catch (err) {
      console.log("ERROR : " + err)
    }
  }

  return (
    <div className="flex h-152 items-center justify-center bg-base-100">
      <div className="card card-side bg-base-300 shadow-sm max-w-200">
        <figure className="w-80 flex-shrink-0">
          <img
            src="https://i.pinimg.com/736x/91/77/97/91779771e0c323b769b5468319754d3a.jpg"
            alt="Login illustration"
            className="h-full w-full object-cover"
          />
        </figure>
        <div className="card-body w-90 items-center gap-4">
          <h2 className="card-title">Login</h2>
          <fieldset className="w-full">
            <legend className="mb-2 text-sm font-medium">Email:</legend>
            <input
              type="email"
              value={email}
              className="input input-bordered w-full h-8"
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset className="w-full">
            <legend className="mb-2 text-sm font-medium">Password:</legend>
            <input
              type="password"
              value={password}
              className="input input-bordered w-full h-8"
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>

          <div className="card-actions pt-3 w-20">
            <button className="btn btn-primary w-full" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
