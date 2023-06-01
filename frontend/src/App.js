import { AllRoutes } from './AllRoutes/AllRoutes';
import './App.css';
import Navbar from './components/navbar/Navbar';
import React, { useEffect } from 'react';
import Loading from './components/Loading';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginFailure, loginRequest, loginSuccess } from './reducers/userSlice';
import Footer from './components/Footer/Footer';
import { Box } from '@chakra-ui/react';
import { cartFailure, cartSuccess } from './reducers/cartSlice';
import { api } from './AxiosConfig';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';



function App() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {


    if (!Cookies.get("refreshToken")) {
      dispatch(loginFailure());
      return navigate("/user/login")
    }
    dispatch(loginRequest())
    axios.get(`/accesstoken/`, {
      withCredentials: true

    })
      .then((res) => {
        console.log(res)
        dispatch(loginSuccess(res.data.user))
      })
      .catch((err) => {
        dispatch(loginFailure())
        console.log(err)
      }
      )


    api.get("/cart").then((res) => {
      console.log(res.data);
      dispatch(cartSuccess(res.data.data));
    }).catch((err) => {
      dispatch(cartFailure())
      console.log(err);
    })



  }, [])
  const [show, setShow] = React.useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 3000);
  }, []);
  return (
    <div className="App">
      {show ?
        <Box >
          <Navbar />
          <AllRoutes />

          {/* <Footer /> */}
        </Box> :
        <Loading />

      }

    </div>
  );
}

export default App;
