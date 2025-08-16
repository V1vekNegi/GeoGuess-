import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import Leadmini from "../components/Leadmini";

import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img6 from "../assets/img6.png";
import img4 from "../assets/img4.png";
import img5 from "../assets/img5.png";
import img3 from "../assets/img3.gif";
import sparkles from "../assets/sparkes.png";

import { Canvas } from "@react-three/fiber";
import Earth from "../components/Earth";
import Cartoon from "../assets/cartoon.png";
import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [fastSpin, setFastSpin] = useState(false);
  const [move, setMove] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const containerRef = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);
  const img4Ref = useRef(null);
  const img5Ref = useRef(null);
  const img6Ref = useRef(null);

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const handlePlay = () => {
    setFastSpin(true);
    setMove(true);
    setFadeOut(true);

    setTimeout(() => {
      navigate("/game");
    }, 3000);
  };

  useEffect(() => {
    setIsBouncing(true);
    // Optional: Set it back to false after a delay
    setTimeout(() => {
      setIsBouncing(false);
    }, 500);

    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center bottom",
        end: "bottom center",
        scrub: true,
      },
    });

    tl.to(
      [
        img1Ref.current,
        img2Ref.current,
        img3Ref.current,
        img4Ref.current,
        img5Ref.current,
        img6Ref.current,
      ],
      {
        y: -120,
        scale: 1.1,
        ease: "power3.out",
        duration: 2,
        x: (index) => {
          return index % 2 === 0 ? -50 : 50;
        },
      }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("Please login to submit Feedback!");
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/feedback`, {
        username: user || "anonymous",
        comments: feedback,
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError(" Something went failed");
      }
    }
  };

  return (
    <div>
      {isOpen && (
        <div
          ref={panelRef}
          className="absolute z-50 w-73 h-80 bottom-8 left-1 p-4 text-white bg-black/70 rounded-xl shadow-xl animate-[popIn_0.5s_ease-out]"
          style={{
            fontFamily: "'Luckiest Guy', sans-serif",
            WebkitTextStroke: "1px #1b1b4d",
          }}
        >
          <h3 className="font-semibold mb-2 text-xl">
            <i className="fa-solid fa-gamepad "></i> How to Play
          </h3>
          <ul className="list-disc px-5 text-md space-y-1 ">
            <li>You'll see an outline of a country.</li>
            <li>Guess the country name in the input box.</li>
            <li>You get 3 tries per round.</li>
            <li>Points are awarded based on attempts left.</li>
            <li>Click "Play" to start the game!</li>
          </ul>
        </div>
      )}

      <div className="relative w-screen h-screen">
        <div
          className={`flex relative overflow-hidden bg-[radial-gradient(circle_at_center,_#fef08a,_#FDD637,_#f4ad1c)] min-h-screen w-screen z-0  `}
        >
          <div
            className={`fixed w-screen min-h-screen inset-0 bg-black ${
              fadeOut ? " opacity-80  " : "opacity-0"
            } z-30 transition-opacity duration-3000 pointer-events-none`}
          ></div>
          <div className=" absolute w-[5%] hover:scale-110 duration-300 transition transform   ">
            <img src={`favicon.png`} alt="" />
          </div>
          <div
            className={`absolute w-[75%] -right-20 h-screen  rounded-full pointer-events-none ${
              fadeOut ? " z-40  " : " z-10   "
            } `}
          >
            <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
              <Earth fastSpin={fastSpin} move={move} isBouncing={isBouncing} />
            </Canvas>
          </div>

          {/* <div
            className="absolute right-0 bg-no-repeat bg-contain w-200 h-180 -z-10 "
            style={{
              backgroundImage: `url(${MyShape})`,
            }}
          ></div>
          */}
          <div class="absolute w-[400px] h-[400px] rounded-full border-100 border-white/30 top-1/7 left-1/6 -z-20"></div>

          <div class="absolute w-[900px] h-[900px] rounded-full border-140 border-white/30 top-1/3 left-1/4 -translate-x-[44%] -translate-y-[44%] -z-20"></div>

          <div class="absolute w-[1500px] h-[1500px] rounded-full border-160 border-white/30 top-1/3 left-1/4 -translate-x-[44%] -translate-y-[45%] -z-20"></div>
          <div class="absolute w-[2000px] h-[2000px] rounded-full border-180 border-white/30 top-1/3 left-1/4 -translate-x-[40%] -translate-y-[45%] -z-20"></div>

          <div className=" mx-60 my-5 font-sans font-bold flex flex-col w-1/4 h-[700px] z-20 justify-center items-center">
            <h1
              className=" h-53 text-[250px] font-extrabold tracking-wide hover:rotate-[-5deg] text-yellow-300 drop-shadow-[9px_7px_0_#1b1b4d] uppercase animate-[popIn_0.5s_ease-out] transition transform hover:scale-110 duration-300"
              style={{
                fontFamily: "'Luckiest Guy', sans-serif",
                WebkitTextStroke: "1px #1b1b4d",
              }}
            >
              GEO
            </h1>
            <h1
              className=" font-[Luckiest Guy] h-50 text-[220px] text-gray-100 drop-shadow-[9px_7px_0_#1b1b4d] uppercase tracking-wide animate-[popIn_0.9s_ease-out] transition transform hover:scale-110 duration-300"
              style={{
                fontFamily: "'Luckiest Guy', sans-serif",
                WebkitTextStroke: "1px #1b1b4d",
              }}
            >
              GUESS
            </h1>
            <div className=" flex items-center mt-25 ">
              <i
                className="fa-solid fa-circle-info fa-lg hover:scale-125 transform transition duration-300 cursor-pointer"
                onClick={() => {
                  setIsOpen(true);
                }}
              ></i>
              <h1
                className="ml-2 text-white drop-shadow-md text-3xl  "
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Can you guess the country ?
              </h1>
            </div>

            <button
              className="group relative mt-10 cursor-pointer bg-white text-purple-700 font-extrabold text-xl px-6 py-3 rounded-full border-4 hover:border-1 shadow-[0_6px_0_#4b0082] hover:bg-[#4b0082] hover:text-white hover:-translate-y-1 active:translate-y-1 active:shadow-[0_3px_0_#4b0082] transition-all duration-300 ease-out"
              onClick={handlePlay}
            >
              <i className="fa-solid fa-play group-hover:scale-130"></i> PLAY
            </button>
          </div>

          <div
            className="absolute bottom-2 w-[20%] h-[25%] items-center flex flex-col justify-center right-4 bg-gradient-to-br from-white/20 to-black/10 backdrop-blur-sm border border-white/50 text-white  rounded-2xl shadow-xl space-y-3 text-xl"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <div className="flex w-1/2 items-center gap-2">
              <i class="fa-solid fa-earth-americas"></i>
              <span>195 countries</span>
            </div>
            <div className="flex w-1/2 items-center gap-2">
              <i class="fa-solid fa-user"></i>
              <span>1000+ players</span>
            </div>
            <div className="flex w-1/2 items-center gap-2">
              <i class="fa-solid fa-trophy"></i>
              <span>Global Leaderboard</span>
            </div>
          </div>
        </div>
        <div className="relative z-0 ">
          <svg
            className="block w-screen h-26"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="yellowGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#f4ad1c" />
                <stop offset="50%" stopColor="#fee463" />
                <stop offset="100%" stopColor="#f4ad1c" />
              </linearGradient>
            </defs>

            <path
              d="M0,0V46.29c47.85,22,103.78,29,158.68,17.68
         C267.73,48.06,355.15,6.19,445.5,0c95.83-6.59,
         187.48,33.86,282.4,42.58,86.85,7.72,172.1-19.1,
         257.43-35.85C1033.63-9.15,1117.69,1.79,
         1200,24.49V0Z"
              fill="url(#yellowGradient)"
            />
          </svg>
        </div>

        <div
          ref={containerRef}
          className="relative w-screen h-screen bg-[#F5F5F5]"
        >
          <div className="absolute flex justify-center gap-130 w-full h-full ">
            <img className="w-[500px] h-[500px] " src={sparkles} alt="" />
            <img className=" w-[500px] h-[500px] " src={sparkles} alt="" />
          </div>
          <img
            ref={img1Ref}
            className="absolute  left-50 top-150 w-[225px] drop-shadow-2xl "
            src={img1}
            alt=""
          />
          <img
            ref={img2Ref}
            className="absolute right-60 rotate-[50deg] drop-shadow-2xl "
            src={img2}
            alt=""
          />
          <img
            ref={img6Ref}
            className="absolute right-45  top-120 w-[170px] z-5 drop-shadow-2xl "
            src={img6}
            alt=""
          />
          <img
            ref={img4Ref}
            className="absolute right-70 top-140 w-[150px] z-10 drop-shadow-2xl "
            src={img4}
            alt=""
          />
          <img
            ref={img5Ref}
            className="absolute top-100 left-50 rotate-[10deg] drop-shadow-2xl "
            src={img5}
            alt=""
          />
          <img
            ref={img3Ref}
            className="absolute left-30 top-30 w-[225px] -rotate-[25deg] drop-shadow-2xl "
            src={img3}
            alt=""
          />

          <Leadmini />
        </div>

        <footer
          className="bg-gray-200 text-black text-sm p-6 text-center shadow-inner "
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <div className="absolute left-100 drop-shadow-2xl w-[300px]">
            <img src={Cartoon} alt="" />
          </div>
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="mt-4 space-y-2 max-w-md mx-auto"
            >
              <h1
                className="text-2xl font-bold font-sans"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                FEEDBACK
              </h1>
              <textarea
                className="w-full h-30 p-2 rounded-lg border-2 border-purple-500 focus:outline-none hover:border-purple-700"
                placeholder="Any feedbacks on the game.."
                value={feedback}
                onChange={(e) => {
                  setFeedback(e.target.value);
                }}
              />
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-700 to-purple-400 shadow-2xl rounded-md px-2 py-1 text-white cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out active:scale-95 active:translate-y-0.5"
              >
                Submit
              </button>
            </form>
          ) : (
            <div className="text-green-500 font-semibold mt-4">
              Thanks for your feedback!
            </div>
          )}
          <div className="text-2xl font-bold mb-2 flex justify-center items-center gap-2 mt-5">
            <span className="tracking-wider">GeoGuess</span> | © 2025 VivekNegi
          </div>
          <div className="text-gray-400">
            Made with using React, Node.js & MongoDB
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
