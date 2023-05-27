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



function App() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const dispatch = useDispatch();
  useEffect(() => {
    if (cookies.refreshToken) {
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
    } else {
      dispatch(loginFailure())
    }

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
        <div>
          <Navbar />
          <AllRoutes />

          {/* <Footer /> */}
        </div> :
        <Loading />

      }

    </div>
  );
}

export default App;
