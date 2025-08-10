 
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HOME from "./Pages/Home";
import Learderboard from "./Pages/Leaderboard";
 
import Nav from "./components/Nav";
import SignUp from "./components/SignUp";
import Game from "./Pages/Game";

function App() {

  const [signModal, setsignModal] = useState(false); 
  const [start, setStart] =useState(false);
  


  return (
    <BrowserRouter>
      <Nav onSignUpClick={() => setsignModal(true)}/>
       { signModal && <SignUp onClose={() => setsignModal(false)} />}
      <Routes>
      
        <Route path="/" element={<HOME />} />
       
        <Route path="/leaderboard" element={<Learderboard />} />
       
        <Route path="/game" element={<Game/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
