import { Box, Button, HStack, Text, SimpleGrid, Stack, Heading, Divider } from '@chakra-ui/react'
import React from 'react'

const Footer = ({ backToTop }) => {
    return (
        <div>
            <Stack m="0px" zIndex={10} bg={"rgb(55,71,90)"} textAlign={"center"} borderRadius={"0px"} width={"100%"} color={"white"} >
                <Button onClick={backToTop} m={"0px"} bg={"rgb(55,71,90)"} _hover={{ bg: "rgb(63, 81, 101);" }} >Back To Top</Button>
            </Stack>

            <Box padding={[".5rem", "1rem", "2rem"]} bg={"rgb(35,47,62)"} w={"100%"} h={"fit-content"}>
                <Stack w={"100%"} alignItems={"center"} >
                    <SimpleGrid w={"100%"} columns={4} justifyContent={"space-between"} color={"white"}>
                        <Box>
                            <Heading size={"md"}>
                                Get to Know Us
                            </Heading>
                            <Text >
                                Careers
                            </Text>
                            <Text size={"sm"}>
                                Blog
                            </Text>
                            <Text size={"sm"}>
                                About Amazon
                            </Text>
                            <Text size={"sm"}>
                                Investor Relations
                            </Text>
                            <Text size={"sm"}>
                                Amazon Devices
                            </Text>

                        </Box>
                        <Box>
                            <Heading size={"md"}>
                                Connect with Us
                            </Heading>
                            <Text size={"sm"}>
                                Facebook
                            </Text>
                            <Text size={"sm"}>
                                Twitter
                            </Text>
                        </Box>
                        <Box>
                            <Heading size={"md"}>
                                Make Money with Us
                            </Heading>
                            <Text size={"sm"}>
                                Sell on Amazon
                            </Text>
                            <Text size={"sm"}>
                                Sell under Amazon Accelerator
                            </Text>
                            <Text size={"sm"}>
                                Amazon Global Selling
                            </Text>
                            <Text size={"sm"}>
                                Become an Affiliate
                            </Text>
                            <Text size={"sm"}>
                                Fulfilment by Amazon
                            </Text>
                            <Text size={"sm"}>
                                Advertise Your Products
                            </Text>
                            <Text size={"sm"}>
                                Amazon Pay on Merchants
                            </Text>
                        </Box>
                        <Box>
                            <Heading size={"md"}>
                                Let Us Help You
                            </Heading>
                            <Text size={"sm"}>
                                COVID-19 and Amazon
                            </Text>
                            <Text size={"sm"}>
                                Your Account
                            </Text>
                        </Box>



                    </SimpleGrid>
                </Stack>

            </Box>
            <Box padding={[".5rem", "1rem", "2rem"]} bg={"rgb(19,26,34)"} w={"100%"} >

                <Stack w={"100%"} alignItems={"center"}>
                    <SimpleGrid w={"100%"} columns={4} spacing={4} color={"white"}>
                        <Box>
                            <Text size={"sm"} fontWeight={"bold"}>
                                AbeBooks
                            </Text>
                            <Text size={"sm"}>
                                Books, art
                            </Text>
                            <Text size={"sm"}>
                                & collectibles
                            </Text>
                        </Box>
                        <Box>
                            <Text size={"sm"} fontWeight={"bold"}>
                                Amazon Web Services
                            </Text>
                            <Text size={"sm"}>
                                Scalable Cloud
                            </Text>
                            <Text size={"sm"}>
                                Computing Services
                            </Text>
                        </Box>
                        <Box>
                            <Text size={"sm"} fontWeight={"bold"}>
                                Audible
                            </Text>
                            <Text size={"sm"}>
                                Download
                            </Text>
                            <Text size={"sm"}>
                                Audio Books
                            </Text>
                        </Box>
                        <Box>
                            <Text size={"sm"} fontWeight={"bold"}>
                                DPReview
                            </Text>
                            <Text size={"sm"}>
                                Digital
                            </Text>
                            <Text size={"sm"}>
                                Photography
                            </Text>
                        </Box>
                        <Box>
                            <Text size={"sm"} fontWeight={"bold"}>
                                IMDb
                            </Text>
                            <Text size={"sm"}>
                                Movies, TV
                            </Text>
                            <Text size={"sm"}>
                                & Celebrities
                            </Text>
                        </Box>
                        <Box>
                            <Text size={"sm"} fontWeight={"bold"}>
                                Shopbop
                            </Text>

                            <Text size={"sm"}>
                                Designer
                            </Text>
                            <Text size={"sm"}>
                                Fashion Brands
                            </Text>
                        </Box>
                        <Box>
                            <Text size={"sm"} fontWeight={"bold"}>
                                Amazon Business
                            </Text>
                            <Text size={"sm"}>
                                Everything For
                            </Text>
                            <Text size={"sm"}>
                                Your Business
                            </Text>
                        </Box>
                        <Box>
                            <Text size={"sm"} fontWeight={"bold"}>
                                Prime Now
                            </Text>
                            <Text size={"sm"}>
                                2-Hour Delivery
                            </Text>
                            <Text size={"sm"}>
                                on Everyday Items
                            </Text>

                        </Box>
                        <Box>
                            <Text size={"sm"} fontWeight={"bold"}>
                                Amazon Prime Music
                            </Text>
                            <Text size={"sm"}>
                                70 million songs, ad-free
                            </Text>
                            <Text size={"sm"}>
                                Over 9 million podcast episodes
                            </Text>
                        </Box>
                        <Box>
                            <Text size={"sm"} fontWeight={"bold"}>
                                Amazon Prime Video
                            </Text>
                            <Text size={"sm"}>
                                70 million songs, ad-free
                            </Text>
                            <Text size={"sm"}>
                                Over 9 million podcast episodes
                            </Text>
                        </Box>
                        <Box>
                            <Text size={"sm"} fontWeight={"bold"}>
                                Conditions of Use & Sale
                            </Text>
                            <Text size={"sm"}>
                                Privacy Notice
                            </Text>
                            <Text size={"sm"}>
                                Interest-Based Ads
                            </Text>
                        </Box>
                        <Box>
                            <Text size={"sm"} fontWeight={"bold"}>
                                Amazon App Download
                            </Text>
                            <Text size={"sm"}>
                                Amazon Assistant Download
                            </Text>
                            <Text size={"sm"}>
                                Help
                            </Text>
                        </Box>
                    </SimpleGrid>
                </Stack>
                <Box padding={[".5rem", "1rem", "2rem"]} w={"100%"}>
                    <Divider borderColor={"white"} />


                    <Text size={"sm"} color={"white"} textAlign={"center"}>
                        © 1996-2021, Amazon.com, Inc. or its affiliates
                    </Text>


                </Box>
            </Box>
        </div >
    )
}

export default Footer
