import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ProtectRoute = ({ children }) => {
  const navigate = useNavigate()
  const { isAuth } = useSelector(state => state.user);
  useEffect(() => {
    if (!isAuth) {
      return navigate("/user/login")
    }
  }, [])
  return (
    <>{isAuth ? children : <></>}</>
  )
}

export default ProtectRoute
