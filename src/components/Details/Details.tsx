import { Typography, Stack, Button, ImageListItem, ImageListItemBar, Rating, Box} from "@mui/material";
import { StyledEngineProvider } from '@mui/material/styles'
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Order } from "../../contexts/OrderContext";
import Map from '../Map/Map';
import Comments from "../Comments/Comments";

import styles from './Details.module.css';
import Footer from "../Footer/Footer";

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

type SingleRestaurant = {
    ImageUrl: string,
    category: string,
    kitchenType: string,
    name: string,
    prizeRange: number,
    stars: number | null,
    totalRating: {
        email: string,
        rating: number
    }[]
    id: string,
    voterEmails: string[],
    location: string
};

interface RestaurantDetails {
    Dishes: Dish[],
}

export default function Details() {

    const [restaurant, setRestaurant] = useState<SingleRestaurant | null>(null)
    const [restaurantDetails, setRestaurantDetails] = useState<RestaurantDetails | null>(null)
    const [count, setCount] = useState<Record<string, number>>({});
    const { restaurantId, restaurantName } = useParams();

    const { order, addOrder, increaseAmout } = Order();

    const currentRestaurantRef = doc(db, "Restaurants", restaurantId!);
    const currentRestaurantCollectionRef = doc(db, "Restaurants", restaurantId!, "Details", restaurantName!);

    useEffect(() => {
        const getDetails = async () => {
            const docSnap = await getDoc(currentRestaurantCollectionRef);
            setRestaurantDetails(docSnap.data() as RestaurantDetails);
        }

        const getRestaurantData = async () => {
            const docSnap = await getDoc(currentRestaurantRef);
            setRestaurant(docSnap.data() as SingleRestaurant)
        }

        getRestaurantData();
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
        else if (count[name] === 10 && direction === "increase") {
            return;
        }
        else {
            setCount(value => ({ ...value, [name]: value[name] + directionMap[direction] * 1 }))
        }
    }

    const addToChart = (image: string, name: string, prize: number) => {

        const orderObj = {
            imageUrl: image,
            title: name,
            prize: prize,
            count: count[name],
            restaurantName: restaurantName as string,
        }
        setCount(value => ({ ...value, [name]: 0 }))
        const hasIncludedBefore = order.some(x => x.title === name);

        if (hasIncludedBefore) {
            increaseAmout(name, count[name])
        }
        else {
            addOrder(orderObj);
        }
    }

    return (
        <StyledEngineProvider injectFirst>
            <>
                <div className={styles['detailsPageContainer']}>
                    <div className={styles['detailsTitle']}>
                        <Typography variant="h1">{restaurantName}</Typography>
                        <Rating
                            size='medium'
                            readOnly
                            precision={0.5}
                            value={
                                restaurant?.totalRating !== undefined ?
                                    Math.round(restaurant?.totalRating.map(function (x, i, arr) { return x.rating / arr.length }).reduce(function (a, b) { return a + b }) / 0.5) * 0.5
                                    : 0}
                        />
                        <Box sx={{ ml: 2 }}>{`votes ${restaurant?.totalRating.length}`}</Box>
                    </div>
                    <div className={styles['mapPosition']}>
                        <div>
                            <Map />
                        </div>
                    </div>
                    <Stack width={"1200px"} direction='column' spacing={2} sx={{ backgroundColor: 'white' }}>
                        <>
                            {restaurantDetails?.Dishes.map((dish) => (
                                <Stack key={dish.name} spacing={2} direction='row' className={styles['menuItem']}>
                                    <Stack className={styles['menuItemImgContainer']}>
                                        <img src={dish.Image} alt="foodPicture" />
                                        <Rating
                                            className={styles['menuStars']}
                                            precision={0.5}
                                            size='medium'
                                        />
                                    </Stack>
                                    <Stack>
                                        <h2>{dish.name}</h2>
                                        <p>{dish.description}</p>
                                        <ul>
                                            {dish.Ingreadiants.map((ingreadiant, index, arr) => (
                                                index == arr.length - 1 ?
                                                    <li key={ingreadiant} className={styles['ingreadiants']}>{ingreadiant}</li>
                                                    :
                                                    <li key={ingreadiant} className={styles['ingreadiants']}>{ingreadiant},</li>
                                            ))}
                                        </ul>
                                    </Stack>
                                    <Stack direction='column' spacing={1} sx={{ placeItems: 'center', alignContent: 'center' }}>
                                        <Stack direction={'row'}>
                                            <Button disabled={count[dish.name] ? false : true} onClick={() => { changeCount(dish.name, "decrease") }} sx={{ maxWidth: '10px', maxHeight: '30px' }} >-</Button>
                                            <span>{count[dish.name] || 0}</span>
                                            <Button onClick={() => { changeCount(dish.name, "increase") }} sx={{ maxWidth: '10px', maxHeight: '30px' }} >+</Button>
                                        </Stack>
                                        <Stack className={styles['menuPrice']} sx={{ flexBasis: '50%', marginTop: '30px' }}>
                                            <Button disabled={count[dish.name] ? false : true} onClick={() => addToChart(dish.Image, dish.name, dish.price)}>Add to chart</Button>
                                            <p>{dish.price} лв.</p>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            ))}
                        </>
                    </Stack>
                    <div className={styles["commentSection"]}>
                        <Comments />
                    </div>
                </div >
                <Footer />
            </>
        </StyledEngineProvider>

    )
}