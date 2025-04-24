import React from "react";

const Login = () => {
  return (
    <div className="flex h-152 items-center justify-center bg-base-200">
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
            <legend className="mb-2 text-sm font-medium">Email</legend>
            <input
              type="email"
              className="input input-bordered w-full h-8"
            />
          </fieldset>
          <fieldset className="w-full">
            <legend className="mb-2 text-sm font-medium">Password</legend>
            <input
              type="password"
              className="input input-bordered w-full h-8"
            />
          </fieldset>

          <div className="card-actions pt-3 w-20">
            <button className="btn btn-primary w-full">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
