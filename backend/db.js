const mongoose = require("mongoose");
require('dotenv').config();
const mongourl=process.env.MONGO_URL;
mongoose.connect(mongourl);

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, minlength: 3 },
    userEmail: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
  });
const userModel = mongoose.model("User", userSchema);

module.exports = {
  userModel,
};