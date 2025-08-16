import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [topPlayers, setTopPlayers] = useState([]);
useEffect(() => {  const fetchTopPlayers = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/leaderboard`);
        setTopPlayers(res.data.slice(0, 3)); // only top 3
      } catch (error) {
        console.error("Failed to fetch top players:", error);
      }
    };

    fetchTopPlayers();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, topPlayers, setTopPlayers }}>
      {children}
    </UserContext.Provider>
  );
};
