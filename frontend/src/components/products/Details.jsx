import { Badge, Box, Button, Divider, HStack, Heading, Image, Select, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from "react-router-dom"
import ReactStarsRating from 'react-awesome-stars-rating';
import "./products.css"
import { HiLockClosed, HiOutlineLocationMarker } from "react-icons/hi"
import { CiPercent } from "react-icons/ci"
import ProductCard from './ProductCard';
import { IoIosArrowForward } from "react-icons/io"
import useAxios from '../../useAxios';
import Carousel from 'better-react-carousel'
import Footer from '../Footer/Footer';

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

    const api = useAxios();

    let location = useLocation()
    const path = location.pathname.split("/")[2]
    const { _id } = useParams();
    const [data, setData] = useState("")
    const [related_data, setRelated_data] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    useEffect(() => {
        setPage(0)
        setIsLoading(true)
        api.get(`/products/${path}/details/${_id}`)
            .then((res) => {
                console.log(res.data)
                setData(res.data)
                setIsLoading(false)
            })
        api.get(`/products/${path}`)
            .then((res) => {
                setRelated_data(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }, [_id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


    const backToTop = () => {
        window.scrollTo(0, 10);

    }

    return (
        <Box>
            {
                !isLoading ?

                    <Stack >
                        <Box w={"100%"} boxShadow={"2xl"}> <Image m={"auto"} src='https://m.media-amazon.com/images/I/21neM1UGaYL.jpg' />
                        </Box>
                        <HStack mt={"1rem"} p={"1rem"} spacing={1} justifyContent="space-between" >

                            <HStack alignSelf="flex-start" p={"1rem"} spacing={20} h={"500px"} w={"50%"} >
                                <Box boxShadow={"2xl"} p={"1rem"} border="2px" borderColor={"yellow.500"} alignSelf={"flex-start"} w={"16%"} h={"100px"} >
                                    <Image m={"auto"} objectFit={"cover"} h={"60px"} src={data.image}></Image>
                                </Box>
                                <Box w={"50%"} p={"1rem"} id="Img" mt={"-5rem"} boxShadow={"2xl"} >
                                    <Image m={"auto"} src={data.image}></Image>
                                </Box>
                            </HStack>
                            <Stack direction={"row"} alignSelf={"flex-start"} w={"50%"}>
                                <Stack px={"1rem"} pb={"1rem"} w="400px" boxShadow={"md"} alignSelf="baseline">
                                    <Text fontSize={"24px"} fontWeight={"bold"} >{data.title}</Text>
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
                                        <Text color='rgb(204,12,57)' fontSize={"30px"} p={1}>-{Math.floor(((data.mrp - data.price) / data.mrp) * 100)}% </Text>
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
                                                <Stack fontSize={"12px"} boxShadow={"lg"} p={"5px"} _hover={{ boxShadow: "2xl" }} transition={"ease-in"}  >
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
                                        <Select w={"-moz-fit-content"}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                        </Select>
                                    </HStack>
                                    <Button bg={"rgb(255,216,20)"} _hover={{ bg: "rgb(234, 196, 6)" }} >Add to Cart</Button>
                                    <Button bg={"rgb(255,164,28)"} _hover={{ bg: "rgb(240, 148, 10)" }}>Buy Now</Button>
                                    <HStack>
                                        <HiLockClosed />
                                        <span>Secure transaction</span>
                                    </HStack>
                                </Stack>
                            </Stack>
                        </HStack>
                        <Divider h={"10px"} />
                        <Stack h={"200px"} px={"4rem"} mb={"400px"}>
                            <Heading textAlign={"left"}>Products related to this item</Heading>
                            <Carousel cols={4} rows={1} gap={10}  >
                                {
                                    related_data?.map((item, i) => {

                                        return (

                                            <Carousel.Item>
                                                <ProductCard key={i}
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
                        {/* <Footer backToTop={backToTop} /> */}
                    </Stack>

                    :
                    <Text color={"green.400"}>Loading...</Text>
            }


        </Box>
    )
}
