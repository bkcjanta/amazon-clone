import React, { useEffect } from 'react'
import { api } from './AxiosConfig'
import axios from './AxiosConfig'
import { useDispatch, useSelector } from 'react-redux'
import { loginFailure, loginSuccess } from './reducers/userSlice'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
const useAxios = () => {
    const dispatch = useDispatch()
    const { isAuth, accessToken } = useSelector(state => state.user);
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate()

    api.interceptors.request.use((config) => {
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    }, (error) => {
        // console.log(error)
        // if (error.response.status === 401) {
        //     dispatch(loginFailure())
        //     console.log("401")
        // }

        return Promise.reject(error);
    });

    api.interceptors.response.use((response) => {
        return response;

    }, async (error) => {
        let originalRequest = error.config;
        // console.log(error)
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                if (cookies.refreshToken) {
                    const res = await axios.get(`/accesstoken/`, { withCredentials: true })
                    dispatch(loginSuccess(res.data.user))
                    originalRequest.headers["Authorization"] = `Bearer ${res.data.accessToken}`;

                } else {
                    dispatch(loginFailure());
                    navigate("/user/login");
                }
                return api(originalRequest);

            } catch (error) {
                dispatch(loginFailure());
                // console.log(error);
                removeCookie("refreshToken");
                navigate("/user/login");
            }
        }
        return Promise.reject(error);
    }
    );


    return api
}

export default useAxios
