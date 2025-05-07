import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
        email,
        password
      }, { withCredentials: true });
      dispatch(addUser(res.data));
      return navigate("/feed");
    }
    catch (err) {
      setError(err?.response?.data);
    }
  }

  const handleSignUp = async () => {
    try {
      await axios.post(BASE_URL + "/signup", {
        firstName, lastName, email, password
      }, { withCredentials: true }
      );
      setEmail("");
      setPassword("");
      setIsLogin(true);
    }
    catch (err) {
      console.error("ERROR : " + err);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-152 items-center justify-center bg-base-100">
      <div className="card card-side bg-base-300 shadow-sm max-w-200 max-h-130">
        <figure className="w-80 max-w-100 flex-shrink-0">
          <img
            src="https://i.pinimg.com/736x/91/77/97/91779771e0c323b769b5468319754d3a.jpg"
            alt="Login illustration"
            className="h-full w-full object-cover"
          />
        </figure>
        <div className="card-body w-95 items-center gap-4">
          <h1 className="card-title">{isLogin ? "⟬ Login ⟭" : "⟬ Sign Up ⟭"}</h1>
          {!isLogin &&
            <>
              <fieldset className="w-full">
                <legend className="mb-2 text-sm font-medium">FirstName:</legend>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full h-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="w-full">
                <legend className="mb-2 text-sm font-medium">LastName:</legend>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full h-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
            </>
          }
          <fieldset className="w-full">
            <legend className="mb-2 text-sm font-medium">Email:</legend>
            <input
              type="email"
              value={email}
              className="input input-bordered w-full h-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset className="w-full">
            <legend className="mb-2 text-sm font-medium">Password:</legend>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                className="input input-bordered w-full h-8 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 z-10"
              >
                {showPassword ? (
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.79m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-500 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </fieldset>
          {isLogin && <p className="text-secondary hover:underline cursor-pointer">Forgot Password?</p>}
          <p className="text-red-500">{error}</p>
          <div className="card-actions pt-6 w-20">
            <button className="btn btn-primary w-full cursor-pointer" onClick={isLogin ? handleLogin : handleSignUp}>
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>
          <p
            className="text-sm text-secondary italic cursor-pointer hover:underline"
            onClick={() => setIsLogin((value) => !value)}
          >
            {isLogin ? "New User? Sign Up Here..." : "Existing User? Login Here..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;