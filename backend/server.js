const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Initialize app
const app = express();
dotenv.config(); 

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); 

// Test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Port setup
const PORT = process.env.PORT || 5000; 

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
