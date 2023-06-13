import { useDispatch } from 'react-redux';
import useAxios from './useAxios';
import { cartSuccess } from '../reducers/cartSlice';

const useGetCartData = () => {
    const dispatch = useDispatch();
    const { axiosPrivate } = useAxios();
    const getCartData = async () => {
        try {
            const res = await axiosPrivate.get(`/cart/`, { withCredentials: true });
            dispatch(cartSuccess(res.data.data));
        } catch (error) {
            console.log(error);
        }
    }
    return { getCartData };

}

export default useGetCartData
