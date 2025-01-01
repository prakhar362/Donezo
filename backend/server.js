const express = require("express");
require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");


const app = express();
// Middleware to parse JSON requests
app.use(express.json());

// Attach routers to their respective base routes
//app.use("/api/v1/user", userRouter);

const port =  process.env.PORT || 4000; // Define the port number
async function main()
{
    try{
        //using dotenv
    const mongourl=process.env.MONGO_URL;
    await mongoose.connect(mongourl);
    // Start the server
    console.log("conneted to MongoDb Server")
 app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
    }
    catch(error)
    {
        console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process if the DB connection fails
    }
    
}
main();