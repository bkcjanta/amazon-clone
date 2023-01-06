import { Box, Image, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import ReactImageZoom from 'react-image-zoom';
import { useParams, useLocation } from "react-router-dom"
export const Details = () => {
    let location = useLocation()
    const path = location.pathname.split("/")[2]
    const { _id } = useParams();
    const [data, setData] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true)
        axios.get(`http://localhost:8080/products/${path}/details/${_id}`)
            .then((res) => {
                console.log(res.data)
                setData(res.data)
                setIsLoading(false)
            })

    }, []);
    const props = {
         img: data.image,
         width: 200, 
         height:200,
         zoomWidth:500,
    };
    return (
        <>
            {
                !isLoading ?
                    <Box w={"400px"}>
                        <Text>Details</Text>
                        {/* <ReactImageZoom {...props} /> */}
                        <Image src={data.image}/>
                    </Box>

                    :
                    <Text color={"green.400"}>Loading.....</Text>
            }
        </>
    )
}
