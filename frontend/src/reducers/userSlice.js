import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    accessToken: localStorage.getItem("accessToken") || "",
    loading: false,
    error: false,
    isAuth: +(localStorage.getItem("isAuth")) || 0,
    userAddress: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginRequest: (state, action) => {
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("isAuth");
            state.user = {};
            state.accessToken = "";
            state.loading = true;
            state.error = false;
            state.isAuth = 0;
        },
        loginSuccess: (state, action) => {
            localStorage.setItem("user", JSON.stringify(action.payload));
            localStorage.setItem("accessToken", action.payload.accessToken);
            localStorage.setItem("isAuth", 1);
            state.user = action.payload;
            state.accessToken = action.payload.accessToken;
            state.isAuth = 1;
            state.loading = false;
            state.error = false;
        },
        loginFailure: (state, action) => {
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("isAuth");
            Cookies.remove("refreshToken");
            state.user = {};
            state.accessToken = "";
            state.loading = false;
            state.error = true;
            state.isAuth = 0;
            state.userAddress = [];
        },
        addressRequest: (state, action) => {
            state.userAddress = [];
        },
        addressSuccess: (state, action) => {
            state.userAddress = action.payload;
        },
        addressFailure: (state, action) => {
            state.userAddress = [];
        },

    }
})
export const { loginRequest, loginSuccess, loginFailure, addressFailure, addressRequest, addressSuccess } = userSlice.actions;

export default userSlice.reducer;

