import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Divider, HStack, Heading, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberInput, NumberInputField, Radio, RadioGroup, Select, Spinner, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Countries } from './countris'
import { api } from '../../AxiosConfig';
import { useDispatch, useSelector } from 'react-redux';
import { addressSuccess } from '../../reducers/userSlice';
import { useEffect } from 'react';
import done from '../../assets/done.gif';
import { useNavigate } from 'react-router-dom';
import useGetCartData from '../../hookes/useGetCartData';
import useLogout from '../../hookes/useLogout';
import useGetAddress from '../../hookes/useGetAddress';
import useAxios from '../../hookes/useAxios';
import { EditIcon } from '@chakra-ui/icons';


const Checkout = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [zip, setZip] = React.useState(491335);
    const [state, setState] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [fullName, setFullName] = React.useState('');
    const [mobile, setMobile] = React.useState('');
    const [flat, setFlat] = React.useState('');
    const [area, setArea] = React.useState('');
    const [landmark, setLandmark] = React.useState('');
    const [town, setTown] = React.useState('');
    const [selectedOption, setSelectedOption] = useState("");
    const [addressID, setAddressID] = useState('');
    const [selectedAddress, setSelectedAddress] = useState({});
    const { userAddress } = useSelector(state => state.user);
    const { cartItems } = useSelector(state => state.cart);
    const [toggle, setToggle] = useState(false);
    const [toogleAddress, setToogleAddress] = useState(false);
    const [upi, setUpi] = useState('');
    const [cod, setCod] = useState('');
    const [processing, setProcessing] = useState(false);
    const [paymentStarted, setPaymentStarted] = useState(false);
    const navigate = useNavigate();
    const { getCartData } = useGetCartData();
    const { getAddress } = useGetAddress();
    const [card, setCard] = useState({
        fullName: '',
        cardNumber: '',
        month: '',
        year: '',
        cvv: ''
    })

    const { axiosPrivate } = useAxios();

    let subtotal = 0;
    let total = 0;

    cartItems?.forEach(item => {
        subtotal += item.price * item.quantity;
    })
    let deliveryFee = subtotal > 499 ? -80 : 0;

    total = subtotal + 80;

    let finalToal = total + deliveryFee;






    useEffect(() => {

        if (cartItems.length === 0) {
            navigate('/cart')
        }


        getAddress();
    }, []);

    const handleCard = (e) => {
        setCard({ ...card, [e.target.name]: e.target.value });
    }
    const handleChange = (value) => {
        setSelectedOption(value);
        setSelectedAddress(JSON.parse(value));
    };

    const handleZip = async (value) => {
        setZip(value);
        console.log(zip)
        if (value.length === 6) {

            try {
                const res = await fetch(`https://api.postalpincode.in/pincode/${value}`);
                const data = await res.json();
                if (data[0].Status === 'Error') {
                    setZip('');
                    setState('');
                    setCountry('');
                    alert('Please enter valid zip code');
                    return;
                }
                setZip(value);
                setState(data[0].PostOffice[0].State);
                setCountry(data[0].PostOffice[0].Country);


                console.log(zip)
                // console.log(data[0].PostOffice[0].State);
                // setState(data[0].PostOffice[0].State);
            } catch (error) {
                console.log(error);
                setZip('');
                alert('error');
            }

        }
    }

    const handleSubmit = async () => {
        console.log('submit');
        if (country === '') {
            alert('Please select country');
            return;
        }
        if (fullName === '') {
            alert('Please enter full name');
            return;
        }
        if (mobile === '') {
            alert('Please enter mobile number');
            return;
        }
        if (zip === '') {
            alert('Please enter zip code');
            return;
        }
        if (flat === '') {
            alert('Please enter flat number');
            return;
        }
        if (area === '') {
            alert('Please enter area');
            return;
        }
        if (landmark === '') {
            alert('Please enter landmark');
            return;
        }
        if (town === '') {
            alert('Please enter town');
            return;
        }
        if (state === '') {
            alert('Please enter state');
            return;
        }
        let address = { country, fullName, mobile, flat, area, landmark, town, state, zip }

        try {
            const res = await axiosPrivate.post('/address', { address });
            console.log(res);
            getAddress();

        } catch (error) {
            console.log(error);

        }


        setCountry('');
        setFullName('');
        setMobile('');
        setFlat('');
        setArea('');
        setLandmark('');
        setTown('');
        setState('');
        setZip('');
        onClose();
    }




    const handleEdit = (address) => {
        setToggle(true);
        setFullName(address.fullName);
        setMobile(address.mobile);
        setFlat(address.flat);
        setArea(address.area);
        setLandmark(address.landmark);
        setTown(address.town);
        setState(address.state);
        setZip(address.zip);
        setCountry(address.country);
        setAddressID(address._id);
        onOpen();

    }

    const handleClose = () => {
        setToggle(false);
        setFullName('');
        setMobile('');
        setFlat('');
        setArea('');
        setLandmark('');
        setTown('');
        setState('');
        setZip('');
        setCountry('');
        setAddressID('');
        onClose();
    }

    const handleUpdate = async () => {
        if (country === '') {
            alert('Please select country');
            return;
        }
        if (fullName === '') {
            alert('Please enter full name');
            return;
        }
        if (mobile === '') {
            alert('Please enter mobile number');
            return;
        }
        if (zip === '') {
            alert('Please enter zip code');
            return;
        }
        if (flat === '') {
            alert('Please enter flat number');
            return;
        }
        if (area === '') {
            alert('Please enter area');
            return;
        }
        if (landmark === '') {
            alert('Please enter landmark');
            return;
        }
        if (town === '') {
            alert('Please enter town');
            return;
        }
        if (state === '') {
            alert('Please enter state');
            return;
        }
        let address = {
            country,
            fullName,
            mobile,
            flat,
            area,
            landmark,
            town,
            state,
            zip
        }

        try {
            const res = await axiosPrivate.put('/address', { address, addressID });
            console.log(res);
            getAddress();

        } catch (error) {
            console.log(error);

        }

        setCountry('');
        setFullName('');
        setMobile('');
        setFlat('');
        setArea('');
        setLandmark('');
        setTown('');
        setState('');
        setZip('');
        setCountry('');
        setToggle(false);
        onClose();
    }


    // const handleDelete = async (id) => {
    //     try {
    //         const res = await api.put(`/address/delete`, { addressID: id });
    //         console.log(res);
    //         getAddress();

    //     } catch (error) {
    //         console.log(error);

    //     }
    // }

    const handleSelectAddress = () => {
        setToogleAddress(true);
        setSelectedAddress(JSON.parse(selectedOption));
    }

    const handleCardPayment = async () => {
        if (card.fullName === '') {
            alert('Please enter card holder name');
            return;
        }
        if (card.cardNumber === '' || card.cardNumber.length < 16) {
            alert('Please enter valid card number');
            return;
        }
        if (card.month === '') {
            alert('Please enter month');
            return;
        }
        if (card.year === '') {
            alert('Please enter year');
            return;
        }
        if (card.cvv === '' || card.cvv.length < 3) {
            alert('Please enter valid cvv');
            return;
        }

        if (cartItems.length === 0) {
            alert('Please add items to cart');
            return;
        }
        console.log(selectedAddress);
        try {
            setPaymentStarted(true);
            setProcessing(true);
            const res = await axiosPrivate.post('/order', { deliveryAddress: selectedAddress, paymentMethod: 'card' });
            console.log(res);
            getCartData();
            setTimeout(() => {
                setProcessing(false);
            }, 3000);
        }
        catch (error) {
            console.log(error);
            setProcessing(false);
            setPaymentStarted(false);

        }



    }

    const handleUPIPayment = async () => {
        setPaymentStarted(true);
        setProcessing(true);
        try {
            const res = await axiosPrivate.post('/order', { deliveryAddress: selectedAddress, paymentMethod: upi });
            console.log(res);
            getCartData();
            setTimeout(() => {
                setProcessing(false);
            }, 3000);



        }
        catch (error) {
            console.log(error);
            setProcessing(false);
            setPaymentStarted(false);

        }


    }

    const handleCODPayment = async () => {
        setPaymentStarted(true);
        setProcessing(true);
        try {
            const res = await axiosPrivate.post('/order', { deliveryAddress: selectedAddress, paymentMethod: cod });
            console.log(res);
            getCartData();
            setTimeout(() => {
                setProcessing(false);
            }, 3000);
        }
        catch (error) {
            console.log(error);
            setProcessing(false);
            setPaymentStarted(false);
            alert('Something went wrong');
        }
    }

    const handleCod = (value) => {
        setCod(value);
    }

    const handleUpi = (value) => {
        setUpi(value);
    }


    return (
        <Box p={[2, 5, 10]} display={"flex"} flexDirection={["column-reverse", "column-reverse", "row"]} justifyContent={"space-between"} gap={[10]}>
            <Box zIndex={1} w={["100%", "100%%", "65%"]} boxShadow={"base"} border={"1px"} borderRadius={"10px"} borderColor={"#919191"} borderBottomStyle={"ridge"}>
                <Box p={5}>
                    {
                        !toogleAddress ? <Text fontSize={"20px"} fontWeight={"semibold"} mb={"5px"}>Select Delivery Address : </Text> : null
                    }
                    {
                        !toogleAddress ? <VStack w={"100%"} p={[3, 4, 5]} alignItems={"flex-start"} boxShadow={"2xl"} >
                            <RadioGroup value={selectedOption} onChange={handleChange}  >
                                <Box display={"flex"} flexDirection={"column"} gap={"10px"} >
                                    {userAddress?.map((address, i) => (
                                        <Box key={i}>
                                            <Divider />

                                            <Box display={"flex"} gap={[2, 2, 5]} my="5px" >
                                                <Radio textAlign={"center"} alignItems={"baseline"} value={JSON.stringify(address)}>
                                                    <span style={{ fontWeight: "bold" }}>{address.fullName}</span> {address.flat}, {address.area}, {address.landmark}, {address.town}, {address.state}, {address.zip}, {address.country}, Mobile No.- {address.mobile}
                                                </Radio>
                                                <EditIcon h={"fit-content"} ml={"20px"} _hover={{ "cursor": "pointer" }} color={"blue.400"} onClick={() => handleEdit(address)} >Edit</EditIcon>
                                            </Box>
                                            <Divider />
                                        </Box>
                                    ))}
                                </Box>
                            </RadioGroup>
                            <Divider />
                            <HStack w={"100%"} justifyContent={"space-between"}>
                                <Button size={"sm"} colorScheme='yellow' onClick={onOpen}>+ Add address</Button>
                                <Button size={"sm"} disabled={!selectedAddress.fullName} colorScheme='yellow' onClick={handleSelectAddress}>Use Selected Address</Button>
                            </HStack>
                        </VStack> :


                            <>
                                <Box p={[2, 3, 5]} w={"100%"} boxShadow={"2xl"}>
                                    <Text fontSize={"20px"} fontWeight={"semibold"} mb={"20px"}>Selected Delivery Address : </Text>
                                    <Divider />
                                    <Box display={"flex"} gap={5} >
                                        <RadioGroup><Radio defaultChecked colorScheme='yellow' textAlign={"center"} alignItems={"baseline"}><span style={{ fontWeight: "bold" }}>{selectedAddress.fullName}</span> {selectedAddress.flat}, {selectedAddress.area}, {selectedAddress.landmark}, {selectedAddress.town}, {selectedAddress.state}, {selectedAddress.zip}, {selectedAddress.country}, Mobile No.- {selectedAddress.mobile}</Radio></RadioGroup>
                                        <span onClick={() => setToogleAddress(prev => !prev)} style={{ color: "blue", cursor: "pointer" }}>Change</span>
                                    </Box>
                                </Box>
                                <Accordion p={[1, 3, 5]} w={"100%"} boxShadow={"2xl"} allowMultiple>
                                    <AccordionItem>
                                        <h2>
                                            <AccordionButton>
                                                <Heading fontSize={"2xl"} flex='1' textAlign='left'>
                                                    Select Payment Method
                                                </Heading>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel>
                                            <Box py={[1, 3, 5]} >
                                                <Tabs isFitted variant='enclosed' >
                                                    <TabList mb='1em'>
                                                        <Tab _selected={{ color: 'black', bg: 'yellow.400' }}>Card</Tab>
                                                        <Tab _selected={{ color: 'black', bg: 'yellow.400' }} >UPI</Tab>
                                                        <Tab _selected={{ color: 'black', bg: 'yellow.400' }}>Cash On Delivery</Tab>
                                                    </TabList>
                                                    <TabPanels>
                                                        <TabPanel>
                                                            <Heading fontSize={"2xl"} p={2} mb={"10px"} boxShadow={"md"} textAlign={"center"}>Card Payment</Heading>
                                                            <Box display={"flex"} m="auto" flexDirection={"column"} gap={[3, 4, 6]} w={["100%", "90%", "80%"]} p={["3px", "5px", "10px"]} bg={"white"} alignSelf={"center"} >
                                                                <Box>

                                                                    <Input borderColor={"black"} boxShadow={"lg"} focusBorderColor={"rgb(240, 175, 12)"} size={"sm"} placeholder='Card Holder Name' name='fullName' value={card.fullName} onChange={(e) => handleCard(e)} />
                                                                </Box>
                                                                <Box>

                                                                    <NumberInput value={card.cardNumber} borderColor={"black"} boxShadow={"lg"} focusBorderColor={"rgb(240, 175, 12)"}  >
                                                                        <NumberInputField placeholder='Card Number' name='cardNumber' value={card.cardNumber} onChange={(e) => handleCard(e)} maxLength={16} />
                                                                    </NumberInput>
                                                                </Box>
                                                                <HStack>
                                                                    <Select borderColor={"black"} boxShadow={"lg"} focusBorderColor={"rgb(240, 175, 12)"} size={"sm"} name='month' onChange={(e) => handleCard(e)}>
                                                                        <option>Month</option>
                                                                        <option value={1}>01</option>
                                                                        <option value={2}>02</option>
                                                                        <option value={3}>03</option>
                                                                        <option value={4}>04</option>
                                                                        <option value={5}>05</option>
                                                                        <option value={6}>06</option>
                                                                        <option value={7}>07</option>
                                                                        <option value={8}>08</option>
                                                                        <option value={9}>09</option>
                                                                        <option value={10}>10</option>
                                                                        <option value={11}>11</option>
                                                                        <option value={12}>12</option>
                                                                    </Select>

                                                                    <Select borderColor={"black"} boxShadow={"lg"} focusBorderColor={"rgb(240, 175, 12)"} size={"sm"} value={card.year} name='year' onChange={(e) => handleCard(e)}>
                                                                        <option value={""}>Year</option>
                                                                        <option value={"2023"}>2023</option>
                                                                        <option value={"2024"}>2024</option>
                                                                        <option value={"2025"}>2025</option>
                                                                        <option value={"2026"}>2026</option>
                                                                        <option value={"2027"}>2027</option>
                                                                        <option value={"2028"}>2028</option>
                                                                        <option value={"2029"}>2029</option>
                                                                        <option value={"2030"}>2030</option>
                                                                    </Select>
                                                                    <Box>

                                                                        <NumberInput value={card.cvv} borderColor={"black"} boxShadow={"lg"} focusBorderColor={"rgb(240, 175, 12)"} >
                                                                            <NumberInputField size={"sm"} placeholder='CVV' name='cvv' value={card.cvv} onChange={(e) => handleCard(e)} maxLength={3} />
                                                                        </NumberInput>
                                                                    </Box>
                                                                </HStack>
                                                                <Button disabled={!card.fullName || !card.cardNumber || !card.month | !card.year || !card.cvv || card.cardNumber.length < 16 || card.cvv.length < 3} colorScheme='yellow' onClick={handleCardPayment}>Pay</Button>
                                                            </Box>
                                                        </TabPanel>
                                                        <TabPanel>
                                                            <Heading fontSize={"2xl"} mb={"20px"} p={2} boxShadow={"md"} textAlign={"center"}>Pay Using UPI</Heading>
                                                            <Box display={"flex"} m="auto" flexDirection={"column"} gap={6} w={"100%"} p={"10px"} bg={"white"} alignSelf={"center"} >
                                                                <RadioGroup value={upi} onChange={handleUpi}>
                                                                    <Stack>
                                                                        <Radio colorScheme='yellow' value="Phonepe-upi">PhonePe</Radio>
                                                                        <Radio colorScheme='yellow' value="GooglePay-upi">Google Pay</Radio>
                                                                        <Radio colorScheme='yellow' value="Paytm-upi">Paytm</Radio>
                                                                        <Radio colorScheme='yellow' value="other-upi">Other UPI</Radio>

                                                                    </Stack>

                                                                </RadioGroup>
                                                                <Box w={"100%"} textAlign={"center"} mt={10} >
                                                                    <Button w={"90%"} m={"auto"} disabled={!upi} colorScheme='yellow' onClick={handleUPIPayment}>Pay</Button>
                                                                </Box>
                                                            </Box>
                                                        </TabPanel>
                                                        <TabPanel w={"100%"}>
                                                            <Heading fontSize={"2xl"} mb={"20px"} p={2} boxShadow={"md"} textAlign={"center"}>Pay Using Cash On Delivery</Heading>
                                                            <RadioGroup value={cod} onChange={handleCod} >
                                                                <Radio value={"cod"} colorScheme='yellow' >Cash On Delivery</Radio>
                                                            </RadioGroup>
                                                            <Box w={"100%"} textAlign={"center"} mt={10} >
                                                                <Button w={"90%"} m={"auto"} disabled={!cod} colorScheme='yellow' onClick={handleCODPayment}>Pay</Button>
                                                            </Box>
                                                        </TabPanel>
                                                    </TabPanels>
                                                </Tabs>
                                            </Box>

                                        </AccordionPanel>
                                    </AccordionItem>
                                </Accordion>
                            </>

                    }


                </Box>
            </Box>
            <Stack p={5} w={["100%", "100%", "30%"]} h={"fit-content"} position={["static", "static", "sticky"]} top={"50px"} right={"50px"} boxShadow={"base"} border={"1px"} borderRadius={"10px"} borderColor={"#919191"} borderBottomStyle={"ridge"}>

                <Box width={"100%"} textAlign={"center"}>
                    <Text fontSize={"sm"}>
                        Choose a payment method to continue checking out. You will still have a chance to review and edit your order before it is final.
                    </Text>
                </Box>
                <Box borderColor={"gray"}>
                    <Divider colorScheme={"gray"} />
                </Box>
                <Box>
                    <Text fontSize={"xl"} fontWeight={"bold"}>Order Summary</Text>
                    <Divider />
                    <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"} >
                        <Text fontSize={"sm"}>Subtotal ({cartItems?.length} items)</Text>
                        <Text fontSize={"sm"}>₹{subtotal}.00</Text>
                    </Box>
                    <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"} >
                        <Text fontSize={"sm"}>Delivery Fee</Text>
                        <Text fontSize={"sm"}>₹80.00</Text>
                    </Box>
                    <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"} >
                        <Text fontSize={"sm"}>Total</Text>
                        <Text fontSize={"sm"}>₹{total}.00</Text>
                    </Box>
                    <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                        <Text fontSize={"sm"}>Promotion Applied</Text>
                        <Text fontSize={"sm"}>₹{deliveryFee}.00</Text>
                    </Box>

                </Box>
                <Box borderColor={"gray"}>
                    <Divider colorScheme={"gray"} />
                </Box>
                <Box>
                    <Divider />
                    <Box color={"red.700"} display={"flex"} flexDirection={"row"} justifyContent={"space-between"} >
                        <Text fontSize={"xl"} fontWeight={"bold"} >Order Total</Text>
                        <Text fontSize={"xl"} fontWeight={"bold"} >₹{finalToal}.00</Text>
                    </Box>

                </Box>
                <Box borderColor={"gray"}>
                    <Divider colorScheme={"gray"} />
                </Box>



            </Stack>

            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg={"yellow.300"}>Add Address</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>
                            <Box>
                                <Text>Full name (First and Last name)</Text>
                                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
                            </Box>
                            <Box>
                                <Text>Mobile Number</Text>
                                <NumberInput value={mobile}   >
                                    <NumberInputField value={mobile} onChange={(e) => setMobile(e.target.value)} maxLength={10} />
                                </NumberInput>
                            </Box>
                            <Box>
                                <Text>Pincode</Text>
                                <NumberInput value={zip}   >
                                    <NumberInputField value={zip} onChange={(e) => handleZip(e.target.value)} maxLength={6} />
                                </NumberInput>
                            </Box>
                            <Box>
                                <Text>Country/Region</Text>
                                <Input value={country} disabled />
                            </Box>
                            <HStack>
                                <Box>
                                    <Text>State</Text>
                                    <Input value={state} disabled ></Input>
                                </Box>
                                <Box>
                                    <Text>Town/City</Text>
                                    <Input value={town} onChange={(e) => setTown(e.target.value)} />
                                </Box>
                            </HStack>
                            <Box>
                                <Text>Flat, House no., Building, Company, Apartment</Text>
                                <Input value={flat} onChange={(e) => setFlat(e.target.value)} />
                            </Box>
                            <Box>
                                <Text>Area, Street, Sector, Village</Text>
                                <Input value={area} onChange={(e) => setArea(e.target.value)} />
                            </Box>
                            <Box>
                                <Text>Landmark</Text>
                                <Input value={landmark} onChange={(e) => setLandmark(e.target.value)} />
                            </Box>



                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={handleClose}>
                            Close
                        </Button>
                        <Button colorScheme='yellow' onClick={toggle ? handleUpdate : handleSubmit} >{toggle ? "Save" : "Add"}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>


            {/* payment processing and success messege */}

            {
                paymentStarted ?
                    <Box id="overlay" >
                        <Box zIndex={200} width={["300px", "400px", "400px"]} h={["300px", "400px", "400px"]} bg={"white"} display={"flex"} justifyContent={"center"} flexDirection={"column"} alignItems={"center"}>
                            {
                                processing ? <Box borderRadius={"10px"} border={"1px"} borderColor={"yellow.400"} p={2} boxShadow={"2xl"} width={["300px", "400px", "400px"]} h={["250px", "300px", "400px"]} bg={"white"} display={"flex"} justifyContent={"center"} flexDirection={"column"} alignItems={"center"}>

                                    <Spinner
                                        thickness='4px'
                                        speed='0.65s'
                                        emptyColor='gray.200'
                                        color='blue.500'
                                        size='xl'
                                    />
                                    <Text textAlign={"center"} fontSize={"xl"} color={"blue.500"}>Please wait...</Text>
                                    <Text textAlign={"center"} fontSize={"xl"} color={"blue.500"}>Please do not press Back or Refresh</Text>
                                </Box> :
                                    <Box boxShadow={"base"} border={"1px"} borderRadius={"10px"} borderColor={"#919191"} borderBottomStyle={"ridge"} p={2} width={["300px", "400px", "400px"]} h={["250px", "300px", "400px"]} bg={"white"} display={"flex"} justifyContent={"center"} flexDirection={"column"} alignItems={"center"}>
                                        <Text textAlign={"center"} color={"green"} fontSize={["lg", "xl", "2xl"]}>Thank you for shopping</Text>
                                        <Text textAlign={"center"} color={"green"} fontSize={["lg", "xl", "2xl"]}>Your order is successfully placed.</Text>
                                        <Image src={done} />
                                        <Box width={"100%"} display={"flex"} justifyContent={"space-around"}>
                                            <Button size={"sm"} colorScheme='yellow' onClick={() => {
                                                setPaymentStarted(false);
                                                setProcessing(false);
                                                navigate('/');
                                            }}>Continue Shopping</Button>
                                            <Button size={"sm"} colorScheme='yellow' onClick={() => {
                                                setPaymentStarted(false);
                                                setProcessing(false);
                                                navigate('/user/orders');
                                            }}>My orders</Button>
                                        </Box>
                                    </Box>
                            }

                        </Box>
                    </Box>
                    : null
            }

        </Box>

    )
}

export default Checkout
