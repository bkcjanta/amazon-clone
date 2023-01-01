import React from 'react'
import logo from "../logo.jpg"
import { Box, Button, Divider, HStack, Heading, Image, Input, InputGroup, InputLeftElement, InputRightElement, Link, LinkBox, Select, Stack, Text } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import "./navbar.css"
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai"
const Navbar = () => {

    return (
        <Box>
            <Box id='navbar' px={["0.5rem", "1rem", "2rem"]} py={["0.5rem"]}>
                <HStack justifyContent={"space-between"} w="100%" color="white" alignItems={"center"}>
                    <Box w={["50%", "50%", "20%"]} className="nav-logo" >
                        <Image w={['80px', "100px"]} src={logo} alt="Logo" />
                    </Box>
                    <Box className="nav-search" w={['0px', '0px', "50%"]} display={["none", "none", "flex"]}>
                        <Box w={"100%"} className="input-group" >
                            <Select display={{ "xs": "none" }} color={"black"} bg={"whiteAlpha.900"} _hover={{ bg: "whiteAlpha.700" }} w='20%' name="" id="" borderRadius={"0px"} placeholder="All" borderLeftRadius={"10px"}></Select>
                            <Input pl='10px' color={"black"} bg={"white"} w={"80%"} type="text" borderRadius={"0px"} variant='unstyled' border={"0px"} />
                            <Button borderRadius={"0px"} backgroundColor={"yellow.400"} _hover={{ bg: "yellow.500" }} borderRightRadius={"10px"} w='10%'><SearchIcon color={"black"} /></Button>
                        </Box>
                    </Box>
                    <HStack w={["50%", "50%", "30%"]} gap={"10%"} justifyContent="end">

                        <HStack border={"1px"} borderColor="black" className="nav-account test1" width={"-moz-fit-content"} >
                            <Text fontSize={"sm"} display={["none", "block", "block"]} >Hello, Sign in</Text>
                            <AiOutlineUser size={["40px"]} />
                        </HStack>
                        <Box className="test2">
                            <Box className='test1' w={["200px", "250px", "300px"]} h="300px" p={"1rem"} border="1px" color={"black"} cursor={"auto"} borderColor={"black"} pos="absolute" right={["10px", "30px", "40px"]} top={"20px"} bg={"white"}  >
                                <Box textAlign={"center"} mb="10px">
                                    <Button bg={"yellow.400"} _hover={{ bg: "yellow.500" }} w={"100%"}>Sign in</Button>
                                    <Text fontSize={"sm"}>New User ?<Link color={"blue"} to="/#"> Sign up</Link></Text>
                                </Box>
                                <Stack spacing={1} justifyContent="flex-start" >
                                    <Divider />
                                    <Heading size="sm">Your Account</Heading>
                                    <Divider />
                                    <Text className='account-hover'>Account</Text>
                                    <Divider />

                                    <Text className='account-hover'>Order</Text>
                                    <Divider />

                                    <Text className='account-hover'>Address</Text>
                                    <Divider />

                                    <Text className='account-hover'>Logout</Text>
                                </Stack>
                            </Box>
                        </Box>


                        <HStack border={"1px"} borderColor="black" _hover={{ borderColor: "white" }} className="nav-cart" textAlign="end" width={"-moz-fit-content"}>
                            <Text fontSize={"sm"} display={["none", "none", "block"]}>Cart</Text>
                            <AiOutlineShoppingCart size={["40px"]} />
                        </HStack>
                    </HStack>
                </HStack>

                <Box className="mob-nav-search" w={"100%"} m="auto" display={["flext", "flex", "none"]} justifyContent='center' >
                    <Box w={"100%"} className="input-group" >
                        <Input borderLeftRadius={"10px"} pl='10px' color={"black"} bg={"white"} w={"90%"} type="text" borderRadius={"0px"} variant='unstyled' border={"0px"} />
                        <Button borderRadius={"0px"} backgroundColor={"yellow.400"} _hover={{ bg: "yellow.500" }} borderRightRadius={"10px"} w='10%'><SearchIcon color={"black"} /></Button>
                    </Box>
                </Box>

            </Box>
        </Box >
    )
}

export default Navbar
