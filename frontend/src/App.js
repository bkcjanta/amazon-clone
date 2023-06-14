import { AllRoutes } from './AllRoutes/AllRoutes';
import './App.css';
import Navbar from './components/navbar/Navbar';
import React, { useEffect } from 'react';
import Loading from './components/Loading';
import { useDispatch } from 'react-redux';

import { loginFailure, loginSuccess } from './reducers/userSlice';
import { Box } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import useLogout from './hookes/useLogout';
import { useLocation } from 'react-router-dom';
import CheckoutNav from './components/checkout/CheckoutNav';
import useGetCartData from './hookes/useGetCartData';
import { axiosApi } from './AxiosConfig';


function App() {
  const dispatch = useDispatch();
  const { getCartData } = useGetCartData();
  const location = useLocation();
  const checkout = location.pathname.includes("checkout");
  const [show, setShow] = React.useState(false);
  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const res = await axiosApi.get(`/accesstoken/`, { withCredentials: true })

        await getCartData();
        dispatch(loginSuccess(res.data.user));
      } catch (error) {
        dispatch(loginFailure());
        console.log(error);
      }
    }
    getAccessToken();
    setTimeout(() => {
      setShow(true);
    }, 3000);
  }, []);
  return (
    <div className="App">
      {show ?
        <Box >
          {
            checkout ? <CheckoutNav /> : <Navbar />
          }
          <AllRoutes />
        </Box> :
        <Loading />

      }

    </div>
  );
}

export default App;
