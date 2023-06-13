import { useState } from 'react';
import "./style.css";
import logo from "./logo.png";
import { Box, Button, Image, Input, Stack, Text, useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginRequest, loginSuccess } from '../../reducers/userSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import Loading from '../Loading';
import useGetCartData from '../../hookes/useGetCartData';
import { axiosApi } from '../../AxiosConfig';





export const Login = () => {
  const [email, setEmail] = useState("demo@gmail.com");
  const [password, setPassword] = useState("demo@123");
  const [isLoad, setIsLoad] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector(state => state.user)
  const { getCartData } = useGetCartData();





  const handleLogin = (url) => {
    if (email === "" || password === "") {
      toast({
        title: "All fields are required.",
        description: "Please fill all the fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right"
      })
      return;
    }

    dispatch(loginRequest())
    axiosApi.post('https://thoughtful-colt-cuff.cyclic.app/user/login', { email, password }, { withCredentials: true })
      .then((res) => {
        console.log(res)
        dispatch(loginSuccess(res.data.user))
        getCartData()

        navigate("/")


      }).catch((err) => {
        dispatch(loginFailure())
        console.log(err)
        toast({
          title: `${err.response.data.msg}.`,
          description: "Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right"
        })
      })



  }



  return (
    <Box overflow={"scroll"} h={"-webkit-fit-content"} pb={"3rem"} pt={"1rem"}>
      {
        !isLoad ?
          <Box w={"350px"} m={"auto"} >
            <Image m={"auto"} w='130px' src={logo} />
            <Box className='container' m={"auto"} mt={"20px"} borderRadius={"10px"} boxShadow={"md"}>
              <Stack px={"2rem"} py={"1.3rem"}>
                <Text m="0px" fontWeight={"bold"} fontSize={"24px"}> Sign in</Text>

                <Stack spacing={4}>
                  <Box>
                    <span style={{ "fontSize": "14px", "fontWeight": "bold" }}>Email or mobile phone Number</span>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} borderColor={"black"} boxShadow={"lg"} focusBorderColor={"rgb(240, 175, 12)"} size={"sm"} />
                  </Box>
                  <Box>
                    <span style={{ "fontSize": "14px", "fontWeight": "bold" }}>Password</span>
                    <Input value={password} type='password' onChange={(e) => setPassword(e.target.value)} borderColor={"black"} boxShadow={"lg"} focusBorderColor={"rgb(240, 175, 12)"} size={"sm"} />

                  </Box>
                  <Button isLoading={loading} onClick={handleLogin} size={"sm"} bg={"rgb(241,198,91)"} border={"1px"} _hover={{ bg: "rgb(241, 181, 29)" }} w={"100%"}>Sign in</Button>

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
          : <Loading />
      }
    </Box>
  )
}
