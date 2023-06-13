import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux'
import { cartFailure } from '../reducers/cartSlice';
import { loginFailure } from '../reducers/userSlice';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOut = () => {
        Cookies.remove("refreshToken");
        console.log("logout");
        dispatch(cartFailure());
        dispatch(loginFailure());
        return navigate("/user/login");
    }

    return { logOut }
}

export default useLogout
