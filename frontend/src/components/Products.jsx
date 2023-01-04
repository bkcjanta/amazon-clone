import { Box, SimpleGrid, Stack } from '@chakra-ui/react'
import React from 'react'
import ProductCard from './ProductCard'
import {data} from "./data"
export const Products = () => {
   
    return (
    <Box> 
        <Stack className='side-filter' w={["0px","150px","200px"]}>
          
        </Stack>
         <Box p={["1rem","2rem","2rem","2rem"]} bg="rgb(248,248,248)" ml={["0px","150px","200px"]}>
            <SimpleGrid columns={[1,2,3, 4, 5]} spacing={[1,2,4,5]} >
                 {data.map((item,i)=><ProductCard key={i}
                  image={item.image} title={item.title} 
                  rating={item.rating} review={item.review} 
                  price={item.price} mrp={item.mrp} category={item.category}
                  />)}
            </SimpleGrid>
        </Box>
    </Box>
    )
}
