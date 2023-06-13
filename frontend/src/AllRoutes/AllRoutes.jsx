import React from 'react'
import { Routes, Route } from "react-router-dom"
import { Products } from '../components/products/Products'
import { Details } from '../components/products/Details'
import { Login } from '../components/login/Login'
import { Signup } from '../components/login/Signup'
import ProtectRoute from "./ProtectRoute"
import PageNotFound from '../components/PageNotFound'
import Home from '../components/Home/Home'
import { PasswordForget } from '../components/login/PasswordFroget'
import Cart from '../components/products/Cart'
import Checkout from '../components/checkout/Checkout'
import Order from '../components/order/Order'
import Account from '../components/account/Account'
import Address from '../components/account/Address'
import Profile from '../components/account/Profile'


export const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/products/mobiles' element={<Products path={"mobiles"} />} />
      <Route path='/products/mens' element={<Products path={"mens"} />} />
      <Route path='/products/womens' element={<Products path={"womens"} />} />
      <Route path='/products/kids' element={<Products path={"kids"} />} />
      <Route path='/products/beauty' element={<Products path={"beauty"} />} />
      <Route path='/products/books' element={<Products path={"books"} />} />
      <Route path='/products/electronics' element={<Products path={"electronics"} />} />
      <Route path='/products/helth&fitness' element={<Products path={"helth&fitness"} />} />
      <Route path='/products/home&kitchen' element={<Products path={"home&kitchen"} />} />
      <Route path='/products/search' element={<Products path={"helth&fitness"} />} />
      <Route path='/products/:path/details/:_id' element={<Details />} />
      <Route path='/user/login' element={<Login />} />
      <Route path='/user/signup' element={<Signup />} />
      <Route path='/user/password/forget' element={<PasswordForget />} />
      <Route path='/cart' element={<ProtectRoute><Cart /></ProtectRoute>} />
      <Route path='/user/checkout' element={<ProtectRoute><Checkout /></ProtectRoute>} />
      <Route path='/user/orders' element={<ProtectRoute><Order /></ProtectRoute>} />
      <Route path='/user/account' element={<ProtectRoute><Account /></ProtectRoute>} />
      <Route path='/user/account/address' element={<ProtectRoute><Address /></ProtectRoute>} />
      <Route path='/user/account/profile' element={<ProtectRoute><Profile /></ProtectRoute>} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  )
}
