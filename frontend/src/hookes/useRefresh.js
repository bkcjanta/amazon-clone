import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosApi } from '../AxiosConfig';
import { addressFailure, loginFailure, loginSuccess } from '../reducers/userSlice';
import { useNavigate } from 'react-router-dom';
import { cartFailure } from '../reducers/cartSlice';



const useRefresh = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getAccessToken = async () => {
        try {
            const res = await axiosApi.get(`/accesstoken/`, { withCredentials: true })
            dispatch(loginSuccess(res.data.user));;
            return res.data.user.accessToken;

        } catch (error) {
            dispatch(loginFailure());
            dispatch(addressFailure());
            dispatch(cartFailure());
            navigate("/user/login");
            return Promise.reject(error);
        }
    }
    return { getAccessToken };

}

export default useRefresh
