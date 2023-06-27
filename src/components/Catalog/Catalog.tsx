import { Typography, Stack, ImageList, ImageListItem, ImageListItemBar, Rating, Button } from '@mui/material'
import styles from './Catalog.module.css';
import { StyledEngineProvider } from '@mui/material/styles'
import { useState, useEffect } from 'react';


const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
        title: 'Bed',
    },
    {
        img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
        title: 'Kitchen',
    },
    {
        img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
        title: 'Sink',
    },
    {
        img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
        title: 'Books',
    },
    {
        img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
        title: 'Chairs',
    },
    {
        img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
        title: 'Candle',
    },
    {
        img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
        title: 'Laptop',
    },
    {
        img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
        title: 'Doors',
    },
    {
        img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
        title: 'Coffee',
    },
    {
        img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
        title: 'Storage',
    },
    {
        img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
        title: 'Coffee table',
    },
    {
        img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
        title: 'Blinds',
    },
];
export default function Catalog() {

    const [restaurants, setRestaurants] = useState([]);



    return (
        <StyledEngineProvider injectFirst>
            <Stack spacing={2} className={styles["catalog"]}>
                <ImageList sx={{ width: 1200 }} cols={5} gap={20} >
                    {itemData.map((item) => (
                        <ImageListItem key={item.img} sx={{ border: 1, borderColor: 'whitesmoke', borderRadius: 2, backgroundColor: 'white', ":hover": { boxShadow: 5 } }}>
                            <Typography variant='h6' gutterBottom sx={{ textAlign: 'center' }}>asddd</Typography>
                            <img src={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2`}
                                className={styles['images']}
                                alt={item.title}
                                loading='lazy'
                                onClick={() => console.log("Yes")}
                            />
                            {/* <ImageListItemBar title={item.title} subtitle="asd" actionIcon={<BookmarkIcon onClick={() => console.log("yes")} />} /> */}
                            <ImageListItemBar className={styles['rating']} title={<Rating className={styles['stars']}
                                precision={0.5}
                                size='medium'
                            />} />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Stack>
        </StyledEngineProvider>

    )
}