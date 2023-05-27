import { Box, HStack, Heading, Image, SimpleGrid, Stack, VStack } from '@chakra-ui/react'
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Carousel from 'better-react-carousel'
import h1 from "../../assets/h1.jpg"
import h2 from "../../assets/h2.jpg"
import h3 from "../../assets/h3.jpg"
import h4 from "../../assets/h4.jpg"
import h5 from "../../assets/h5.jpg"
import h6 from "../../assets/h6.jpg"
import h7 from "../../assets/h7.jpg"
import h8 from "../../assets/h8.jpg"
import h9 from "../../assets/h9.jpg"

import k1 from "../../assets/kids/k1.jpg"
import k2 from "../../assets/kids/k2.jpg"
import k3 from "../../assets/kids/k3.jpg"
import k4 from "../../assets/kids/k4.jpg"

import b1 from "../../assets/beauty/b1.jpg"
import b2 from "../../assets/beauty/b2.jpg"
import b3 from "../../assets/beauty/b3.jpg"
import b4 from "../../assets/beauty/b4.jpg"

import f1 from "../../assets/fitness/f1.jpg"
import f2 from "../../assets/fitness/f2.jpg"
import f3 from "../../assets/fitness/f3.jpg"
import f4 from "../../assets/fitness/f4.jpg"

import bk1 from "../../assets/books/bk1.jpg"
import bk2 from "../../assets/books/bk2.jpg"
import bk3 from "../../assets/books/bk3.jpg"
import bk4 from "../../assets/books/bk4.jpg"

import e1 from "../../assets/electronics/e1.jpg"
import e2 from "../../assets/electronics/e2.jpg"
import e3 from "../../assets/electronics/e3.jpg"
import e4 from "../../assets/electronics/e4.jpg"

import hm1 from "../../assets/homes/hm1.jpg"
import hm2 from "../../assets/homes/hm2.jpg"
import hm3 from "../../assets/homes/hm3.jpg"
import hm4 from "../../assets/homes/hm4.jpg"

import m1 from "../../assets/mens/m1.jpg"
import m2 from "../../assets/mens/m2.jpg"
import m3 from "../../assets/mens/m3.jpg"
import m4 from "../../assets/mens/m4.jpg"

import w1 from "../../assets/womens/w1.jpg"
import w2 from "../../assets/womens/w2.jpg"
import w3 from "../../assets/womens/w3.jpg"
import w4 from "../../assets/womens/w4.jpg"
import ProductCard from '../products/ProductCard';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';



const kids = [k1, k2, k3, k4]
const beauty = [b1, b2, b3, b4]
const fitness = [f1, f2, f3, f4]
const books = [bk1, bk2, bk3, bk4]
const electronics = [e1, e2, e3, e4]
const homes = [hm1, hm2, hm3, hm4]
const mens = [m1, m2, m3, m4]
const womens = [w1, w2, w3, w4]

const cards = [{ title: "Mens Collections", image: mens, path: "mens" }, { title: "Womens Collections", image: womens, path: "womens" }, { title: "Kids Collections", image: kids, path: "kids" }, { title: "Beauty Collections", image: beauty, path: "beauty" }, { title: "Fitness Collections", image: fitness, path: "helth&fitness" }, { title: "Books Collections", image: books, path: "books" }, { title: "Electronics Collections", image: electronics, path: "electronics" }, { title: "Home Collections", image: homes, path: "home&kitchen" }]


const hero = [h1, h2, h3, h4, h5, h6, h7, h8, h9]

