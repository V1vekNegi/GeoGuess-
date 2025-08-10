import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaTrophy } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import avatar from "../assets/user.png";

const Nav = ({ onSignUpClick }) => {
  const location = useLocation();
  const path = location.pathname;

  const getActiveTab = () => {
    if (path === "/") return "home";
    if (path.startsWith("/leaderboard")) return "leaderboard";
    return null; // For routes not in navbar
  };

  const activeTab = getActiveTab();

  const { user } = useContext(UserContext);

  const handletransition = () => {
    switch (activeTab) {
      case "home":
        return "translate-x-6 w-1/10"
      case "leaderboard":
        return "translate-x-[89%] w-1/5";
      default:
        return "opacity-0 pointer-events-none scale-0" ;
    }
  };

  return (
    <div className=" navbar w-screen flex justify-end  ">
      <div className="absolute h-16 w-1/3 z-20   flex justify-center gap-10 mt-4">
        <div className="  rounded-xl p-4 mt-2 ">
          <hr
            className={`transition-transform duration-300 border-purple-600 border-t-3 absolute top-12 left-[17.5%] ${handletransition()}`}
          />
          <div className="flex justify-center gap-5 items-center text-white font-semibold  "
           style={{ fontFamily: "'Poppins', sans-serif" }}>
            <Link to="/" className="relative group w-[80px] text-center">
              <span
                className={`block transition-opacity duration-200 group-hover:opacity-0 ${
                  activeTab === "home" ? "text-purple-600" : ""
                }`}
              >
                HOME
              </span>
              <span className="absolute inset-0 flex items-center justify-center opacity-0 hover:shadow-lg rounded-lg group-hover:opacity-100 transition-opacity duration-200">
                <FaHome />
              </span>
            </Link>

            <Link
              to="/leaderboard"
              className="relative group w-[120px] text-center"
            >
              <span
                className={`block transition-opacity duration-200 group-hover:opacity-0 ${
                  activeTab === "leaderboard" ? "text-purple-600" : ""
                }`}
              >
                LEADERBOARD
              </span>
              <span className="absolute inset-0 p-3 flex items-center justify-center hover:shadow-lg   rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <FaTrophy />
              </span>
            </Link>
          </div>
        </div>
        <div className=" my-4 w-30 h-12 ">
          {user ? (
            <img src={avatar} alt="img" className="w-10 h-10 rounded-full" />
          ) : (
            <button
              className=" cursor-pointer bg-white text-purple-700 font-extrabold text-sm px-3 py-2 rounded-full border-4 hover:border-1 shadow-[0_6px_0_#4b0082] hover:bg-[#4b0082] hover:text-white hover:-translate-y-1 active:translate-y-1 active:shadow-[0_3px_0_#4b0082] transition-all duration-300 ease-out"
              onClick={onSignUpClick}
               style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Sign Up
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
