import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import productReducer from './reducers/productSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        products: productReducer
    }

});

