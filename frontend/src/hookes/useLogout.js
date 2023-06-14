import { useDispatch } from 'react-redux'
import { cartFailure } from '../reducers/cartSlice';
import { loginFailure } from '../reducers/userSlice';
import { useNavigate } from 'react-router-dom';
import { axiosApi } from '../AxiosConfig';

const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOut = () => {
        axiosApi.get('/user/logout', { withCredentials: true }).then(res => {
            console.log(res)
            dispatch(loginFailure());
            dispatch(cartFailure());
            navigate('/');
        }).catch(err => {
            console.log(err);
        }
        )



    }

    return { logOut }
}

export default useLogout
