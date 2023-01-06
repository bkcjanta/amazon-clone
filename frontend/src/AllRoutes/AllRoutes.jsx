import React from 'react'
import {Routes,Route} from "react-router-dom"
import { Products } from '../components/products/Products'
import { Details } from '../components/products/Details'
export const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/products/mobiles' element={<Products path={"mobiles"}/>} />
        <Route path='/products/mens' element={<Products path={"mens"}/>} />
        <Route path='/products/womens' element={<Products path={"womens"}/>} />
        <Route path='/products/kids' element={<Products path={"kids"}/>} />
        <Route path='/products/beauty' element={<Products path={"beauty"}/>} />
        <Route path='/products/books' element={<Products path={"books"}/>} />
        <Route path='/products/electronics' element={<Products path={"electronics"}/>} />
        <Route path='/products/health&fitness' element={<Products path={"helth&fitness"}/>} />
        <Route path='/products/home&kitchen' element={<Products path={"home&kitchen"}/>} />
        <Route path='/products/:path/details/:_id' element={<Details/>} />
    </Routes>
  )
}
