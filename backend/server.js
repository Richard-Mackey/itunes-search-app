// backend server code to allow connnection to and search of the API
require("dotenv").config();
const CORS = require("cors"); // CORS allows frontend website access to API
const express = require("express"); // Create express
const jwt = require("jsonwebtoken");
const { jwtMiddleware } = require("./middleware/middleware_auth"); // connection to JWT middleware
const app = express(); // Create app in express
const axios = require("axios"); // import axios to make HTTP requests to API's

app.use(express.json());
app.use(
  CORS({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:3000",
      "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
); // allows react frontend to react with backend (on different port)

//routes for searching API
const connectAPI = (req, res) => {
  res.send("connected");
};
app.get("/", connectAPI);

const searchAPI = async (req, res) => {
  try {
    // Build the URL with optional entity parameter
    let itunesURL = `https://itunes.apple.com/search?term=${req.query.term}`;

    // Only add entity parameter if it's provided and not empty
    if (req.query.entity && req.query.entity !== "undefined") {
      itunesURL += `&entity=${req.query.entity}`;
    }
    // connection to external API, with error catching
    const response = await axios.get(itunesURL);
    res.send(response.data);
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred whilst connecting to iTunes" });
  }
};

app.post("/api/auth/token", (req, res) => {
  try {
    // Generate a token (expires in 1 hour for security)
    const token = jwt.sign(
      { app: "itunes-search-app" }, // payload - identifies the app
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // token expires in 1 hour
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error generating token" });
  }
});
// a get request to search the API
app.get("/search", jwtMiddleware, searchAPI);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
