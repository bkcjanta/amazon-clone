import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    loading: false,

};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        cartRequest: (state, action) => {
            state.loading = true;
            state.cartItems = [];
        }
        ,
        cartSuccess: (state, action) => {
            state.cartItems = action.payload;
            state.loading = false;

        }

        ,
        cartFailure: (state, action) => {
            state.loading = false;
            state.cartItems = [];
        }

    }
})
export const { cartRequest, cartSuccess, cartFailure } = cartSlice.actions;

export default cartSlice.reducer;