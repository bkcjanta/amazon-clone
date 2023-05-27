import axios from "axios";
export default axios.create({
    baseURL: "http://localhost:8080/",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});
export const api = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

