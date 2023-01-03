import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, HStack, Heading, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'

const ProductCard = ({_id,image,title,price,mrp,rating,review,category}) => {
  return (
    <Box>
     <Image src={image} alt="product image"/>
     <Box>
      <Text>{title}</Text>
     </Box>
     <HStack>
      
     </HStack>
    </Box>
  )
}

export default ProductCard
