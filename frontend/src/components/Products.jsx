import { Box, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import ProductCard from './ProductCard'

export const Products = () => {
    const data = [{
        "image": "https://m.media-amazon.com/images/I/71zbz1O+hqL._AC_UY218_.jpg",
        "title": "OPPO A15s (Rainbow Silver, 4GB RAM, 64GB Storage) With No Cost EMI/Additional Exchange Offers",
        "rating": 4.2,
        "review": 10069,
        "price": 9990,
        "mrp": 13990,
        "category": "mobiles"
    },
    {
        "image": "https://m.media-amazon.com/images/I/61eTdIOfV1L._AC_UY218_.jpg",
        "title": "Google Pixel 7 5G (Obsidian, 8GB Ram 128GB Storage)",
        "rating": 4.2,
        "review": 15,
        "price": 55999,
        "mrp": 78999,
        "category": "mobiles"
    },
    {
        "image": "https://m.media-amazon.com/images/I/716uVx3Wr5L._AC_UY218_.jpg",
        "title": "OnePlus 10R 5G (Forest Green, 8GB RAM, 128GB Storage, 80W SuperVOOC)",
        "rating": 4.2,
        "review": 10984,
        "price": 34999,
        "mrp": 38999,
        "category": "mobiles"
    },
    {
        "image": "https://m.media-amazon.com/images/I/61VbKHdE0rL._AC_UY218_.jpg",
        "title": "iQOO Z6 Lite 5G by vivo (Stellar Green, 4GB RAM, 64GB Storage) | World's First Snapdragon 4 Gen 1 | 120Hz Refresh Rate | 5000mAh Battery | Travel Adapter to be Purchased Separately",
        "rating": 4.1,
        "review": 19097,
        "price": 13999,
        "mrp": 15999,
        "category": "mobiles"
    },
    {
        "image": "https://m.media-amazon.com/images/I/81zLNgcvlaL._AC_UY218_.jpg",
        "title": "Redmi Note 11 (Horizon Blue, 6GB RAM, 128GB Storage)|90Hz FHD+ AMOLED Display | Qualcomm® Snapdragon™ 680-6nm | 33W Charger Included",
        "rating": 4.1,
        "review": 50545,
        "price": 14499,
        "mrp": 19999,
        "category": "mobiles"
    },
    {
        "image": "https://m.media-amazon.com/images/I/61Aj6UW+yuL._AC_UY218_.jpg",
        "title": "iQOO Z6 Pro 5G by vivo (Phantom Dusk, 12GB RAM, 256GB Storage) | Snapdragon 778G 5G | 66W FlashCharge | 1300 nits Peak Brightness | HDR10+",
        "rating": 4.3,
        "review": 9441,
        "price": 28999,
        "mrp": 33990,
        "category": "mobiles"
    },
    {
        "image": "https://m.media-amazon.com/images/I/81zLNgcvlaL._AC_UY218_.jpg",
        "title": "Redmi Note 11 (Horizon Blue, 6GB RAM, 128GB Storage)|90Hz FHD+ AMOLED Display | Qualcomm® Snapdragon™ 680-6nm | 33W Charger Included",
        "rating": 4.1,
        "review": 50545,
        "price": 14499,
        "mrp": 19999,
        "category": "mobiles"
    },
    {
        "image": "https://m.media-amazon.com/images/I/518LiVorF-L._AC_UY218_.jpg",
        "title": "(Renewed) Nokia C01 Plus 4G, 5.45” HD+ Screen, Selfie Camera with Front Flash | 32GB Storage (Grey)",
        "rating": 3.1,
        "review": 41,
        "price": 4660,
        "mrp": 5998,
        "category": "mobiles"
    },
    {
        "image": "https://m.media-amazon.com/images/I/71sxlhYhKWL._AC_UY218_.jpg",
        "title": "Redmi 9A (Midnight Black 2GB RAM 32GB Storage) | 2GHz Octa-core Helio G25 Processor | 5000 mAh Battery",
        "rating": 4.1,
        "review": 313453,
        "price": 7290,
        "mrp": 7999,
        "category": "mobiles"
    },
    {
        "image": "https://m.media-amazon.com/images/I/61xGuU4UyEL._AC_UY218_.jpg",
        "title": "Lava Gem (Blue Gold), Speaker with Amplifier, PMMA 2.5D Glass, Military Grade Certified,1.3 MP Camera, Keypad Mobile",
        "rating": 4,
        "review": 6052,
        "price": 1680,
        "mrp": 2019,
        "category": "mobiles"
    },
    {
        "image": "https://m.media-amazon.com/images/I/81Prc5i7hML._AC_UY218_.jpg",
        "title": "Samsung Galaxy M13 (Stardust Brown, 4GB, 64GB Storage) | 6000mAh Battery | Upto 8GB RAM with RAM Plus",
        "rating": 4.1,
        "review": 18766,
        "price": 11999,
        "mrp": 14999,
        "category": "mobiles"
    }]
    return (
        <Box>
            <SimpleGrid columns={[2, 4, 5]} >
                
                 {data.map(()=><ProductCard/>)}
               

            </SimpleGrid>

        </Box>
    )
}
