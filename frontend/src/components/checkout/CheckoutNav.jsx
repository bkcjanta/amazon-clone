import { LockIcon } from '@chakra-ui/icons'
import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import logo2 from '../../assets/logo2.png'
import { Link } from 'react-router-dom'

const CheckoutNav = () => {
    return (
        <Box px={[2, 3, 5]}>
            <Box borderBottom={"1px"} borderColor={"gray.300"} display={"flex"} bg={"whitesmoke"} boxShadow={"md"} flexDirection={"row"} w={"100%"} p={"20px"} justifyContent={"space-between"}>
                <Link to={"/"}><Image w={["100px", "130px", "150px"]} src={logo2} alt="logo" /></Link>
                <Text fontSize={["20px", "25px", "30px"]} fontWeight={"semibold"} >Checkout</Text>
                <LockIcon color="gray.500" w={[5, 6, 8]} h={[5, 6, 8]} />
            </Box>
        </Box>
    )
}

export default CheckoutNav
