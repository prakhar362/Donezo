//to avoid backtracking and circular dependencies from passing
//secret token jwt for both the user and admin from routes dir to middlwares files 
require('dotenv').config();
const JWT_SECRET=process.env.JWT_SECRET;

module.exports={

    JWT_SECRET
};