const Home = () => {
    const [images, setImages] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    const [mens, setMens] = React.useState([]);
    const [womens, setWomens] = React.useState([]);
    const [kids, setKids] = React.useState([]);
    const [beauty, setBeauty] = React.useState([]);
    const [fitness, setFitness] = React.useState([]);
    const [books, setBooks] = React.useState([]);
    const [electronics, setElectronics] = React.useState([]);
    const [homes, setHomes] = React.useState([]);



    React.useEffect(() => {
        window.scrollTo(0, 0)
        fetch("http://localhost:8080/products/mens")
            .then(res => res.json())
            .then(data => setMens(data.data))
            .catch(err => console.log(err))

        fetch("http://localhost:8080/products/womens")
            .then(res => res.json())
            .then(data => setWomens(data.data))
            .catch(err => console.log(err))

        fetch("http://localhost:8080/products/kids", { withCredentials: true })
            .then(res => res.json())
            .then(data => setKids(data.data))
            .catch(err => console.log(err))



    }, [])

    console.table(kids)


    const backToTop = () => {
        window.scrollTo(0, 10);


    }


    return (
        <div>
            <Box w={"100%"} h={"fit-content"} border={"1px"} mb={["-70px", "-100px", "-160px"]} >

                <Box zIndex={2}>
                    <Carousel autoplay={2000} cols={1} rows={1} gap={10} loop >
                        {hero.map((image, index) => {
                            return (
                                < Carousel.Item >
                                    {<Image w={"100%"} src={image} alt={image.title} />
                                    }

                                </ Carousel.Item >
                            )
                        })
                        }
                    </Carousel>
                </Box>
                <VStack position={"relative"} top={["-70px", "-100px", "-160px"]} zIndex={3} bgGradient='linear(to-b, transparent,rgb(227,230,230),rgb(227,230,230),rgb(227,230,230),rgb(227,230,230),rgb(227,230,230),rgb(227,230,230),rgb(227,230,230),rgb(227,230,230),rgb(227,230,230),rgb(227,230,230),rgb(227,230,230),rgb(227,230,230))'  >
                    <SimpleGrid w={"95%"} columns={[1, 2, 3, 4]} m={"auto"} spacing={[1, 3, 4]} >
                        {
                            cards.map((card, index) => {
                                return (
                                    <Link to={`products/${card.path}`}>
                                        <VStack bg={"rgb(234, 242, 242)"} w={"100%"} boxShadow={"2xl"} padding={4} spacing={4}>
                                            <Heading size={"md"}>{card.title}</Heading>
                                            <HStack width={"100%"} justifyContent={"center"}>
                                                <SimpleGrid columns={[4, 2, 2]} spacing={[1]} w={"100%"}>
                                                    {
                                                        card.image.map((image, index) => {
                                                            return (
                                                                <Box w={["100%", "80%", "100%"]} >
                                                                    <Image h={["60px", "80px", "100px"]} width={"100%"} src={image} alt={image.title} />
                                                                </Box>
                                                            )
                                                        }
                                                        )
                                                    }
                                                </SimpleGrid>
                                            </HStack>
                                        </VStack>
                                    </Link>
                                )
                            }
                            )
                        }
                    </SimpleGrid>

                    {
                        <Stack bg={"rgb(234, 242, 242)"} w={"100%"} boxShadow={"2xl"} padding={4} spacing={4}>
                            <Heading size={"md"}>Mens </Heading>
                            <Box width={"100%"} justifyContent={"center"}>
                                <Carousel cols={2} rows={1} gap={10} loop autoplay={5000} >
                                    {
                                        mens?.map((item, i) => {
                                            return (

                                                <Carousel.Item key={i}>
                                                    <ProductCard key={i}
                                                        image={item.image} title={item.title}
                                                        rating={item.rating} review={item.review}
                                                        price={item.price} mrp={item.mrp} category={item.category}
                                                        path={item.category}
                                                        _id={item._id}
                                                    />
                                                </Carousel.Item>
                                            )
                                        })

                                    }
                                </Carousel>
                            </Box>
                        </Stack>

                    }
                    {
                        <Stack bg={"rgb(234, 242, 242)"} w={"100%"} boxShadow={"2xl"} padding={4} spacing={4}>
                            <Heading size={"md"}>Womens </Heading>
                            <Box width={"100%"} justifyContent={"center"}>
                                <Carousel cols={4} rows={1} gap={10} loop autoplay={5000} >
                                    {
                                        womens?.map((item, i) => {
                                            return (

                                                <Carousel.Item key={i}>
                                                    <ProductCard key={i}
                                                        image={item.image} title={item.title}
                                                        rating={item.rating} review={item.review}
                                                        price={item.price} mrp={item.mrp} category={item.category}
                                                        path={item.category}
                                                        _id={item._id}
                                                    />
                                                </Carousel.Item>
                                            )
                                        })

                                    }
                                </Carousel>
                            </Box>
                        </Stack>
                    }

                    {
                        <Stack bg={"rgb(234, 242, 242)"} w={"100%"} boxShadow={"2xl"} padding={4} spacing={4}>
                            <Heading size={"md"}>Kids </Heading>
                            <Box width={"100%"} justifyContent={"center"}>
                                <Carousel cols={2} rows={1} gap={10} loop autoplay={5000} >
                                    {
                                        kids?.map((item, i) => {
                                            return (

                                                <Carousel.Item key={i}>
                                                    <ProductCard key={i}
                                                        image={item.image} title={item.title}
                                                        rating={item.rating} review={item.review}
                                                        price={item.price} mrp={item.mrp} category={item.category}
                                                        path={item.category}
                                                        _id={item._id}
                                                    />
                                                </Carousel.Item>
                                            )
                                        })

                                    }
                                </Carousel>
                            </Box>
                        </Stack>
                    }

                </VStack>
                <h1>hi mitro</h1>
            </Box>
            <Footer backToTop={backToTop} />
        </div>
    )
}

export default Home
