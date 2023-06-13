import React, { useState } from 'react'
import "./style.css"
import axios from 'axios'
import logo from "./logo.png"
import { Link } from 'react-router-dom'
import { Box, Button, Divider, HStack, Heading, Image, Input, Stack, Text, useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const toast = useToast()
  const Signup = () => {
    if (name === '' || email === '' || mobile === '' || password === '' || confirmPassword === '') {
      toast({
        title: "All fields are required.",
        description: "Please fill all the fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right"
      })
    } else if (password !== confirmPassword) {
      toast({
        title: "Password not matched.",
        description: "Please check your password.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right"
      })
    } else {
      setLoading(true)
      axios.post('http://localhost:8080/user/signup', {
        name,
        email,
        mobile,
        password,

      }).then((res) => {
        toast({
          title: "Account created successfully.",
          description: "Please login to continue.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right"
        })

        setLoading(false)
        navigate('/user/login')
      }).catch((err) => {
        console.log(err)
        toast({
          title: `${err.response.data.msg}.`,
          description: "Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right"
        })
        setLoading(false)
      }
      )
    }
  }



  return (
    <Box overflow={"scroll"} h={"-webkit-fit-content"} pb={"3rem"} pt={"1rem"}>
      <Box w={"350px"} m={"auto"}  >
        <Image m={"auto"} w='130px' src={logo} />
        <Box className='container' m={"auto"} mt={"20px"} borderRadius={"10px"} boxShadow={"md"}>
          <Stack px={"2rem"} py={"1rem"}>
            <Text m="0px" fontWeight={"semibold"} fontSize={"24px"}> Create Account</Text>

            <Stack spacing={3}>
              <Box>

                <Input onChange={(e) => setName(e.target.value)} value={name} placeholder='First and Last Name' borderColor={"black"} boxShadow={"lg"} focusBorderColor={"rgb(240, 175, 12)"} size={"sm"} />
              </Box>
              <Box>

                <Input onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email' borderColor={"black"} boxShadow={"lg"} focusBorderColor={"rgb(240, 175, 12)"} size={"sm"} />
              </Box>
              <Box>

                <Input onChange={(e) => setMobile(e.target.value)} value={mobile} placeholder='Mobile Number' borderColor={"black"} boxShadow={"lg"} focusBorderColor={"rgb(240, 175, 12)"} size={"sm"} />
              </Box>
              <Box>

                <Input onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password' borderColor={"black"} boxShadow={"lg"} focusBorderColor={"rgb(240, 175, 12)"} size={"sm"} />
                <span style={{ "fontSize": "12px" }}>Passwords must be at least 6 characters.</span>
              </Box>
              <Box>
                <Input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} placeholder='Confirm Password' borderColor={"black"} boxShadow={"lg"} focusBorderColor={"rgb(240, 175, 12)"} size={"sm"} />
                <span style={{ "fontSize": "12px" }}>Passwords must be at least 6 characters.</span>
              </Box>
              <Button isLoading={loading} onClick={Signup} size={"sm"} bg={"rgb(241,198,91)"} border={"1px"} _hover={{ bg: "rgb(241, 181, 29)" }} w={"100%"}>Sign Up</Button>

            </Stack>
            <Text textAlign={"center"} fontSize={"14px"}>Already have an Account <span style={{ "color": "blue", "cursor": "pointer" }}><Link to={"/user/login"}>Signin</Link></span></Text>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}
