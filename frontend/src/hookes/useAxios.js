
import { useEffect } from "react";
import useRefresh from "./useRefresh";
import { useSelector } from "react-redux";
import { axiosPrivate } from "../AxiosConfig";

const useAxios = () => {
    const { getAccessToken } = useRefresh();
    const { user, isAuth } = useSelector(state => state.user);
    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${user?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await getAccessToken();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [getAccessToken, isAuth, user?.accessToken])

    return { axiosPrivate };
}

export default useAxios;