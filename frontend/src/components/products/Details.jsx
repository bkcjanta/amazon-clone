import { useToast, Badge, Box, Button, Divider, HStack, Heading, Image, Select, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from "react-router-dom"
import ReactStarsRating from 'react-awesome-stars-rating';
import "./products.css"
import { HiLockClosed, HiOutlineLocationMarker } from "react-icons/hi"
import { CiPercent } from "react-icons/ci"
import ProductCard from './ProductCard';
import Carousel from 'better-react-carousel'
import Footer from '../Footer/Footer';
import Loading from '../Loading';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginFailure } from '../../reducers/userSlice';
import success from '../../assets/success.gif'
import { cartFailure } from '../../reducers/cartSlice';
import Navbar from '../navbar/Navbar';
import done from "../../assets/done.gif"
import useGetCartData from '../../hookes/useGetCartData';
import useAxios from '../../hookes/useAxios';
import { axiosApi } from '../../AxiosConfig';



export const Details = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let date = new Date();
    date.setDate(date.getDate() + 4)
    const offers = [
        { tag: "Bank Offer", des: "Upto ₹1,000.00 discount on SBI Credit Cards", no: 3 },
        { tag: "No Cost EMI", des: "Avail No Cost EMI on select cards for orders above ₹3000", no: 1 },
        { tag: "Partner Offers", des: "Get GST invoice and save up to 28% on business purchases.", no: 1 }
    ]

    let location = useLocation()
    const path = location.pathname.split("/")[2]
    const { _id } = useParams();
    const [data, setData] = useState("")
    const [related_data, setRelated_data] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [qty, setQty] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const navigate = useNavigate();
    const { getCartData } = useGetCartData();
    const { axiosPrivate } = useAxios();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!!_id) {
            axiosApi.get(`/products/${path}/details/${_id}`)
                .then((res) => {
                    // console.log(res.data)
                    setData(res.data)
                })
            axiosApi.get(`/products/${path}`)
                .then((res) => {
                    setRelated_data(res.data.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [_id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const handleBuyNow = async () => {
        try {
            setIsLoading(true);
            const obj = { ...data, quantity: qty }
            await axiosPrivate.post(`/cart`, obj)
            setIsAdded(true);
            setIsLoading(false);
            navigate("/cart");
            return


        } catch (error) {
            console.log(error);
            alert("Something went wrong");
            setIsLoading(false);
        }
    }




    const backToTop = () => {
        window.scrollTo(0, 10);

    }

    const addToCart = async () => {
        setLoading(true);
        try {
            const obj = { ...data, quantity: qty }
            let res = await axiosPrivate.post(`/cart`, obj)
            console.log(res.data);
            setIsAdded(true);
            setLoading(false);
            getCartData();
        } catch (error) {
            console.log(error)
            alert("Something went wrong");
            setLoading(false);

        }



    }


    return (
        <Box>

            {
                data.title ?

                    <Stack mb={"130px"} >
                        <Box w={"100%"} boxShadow={"2xl"}> <Image m={"auto"} src='https://m.media-amazon.com/images/I/21neM1UGaYL.jpg' />
                        </Box>
                        <Box display={"flex"} flexDirection={["column", "row", "row"]} mt={"1rem"} p={"1rem"} spacing={1} justifyContent="space-between" >

                            <HStack alignSelf="flex-start" p={["0rem", ".5rem", "1rem"]} spacing={20} h={["300px", "400px", "500px"]} w={["100%", "100%", "50%"]} >
                                <Box boxShadow={"2xl"} p={["0rem", ".5rem", "1rem"]} border="2px" borderColor={"yellow.500"} alignSelf={"flex-start"} w={"16%"} h={"100px"} >
                                    <Image m={"auto"} objectFit={"cover"} h={"60px"} src={data.image}></Image>
                                </Box>
                                <Box w={"50%"} p={["0rem", ".5rem", "1rem"]} id="Img" mt={"-5rem"} boxShadow={"2xl"} >
                                    <Image m={"auto"} h={"200px"} src={data.image}></Image>
                                </Box>
                            </HStack>
                            <Stack direction={"row"} alignSelf={"flex-start"} w={["100%", "50%"]}>
                                <Stack p={["0rem", ".5rem", "1rem"]} pb={"1rem"} w="400px" boxShadow={"md"} alignSelf="baseline">
                                    <Text fontSize={["16px", "18px", "24px"]} fontWeight={"bold"} >{data.title}</Text>
                                    <HStack>
                                        <ReactStarsRating
                                            count={5}
                                            value={data.rating}
                                            size={16}
                                            color2={'#ffd700'}
                                            isEdit={false}
                                            className="star"
                                        />
                                        <Text fontSize={14}>{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(data.review)} ratings</Text>
                                    </HStack>
                                    <Divider color={"grey"} />
                                    <Text fontWeight={"bold"} color="rgb(204,12,57)">Deal of the day</Text>
                                    <HStack>
                                        <Text color='rgb(204,12,57)' fontSize={"30px"} p={["0rem", ".5rem", "1rem"]}>-{Math.floor(((data.mrp - data.price) / data.mrp) * 100)}% </Text>
                                        <Text fontSize={"30px"} fontWeight={"semibold"}>₹{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 4 }).format(data.price)} </Text>
                                    </HStack>
                                    <Text fontSize={"14px"} >M.R.P.:<s> ₹{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 4 }).format(data.mrp)}.00</s> </Text>
                                    <Text fontSize={"14px"}>Inclusive of all taxes</Text>
                                    <Divider h={"10px"} color={"grey"} />

                                    <Stack>
                                        <HStack>
                                            <CiPercent size={"30px"} color='rgb(240,148,10)' />
                                            <Text fontWeight={"bold"}>Offers</Text>
                                        </HStack>
                                        <SimpleGrid direction={"row"} columns={3} spacing={2} >
                                            {offers.map((e, i) =>
                                                <Stack key={i} fontSize={"12px"} boxShadow={"lg"} p={"5px"} _hover={{ boxShadow: "2xl" }} transition={"ease-in"}  >
                                                    <Text fontWeight={"bold"} fontSize={"12px"}>{e.tag}</Text>
                                                    <Text>{e.des}</Text>
                                                    <Text _hover={{ "cursor": "pointer" }} color={"green"}  >  {e.no} Offers</Text>
                                                </Stack>
                                            )}
                                        </SimpleGrid>
                                        <Divider h={"10px"} />
                                    </Stack>
                                </Stack>

                                <Stack p={"1rem"} w="-moz-fit-content" boxShadow={"base"} border={"1px"} borderRadius={"10px"} borderColor={"#919191"} borderBottomStyle={"ridge"} h={"-webkit-fit-content"} >
                                    <Text fontSize={"24px"} alignSelf={"flex-start"} fontWeight={"semibold"}>₹{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 4 }).format(data.price)} </Text>
                                    <Text fontSize={"14px"}> <span style={{ color: "teal" }} >Free delivery</span> <span style={{ "fontWeight": "bold" }}>{days[date.getDay()]},{date.getDate()} {months[date.getMonth()]}</span>.  </Text>
                                    <HStack>
                                        <HiOutlineLocationMarker />
                                        <span style={{ "fontSize": "12px" }}>Select delivery location</span>
                                    </HStack>
                                    <Text color={"green"}>In Stock</Text>
                                    <Text fontSize={"14px"}>Sold by xyz and delivered by Amazon.</Text>
                                    <HStack>
                                        <label htmlFor="">Quantity :</label>
                                        <Select w={"-moz-fit-content"} onChange={(e) => setQty(e.target.value)}>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                            <option value={6}>6</option>
                                            <option value={7}>7</option>
                                            <option value={8}>8</option>
                                            <option value={9}>9</option>
                                        </Select>
                                    </HStack>
                                    <Button isLoading={loading} disabled={isLoading} size={"sm"} bg={"rgb(255,216,20)"} _hover={{ bg: "rgb(234, 196, 6)" }} onClick={addToCart} >Add to Cart</Button>
                                    <Button disabled={loading} isLoading={isLoading} size={"sm"} bg={"rgb(255,164,28)"} _hover={{ bg: "rgb(240, 148, 10)" }} onClick={handleBuyNow}>Buy Now</Button>
                                    <HStack>
                                        <HiLockClosed />
                                        <span>Secure transaction</span>
                                    </HStack>
                                </Stack>
                            </Stack>
                        </Box>
                        <Divider h={"10px"} />
                        <Stack px={"4rem"} mb={"150px"}>
                            <Heading textAlign={"left"}>Products related to this item</Heading>
                            <Carousel cols={4} rows={1} gap={10}  >
                                {
                                    related_data?.map((item, i) => {

                                        return (

                                            <Carousel.Item key={i}>
                                                <ProductCard
                                                    image={item.image} title={item.title}
                                                    rating={item.rating} review={item.review}
                                                    price={item.price} mrp={item.mrp} category={item.category}
                                                    path={path}
                                                    _id={item._id}
                                                />
                                            </Carousel.Item>
                                        )

                                    })

                                }
                            </Carousel>
                        </Stack>
                        <Footer backToTop={backToTop} />
                    </Stack>

                    :
                    <Loading />
            }

            {/* product added to cart message */}

            {
                isAdded ?
                    <Box id='overlay'>
                        <Box borderRadius={"10px"} border={"1px"} borderColor={"yellow.400"} p={2} boxShadow={"2xl"} width={["250px", "300px", "400px"]} h={"fit-content"} bg={"white"} display={"flex"} justifyContent={"center"} flexDirection={"column"} alignItems={"center"}>
                            <Text textAlign={"center"} color={"green"} fontSize={["lg", "xl", "2xl"]}>Product added to card.</Text>
                            <Image src={done} />
                            <Box width={"100%"} display={"flex"} justifyContent={"space-around"}>
                                <Button size={"sm"} colorScheme='yellow' onClick={() => {

                                    navigate(`/products/${path}`);
                                }} >Continue Shopping</Button>
                                <Button size={"sm"} colorScheme='yellow' onClick={() => {

                                    navigate("/cart");
                                }}>Goto cart</Button>
                            </Box>
                        </Box>
                    </Box>
                    : null
            }


        </Box>
    )
}
