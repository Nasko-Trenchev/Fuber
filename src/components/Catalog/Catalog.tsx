import { Typography, Stack, ImageList, ImageListItem, IconButton, ImageListItemBar, Rating, FormControl, InputLabel, OutlinedInput, InputAdornment, InputBase } from '@mui/material'
import { StyledEngineProvider } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PlaceIcon from '@mui/icons-material/Place';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useState, useEffect, useCallback } from 'react';
import { db } from '../../config/firebase';
import { getDocs, collection, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { auth } from "../../config/firebase";
import { useNavigate } from 'react-router-dom';

import styles from './Catalog.module.css';

type RestaurantData = {
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
}[];

const restaurantsRef = collection(db, "Restaurants");

export default function Catalog() {

    const [restaurants, setRestaurants] = useState<RestaurantData>([]);
    const [searchResult, setSearchResult] = useState<string | null>('')

    const navigate = useNavigate();

    console.log(auth.currentUser?.email)

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

    const onSearchSubmit = (_event: React.ChangeEvent<{}>) => {
        setRestaurants(state => state.filter(x => x.name.toLowerCase().includes(searchResult!.toLowerCase())))
    }

    const onEnterClick = (key: string) => {
        if (key === "Enter") {
            setRestaurants(state => state.filter(x => x.name.toLowerCase().startsWith(searchResult!.toLowerCase())))
        }
    }

    const onSearch = (input: string) => {
        if (input === '') {
            getRestaurantData();
        }
        setSearchResult(input!)
    }

    return (
        <StyledEngineProvider injectFirst>
            <Stack spacing={2} className={styles["catalog"]}>
                <FormControl sx={{ m: 2, width: '35em' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-search">Search restaurant...</InputLabel >
                    <OutlinedInput
                        id="outlined-adornment-search"
                        type={'text'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    edge="end"
                                    onClick={onSearchSubmit}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Search restaurant..."
                        onChange={(e) => onSearch(e.target.value)}
                        onKeyDown={(e) => onEnterClick(e.key)}
                        onSelect={getRestaurantData}
                    />
                </FormControl>
                <ImageList sx={{ width: 1200 }} cols={5} gap={20}>
                    {restaurants?.map((item) => (
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
                            <ImageListItemBar className={styles['rating']}
                                title={
                                    <Rating className={styles['stars']}
                                        precision={0.5}
                                        size='medium'
                                        value={Math.round(item.totalRating.map(function (x, i, arr) { return x.rating / arr.length }).reduce(function (a, b) { return a + b }) / 0.5) * 0.5}
                                        readOnly={item.voterEmails.some(x => x === auth.currentUser?.email) || auth.currentUser === null}
                                        onChange={(event, newvalue) => rateRestaurant(event, newvalue, item.id)}
                                    />}
                                subtitle={
                                    <>                                   
                                        <div className={styles['catalogIcons']}>
                                            <RestaurantIcon fontSize='small' />
                                            <span>{item.kitchenType}</span>
                                        </div>

                                        <div className={styles['catalogIcons']}>
                                            <PlaceIcon fontSize='small' />
                                            <span>{item.location}</span>
                                        </div>
                                        <div className={styles['catalogIcons']}>
                                            <CreditCardIcon fontSize='small' />
                                            <span>{item.prizeRange} лв</span>
                                        </div>
                                    </>
                                }
                            />

                        </ImageListItem>
                    ))}

                </ImageList>
            </Stack>

        </StyledEngineProvider>

    )
}