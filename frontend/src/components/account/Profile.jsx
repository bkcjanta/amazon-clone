import { EditIcon, EmailIcon, LockIcon, PhoneIcon } from '@chakra-ui/icons'
import { useToast, Box, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import userlogo from '../../assets/userlogo.png'

const Profile = () => {
    const toast = useToast();
    const { user } = useSelector(state => state.user);

    const notify = () => {
        toast({
            title: "Coming Soon",
            description: "This feature is not available yet",
            status: "info",
            duration: 3000,
            isClosable: true,
            position: "top"
        })
    }
    return (
        <Box w={"100%"} h={"80vh"} display={"flex"} flexDir={"column"} justifyContent={"center"} alignItems={"center"}  >
            <Box boxShadow={"2xl"} borderRadius={"10px"} border={"1px"} borderColor={"gray"} w={"400px"} h={"400px"} display={"flex"} flexDir={"column"} justifyContent={"center"} alignItems={"center"} >
                <Heading >Your Profile</Heading>
                <Box>

                    <Box display={"flex"} flexDirection={"column"} gap={5} mt={5} >
                        <Box display={"flex"} flexDirection={"row"} alignItems={"center"} >
                            <Image w={10} src={userlogo} />
                            <Heading fontSize={"lg"} ml={2} >{user.name.toUpperCase()}</Heading>
                        </Box>
                        <Box ml={5}>
                            <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={2} >
                                <EmailIcon w={4} h={4} />
                                <Text fontSize={"lg"} ml={2} >{user.email}</Text>

                            </Box>
                            <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={2} >
                                <PhoneIcon w={4} h={4} />
                                <Text fontSize={"lg"} ml={2} >{user.mobile}</Text>
                                <EditIcon onClick={notify} color={"blue"} _hover={{ cursor: "pointer", color: "red.600" }} />
                            </Box>
                            <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={2} >
                                <LockIcon w={4} h={4} />
                                <Text fontSize={"lg"} ml={2} >Change Password</Text>
                                <EditIcon onClick={notify} color={"blue"} _hover={{ cursor: "pointer", color: "red.600" }} />
                            </Box>
                        </Box>

                    </Box>
                </Box>
            </Box>

        </Box>
    )
}

export default Profile
