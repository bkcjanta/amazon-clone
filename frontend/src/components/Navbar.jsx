import React from 'react'
import logo from "../logo.jpg"
import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, HStack, Heading, Image, Input, InputGroup, InputLeftElement, InputRightElement, Select, Stack, Text, useDisclosure } from "@chakra-ui/react"
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons"
import "./navbar.css"
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai"
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHome, FaUserCircle } from "react-icons/fa"
import { Link } from 'react-router-dom'
const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()


    return (
        <Box position={"sticky"} top={0} zIndex={4}>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}

            >
                <DrawerOverlay />
                <DrawerContent >
                    <DrawerCloseButton color={"white"} />
                    <DrawerHeader color={"white"} bg={"rgb(35,47,62)"} p={"20px"}>
                        <HStack>
                            <FaUserCircle size={["30px"]} />
                            <Text fontSize={"sm"}>Hello,Sign in</Text>
                        </HStack>
                    </DrawerHeader>

                    <DrawerBody>
                        <Stack spacing={1}>
                            <Divider h={"4px"} />
                            <HStack py={3} justifyContent={"space-between"}>
                                <Heading fontSize={"lg"}>Amazon Home</Heading>
                                <FaHome size={"30px"} />
                            </HStack>
                            <Divider h={"4px"} />
                            <Box>
                                <Heading pt={3} fontSize={"lg"}>Categories</Heading>
                                <Link to="/products/electronics"><Box className='category-side'><Text>Electronics</Text></Box></Link>
                                <Link to="/products/home&kitchen"> <Box className='category-side'><Text>Home & Kitchens</Text></Box></Link>
                                <Link to="/products/mobiles"><Box className='category-side'><Text>Mobiles</Text></Box></Link>
                                <Link to="/products/mens"> <Box className='category-side'><Text>Men's Fashion</Text></Box></Link>
                                <Link to="/products/womens"><Box className='category-side'><Text>Women's Fashion</Text></Box></Link>
                                <Link to="/products/kids"><Box className='category-side'><Text>Kid's Fashion</Text></Box></Link>
                                <Link to="/products/beauty"><Box className='category-side'><Text>Beauty</Text></Box></Link>
                                <Link to="/products/health&fitness"><Box className='category-side'><Text>Health & Fitness</Text></Box></Link>
                                <Link to="/products/books"><Box className='category-side'><Text>Books</Text></Box></Link>
                            </Box>
                            <Divider h={"4px"} />
                            <Box>
                                <Heading fontSize={"lg"}>Trending</Heading>
                                <Box className='category-side'><Text>Best Seller</Text></Box>
                                <Box className='category-side'><Text>High Rating</Text></Box>
                                <Box className='category-side'><Text>New Release</Text></Box>
                            </Box>
                            <Divider h={"4px"} />
                            <Box>
                                <Heading fontSize={"lg"}>Setting</Heading>
                                <Box className='category-side'><Text>Account</Text></Box>
                                <Box className='category-side'><Text>High Rating</Text></Box>
                                <Box className='category-side'><Text>Logout</Text></Box>
                            </Box>
                            <Divider h={"4px"} />
                        </Stack>

                    </DrawerBody>

                </DrawerContent>
            </Drawer>
            <Box id='navbar' px={["0.5rem", "1rem", "2rem"]}  >
                <HStack justifyContent={"space-between"} w="100%" color="white" alignItems={"center"}>
                    <HStack w={["50%", "50%", "20%"]} className="nav-logo" >
                        <Box onClick={onOpen} mt="0px" display={["block", "block", "none", "none"]}><GiHamburgerMenu size={"30px"} /></Box>
                        <Image cursor={"pointer"} w={['80px', "100px"]} src={logo} alt="Logo" />
                    </HStack>
                    <Box className="nav-search" w={['0px', '0px', "50%"]} display={["none", "none", "flex"]}>
                        <Box w={"100%"} className="input-group" >
                            <Select display={{ "xs": "none" }} color={"black"} bg={"whiteAlpha.900"} _hover={{ bg: "whiteAlpha.700" }} w='20%' name="" id="" borderRadius={"0px"} placeholder="All" borderLeftRadius={"10px"}></Select>
                            <Input pl='10px' color={"black"} bg={"white"} w={"80%"} type="text" borderRadius={"0px"} variant='unstyled' border={"0px"} />
                            <Button borderRadius={"0px"} backgroundColor={"yellow.400"} _hover={{ bg: "yellow.500" }} borderRightRadius={"10px"} w='10%'><SearchIcon color={"black"} /></Button>
                        </Box>
                    </Box>
                    <HStack w={["50%", "50%", "30%"]} gap={"10%"} justifyContent="end">

                        <HStack p={"3px"} border={"1px"} borderColor="black" className="nav-account test1" width={"-moz-fit-content"} >
                            <Text fontSize={"sm"} display={["none", "block", "block"]} >Hello, Sign in</Text>
                            <AiOutlineUser size={["40px"]} />
                        </HStack>
                        <Box className="test2">
                            <Box className='test1' w={["200px", "250px", "300px"]} h="300px" p={"1rem"} border="1px" color={"black"} cursor={"auto"} borderColor={"black"} pos="absolute" right={["10px", "30px", "40px"]} top={"20px"} bg={"white"}  >
                                <Box textAlign={"center"} mb="10px">
                                    <Button bg={"yellow.400"} _hover={{ bg: "yellow.500" }} w={"100%"}>Sign in</Button>
                                    <Text fontSize={"sm"}>New User ?<Link to="/#"> Sign up</Link></Text>
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
                        <HStack p={"3px"} border={"1px"} borderColor="black" _hover={{ borderColor: "white" }} className="nav-cart" textAlign="end" width={"-moz-fit-content"}>
                            <Text fontSize={"sm"} display={["none", "none", "block"]}>Cart</Text>
                            <AiOutlineShoppingCart size={["40px"]} />
                        </HStack>
                    </HStack>
                </HStack>

                <Box className="mob-nav-search" w={"100%"} m="auto" mb="10px" display={["flext", "flex", "none"]} justifyContent='center' >
                    <Box w={"100%"} className="input-group" >
                        <Input borderLeftRadius={"10px"} pl='10px' color={"black"} bg={"white"} w={"90%"} type="text" borderRadius={"0px"} variant='unstyled' border={"0px"} />
                        <Button borderRadius={"0px"} backgroundColor={"yellow.400"} _hover={{ bg: "yellow.500" }} borderRightRadius={"10px"} w='10%'><SearchIcon color={"black"} /></Button>
                    </Box>
                </Box>

            </Box>
            <Box display={["none", "none", "block"]} className='category' color={"white"} bg={"rgb(35,47,62)"} p={"5px"} alignItems='center'>
                <HStack justifyContent={"space-between"}  >
                    <HStack className='category-hover' onClick={onOpen}>
                        <HamburgerIcon />
                        <Text>All</Text>
                    </HStack>
                    <Link to="/products/electronics"><Box className='category-hover'><Text>Electronics</Text></Box></Link>
                    <Link to="/products/home&kitchen"> <Box className='category-hover'><Text>Home & Kitchens</Text></Box></Link>
                    <Link to="/products/mobiles"><Box className='category-hover'><Text>Mobiles</Text></Box></Link>
                    <Link to="/products/mens"> <Box className='category-hover'><Text>Men's Fashion</Text></Box></Link>
                    <Link to="/products/womens"><Box className='category-hover'><Text>Women's Fashion</Text></Box></Link>
                    <Link to="/products/kids"><Box className='category-hover'><Text>Kid's Fashion</Text></Box></Link>
                    <Link to="/products/beauty"><Box className='category-hover'><Text>Beauty</Text></Box></Link>
                    <Link to="/products/health&fitness"><Box className='category-hover'><Text>Health & Fitness</Text></Box></Link>
                    <Link to="/products/books"><Box className='category-hover'><Text>Books</Text></Box></Link>
                </HStack>
            </Box>
        </Box >
    )
}

export default Navbar
