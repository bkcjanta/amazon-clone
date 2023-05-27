import React, { useState } from 'react'
import "./style.css"
import logo from "./logo.png"
import { Box, Button, Divider, HStack, Heading, Image, Input, PinInput, PinInputField, Stack, Text } from '@chakra-ui/react'
import axios from 'axios'
import { useCookies } from 'react-cookie';
import { useToast } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginFailure, loginRequest, loginSuccess } from '../../reducers/userSlice'
import { api } from '../../AxiosConfig'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import Loading from '../Loading'
export const PasswordForget = () => {
    const [email, setEmail] = useState("test@gmail.com")
    const [password, setPassword] = useState("test123")
    const [confirmPassword, setConfimPassword] = useState("test123")
    const [otp, setOtp] = useState("")
    const toast = useToast();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [togle, setToggle] = useState(false);
    const handleOtpRequest = () => {
        setToggle(true)
        // if (email === "" || password === "") {
        //     toast({
        //         title: "All fields are required.",
        //         description: "Please fill all the fields.",
        //         status: "error",
        //         duration: 5000,
        //         isClosable: true,
        //         position: "top-right"
        //     })
        //     return;
        // }

        // dispatch(loginRequest())
        // axios.post('http://localhost:8080/user/login', {
        //     email,
        //     password
        // }, { withCredentials: true }).then((res) => {
        //     console.log(res)
        //     dispatch(loginSuccess(res.data.user))
        //     toast({
        //         title: "Login successfully.",
        //         status: "success",
        //         duration: 5000,
        //         isClosable: true,
        //         position: "top-right"
        //     })
        //     for (let i = 0; i < 5; i++) {
        //         navigate(-1)
        //     }
        //     return

        // }).catch((err) => {
        //     dispatch(loginFailure())
        //     console.log(err)
        //     toast({
        //         title: `${err.response.data.msg}.`,
        //         description: "Please try again.",
        //         status: "error",
        //         duration: 5000,
        //         isClosable: true,
        //         position: "top-right"
        //     })
        // })
    }






    return (
        <Box overflow={"scroll"} h={"-webkit-fit-content"} pb={"3rem"} pt={"1rem"}>
            <Box w={"350px"} m={"auto"} >
                <Image m={"auto"} w='130px' src={logo} />
                <Box className='container' m={"auto"} mt={"20px"} borderRadius={"10px"} boxShadow={"md"}>
                    <Stack px={"2rem"} py={"1.3rem"}>
                        <Text m="0px" fontWeight={"bold"} fontSize={"24px"}> Sign in</Text>

                        <Stack spacing={4}>
                            <Box>
                                <span style={{ "fontSize": "14px", "fontWeight": "bold" }}>Email or mobile phone Number</span>
                                <Input disabled={togle} value={email} onChange={(e) => setEmail(e.target.value)} borderColor={"black"} boxShadow={"lg"} focusBorderColor={"rgb(240, 175, 12)"} size={"sm"} />
                            </Box>
                            {
                                !togle ? <Button onClick={handleOtpRequest} size={"sm"} bg={"rgb(241,198,91)"} border={"1px"} _hover={{ bg: "rgb(241, 181, 29)" }} w={"100%"}>Send</Button> : <></>
                            }

                            {
                                togle ? <Box>

                                    <Box>
                                        <span style={{ "fontSize": "14px", "fontWeight": "bold" }}>Password</span>
                                        <Input value={password} onChange={(e) => setPassword(e.target.value)} borderColor={"black"} boxShadow={"lg"} focusBorderColor={"rgb(240, 175, 12)"} size={"sm"} />

                                    </Box>
                                    <Box>
                                        <span style={{ "fontSize": "14px", "fontWeight": "bold" }}>Confim Password</span>
                                        <Input value={confirmPassword} onChange={(e) => setConfimPassword(e.target.value)} borderColor={"black"} boxShadow={"lg"} focusBorderColor={"rgb(240, 175, 12)"} size={"sm"} />

                                    </Box>
                                    <HStack w={"100%"} my={"2rem"} justifyContent={"space-around"} >
                                        <PinInput size={'sm'} otp onChange={(e) => setOtp(e)} >
                                            <PinInputField />
                                            <PinInputField />
                                            <PinInputField />
                                            <PinInputField />
                                        </PinInput>
                                    </HStack>
                                    <Button size={"sm"} bg={"rgb(241,198,91)"} border={"1px"} _hover={{ bg: "rgb(241, 181, 29)" }} w={"100%"}>Sign in</Button>
                                </Box> : <></>
                            }


                        </Stack>
                        <Text fontSize={"12px"}>By continuing, you agree to Amazon's <span style={{ "color": "blue" }}>Conditions of Use</span> and   <span style={{ "color": "blue", _hover: { "cursor": "pointer" } }}>Privacy Notice.</span></Text>
                    </Stack>


                </Box>
                <Stack>
                    <Box mt={"30px"} textAlign={"center"} borderTop={"1px"} borderColor={"grey"}>
                        <Text display={"block"} zIndex={2} w={"115px"} fontSize={"14px"} color={"grey"} bg={"white"} borderColor={"green"} m='auto' mt='-15px'>New To amzon ?</Text>
                    </Box>

                    <Button size={"sm"} border={"1px"} borderColor={"blackAlpha.400"}> <Link to="/user/signup">Create your Amzon account</Link></Button>
                </Stack>

            </Box>
        </Box>
    )
}
