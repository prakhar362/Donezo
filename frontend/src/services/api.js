import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });

export const signIn = (data) => API.post("/api/v1/user/signin", data);
export const signUp = (data) => API.post("/api/v1/user/signup", data);
