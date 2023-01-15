import React from 'react'
import "./style.css"
import logo from "./logo.png"
import { Image, Stack } from '@chakra-ui/react'
export const Login = () => {
  return (
   <Stack Stack>
    <Image m={"auto"} w='130px' src={logo}/> 
   </Stack>
  )
}
