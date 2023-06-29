import { Typography, Stack, Container, Button, TextField } from "@mui/material";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";

import styles from './Details.module.css';

type Dish = {
    Image: string,
    Ingreadiants: string[],
    description: string,
    name: string,
    price: number,
    stars: number,
    totalRating: number[],
    type: string
}

interface RestaurantDetails {
    Dishes: Dish[],
}

export default function Details() {

    const [restaurantDetails, setRestaurantDetails] = useState<RestaurantDetails | null>(null)
    const { restaurantId, name } = useParams();

    const currentRestaurantRef = doc(db, "Restaurants", restaurantId!);
    const currentRestaurantCollectionRef = doc(db, "Restaurants", restaurantId!, "Details", name!);


    useEffect(() => {
        const getDetails = async () => {
            const docSnap = await getDoc(currentRestaurantCollectionRef);
            setRestaurantDetails(docSnap.data() as RestaurantDetails);
        }
        getDetails();
    }, [])

    return (
        <div className={styles['detailsPageContainer']}>
            <>{restaurantDetails?.Dishes.map((dish) => {
                <h1>{dish.name}</h1>
            })}
            </>
            <Typography variant="h1">Restaurant name</Typography>
            <Stack sx={{ border: '1px solid black' }} minWidth={"1200px"} direction='column' spacing={2}>
                <>
                    {restaurantDetails?.Dishes.map((dish) => (
                        <Stack spacing={2} direction='row' className={styles['menuItem']}>
                            <img src={dish.Image} alt="1" />
                            <Stack>
                                <h2>{dish.name}</h2>
                                <p className={styles['menuDescription']}>{dish.description}</p>
                                <ul>
                                    {dish.Ingreadiants.map((ingreadiant) => (
                                        <li>{ingreadiant},</li>
                                    ))}
                                </ul>
                            </Stack>
                            <Stack direction='column' spacing={1} sx={{ justifyContent: 'center', alignContent: 'center' }}>
                                <Stack direction={'row'} spacing={1}>
                                    <Button sx={{ maxWidth: '10px', maxHeight: '30px' }} >+</Button>
                                    <span>1</span>
                                    <Button sx={{ maxWidth: '10px', maxHeight: '30px' }} >-</Button>
                                </Stack>
                                <Stack sx={{ flexBasis: '50%', marginTop: '40px' }}>
                                    <Button >Add to chart</Button>
                                    <p>{dish.price} лв.</p>
                                </Stack>
                            </Stack>
                        </Stack>
                    ))}
                </>
            </Stack>
        </div>
    )
}