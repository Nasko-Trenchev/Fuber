import { Typography, Stack, ImageList, ImageListItem, ImageListItemBar, Rating, Button } from '@mui/material'
import styles from './Catalog.module.css';
import { StyledEngineProvider } from '@mui/material/styles'
import { useState, useEffect, useCallback } from 'react';
import { db } from '../../config/firebase';
import { getDocs, collection, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { auth } from "../../config/firebase";


// const itemData = [
//     {
//         img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
//         title: 'Bed',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
//         title: 'Kitchen',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
//         title: 'Sink',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
//         title: 'Books',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
//         title: 'Chairs',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
//         title: 'Candle',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
//         title: 'Laptop',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
//         title: 'Doors',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
//         title: 'Coffee',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
//         title: 'Storage',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
//         title: 'Coffee table',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
//         title: 'Blinds',
//     },
// ];

type RestaurantData = {
    ImageUrl: string,
    category: string,
    kitechenType: string,
    name: string,
    prizeRange: number,
    stars: number | null,
    totalRating: number[],
    id: string,
    voterEmails: string[]
}[];

const restaurantsRef = collection(db, "Restaurants");

export default function Catalog() {

    const [restaurants, setRestaurants] = useState<RestaurantData>([]);
    const getRestaurantData = useCallback(async () => {
        const data = await getDocs(restaurantsRef);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as RestaurantData;
        setRestaurants(filteredData);
    }, [])

    useEffect(() => {
        getRestaurantData();
    }, [getRestaurantData])

    const rateRestaurant = async (_event: React.ChangeEvent<{}>, newValue: number | null, reference: string) => {
        const currentRestaurantRef = doc(db, "Restaurants", `${reference}`);

        await updateDoc(currentRestaurantRef, {
            stars: newValue,
            voterEmails: arrayUnion(auth.currentUser?.email),
            totalRating: arrayUnion(newValue)
        })
        setRestaurants(state => state.map(x => {
            if (x.id === reference) {
                return { ...x, "stars": newValue, "voterEmails": [...x.voterEmails, auth.currentUser?.email as string] }
            }
            return x;
        }))
    }

    return (
        <StyledEngineProvider injectFirst>
            <Stack spacing={2} className={styles["catalog"]}>
                <ImageList sx={{ width: 1200 }} cols={5} gap={20}>
                    {restaurants.map((item) => (
                        <ImageListItem key={item.id} sx={{ border: 1, borderColor: 'whitesmoke', borderRadius: 2, backgroundColor: 'white', ":hover": { boxShadow: 5 } }}>
                            <Typography variant='h6' gutterBottom sx={{ textAlign: 'center' }}>{item.name}</Typography>
                            <img src={`${item.ImageUrl}`}
                                className={styles['images']}
                                alt={item.name}
                                loading='lazy'
                            />
                            {/* <ImageListItemBar title={item.title} subtitle="asd" actionIcon={<BookmarkIcon onClick={() => console.log("yes")} />} /> */}
                            <ImageListItemBar className={styles['rating']} title={<Rating className={styles['stars']}
                                precision={0.5}
                                size='medium'
                                value={Math.round(item.totalRating.map(function (x, i, arr) { return x / arr.length }).reduce(function (a, b) { return a + b }) / 0.5) * 0.5}
                                readOnly={item.voterEmails.some(x => x === auth.currentUser?.email) || auth.currentUser === null }
                                onChange={(event, newvalue) => rateRestaurant(event, newvalue, item.id)}
                            />} />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Stack>
        </StyledEngineProvider>

    )
}