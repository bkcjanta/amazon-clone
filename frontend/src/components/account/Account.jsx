import { useToast, Box, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import security from '../../assets/security.png'
import address from '../../assets/address.png'
import payment from '../../assets/payment.png'
import order from '../../assets/order.png'
import amazonpay from '../../assets/amazonpay.png'
import prime from '../../assets/prime.png'
import { Link } from 'react-router-dom'

const Account = () => {

    const toast = useToast();

    const notify = () => {
        toast({
            title: "Coming Soon",
            description: "This feature is not available yet",
            status: "info",
            duration: 3000,
            isClosable: true,
            position: "top"
        })
    }


    return (
        <Box w={"100%"} p={[2, 5, 10]} >
            <Heading >Your Account</Heading>

            <SimpleGrid columns={[1, 2, 3]} row={"auto"} spacing={[2, 4, 6]} mt={6} >
                <Link to={"/user/account/profile"}>
                    <Box _hover={{ cursor: "pointer", bg: "gray.300" }} display={"flex"} gap={"10px"} border={"1px"} borderRadius={"5px"} borderColor={"gray"} p={[1, 2, 3]}>
                        <Image w={"80px"} h={"60px"} src={security} />
                        <Box>
                            <Heading fontSize={"2xl"}>Account</Heading>
                            <Text>Change your password, update login information, and secure your account.</Text>
                        </Box>
                    </Box>
                </Link>

                <Link to={"/user/orders"}>
                    <Box _hover={{ cursor: "pointer", bg: "gray.300" }} display={"flex"} gap={"10px"} border={"1px"} borderRadius={"5px"} borderColor={"gray"} p={[1, 2, 3]}>
                        <Image w={"80px"} h={"60px"} src={order} />
                        <Box>
                            <Heading fontSize={"2xl"}>Orders</Heading>
                            <Text>Track, return, or buy things again</Text>

                        </Box>

                    </Box>
                </Link>

                <Box onClick={notify} _hover={{ cursor: "pointer", bg: "gray.300" }} display={"flex"} gap={"10px"} border={"1px"} borderRadius={"5px"} borderColor={"gray"} p={[1, 2, 3]}>
                    <Image w={"80px"} h={"60px"} src={prime} />
                    <Box>
                        <Heading fontSize={"2xl"}>Prime</Heading>
                        <Text>View benefits and payment settings</Text>
                    </Box>
                </Box>
                <Link to={"/user/account/address"}>
                    <Box _hover={{ cursor: "pointer", bg: "gray.300" }} display={"flex"} gap={"10px"} border={"1px"} borderRadius={"5px"} borderColor={"gray"} p={[1, 2, 3]}>
                        <Image w={"80px"} h={"60px"} src={address} />
                        <Box>
                            <Heading fontSize={"2xl"}>Address</Heading>
                            <Text>Edit addresses for orders and gifts</Text>
                        </Box>
                    </Box>
                </Link>

                <Box onClick={notify} _hover={{ cursor: "pointer", bg: "gray.300" }} display={"flex"} gap={"10px"} border={"1px"} borderRadius={"5px"} borderColor={"gray"} p={[1, 2, 3]}>
                    <Image w={"80px"} h={"60px"} src={amazonpay} />
                    <Box>
                        <Heading fontSize={"2xl"}>Amazon Pay</Heading>
                        <Text>View Amazon Pay balance</Text>
                    </Box>
                </Box>

                <Box onClick={notify} _hover={{ cursor: "pointer", bg: "gray.300" }} display={"flex"} gap={"10px"} border={"1px"} borderRadius={"5px"} borderColor={"gray"} p={[1, 2, 3]}>
                    <Image w={"80px"} h={"60px"} src={payment} />
                    <Box>
                        <Heading fontSize={"2xl"}>Payment options</Heading>
                        <Text>Edit or add payment methods</Text>
                    </Box>
                </Box>

            </SimpleGrid>

        </Box>
    )
}

export default Account
