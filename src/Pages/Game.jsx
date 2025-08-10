import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import Gif from "../assets/Gif.gif";
import heart from "../assets/heart.png";
import Background from "../assets/earth.jpg";

const Game = () => {
  const [country, setCountry] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [triesLeft, setTriesLeft] = useState(3);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [hintIndex, setHintIndex] = useState(-1);
  const [gameOver, setGameOver] = useState(false);
  const [status, setStatus] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const totalRounds = 10;

  const { user } = useContext(UserContext);

  const hintFields = ["region", "capital", "flag", "famousDish"];

  const fetchCountry = async () => {
    try {
      const response = await axios.get("http://localhost:5000/countries");
      console.log("Country response:", response.data);
      setCountry(response.data);
      setTriesLeft(3);
      setHintIndex(-1);
      setUserAnswer("");
      setStatus("");
    } catch (error) {
      console.error("Error fetching country:", error);
      fetchCountry();
    }
  };

  useEffect(() => {
    fetchCountry();
  }, []);

  const handleGuess = async () => {
    if (!country || !userAnswer.trim()) return;

    const res = await axios.post("http://localhost:5000/score/submit", {
      userAnswer,
      correctAnswer: country.name,
      triesUsed: 3 - triesLeft,
    });

    console.log(res.data);

    const { score: earnedPoints, correct } = res.data;

    if (correct) {
      const newScore = score + earnedPoints;
      setStatus("correct, well done!");
      setScore(newScore);

      if (round < totalRounds) {
        setRound((prev) => prev + 1);
        setTimeout(() => {
          fetchCountry();
        }, 1000);
      } else {
        handleGameOver(newScore);
      }
    } else {
      setStatus("wrong, try again");
      setIsShaking(true);
      if (triesLeft > 1) {
        setTriesLeft((prev) => prev - 1);
      } else {
        if (round < totalRounds) {
          setRound((prev) => prev + 1);

          setTimeout(() => {
            fetchCountry();
          }, 1000);
        } else {
          handleGameOver(score);
        }
      }
    }
    setTimeout(() => {
      setIsShaking(false);
    }, 500);
  };

  const handleSkip = () => {
    if (round < totalRounds) {
      setRound((prev) => prev + 1);
      fetchCountry();
    } else {
      handleGameOver(score);
    }
  };

  const handleGameOver = async (score) => {
    setGameOver(true);
    if (user) {
      console.log("Updating score for user:", user, "with score:", score);
      // Update score for logged-in user
      await axios.post("http://localhost:5000/score/update", {
        username: user,
        newScore: score,
      });
    }
    //
  };

  return (
    <div>
      {gameOver ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold mb-4">🎉 Game Over 🎉</h1>
          <p className="text-xl mb-2">Your Final Score: {score}</p>
          <button
            className="mt-4 bg-purple-500 text-white px-6 py-3 rounded-lg cursor-pointer active:translate-y-2 transform transition-all duration-300 hover:scale-105 hover:bg-white hover:border-2 border-0 border-purple-600 hover:text-purple-700"
            onClick={() => {
              setRound(1);
              setScore(0);
              setGameOver(false);
              fetchCountry();
            }}
          >
            Play Again
          </button>
        </div>
      ) : (
        <div
          className={`flex flex-col justify-center items-center relative bg-[radial-gradient(circle_at_center,_#fef08a,_#FDD637,_#f4ad1c)] h-screen w-screen z-12  `}
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <div>
            <img className="absolute inset-0 w-full h-full object-cover bg-contain opacity-15 -z-10"
             src={Background} alt="Background" />
          </div>
          <div className="relative flex justify-center items-center gap-1">
            <div
              className="text-4xl font-bold mb-6"
              style={{
                fontFamily: "'Luckiest Guy', sans-serif",
              }}
            >
              Round {round}/ {totalRounds}
            </div>
            <div className="text-4xl p-4 mb-3">
              <button className="cursor-pointer" onClick={handleSkip}>
                <i className="fa-solid fa-arrow-right hover:scale-101 hover:text-gray-700"></i>
              </button>
            </div>
          </div>

          <div className="w-96 h-96 bg-white rounded-xl p-6 shadow-2xl mb-6 flex items-center justify-center">
            <img
              src={`http://localhost:5000${country.outline}`}
              alt=" "
              className="w-full h-full object-contain"
            />
          </div>

          <input
            type="text"
            placeholder="Guess the country"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className={`text-black w-1/3 p-4 rounded-lg text-xl shadow-2xl focus:outline-none transition-all duration-300 ${
              status === "correct, well done!"
                ? "border-2 border-green-500 shadow-lg"
                : ""
            } ${
              status === "wrong, try again"
                ? "border-2 border-red-500 shadow-lg"
                : ""
            }
            ${isShaking ? "animate-shake" : ""}`}
          />
          <p
            className={`text-sm mt-2 transition-opacity duration-300 ${
              status === "correct, well done!"
                ? "text-green-500 "
                : "text-red-500"
            }`}
          >
            {status}
          </p>

          <button
            onClick={handleGuess}
            className="mt-3 w-1/5 p-3 bg-gradient-to-r from-purple-800 to-purple-500 rounded-2xl border-2 border-white text-white text-xl font-semibold shadow-lg cursor-pointer  hover:scale-105 transition-all duration-300  active:translate-y-2"
          >
            Submit
          </button>
          <div className="relative flex justify-center w-1/2 gap-50">
            <div className="mt-10 w-[50%] text-lg flex">
              Tries left: {triesLeft}{" "}
              <img
                className="h-7 w-7 hover:scale-110 "
                src={heart}
                alt="heart"
              />
            </div>

            <div className="mt-7 text-black p-4 rounded-lg w-[35%]">
              {hintIndex < hintFields.length - 1 && (
                <>
                  <button
                    onClick={() => setHintIndex((prev) => prev + 1)}
                    className="  p-2 bg-gradient-to-r from-purple-800 to-purple-500 rounded-lg   text-white cursor-pointer shadow-2xl active:shadow-md  hover:scale-105 transition-all duration-300  active:translate-y-2 z-10"
                  >
                    Show Hint
                  </button>
                   
                </>
              )}
              <ul className=" list-inside">
                {hintFields.slice(0, hintIndex + 1).map((field, index) => (
                  <li key={index}>
                    <strong>{field}:</strong>
                    {field === "flag" ? (
                      <img src={country.flag} width="150" alt="Country Flag" />
                    ) : (
                      country[field]
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 text-2xl w-[50%] flex justify-center font-semibold">
              <img className="h-9 w-9 hover:scale-110" src={Gif} alt="" />{" "}
              Score: {score}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
