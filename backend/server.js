const express = require("express");
require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");
const { userRouter } = require("./routes/user"); // Import userRouter from routes
const cors = require('cors');

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// CORS options for development (adjust as necessary for production)
const corsOptions = {
    origin: process.env.CLIENT_URL || "http://localhost:5173", // Ensure this works for your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Attach routers to their respective base routes
app.use("/api/v1/user", userRouter);

// General error handler (catches any unhandled errors)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Define the port number
const port = process.env.PORT || 4000;

// MongoDB connection function
async function main() {
    try {
        // Validate environment variables
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL is not defined in the environment variables");
        }
        
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB server");

        // Start the server
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit the process if the DB connection fails
    }
}

// Call the main function to initialize the server and database connection
main();
