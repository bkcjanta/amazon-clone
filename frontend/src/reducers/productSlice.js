import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    products: [],
    loading: false,
    error: false,
    success: false
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        productRequest: (state, action) => {
            state.loading = true;
            state.error = false;
            state.success = false;
            state.products = [];
        }
        ,
        productSuccess: (state, action) => {
            state.products = action.payload;
            state.loading = false;
            state.error = false;
        },
        productFailure: (state, action) => {
            state.loading = false;
            state.error = true;
            state.success = false;
            state.products = [];
        },
    }
})

export const { productRequest, productSuccess, productFailure } = productSlice.actions;

export default productSlice.reducer;