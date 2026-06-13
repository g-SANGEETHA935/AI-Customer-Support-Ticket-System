import axios from "axios";

const API = axios.create({
 baseURL: "https://ai-ticket-system-backend.onrender.com/api/",
});

export default API;