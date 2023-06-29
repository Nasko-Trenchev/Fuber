import { Typography, Stack, ImageList, ImageListItem, ImageListItemBar, Rating, Box, CircularProgress } from '@mui/material'
import { StyledEngineProvider } from '@mui/material/styles'
import { useState, useEffect, useCallback } from 'react';
import { db } from '../../config/firebase';
import { getDocs, collection, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { auth } from "../../config/firebase";
import { useNavigate } from 'react-router-dom';

import styles from './Catalog.module.css';

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

    const navigate = useNavigate();

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
                <section>
                    <ul>
                        <li>New</li>
                        <li>Most popular</li>
                        <li>Best rated</li>
                    </ul>
                </section>
                <ImageList sx={{ width: 1200 }} cols={5} gap={20}>

                    {restaurants.map((item) => (
                            <ImageListItem
                                key={item.id}
                                sx={{ border: 1, borderColor: 'whitesmoke', borderRadius: 2, backgroundColor: 'white', ":hover": { boxShadow: 5 } }}

                            >
                                <Typography variant='h6' gutterBottom sx={{ textAlign: 'center' }}>{item.name}</Typography>
                                <img src={`${item.ImageUrl}`}
                                    className={styles['images']}
                                    alt={item.name}
                                    loading='lazy'
                                    onClick={() => (navigate(`/restaurant/${item.id}/${item.name}`))}
                                />
                                {/* <ImageListItemBar title={item.title} subtitle="asd" actionIcon={<BookmarkIcon onClick={() => console.log("yes")} />} /> */}
                                <ImageListItemBar className={styles['rating']} title={<Rating className={styles['stars']}
                                    precision={0.5}
                                    size='medium'
                                    value={Math.round(item.totalRating.map(function (x, i, arr) { return x / arr.length }).reduce(function (a, b) { return a + b }) / 0.5) * 0.5}
                                    readOnly={item.voterEmails.some(x => x === auth.currentUser?.email) || auth.currentUser === null}
                                    onChange={(event, newvalue) => rateRestaurant(event, newvalue, item.id)}
                                />} />
                            </ImageListItem>
                    ))}

                </ImageList>
            </Stack>

        </StyledEngineProvider>

    )
}