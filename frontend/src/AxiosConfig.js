import axios from "axios";
import Dispatcher from "./utils";
import { loginFailure, loginSuccess } from "./reducers/userSlice";
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

api.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken)
    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
}
    , (error) => {

        return Promise.reject(error);
    }
);


api.interceptors.response.use((response) => {
    return response;

}
    , async (error) => {


        let originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await axios.get(`/accesstoken/`, { withCredentials: true })
                localStorage.setItem("accessToken", res.data.user.accessToken);
                originalRequest.headers["Authorization"] = `Bearer ${res.data.user.accessToken}`;

                return api(originalRequest);

            } catch (error) {
                localStorage.removeItem("user");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("isAuth");
                return Promise.reject(error);


            }
        }
        return Promise.reject(error);
    }
);


