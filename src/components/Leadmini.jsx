import React, { useContext } from "react";
import { Link } from "react-router-dom";
import trophyimg from "../assets/Trophy.png";
import Img from "../assets/img.png";
import { UserContext } from "../context/UserContext";
import background from "../assets/maskmap.jpeg"

const Leadmini = () => {
  const { topPlayers } = useContext(UserContext);

  return (
    <div className="w-screen flex justify-center h-screen bg-white py-10 px-4">
      <div className="absolute w-full text-center mb-2 ">
        <h1 className="text-5xl font-bold text-[#471a83]"
         style={{ fontFamily: "'Poppins', sans-serif" }}
         >LeaderBoard</h1>
        <p className="text-xl text-purple-500 mb-10"
         style={{ fontFamily: "'Poppins', sans-serif" }}
         >Top players</p>
      </div>
      <div className="relative bg-[#471a83] bg-[radial-gradient(circle_at_center,_#7e28f1,_#471a83)] p-20 w-[1000px] h-[600px] mt-30 flex flex-col justify-center shadow-[0_20px_40px_rgba(0,0,0,0.2)] transform hover:-translate-y-4 hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] transition-all duration-300 ease-in-out  rounded-lg border border-purple-700 overflow-hidden z-10 "
       style={{ fontFamily: "'Poppins', sans-serif" }}>
        
         <div
            className="absolute scale-125 bg-no-repeat  left-0 bg-contain w-full h-full opacity-30 -z-10 "
            style={{
              backgroundImage: `url(${background})`,
            }}
          ></div>

        <div className="relative flex justify-center ">
          <div className=" absolute w-1/4 left-0 bg-[#471a83] opacity-80 rounded-2xl ">
            <img src={trophyimg} alt="" />
          </div>

          {topPlayers.map((player, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-end relative"
            >
              <div
                className={`w-24 ${
                  index === 0 ? "h-44 bg-yellow-300 " : index === 1 ? "h-36 bg-gray-300" : "h-32 bg-orange-400"
                } *
                  rounded-t-xl shadow-[inset_-4px_4px_10px_rgba(0,0,0,0.3)] flex items-end justify-center z-10`}
              >
                <span className="text-3xl absolute -top-6">{player.place}</span>
              </div>
              <div
                className={`relative w-full -mt-2 text-center shadow-[inset_-4px_4px_10px_rgba(0,0,0,0.3)] rounded-t-lg z-10 ${
                  index === 0
                    ? "bg-gradient-to-r from-[#8b52d6] to-[#af8eda]"
                    : "bg-gradient-to-r from-[#471a83] via-[#7e28f1] to-[#471a83]"
                }`}
              >
                <p className="mt-3 text-xl  font-semibold text-purple-300 tracking-wide">
                  {player.username}
                </p>
                <p className="mb-2 text-yellow-400 font-bold">
                  {player.score.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
          <div className=" absolute w-1/3 right-2 z-0">
            <img src={Img} alt="" />
          </div>
        </div>

        <Link
          to="/leaderboard"
          className="mt-10 inline-block bg-gradient-to-r from-purple-700 to-purple-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:scale-105 transition-transform duration-300 shadow"
        >
          View Full Leaderboard
        </Link>
      </div>
    </div>
  );
};

export default Leadmini;
