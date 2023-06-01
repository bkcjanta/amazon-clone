import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import productReducer from './reducers/productSlice';
import cartReducer from './reducers/cartSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        products: productReducer,
        cart: cartReducer
    }

});

