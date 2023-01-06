import { Box, HStack, Heading, Menu, Radio, RadioGroup, Select, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
// import { data } from "./data"
import ReactStarsRating from 'react-awesome-stars-rating';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from "react-router-dom";
import axios from "axios"
export const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    let initialRating = searchParams.get("rating")
    let initialDiscount = searchParams.get("discount")
    let initialPrice = searchParams.get("price")
    let initialSortby = searchParams.get("sortBy")
    let initialPage = +(searchParams.get("page"))
    const [data, setData] = useState([])
    if (initialPage == null || initialPage <= 0 || isNaN(initialPage)) {
        initialPage = 1
    }

    const [rating, setRating] = useState(initialRating)
    const [discount, setDiscount] = useState(initialDiscount)
    const [price, setPrice] = useState(initialPrice)
    const [sortBy, setSortby] = useState(initialSortby)
    const [page, setPage] = useState(initialPage)

    useEffect(() => {
        axios.get(`http://localhost:8080/products/mobiles?rating=${rating}&discount=${discount}&price=${price}&sortBy=${sortBy}&page=${page}`)
            .then((res) => {
                console.log(res)
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }, [rating, discount, price, sortBy, page])


    useEffect(() => {
        setSearchParams({ rating, discount, price, sortBy, page })

    }, [rating, discount, price, sortBy, page])

    return (
        <Box>
            <Stack p={"1rem"} className='side-filter' w={["0px", "150px", "200px", "250px"]} display={['none', "flex", 'flex']} >
                <Box overflowY={"scroll"}>
                    <Stack>
                        <Heading fontSize={16} my="5px" > Price</Heading>
                        <RadioGroup onChange={(e) => setPrice(e)} >
                            <Stack direction='column'>
                                <Radio colorScheme='orange' size='sm' value='0-1000'><Text className="filter-text" >Under ₹1,000</Text></Radio>
                                <Radio colorScheme='orange' size='sm' value='1000-5000'><Text className="filter-text" > ₹1,000 - ₹5,000</Text></Radio>
                                <Radio colorScheme='orange' size='sm' value='5000-10000'><Text className="filter-text" >₹5,000 - ₹10,000 </Text></Radio>
                                <Radio colorScheme='orange' size='sm' value='10000-20000'><Text className="filter-text" >₹10,000 - ₹20,000</Text></Radio>
                                <Radio colorScheme='orange' size='sm' value='20000-2000000'><Text className="filter-text" >Over ₹20,000</Text></Radio>
                            </Stack>
                        </RadioGroup>
                    </Stack>
                    <Stack>
                        <Heading fontSize={16} my="5px" >Discount</Heading>
                        <RadioGroup onChange={(e) => setDiscount(e)} >
                            <Stack direction='column'>
                                <Radio colorScheme='orange' size='sm' value='10'><Text className="filter-text" >10% Off or more</Text></Radio>
                                <Radio colorScheme='orange' size='sm' value='20'><Text className="filter-text" >20% Off or more</Text></Radio>
                                <Radio colorScheme='orange' size='sm' value='30'><Text className="filter-text" >30% Off or more</Text></Radio>
                                <Radio colorScheme='orange' size='sm' value='40'><Text className="filter-text" >40% Off or more</Text></Radio>
                                <Radio colorScheme='orange' size='sm' value='50'><Text className="filter-text" >50% Off or more</Text></Radio>
                                <Radio colorScheme='orange' size='sm' value='60'><Text className="filter-text" >60% Off or more</Text></Radio>
                            </Stack>
                        </RadioGroup>
                    </Stack>
                    <Stack>
                        <Heading fontSize={16} my="5px" >Ratings</Heading>
                        <RadioGroup onChange={(e) => setRating(e)} >
                            <Stack direction='column'>
                                <Radio colorScheme='orange' size='sm' value='4'>
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
                                <Radio colorScheme='orange' size='sm' value='3'>
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
                                <Radio colorScheme='orange' size='sm' value='2'>
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
                                <Radio colorScheme='orange' size='sm' value='1'>
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
            <Box p={["1rem", "2rem", "2rem", "2rem"]} bg="rgb(248,248,248)" ml={["0px", "150px", "200px", "250px"]}>

                {data.length ?
                    <>
                        <HStack p="5px" justifyContent={"space-between"} >

                            <Text>1-20 out of 288</Text>
                            <Select size='xs' w={"200px"} onChange={(e) => setSortby(e.target.value)}>
                                <option value='null'>sort by: default</option>
                                <option value='asc'>sort by: price: Low-to-High</option>
                                <option value='desc'>sort by: price: High-to-Low</option>


                            </Select>
                        </HStack>
                        <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={[1, 2, 4, 5]} >
                            {data?.map((item, i) => <ProductCard key={i}
                                image={item.image} title={item.title}
                                rating={item.rating} review={item.review}
                                price={item.price} mrp={item.mrp} category={item.category}
                            />)}
                        </SimpleGrid>
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="next >"

                            pageRangeDisplayed={1}
                            pageCount={10}
                            previousLabel="< previous"
                            renderOnZeroPageCount={null}
                        />
                    </>
                    : <Text> data not found</Text>
                }
            </Box>
        </Box>
    )
}
