import { Box, Button, HStack, Heading, Image, Menu, Radio, RadioGroup, Select, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import ReactStarsRating from 'react-awesome-stars-rating';
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Loading from '../Loading';
import { useDispatch, useSelector } from 'react-redux';
import { productFailure, productRequest, productSuccess } from '../../reducers/productSlice';
import Cookies from 'js-cookie';
import { axiosApi } from '../../AxiosConfig';
import Navbar from '../navbar/Navbar';
import Footer from '../Footer/Footer';
import done from "../../assets/done.gif"
export const Products = () => {

    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [searchParams, setSearchParams] = useSearchParams();
    let initialPage = +(searchParams.get("page")) || 1;
    const [rating, setRating] = useState(searchParams.get("rating"));
    const [discount, setDiscount] = useState(searchParams.get("dscount"));
    const [price, setPrice] = useState(searchParams.get("price"));
    const [sortBy, setSortby] = useState(searchParams.get("sortBy"));
    const [page, setPage] = useState(initialPage || 1);
    const [isErr, setIsErr] = useState(false);
    const [sideloading, setSideloading] = useState(true);
    const [total, setTotal] = useState("");
    const dispatch = useDispatch();
    const { products, loading } = useSelector(state => state.products);
    const navigate = useNavigate();


    // useEffect(() => {
    //     setPrice("");
    //     setDiscount("");
    //     setRating("");
    //     setSortby("");
    //     setPage(page);


    // }, [pathname, path])

    useEffect(() => {
        let param = {};
        price && (param.price = price);
        rating && (param.rating = rating);
        discount && (param.discount = discount);
        sortBy && (param.sortBy = sortBy);
        page && (param.page = page);
        (Cookies.get("sk") || searchParams.get("sk")) && (param.sk = Cookies.get("sk") || searchParams.get("sk"));
        setSearchParams(param)


    }, [rating, discount, price, sortBy, page, path, location.search])


    useEffect(() => {
        dispatch(productRequest())
        if (location.search) {
            axiosApi.get(`/products/${path}${location.search}`)
                .then((res) => {
                    setTotal(res.data.total)
                    dispatch(productSuccess(res.data.data))
                })
                .catch((err) => {
                    console.log(err);
                    dispatch(productFailure())
                    setTotal(0)
                    setIsErr(true)
                })
        }
    }, [path, location.search, dispatch])

    useEffect(() => {
        setSideloading(false)
        setTimeout(() => {
            setSideloading(true)
        }, 100)
    }, [path])

    const p = "<<"
    const n = ">>"
    const reset = () => {
        setSideloading(false)
        setDiscount("")
        setPrice("");
        setRating("")
        setSortby("")
        setPage(1)
        setTimeout(() => {
            setSideloading(true)
        }, 100)

    }

    const goBack = () => {
        navigate("/")
    }

    return (
        <Box   >

            {
                // filter part
                sideloading ?
                    <Stack p={"1rem"} className='side-filter' w={["0px", "150px", "200px", "250px"]} display={['none', "flex", 'flex']} >
                        <Box overflowY={"scroll"}>
                            <Stack>
                                <Button onClick={reset}>reset</Button>
                                <Heading fontSize={16} my="5px" > Price</Heading>
                                <RadioGroup value={price} onChange={(e) => {
                                    setPrice(e);
                                    setPage(1);
                                }} >
                                    <Stack direction='column'>
                                        <Radio size='sm' value='0-1000'><Text className="filter-text" >Under ₹1,000</Text></Radio>
                                        <Radio size='sm' value='1000-5000'><Text className="filter-text" > ₹1,000 - ₹5,000</Text></Radio>
                                        <Radio size='sm' value='5000-10000'><Text className="filter-text" >₹5,000 - ₹10,000 </Text></Radio>
                                        <Radio size='sm' value='10000-20000'><Text className="filter-text" >₹10,000 - ₹20,000</Text></Radio>
                                        <Radio size='sm' value='20000-2000000'><Text className="filter-text" >Over ₹20,000</Text></Radio>
                                    </Stack>
                                </RadioGroup>
                            </Stack>
                            <Stack>
                                <Heading fontSize={16} my="5px" >Discount</Heading>
                                <RadioGroup value={discount} onChange={(e) => {

                                    setDiscount(e);
                                    setPage(1);
                                }}>
                                    <Stack direction='column'>
                                        <Radio size='sm' value='10'><Text className="filter-text" >10% Off or more</Text></Radio>
                                        <Radio size='sm' value='20'><Text className="filter-text" >20% Off or more</Text></Radio>
                                        <Radio size='sm' value='30'><Text className="filter-text" >30% Off or more</Text></Radio>
                                        <Radio size='sm' value='40'><Text className="filter-text" >40% Off or more</Text></Radio>
                                        <Radio size='sm' value='50'><Text className="filter-text" >50% Off or more</Text></Radio>
                                        <Radio size='sm' value='60'><Text className="filter-text" >60% Off or more</Text></Radio>
                                    </Stack>
                                </RadioGroup>
                            </Stack>
                            <Stack>
                                <Heading fontSize={16} my="5px" >Ratings</Heading>
                                <RadioGroup value={rating} onChange={(e) => {
                                    setPage(1);
                                    setRating(e)
                                }} >
                                    <Stack direction='column'>
                                        <Radio size='sm' value='4'>
                                            <Box className="filter-text" >
                                                <HStack>
                                                    <ReactStarsRating
                                                        count={5}
                                                        value={4}
                                                        size={14}
                                                        color2={'#ffd700'}
                                                        isEdit={false}
                                                        className="star"

                                                    />
                                                    <Text className="filter-text">& Up</Text>
                                                </HStack>
                                            </Box>
                                        </Radio>
                                        <Radio size='sm' value='3'>
                                            <Box className="filter-text" >
                                                <HStack>
                                                    <ReactStarsRating
                                                        count={5}
                                                        value={3}
                                                        size={14}
                                                        color2={'#ffd700'}
                                                        isEdit={false}
                                                        className="star"

                                                    />
                                                    <Text className="filter-text">& Up</Text>
                                                </HStack>
                                            </Box>
                                        </Radio>
                                        <Radio size='sm' value='2'>
                                            <Box className="filter-text" >
                                                <HStack>
                                                    <ReactStarsRating
                                                        count={5}
                                                        value={2}
                                                        size={14}
                                                        color2={'#ffd700'}
                                                        isEdit={false}
                                                        className="star"

                                                    />
                                                    <Text className="filter-text">& Up</Text>
                                                </HStack>
                                            </Box>
                                        </Radio>
                                        <Radio size='sm' value='1'>
                                            <Box className="filter-text" >
                                                <HStack>
                                                    <ReactStarsRating
                                                        count={5}
                                                        value={1}
                                                        size={14}
                                                        color2={'#ffd700'}
                                                        isEdit={false}
                                                        className="star"
                                                    />
                                                    <Text className="filter-text">& Up</Text>
                                                </HStack>
                                            </Box>
                                        </Radio>
                                    </Stack>
                                </RadioGroup>
                            </Stack>
                        </Box>
                    </Stack>
                    : <></>
            }
            <Box overflowY={"scroll"} p={["1rem", "2rem", "2rem", "2rem"]} bg="rgb(248,248,248)" ml={["0px", "150px", "200px", "250px"]} h={"85vh"} >
                {/* soriting */}
                {!isErr ?
                    <>
                        <HStack p="5px" justifyContent={"space-between"} >
                            <Button onClick={goBack} >Home</Button>
                            <Select size='xs' w={"200px"} onChange={(e) => setSortby(e.target.value)}>
                                <option value='null'>sort by: default</option>
                                <option value='asc'>sort by: price: Low-to-High</option>
                                <option value='desc'>sort by: price: High-to-Low</option>
                            </Select>
                        </HStack>
                        {products.length ? (products.length < 50 ? <Text>{(page - 1) * 50 + 1}-{total} out of {total}</Text> : <Text>{(products.length * (page - 1) + 1)}-{products.length * page} out of {total}</Text>) : <Text>0-0 out of 0</Text>}
                        {!loading ?
                            <>
                                {products.length ?
                                    <>
                                        {/* card */}
                                        <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={[1, 2, 4, 5]} >
                                            {products?.map((item, i) => <ProductCard key={i}
                                                image={item.image} title={item.title}
                                                rating={item.rating} review={item.review}
                                                price={item.price} mrp={item.mrp} category={item.category}
                                                path={path}
                                                _id={item._id}
                                            />)}
                                        </SimpleGrid>
                                        {/* pagination */}
                                        <HStack spacing={2} justifyContent="end">
                                            <Button disabled={page <= 1} onClick={() => setPage(pre => pre - 1)}>{p} </Button>
                                            <Text>{page} out of {Math.ceil(total / 50)}</Text>
                                            <Button disabled={page >= Math.ceil(total / 50)} onClick={() => setPage(pre => pre + 1)}>{n}</Button>
                                        </HStack>

                                    </>
                                    : <Text color={"yellow.500"}> no data found</Text>
                                }
                            </>
                            : <Loading />
                        }
                    </>
                    : <Text>Try checking your spelling or use more general terms</Text>
                }
            </Box>


        </Box>
    )
}
