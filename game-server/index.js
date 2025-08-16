const express = require("express");
const cors = require("cors");
const countriesRoute = require("./routes/countries");
const path = require("path");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const ScoreRoutes = require("./routes/score");
const Leaderboard = require("./routes/leaderboard");
const Feedbacks = require("./routes/feedback.js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(
  "/outlines",
  express.static(path.join(__dirname, "public/outlines/all"))
);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => console.log(err));

  app.get("/", (req, res) => {
  res.send("Server is live 🚀");
});

app.use("/auth", authRoutes);
app.use("/countries", countriesRoute);

app.use("/score", ScoreRoutes);
app.use("/leaderboard", Leaderboard);
app.use("/feedback", Feedbacks);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
