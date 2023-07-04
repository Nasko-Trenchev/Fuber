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
    type: string,
}

type Orders = {
    Order: {
        meal: Dish[],
        count: 0
    }[]
}

interface RestaurantDetails {
    Dishes: Dish[],
}

type Count = {
    obj: {
        name: string

    }
}


export default function Details() {

    const [restaurantDetails, setRestaurantDetails] = useState<RestaurantDetails | null>(null)
    const [count, setCount] = useState<Record<string, number>>({});
    const [order, setOrder] = useState<Orders | null>(null);
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

    const changeCount = (name: string, direction: "decrease" | "increase") => {
        const directionMap = {
            decrease: -1,
            increase: 1
        }
        if (count[name] === undefined) {
            setCount(value => ({ ...value, [name]: 1 }))
            return;
        } else if (count[name] === 0 && direction === "decrease") {
            return;
        }
        setCount(value => ({ ...value, [name]: value[name] + directionMap[direction] * 1 }))
    }

    return (
        <div className={styles['detailsPageContainer']}>
            <>{restaurantDetails?.Dishes.map((dish) => {
                <h1>{dish.name}</h1>
            })}
            </>
            <Typography variant="h1">{name}</Typography>
            <Stack sx={{ border: '1px solid black' }} minWidth={"1200px"} direction='column' spacing={2}>
                <>
                    {restaurantDetails?.Dishes.map((dish) => (
                        <Stack key={dish.name} spacing={2} direction='row' className={styles['menuItem']}>
                            <div className={styles['menuItemImgContainer']}>
                                <img src={dish.Image} alt="foodPicture" />
                            </div>
                            <Stack className={styles['descriptionContainer']}>
                                <h2>{dish.name}</h2>
                                <p>{dish.description}</p>
                                <ul>
                                    {dish.Ingreadiants.map((ingreadiant) => (
                                        <li key={ingreadiant} className={styles['ingreadiants']}>{ingreadiant},</li>
                                    ))}
                                </ul>
                            </Stack>
                            <Stack direction='column' spacing={1} sx={{ justifyContent: 'center', alignContent: 'center' }}>
                                <Stack direction={'row'}>

                                    {/* <form>
                                        <input type="number" value={1} id={dish.name}/>
                                        <button>+</button>
                                        <button>-</button>
                                    </form> */}
                                    <Button onClick={() => { changeCount(dish.name, "increase") }} sx={{ maxWidth: '10px', maxHeight: '30px' }} >+</Button>
                                    <span>{count[dish.name] || 0}</span>
                                    {/* <label htmlFor="count">+</label>
                                    <input type="button" id="count" className={styles['test']} value={1}></input>
                                    <label htmlFor="count">-</label> */}
                                    <Button onClick={() => { changeCount(dish.name, "decrease") }} sx={{ maxWidth: '10px', maxHeight: '30px' }} >-</Button>
                                </Stack>
                                <Stack className={styles['menuPrice']} sx={{ flexBasis: '50%', marginTop: '30px' }}>
                                    <Button>Add to chart</Button>
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