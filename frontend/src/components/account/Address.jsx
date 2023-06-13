import { SmallAddIcon } from '@chakra-ui/icons'
import { Box, Button, Divider, HStack, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberInput, NumberInputField, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import useGetAddress from '../../hookes/useGetAddress'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import useAxios from '../../hookes/useAxios'
import Loading from '../Loading'

const Address = () => {
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
    const [toggle, setToggle] = useState(false);
    const { userAddress } = useSelector(state => state.user);
    const { getAddress } = useGetAddress();
    const [loading, setLoading] = useState(false);

    const { axiosPrivate } = useAxios();

    const getAdd = async () => {
        setLoading(true);
        await getAddress();
        setLoading(false);
    }

    useEffect(() => {
        getAdd();
    }, []);

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
            setLoading(true);
            const res = await axiosPrivate.post('/address', { address });
            console.log(res);
            await getAddress();
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);

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
            setLoading(true);
            const res = await axiosPrivate.put('/address', { address, addressID });
            console.log(res);
            await getAddress();
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);

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


    const handleDelete = async (id) => {
        try {
            setLoading(true);
            const res = await axiosPrivate.put(`/address/delete`, { addressID: id });
            console.log(res);
            await getAddress();
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);

        }
    }


    return (
        <Box w={"100%"} p={[2, 5, 10]} >
            <Heading >Your Address</Heading>
            <SimpleGrid columns={[1, 2, 3]} row={"auto"} spacing={[2, 4, 6]} mt={6}  >
                <Box onClick={onOpen} _hover={{ cursor: "pointer" }} p={[1, 2, 3]} h={"250px"} border={"1px"} borderRadius={"10px"} borderColor={"gray"} borderStyle={"dashed"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDir={"column"}>
                    <SmallAddIcon w={10} h={10} color={"gray"} />
                    <Heading fontSize={"2xl"}>Add Address</Heading>
                </Box>
                {
                    userAddress?.map((item, index) => {
                        return (
                            <Box p={[2, 3, 5]} key={index} h={"250px"} border={"1px"} borderRadius={"10px"} borderColor={"gray"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} flexDir={"column"}>
                                <Box w={"100%"}>
                                    <Heading fontSize={"2xl"}>{item.fullName}</Heading>
                                    <Text>{item.flat}</Text>
                                    <Text>{item.area}</Text>
                                    <Text>{item.town}, {item.state} {item.zip}</Text>
                                    <Text>{item.country}</Text>
                                    <Text>Mobile No.- {item.mobile}</Text>
                                </Box>
                                <Box w={"100%"}>
                                    <Divider />
                                    <HStack>
                                        <Text onClick={() => handleEdit(item)} color={"blue"} _hover={{ cursor: "pointer" }}>Edit</Text>
                                        <Text>|</Text>
                                        <Text onClick={() => handleDelete(item._id)} color={"red"} _hover={{ cursor: "pointer" }}>Remove</Text>
                                    </HStack>
                                </Box>
                            </Box>
                        )
                    })
                }

            </SimpleGrid>

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
                        <Button disabled={loading} colorScheme='red' mr={3} onClick={handleClose}>
                            Close
                        </Button>
                        <Button isLoading={loading} colorScheme='yellow' onClick={toggle ? handleUpdate : handleSubmit} >{toggle ? "Save" : "Add"}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {
                loading && <Loading />
            }

        </Box>
    )
}

export default Address
