import { useEffect, useState } from 'react'
import { api } from '../../AxiosConfig'
import { Box, Button, Divider, Heading, Image, Stack, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text, filter } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import useAxios from '../../hookes/useAxios';
import Loading from '../Loading';

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [delivered, setDelivered] = useState([]);
    const [canceled, setCanceled] = useState([]);
    const { axiosPrivate } = useAxios();

    const [loading, setLoading] = useState(false);

    const getOrders = async () => {
        try {
            setLoading(true);
            const res = await axiosPrivate.get("/order");
            console.log(res.data.data);
            setOrders(res.data.data.filter((item) => item.orderStatus === "Pending"));
            setDelivered(res.data.data.filter((item) => item.orderStatus === "delivered"));
            setCanceled(res.data.data.filter((item) => item.orderStatus === "Cancelled"));
            setLoading(false);
        } catch (err) {
            console.log(err);
            alert("Something went wrong");
            setLoading(false);
        }
    }



    useEffect(() => {
        getOrders();
    }, [])


    const handleCancel = async (item) => {
        try {
            setLoading(true);
            const res = await axiosPrivate.put("/order/cancel", { orderID: item._id });
            console.log(res.data);
            await getOrders();

        } catch (err) {
            console.log(err);
            alert("Something went wrong");
        }
    }




    return (
        <Box w={"100%"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
            <Heading mt={"20px"} w={"80%"} textAlign={"left"} >Your Orders</Heading>
            <Tabs position="relative" variant="unstyled" w={["100%", "90%", "80%"]} mt={"20px"} >
                <TabList>
                    <Tab fontSize={["md", "lg", "xl"]} fontWeight={"semibold"} _selected={{ color: 'red.600' }} >Orders</Tab>
                    <Tab fontSize={["md", "lg", "xl"]} fontWeight={"semibold"} _selected={{ color: 'red.600' }}  >Delivered</Tab>
                    <Tab fontSize={["md", "lg", "xl"]} fontWeight={"semibold"} _selected={{ color: 'red.600' }}  >Canceled</Tab>
                </TabList>
                <TabIndicator
                    mt="-1.5px"
                    height="2px"
                    bg="blue.500"
                    borderRadius="1px"
                />
                <TabPanels>
                    <TabPanel>
                        <Box w={"100%"}>
                            {
                                orders?.map((item, i) => {
                                    return (
                                        <Box key={i}>
                                            <Stack boxShadow={"lg"} p={["2px"]} direction={["row"]} justifyContent={"space-between"} bg={"whitesmoke"}  >
                                                <Box width={["30%", "35%", "40%"]} p="10px" bg={"white"}  >
                                                    <Link to={`/products/${item.category}/details/${item.productID}`}>
                                                        <Image h={["80px", "100px", "150px"]} m={"auto"} alignSelf={"center"} src={item.image} alt="product image" />
                                                    </Link>
                                                </Box>

                                                <Box width={["70%", "65%", "60%"]} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                                                    <Box width={"80%"} >

                                                        <Link to={`/products/${item.category}/details/${item.productID}`}>
                                                            <Text fontSize={"18px"} className='title'>{item.title}</Text>
                                                        </Link>

                                                        <Text fontSize={"12px"} >M.R.P.:<s> ₹{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 4 }).format(item.mrp)}.00</s> </Text>

                                                        <Box display={"flex"} mt={"5px"}>
                                                            <Button size={"sm"} colorScheme='red' isLoading={loading} onClick={() => handleCancel(item)} >Cancel Order</Button>
                                                        </Box>
                                                    </Box>
                                                    <Text fontWeight={"bold"}>₹{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 4 }).format(item.price)} </Text>
                                                </Box>

                                            </Stack>
                                            <Divider />
                                        </Box>
                                    )
                                }
                                )

                            }
                            {
                                orders.length === 0 ? <>No Order</> : null
                            }
                        </Box>
                    </TabPanel>
                    <TabPanel>
                        <Box w={"100%"}>
                            {
                                delivered?.map((item, i) => {
                                    return (
                                        <Box key={i}>
                                            <Stack boxShadow={"lg"} p={["2px"]} direction={["row"]} justifyContent={"space-between"} bg={"whitesmoke"}  >
                                                <Box width={["30%", "35%", "40%"]} p="10px" bg={"white"}  >
                                                    <Link to={`/products/${item.category}/details/${item.productID}`}>
                                                        <Image h={["80px", "100px", "150px"]} m={"auto"} alignSelf={"center"} src={item.image} alt="product image" />
                                                    </Link>
                                                </Box>

                                                <Box width={["70%", "65%", "60%"]} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                                                    <Box width={"80%"} >

                                                        <Link to={`/products/${item.category}/details/${item.productID}`}>
                                                            <Text fontSize={"18px"} className='title'>{item.title}</Text>
                                                        </Link>

                                                        <Text fontSize={"12px"} >M.R.P.:<s> ₹{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 4 }).format(item.mrp)}.00</s> </Text>

                                                        <Box display={"flex"} mt={"5px"}>
                                                            <Button size={"sm"} colorScheme='green' >Delivered <CheckCircleIcon ml={"5px"} /></Button>
                                                        </Box>
                                                    </Box>
                                                    <Text fontWeight={"bold"}>₹{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 4 }).format(item.price)} </Text>
                                                </Box>

                                            </Stack>
                                            <Divider />
                                        </Box>
                                    )
                                }
                                )

                            }
                            {
                                delivered.length === 0 ? <>No Order</> : null
                            }
                        </Box>
                    </TabPanel>
                    <TabPanel>
                        <Box w={"100%"}>
                            {
                                canceled?.map((item, i) => {
                                    return (
                                        <Box key={i}>
                                            <Stack boxShadow={"lg"} p={["2px"]} direction={["row"]} justifyContent={"space-between"} bg={"whitesmoke"}  >
                                                <Box width={["30%", "35%", "40%"]} p="10px" bg={"white"}  >
                                                    <Link to={`/products/${item.category}/details/${item.productID}`}>
                                                        <Image h={["80px", "100px", "150px"]} m={"auto"} alignSelf={"center"} src={item.image} alt="product image" />
                                                    </Link>
                                                </Box>

                                                <Box width={["70%", "65%", "60%"]} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                                                    <Box width={"80%"} >

                                                        <Link to={`/products/${item.category}/details/${item.productID}`}>
                                                            <Text fontSize={"18px"} className='title'>{item.title}</Text>
                                                        </Link>

                                                        <Text fontSize={"12px"} >M.R.P.:<s> ₹{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 4 }).format(item.mrp)}.00</s> </Text>

                                                        <Box display={"flex"} mt={"5px"}>
                                                            <Button size={"sm"} colorScheme='yellow' color={"red"}  >cancelled <WarningIcon ml={"5px"} /></Button>
                                                        </Box>
                                                    </Box>
                                                    <Text fontWeight={"bold"}>₹{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 4 }).format(item.price)} </Text>
                                                </Box>

                                            </Stack>
                                            <Divider />
                                        </Box>
                                    )
                                }
                                )

                            }
                            {
                                canceled.length === 0 ? <>No Order</> : null
                            }
                        </Box>
                    </TabPanel>
                </TabPanels>
            </Tabs>

            {
                loading ? <Loading /> : null
            }
        </Box>
    )
}

export default Order
