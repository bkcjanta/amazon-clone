import React, { useEffect } from 'react'
import logo from "../../logo.jpg"
import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, HStack, Heading, Image, Input, InputGroup, InputLeftElement, InputRightElement, Menu, MenuButton, MenuItem, MenuList, ModalOverlay, Select, Stack, Text, useDisclosure } from "@chakra-ui/react"
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons"
import "./navbar.css"
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai"
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHome, FaUserCircle } from "react-icons/fa"
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie'
import { loginFailure, loginRequest, loginSuccess } from '../../reducers/userSlice';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { productSuccess } from '../../reducers/productSlice'
import Cookies from 'js-cookie'
const Navbar = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['refreshToken'])
    const { isAuth, accessToken, user } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const searchRef = React.useRef()
    const [searchData, setSearchData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [seachQuery, setSearchQuery] = React.useState("")
    const handleLogout = () => {
        removeCookie('refreshToken');
        dispatch(loginFailure())
        navigate("/user/login")
    }
    const redirectToLogin = () => {
        removeCookie('refreshToken');
        dispatch(loginFailure())
        navigate("/user/login")
    }

    useEffect(() => {

        const delay = setTimeout(() => {
            if (seachQuery.length > 0) {
                fetchData()
            } else {
                setSearchData([])
            }
        }
            , 1000);
        return () => clearTimeout(delay)


    }, [seachQuery])


    const fetchData = async () => {

        try {
            console.log("api call")
            const res = await axios.get(`http://localhost:8080/products/search?sk=${seachQuery}`)
            const data = await res.data
            dispatch(productSuccess(data.data))
            setSearchData(data.data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)

    }

    const handleSearchQuery = (e) => {
        setSearchQuery(e.target.value);

    }


    const handleOvelay = (e) => {
        if (e.target.id === "overlay1") {
            setSearchData([])
        }
    }

    const searchBtn = () => {

        if (seachQuery.length > 0) {
            setLoading(true)
            Cookies.set('sk', seachQuery, { expires: 5 / (60 * 60 * 24) }); //setting cookies for 3 seconds
            setSearchData([])
            setTimeout(() => {
                navigate(`/products/search`)
                setLoading(false)
            }, 1000)
        }
    }

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            searchBtn()
        }
    }


    return (
        <Box position={"sticky"} top={0} zIndex={1}>
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
                            <Text fontSize={"sm"}>{isAuth ? `Hi ${user.name}` : "Sign in"}</Text>
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
                                <Box className='category-side' onClick={cookies.refreshToken ? handleLogout : redirectToLogin}><Text>Logout</Text></Box>
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
                        <Link to={"/"}> <Image cursor={"pointer"} w={['80px', "100px"]} src={logo} alt="Logo" /></Link>
                    </HStack>

                    {/* Search bar */}
                    <Box className="nav-search" w={['0px', '0px', "50%"]} display={["none", "none", "flex"]}>
                        <Box zIndex={100} w={"100%"} className="input-group" >
                            <Select display={{ "xs": "none" }} color={"black"} bg={"whiteAlpha.900"} _hover={{ bg: "whiteAlpha.700" }} w='20%' name="" id="" borderRadius={"0px"} placeholder="All" borderLeftRadius={"10px"}></Select>
                            <Input onKeyDown={(e) => handleEnter(e)} placeholder='Search Amazon' onChange={(e) => handleSearchQuery(e)} pl='10px' color={"black"} bg={"white"} w={"80%"} type="text" borderRadius={"0px"} variant='unstyled' border={"0px"} />
                            <Button isLoading={loading} onClick={searchBtn} borderRadius={"0px"} backgroundColor={"yellow.400"} _hover={{ bg: "yellow.500" }} borderRightRadius={"10px"} w='10%'><SearchIcon color={"black"} /></Button>
                        </Box>

                    </Box>
                    {/* Account and cart section */}
                    <HStack w={["50%", "50%", "30%"]} gap={"10%"} justifyContent="end">
                        <Menu>
                            <MenuButton border={"1px"} borderColor="black" _hover={{ borderColor: "white" }} >
                                <HStack p={"3px"} border={"1px"} borderColor="black" width={"-moz-fit-content"} >
                                    <Text fontSize={"sm"} display={["none", "block", "block"]} >{isAuth ? `Hi ${user.name}` : "Sign in"}</Text>
                                    <AiOutlineUser size={["20px"]} />
                                </HStack>
                            </MenuButton>
                            <MenuList boxShadow={"dark-lg"}>
                                <MenuItem>
                                    <Box w={"100%"}>
                                        <Box borderRadius={"5px"} color={"black"} cursor={"auto"} bg={"white"}  >
                                            <Box textAlign={"center"} mb="10px" display={isAuth ? "none" : "block"}>
                                                <Link to={"/user/login"}><Button bg={"yellow.400"} _hover={{ bg: "yellow.500" }} w={"100%"}>Sign in</Button></Link>
                                                <Text fontSize={"sm"}>New User ?<Link to="/user/signup"> Sign up</Link></Text>
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

                                                <Text className='account-hover' onClick={isAuth ? handleLogout : redirectToLogin}>Logout</Text>
                                            </Stack>
                                        </Box>
                                    </Box>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                        <HStack p={"3px"} border={"1px"} borderColor="black" _hover={{ borderColor: "white" }} className="nav-cart" textAlign="end" width={"-moz-fit-content"}>
                            <Text fontSize={"sm"} display={["none", "none", "block"]}>Cart</Text>
                            <AiOutlineShoppingCart size={["20px"]} />
                        </HStack>
                    </HStack>
                </HStack>
                {/* Mobile Navbar */}
                <Box className="mob-nav-search" w={"100%"} m="auto" mb="10px" display={["flext", "flex", "none"]} justifyContent='center' >
                    <Box w={"100%"} className="input-group" >
                        <Input zIndex={80} onChange={(e) => handleSearchQuery(e)} borderLeftRadius={"10px"} pl='10px' color={"black"} bg={"white"} w={"90%"} type="text" borderRadius={"0px"} variant='unstyled' border={"0px"} />
                        <Button zIndex={80} borderRadius={"0px"} backgroundColor={"yellow.400"} _hover={{ bg: "yellow.500" }} borderRightRadius={"10px"} w='10%'><SearchIcon color={"black"} /></Button>
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
            {searchData.length ? <Box id='overlay1' pos={"fixed"} h={"100vh"} w={"100%"}
                bottom={0}
                left={0}
                backgroundColor="rgba(0, 0, 0, 0.5)"
                zIndex={30}
                onClick={(e) => handleOvelay(e)}
                m={0}
            >

                <Box overflowY={"scroll"} color={"black"} position={"relative"} top={["95px", "100px", "50px"]} left={["10px", "20px", "260px"]} width={["90%", "90%", "40%"]} h={"300px"} bg={"white"} zIndex={50} >

                    {
                        searchData.length && searchData.map((item, index) => {
                            return (
                                <Link to={`/products/${item.category}/details/${item._id}`} key={index}>
                                    <HStack className="search-item" w={"100%"} p={"10px"} _hover={{ bg: "gray.200" }} >
                                        <Image w={"30px"} h={"30px"} src={item.image} />
                                        <Box textAlign={"left"}>
                                            <Heading>{item.category}</Heading>
                                            <Text fontSize={"sm"}>{item.title}</Text>
                                        </Box>
                                    </HStack>
                                </Link>
                            )
                        })
                    }

                </Box>
            </Box> : null}
        </Box>
    )
}

export default Navbar
