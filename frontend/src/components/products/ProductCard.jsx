import { Badge, Box, HStack, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import ReactStarsRating from 'react-awesome-stars-rating';
import "./products.css"
import { Link } from 'react-router-dom';
const ProductCard = ({ _id, image, title, price, mrp, rating, review, category, path }) => {
  return (
    <Stack zIndex={10} boxShadow={"lg"} p={["2px", "6px", "10px"]} direction={["row", "column", "column"]} bg={"whitesmoke"}  >
      <Box width={["40%", "100%", "100%", "100%"]} p="10px" bg={"white"}  >
        <Link to={`/products/${path}/details/${_id}`}>
          <Image h={["80px", "100px", "120px", "150px"]} m={"auto"} alignSelf={"center"} src={image} alt="product image" />
        </Link>
      </Box>
      <Box width={["60%", "100%", "100%", "100%"]}>
        <Link to={`/products/${path}/details/${_id}`}><Text fontWeight={"semibold"} fontSize={"14px"} className='title'>{title}</Text></Link>
        <HStack>
          <ReactStarsRating
            count={5}
            value={rating}
            size={14}
            color2={'#ffd700'}

            isEdit={false}
            className="star"

          />
          <Text fontSize={12}>{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(review)}</Text>
        </HStack>
        <HStack>
          <Badge variant="solid" bg='rgb(204,12,57)' fontSize={"11px"} p={1}>{Math.floor(((mrp - price) / mrp) * 100)}% off</Badge>
          <Text fontSize={"12px"} fontWeight="bold" color="rgb(204,12,57)">Deal of the day</Text>
        </HStack>
        <Text fontWeight={"semibold"}>₹{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 4 }).format(price)} </Text>
        <Text fontSize={"12px"} >M.R.P.:<s> ₹{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 4 }).format(mrp)}.00</s> </Text>
      </Box>
    </Stack>
  )
}

export default ProductCard
