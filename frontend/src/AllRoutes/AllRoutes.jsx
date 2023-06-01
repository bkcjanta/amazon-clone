import React from 'react'
import { Routes, Route } from "react-router-dom"
import { Products } from '../components/products/Products'
import { Details } from '../components/products/Details'
import { Login } from '../components/login/Login'
import { Signup } from '../components/login/Signup'
import ProtectRoute from "./ProtectRoute"
import { useSelector } from 'react-redux'
import PageNotFound from '../components/PageNotFound'
import Home from '../components/Home/Home'
import { PasswordForget } from '../components/login/PasswordFroget'
import Cart from '../components/products/Cart'

export const AllRoutes = () => {
  const { isAuth } = useSelector(state => state.user);
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/cart' element={<ProtectRoute><Cart /></ProtectRoute>} />
      <Route path='/products/mobiles' element={<ProtectRoute><Products path={"mobiles"} /></ProtectRoute>} />
      <Route path='/products/mens' element={<ProtectRoute><Products path={"mens"} /></ProtectRoute>} />
      <Route path='/products/womens' element={<Products path={"womens"} />} />
      <Route path='/products/kids' element={<Products path={"kids"} />} />
      <Route path='/products/beauty' element={<Products path={"beauty"} />} />
      <Route path='/products/books' element={<Products path={"books"} />} />
      <Route path='/products/electronics' element={<Products path={"electronics"} />} />
      <Route path='/products/helth&fitness' element={<Products path={"helth&fitness"} />} />
      <Route path='/products/home&kitchen' element={<ProtectRoute><Products path={"home&kitchen"} /></ProtectRoute>} />
      <Route path='/products/search' element={<Products path={"helth&fitness"} />} />
      <Route path='/products/:path/details/:_id' element={<Details />} />
      <Route path='/user/login' element={<Login />} />
      <Route path='/user/signup' element={<Signup />} />
      <Route path='/user/password/forget' element={<PasswordForget />} />

      <Route path='*' element={<PageNotFound />} />
    </Routes>
  )
}
