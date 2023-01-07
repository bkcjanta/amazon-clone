import { Box, Button, HStack, Heading, Menu, Radio, RadioGroup, Select, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
// import { data } from "./data"
import ReactStarsRating from 'react-awesome-stars-rating';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from "react-router-dom";
import axios from "axios"
export const Products = ({ path }) => {
    console.log(path);
    const [searchParams, setSearchParams] = useSearchParams();
    let initialRating = searchParams.get("rating")
    let initialDiscount = searchParams.get("discount")
    let initialPrice = searchParams.get("price")
    let initialSortby = searchParams.get("sortBy")
    let initialPage = +(searchParams.get("page"))
    const [data, setData] = useState([])
    if (initialPage == "null" || initialPage <= 0 || isNaN(initialPage)) {
        initialPage = 1
    }

    const [rating, setRating] = useState(initialRating)
    const [discount, setDiscount] = useState(initialDiscount)
    const [price, setPrice] = useState(initialPrice)
    const [sortBy, setSortby] = useState(initialSortby)
    const [page, setPage] = useState(initialPage)
    const [isLoading, setIsLoading] = useState(false)
    const [sideloading, setSideloading] = useState(true)
    const [total, setTotal] = useState("")


    useEffect(() => {
        setIsLoading(true)
        axios.get(`http://localhost:8080/products/${path}?rating=${rating}&&price=${price}&&discount=${discount}&&sortBy=${sortBy}&&page=${page}`)
            .then((res) => {
                setIsLoading(false)
                console.log(res)
                setData(res.data.data)
                setTotal(res.data.total)

            })
            .catch((err) => {
                console.log(err)
            })

    }, [rating, discount, price, sortBy, page, path])

   
    useEffect(() => {
        if (rating == null && discount == null && price == null && sortBy == null) {
            setSearchParams({ page })
        } else if (rating == null && discount == null && price == null && sortBy != null) {

            setSearchParams({ sortBy, page })
        } else if (rating == null && discount == null && price != null && sortBy == null) {

            setSearchParams({ price, page })
        } else if (rating == null && discount == null && price != null && sortBy != null) {

            setSearchParams({ price, sortBy, page })
        } else if (rating == null && discount != null && price == null && sortBy == null) {

            setSearchParams({ discount, page })
        } else if (rating == null && discount != null && price == null && sortBy != null) {

            setSearchParams({ discount, sortBy, page })
        } else if (rating == null && discount != null && price != null && sortBy == null) {

            setSearchParams({ discount, price, page })
        } else if (rating == null && discount != null && price != null && sortBy != null) {

            setSearchParams({ discount, price, sortBy, page })
        } else if (rating != null && discount == null && price == null && sortBy == null) {

            setSearchParams({ rating, page })
        } else if (rating != null && discount == null && price == null && sortBy != null) {

            setSearchParams({ rating, sortBy, page })
        } else if (rating != null && discount == null && price != null && sortBy == null) {

            setSearchParams({ rating, price, page })
        } else if (rating != null && discount == null && price != null && sortBy != null) {

            setSearchParams({ rating, price, sortBy, page })
        } else if (rating != null && discount != null && price == null && sortBy == null) {

            setSearchParams({ rating, discount, page })
        } else if (rating != null && discount != null && price == null && sortBy != null) {

            setSearchParams({ rating, discount, sortBy, page })
        } else if (rating != null && discount != null && price != null && sortBy == null) {

            setSearchParams({ rating, discount, price, page })
        } else if (rating != null && discount != null && price != null && sortBy != null) {
            setSearchParams({ rating, discount, price, sortBy, page })
        }
    }, [rating, discount, price, sortBy, page, path])

    const p = "<<"
    const n = ">>"
    const reset = () => {
        setSideloading(false)
        setDiscount(null)
        setPrice(null);
        setRating(null)
        setSortby(null)
        setPage(1)
        setTimeout(() => {
            setSideloading(true)
        }, 100)

    }
    return (
        <Box>
            {
                // filter part
                sideloading ?
                    <Stack p={"1rem"} className='side-filter' w={["0px", "150px", "200px", "250px"]} display={['none', "flex", 'flex']} >
                        <Box overflowY={"scroll"}>
                            <Stack>
                                <Button onClick={reset}>reset</Button>
                                <Heading fontSize={16} my="5px" > Price</Heading>
                                <RadioGroup onChange={(e) => setPrice(e)} >
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
                                <RadioGroup onChange={(e) => setDiscount(e)} >
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
                                <RadioGroup onChange={(e) => setRating(e)} >
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
            <Box p={["1rem", "2rem", "2rem", "2rem"]} bg="rgb(248,248,248)" ml={["0px", "150px", "200px", "250px"]}>
                {/* soriting */}
                <HStack p="5px" justifyContent={"end"} >
                    <Select size='xs' w={"200px"} onChange={(e) => setSortby(e.target.value)}>
                        <option value='null'>sort by: default</option>
                        <option value='asc'>sort by: price: Low-to-High</option>
                        <option value='desc'>sort by: price: High-to-Low</option>
                    </Select>
                </HStack>
                <Text>{(data.length *(page-1)+1)}-{data.length *page} out of {total}</Text>
                {!isLoading ?
                    <>
                        {data.length ?
                            <>
                                {/* card */}
                                <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={[1, 2, 4, 5]} >
                                    {data?.map((item, i) => <ProductCard key={i}
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
                                    <Text>{page} out of {Math.ceil(total / 20)}</Text>
                                    <Button disabled={page >= Math.ceil(total / 20)} onClick={() => setPage(pre => pre + 1)}>{n}</Button>
                                </HStack>

                            </>
                            : <Text color={"yellow.500"}> no data found</Text>
                        }
                    </>
                    : <Text color={"green.500"}> Loading...</Text>
                }
            </Box>
        </Box>
    )
}
