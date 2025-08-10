import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext.js";

const SignUp = ({ onClose }) => {
  const [confirmpassword, setConfirmpassword] = useState("");
  const [error, setError] = useState(" ");
  const [islogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== confirmpassword) {
      setError("Password do not match");
      return;
    }
    setError("");

    try {
      const res = await axios.post(
        `http://localhost:5000/auth/${islogin ? "login" : "signup"}`,
        formData
      );

      if (islogin) {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.username);

        onClose();
      } else {
        setIsLogin(true);
      }
    } catch (err) {
      console.error("Error during authentication:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Authentication failed");
      }
    }
  };
  return (
    <div>
      <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex justify-center items-center z-50">
        <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-lg shadow-lg w-[90%] max-w-md">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold cursor-pointer"
          >
            &times;
          </button>

          <div className="flex justify-center mb-4">
            <h2 className="text-3xl text-white font-semibold text-center">
              {islogin ? "Login" : "SignUp"}
            </h2>
          </div>

          <div className=" relative flex h-12 mb-4 border border-gray-300 rounded-full overflow-hidden">
            <button
              onClick={() => setIsLogin(false)}
              className={`w-1/2 cursor-pointer text-lg font-medium transition-all duration-300  z-10 ${
                !islogin ? " text-white " : " text-purple-500 hover:text-white"
              }`}
            >
              SignUp
            </button>
            <button
              onClick={() => setIsLogin(true)}
              className={`w-1/2 cursor-pointer text-lg font-medium transition-all duration-300 z-10 ${
                islogin ? " text-white" : " text-purple-500 hover:text-white"
              }`}
            >
              Login
            </button>
            <div
              className={`absolute top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-purple-800 to-purple-300 ${
                islogin ? "left-1/2" : "left-0"
              }`}
            ></div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!islogin && (
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                onChange={handleChange}
                className="w-full p-3 rounded bg-white/20 text-white border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-white/60 backdrop-blur-sm"
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
              className="w-full p-3 rounded bg-white/20 text-white border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-white/60 backdrop-blur-sm"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-white/20 text-white border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-white/60 backdrop-blur-sm"
            />

            {!islogin && (
              <input
                type="password"
                value={confirmpassword}
                onChange={(e) => {
                  setConfirmpassword(e.target.value);
                }}
                placeholder="Confirm Password"
                required
                className="w-full p-3 rounded bg-white/20 text-white border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-white/60 backdrop-blur-sm"
              />
            )}

            {islogin && (
              <div className="text-right">
                <p className="text-purple-600 hover:underline hover:text-white">
                  Forget Password
                </p>
              </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full p-3 bg-gradient-to-r from-purple-800 to-purple-300 text-white rounded-full text-lg font-medium hover:opacity-90 transition cursor-pointer"
            >
              {islogin ? "Login" : "Sign Up"}
            </button>
            <p className="text-center text-white">
              {islogin ? "Don't have an account?" : "Already have an account?"}1
              <a
                href="#"
                onClick={(e) => setIsLogin(!islogin)}
                className="text-cyan-600 hover:underline "
              >
                {islogin ? "SignUp" : "Login"}
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
