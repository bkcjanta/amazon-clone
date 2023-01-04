import { Box, HStack, Heading, Menu, Select, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import ProductCard from './ProductCard'
import { data } from "./data"
import ReactStarsRating from 'react-awesome-stars-rating';
export const Products = () => {

    return (
        <Box>
            <Stack p={"1rem"} className='side-filter' w={["0px", "150px", "200px", "250px"]} display={['none', "flex", 'flex']} >
                <Box overflowY={"scroll"}>
                    <Stack>
                        <Heading fontSize={16} my="5px" > Price</Heading>
                        <Text className="filter-text">Under ₹1,000</Text>
                        <Text className="filter-text"> ₹1,000 - ₹5,000 </Text>
                        <Text className="filter-text"> ₹5,000 - ₹10,000 </Text>
                        <Text className="filter-text"> ₹10,000 - ₹20,000 </Text>
                        <Text className="filter-text"> Over ₹20,000 </Text>
                    </Stack>
                    <Stack>
                        <Heading fontSize={16} my="5px" >Discount</Heading>
                        <Text className="filter-text">10% Off or more</Text>
                        <Text className="filter-text">20% Off or more</Text>
                        <Text className="filter-text">30% Off or more</Text>
                        <Text className="filter-text">35% Off or more</Text>
                        <Text className="filter-text">40% Off or more</Text>
                        <Text className="filter-text">50% Off or more</Text>
                    </Stack>
                    <Stack>
                        <Heading fontSize={16} my="5px" >Discount</Heading>
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

                    </Stack>
                </Box>

            </Stack>
            <Box p={["1rem", "2rem", "2rem", "2rem"]} bg="rgb(248,248,248)" ml={["0px", "150px", "200px", "250px"]}>
                <HStack p="5px" justifyContent={"space-between"} >
                    <Text>1-20 out of 288</Text>
                    <Select size='xs'  w={"200px"} placeholder='sort by: default'>
                        <option value='plh'>sort by: price: Low-to-High</option>
                        <option value='phl'>sort by: price: High-to-Low</option>
                        <option value='crhl'>Sort by: Avg. Customer Review</option>

                    </Select>
                </HStack>
                <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={[1, 2, 4, 5]} >
                    {data.map((item, i) => <ProductCard key={i}
                        image={item.image} title={item.title}
                        rating={item.rating} review={item.review}
                        price={item.price} mrp={item.mrp} category={item.category}
                    />)}
                </SimpleGrid>
            </Box>
        </Box>
    )
}
