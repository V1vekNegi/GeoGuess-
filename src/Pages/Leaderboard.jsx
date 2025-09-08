
import { useEffect, useState } from "react";
import axios from "axios";


export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/leaderboard`); // Adjust URL as needed
        setLeaderboard(res.data);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-900 to-blue-900 text-white"
    style={{ fontFamily: "'Poppins', sans-serif" }}>
      <h1 className="text-4xl font-bold mt-5 ">LEADERBOARD</h1>
      <div className="relative bg-gradient-to-br from-white/20 to-white/2 backdrop-blur-md border border-white/30 p-5 w-[90%] md:w-1/2 h-[70%] rounded-xl shadow-lg">
         

      {leaderboard.length > 2 && (
        <div className="flex justify-center gap-10 md:gap-12 items-end mb-12">
          <div className="flex flex-col items-center">
            <div className=" w-16 h-16 bg-pink-500 rounded-full mb-2"><img className="w-full h-full object-cover hover:scale-105 transition-all duration-300" src={`/avatars/panda.png`} alt="" /></div>
            <p>2nd</p>
            <p className="font-bold">{leaderboard[1].username}</p>
            <p>{leaderboard[1].score}</p>
          </div>

          <div className=" flex flex-col items-center">
            <div className="w-20 h-20 md:w-28 md:h-28 bg-pink-500 rounded-full mb-2 border-4 border-yellow-300"><img className="w-full h-full object-cover hover:scale-105 transition-all duration-300" src={`/avatars/jaguar.png`} alt="" /></div>
            <p className="text-yellow-300 font-bold text-xl">1st 🏆</p>
            <p className="font-bold">{leaderboard[0].username}</p>
            <p>{leaderboard[0].score}</p>
          </div>

          <div className="flex flex-col items-center ">
            <div className="w-16 h-16 md:w-24 md:h-24 bg-pink-500 rounded-full mb-2"><img className="w-full h-full object-cover hover:scale-105 transition-all duration-300" src={`/avatars/deer.png`} alt="" /></div>
            <p>3rd</p>
            <p className="font-bold">{leaderboard[2].username}</p>
            <p>{leaderboard[2].score}</p>
          </div>
        </div>
      )}

      <div className="grid gap-3 grid-cols-[repeat(auto-fit,_minmax(16rem,_1fr))] w-full">
        {leaderboard.slice(3).map((player, index) => (
          <div
            key={player.username}
            className=" group flex items-center justify-center gap-8 bg-purple-800 px-4 py-2 shadow-2xl rounded-lg w-full hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-pink-500 rounded-full">{index > 8 ? <img className="hover:scale-105 transition-all duration-300" src={`/avatars/user.png`} alt="" /> : <img className="hover:scale-105 transition-all duration-300" src={`/avatars/${index + 4}.png`} alt="" /> }</div>
              <p className="font-bold">{index + 4}th</p>
            </div>
            <p className=" group-hover:text-xl group-hover:shadow-2xl transition-all duration-300 font-bold">{player.username}</p>
            <p className="group-hover:text-xl group-hover:shadow-2xl transition-all duration-300">{player.score}</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}