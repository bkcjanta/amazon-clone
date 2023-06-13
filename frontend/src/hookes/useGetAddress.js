import { addressSuccess } from '../reducers/userSlice';
import { useDispatch } from 'react-redux';
import useAxios from './useAxios';

const useGetAddress = () => {
    const dispatch = useDispatch();
    const { axiosPrivate } = useAxios();
    const getAddress = async () => {
        try {
            const res = await axiosPrivate.get("/address");
            dispatch(addressSuccess(res.data.address));
        } catch (err) {
            console.log(err);
            alert("Something went wrong");
        }
    }
    return { getAddress };
}

export default useGetAddress
