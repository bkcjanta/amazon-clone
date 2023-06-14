import {
    Box, Button, Divider, Heading, Image, Stack, Text, AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect, } from 'react'
import { useSelector } from 'react-redux'
import { axiosApi } from '../../AxiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import useGetCartData from '../../hookes/useGetCartData';
import Footer from '../Footer/Footer';
import useAxios from '../../hookes/useAxios';
import Loading from '../Loading';
import { wait } from '@testing-library/user-event/dist/utils';
import { useDispatch } from 'react-redux';
import { cartFailure, cartSuccess } from '../../reducers/cartSlice';





const Cart = () => {
    const navigate = useNavigate();
    const { cartItems } = useSelector(state => state.cart)
    const { isAuth } = useSelector(state => state.user);
    const { axiosPrivate } = useAxios();
    const { getCartData } = useGetCartData();
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const [id, setId] = React.useState('');

    let total = 0;
    cartItems.forEach((item) => {
        total += item.price * item.quantity;
    })

    useEffect(() => {
        setLoading(true);
        axiosPrivate.get(`/cart/`, { withCredentials: true })
            .then((res) => {
                console.log(res)
                dispatch(cartSuccess(res.data.data))
                setLoading(false);
            }
            ).catch((err) => {
                console.log(err)
                dispatch(cartFailure())
                setLoading(false);
            }
            )

    }, [])

    const Inc = (item) => {
        setLoading(true);
        let quantity = item.quantity + 1;
        axiosPrivate.put("/cart", { _id: item._id, quantity: quantity }).then(async (res) => {
            await getCartData();
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            alert("Something went wrong");
            setLoading(false);
        })
    }

    const Dec = (item) => {
        setLoading(true);
        let quantity = item.quantity - 1;
        axiosPrivate.put("/cart", { _id: item._id, quantity: quantity }).then(async (res) => {
            await getCartData();
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            alert("Something went wrong");
            setLoading(false);
        })
    }

    const Remove = (_id) => {
        setId(_id);
        onOpen();

    }

    const handleRemove = () => {
        setLoading(true);
        onClose();
        axiosPrivate.delete(`/cart/${id}`,).then(async (res) => {

            await getCartData();
            setId('')
            setLoading(false);

        }).catch((err) => {
            onClose();
            console.log(err);
            setLoading(false);
            setId('')

        })

    }

    const backToTop = () => {
        window.scrollTo(0, 10);

    }
    return (
        <>
            {
                isAuth ?
                    <>
                        <Box bg={"rgb(227,230,230)"} w={"100%"} p={[0, 10, 30]}  >

                            <Box width={"100%"} display={"flex"} flexDirection={["column", "column", "row"]} justifyContent={"space-between"} p={"10px"} >


                                <Box width={["100%", "100%", "60%"]} display={"flex"} flexDirection={"column"} gap={5} bg='white' p={"10px"} >
                                    <Heading mb={"10px"}>Shoping Cart</Heading>
                                    <Divider />
                                    <Box display={"flex"} h={"50px"} alignItems={"center"} boxShadow={"lg"} p={"10px"} justifyContent={"flex-end"} bg={"white"}  >

                                        <Heading fontSize={"xl"}>Price</Heading>

                                    </Box>
                                    <Divider mb={"10px"} />
                                    {cartItems?.map((item, i) => {
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
                                                            <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                                                                <label htmlFor="">Quantity :</label>
                                                                <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
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
                                        cartItems.length !== 0 ?
                                            <>
                                                <Divider />
                                                <Box display={"flex"} h={"50px"} alignItems={"center"} boxShadow={"lg"} p={"10px"} justifyContent={"flex-end"} bg={"white"}  >

                                                    <Box ><span style={{ fontSize: "18px" }}>Sub-total {`(${cartItems.length} Items)`} :</span>  <span style={{ fontSize: "18px", fontWeight: "bold" }}>₹{total}</span></Box>

                                                </Box>
                                                <Divider />
                                            </> : <Heading fontSize={"md"} textAlign={"center"}>Cart is Empty</Heading>
                                    }

                                </Box>
                                <Box w={["100%", "100%", "30%"]}   >
                                    <Box bg='white' position={"sticky"} top={"120px"} right={"50px"}   >
                                        <Divider />
                                        <Box p={"10px"} display={"flex"} flexDirection={"column"} gap={5} justifyContent={"center"} alignItems={"center"}>
                                            <Text textAlign={"center"} fontSize={"14px"} color={"green"}>
                                                Your order is eligible for FREE Delivery. Select this option at checkout. Details</Text>
                                            <Box >
                                                <span style={{ fontSize: "18px" }}>Sub-total {`(${cartItems.length} Items)`} : </span>
                                                <span style={{ fontSize: "18px", fontWeight: "bold" }}> ₹{total}</span>
                                            </Box>
                                            <Button disabled={!cartItems.length} w={"80%"} colorScheme='yellow' onClick={() => navigate("/user/checkout")}> Proceed to Buy</Button>
                                        </Box>
                                        <Divider />

                                    </Box>

                                </Box>

                            </Box>
                        </Box>
                        <Footer backToTop={backToTop} />
                    </>
                    : <></>
            }


            {
                loading ? <Loading /> : <></>
            }


            <AlertDialog
                motionPreset='scale'
                leastDestructiveRef={cancelRef}
                onClose={() => {
                    setId('')
                    onClose();
                }}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Remove Item</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Are you sure you want to delete?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={() => {
                            setId('')
                            onClose();
                        }}>
                            No
                        </Button>
                        <Button onClick={handleRemove} colorScheme='red' ml={3}>
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </>
    )
}

export default Cart
