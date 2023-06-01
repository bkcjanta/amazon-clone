import { Badge, Box, Button, Divider, Grid, GridItem, HStack, Heading, Image, Select, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { api } from '../../AxiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"
import { cartFailure, cartRequest, cartSuccess } from '../../reducers/cartSlice';
import { loginFailure } from '../../reducers/userSlice';





const Cart = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart)

    let total = 0;
    cartItems.forEach((item) => {
        total += item.price * item.quantity;
    })




    const getCartData = () => {
        if (!Cookies.get("refreshToken")) {
            dispatch(cartFailure());
            dispatch(loginFailure());
            return navigate("/user/login");
        }

        api.get("/cart").then((res) => {
            console.log(res.data);
            dispatch(cartSuccess(res.data.data));
        }).catch((err) => {
            dispatch(cartFailure());
            console.log(err);
        })
    }
    useEffect(() => {
        getCartData();
    }, [])




    const Inc = (item) => {
        if (!Cookies.get("refreshToken")) {
            dispatch(cartFailure());
            dispatch(loginFailure());
            return navigate("/user/login");
        }
        console.log(item);
        let quantity = item.quantity + 1;

        api.put("/cart", { _id: item._id, quantity: quantity }).then((res) => {
            console.log(res.data);
            getCartData();
        }).catch((err) => {
            console.log(err);
        })
    }
    const Dec = (item) => {
        if (!Cookies.get("refreshToken")) {
            dispatch(loginFailure());
            dispatch(cartFailure());
            return navigate("/user/login");
        }
        console.log(item);
        let quantity = item.quantity - 1;
        api.put("/cart", { _id: item._id, quantity: quantity }).then((res) => {
            console.log(res.data);
            getCartData();
        }).catch((err) => {
            console.log(err);
        })
    }

    const Remove = (id) => {
        if (!Cookies.get("refreshToken")) {
            dispatch(cartFailure());
            dispatch(loginFailure());
            return navigate("/user/login");
        }
        api.delete(`/cart/${id}`,).then((res) => {
            console.log(res.data);
            getCartData();
        }).catch((err) => {
            console.log(err);
        })

    }
    return (
        <>
            {
                Cookies.get("refreshToken") ?
                    <>
                        <Box bg={"rgb(227,230,230)"} w={"100%"} p={30}  >

                            <Grid

                                templateRows='auto'
                                templateColumns='repeat(6, 1fr)'
                                gap={10}
                            >
                                <GridItem colSpan={4} rowSpan={5} bg='white' p={"10px"} >
                                    <Heading mb={"10px"}>Shoping Cart</Heading>
                                    <Divider />
                                    <Box display={"flex"} h={"50px"} alignItems={"center"} boxShadow={"lg"} p={"10px"} justifyContent={"flex-end"} bg={"white"}  >

                                        <Heading fontSize={"xl"}>Price</Heading>

                                    </Box>
                                    <Divider mb={"10px"} />
                                    {cartItems.length && cartItems.map((item, i) => {
                                        return (
                                            <Box key={i}>
                                                <Stack boxShadow={"lg"} p={["2px"]} direction={["row"]} justifyContent={"space-between"} bg={"whitesmoke"}  >
                                                    <Box width={["40%"]} p="10px" bg={"white"}  >
                                                        <Link to={`/products/${item.category}/details/${item.productID}`}>
                                                            <Image h={["150px"]} m={"auto"} alignSelf={"center"} src={item.image} alt="product image" />
                                                        </Link>
                                                    </Box>

                                                    <Box width={["60%"]} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                                                        <Box width={"80%"} >
                                                            <Text fontSize={"18px"} className='title'>{item.title}</Text>


                                                            <Text fontSize={"12px"} >M.R.P.:<s> ₹{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 4 }).format(item.mrp)}.00</s> </Text>
                                                            <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                                                                <label htmlFor="">Quantity :</label>
                                                                <Box display={"flex"} flexDirection={"row"}>
                                                                    <Button size={"sm"} colorScheme='green' disabled={item.quantity <= 1} onClick={() => Dec(item)}>-</Button>
                                                                    <Text px={"5px"}>
                                                                        {item.quantity}
                                                                    </Text>
                                                                    <Button size={"sm"} colorScheme='green' disabled={item.quantity >= 9} onClick={() => Inc(item)}>+</Button>
                                                                </Box>

                                                            </Box>
                                                            <Box display={"flex"} justifyContent={"flex-end"} mt={"5px"}>
                                                                <Button size={"sm"} colorScheme='red' onClick={() => Remove(item._id)}>Remove</Button>
                                                            </Box>
                                                        </Box>
                                                        <Text fontWeight={"bold"}>₹{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 4 }).format(item.price)} </Text>
                                                    </Box>

                                                </Stack>
                                                <Divider />
                                            </Box>
                                        )
                                    }
                                    )}

                                    {
                                        cartItems.length ?
                                            <>
                                                <Divider />
                                                <Box display={"flex"} h={"50px"} alignItems={"center"} boxShadow={"lg"} p={"10px"} justifyContent={"flex-end"} bg={"white"}  >

                                                    <Box ><span style={{ fontSize: "18px" }}>Sub-total {`(${cartItems.length} Items)`} :</span>  <span style={{ fontSize: "18px", fontWeight: "bold" }}>₹{total}</span></Box>

                                                </Box>
                                                <Divider />
                                            </> : <Heading>Cart is Empty</Heading>
                                    }

                                </GridItem>
                                <GridItem colSpan={2} rowSpan={1} bg='papayawhip' >
                                    <h1>bhdbhwbdehwhbdh</h1>
                                    <h1>bhdbhwbdehwhbdh</h1>
                                    <h1>bhdbhwbdehwhbdh</h1>
                                    <h1>bhdbhwbdehwhbdh</h1>
                                    <h1>bhdbhwbdehwhbdh</h1>
                                    <h1>bhdbhwbdehwhbdh</h1>
                                    <h1>bhdbhwbdehwhbdh</h1>
                                    <h1>bhdbhwbdehwhbdh</h1>
                                    <h1>bhdbhwbdehwhbdh</h1>
                                    <h1>bhdbhwbdehwhbdh</h1>
                                    <h1>bhdbhwbdehwhbdh</h1>
                                    <h1>bhdbhwbdehwhbdh</h1>

                                </GridItem>
                                <GridItem colSpan={2} bg='red' >
                                    <h1>bhdbhwbdehwhbdh</h1>
                                    <h1>bhdbhwbdehwhbdh</h1>
                                    <h1>bhdbhwbdehwhbdh</h1>
                                    <h1>bhdbhwbdehwhbdh</h1>
                                    <h1>bhdbhwbdehwhbdh</h1>
                                </GridItem>

                            </Grid>
                        </Box>
                    </>
                    : <></>
            }
        </>
    )
}

export default Cart
