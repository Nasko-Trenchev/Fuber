import { Typography, Stack, Button, Rating, Box, Snackbar, Link } from "@mui/material";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PlaceIcon from '@mui/icons-material/Place';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { StyledEngineProvider } from '@mui/material/styles'
import { useState, useCallback, useEffect } from "react";

import styles from './TitleContainer.module.css';

interface TitleProps {
    name: string | undefined,
    logo?: string | undefined,
    kitchenType: string | undefined,
    location: string | undefined,
    prizeRange: number | undefined,
    imageUrl: string | undefined,
    totalRating: {
        email: string,
        rating: number
    }[] | undefined,
    CoverImageList: string[] | undefined
}


export const TitleContainer: React.FC<TitleProps> = ({ name, logo, kitchenType, location, prizeRange, imageUrl, totalRating, CoverImageList }) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? (CoverImageList!.length - 1) : currentIndex - 1;
        setCurrentIndex(newIndex);
    }

    const goToNext = () => {
        const isLastSlide = currentIndex === CoverImageList!.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    }

    return (
        <StyledEngineProvider>
            <div className={styles["tittlePageContainer"]}>
                <Stack width={"75%"} spacing={1} direction={"row"} sx={{ marginBottom: '2em' }}>
                    <div className={styles["imgTitle"]}>
                        <img src="https://rezzo.bg/files/images/28715/fit_120_80.jpg" alt="1" />
                        <Stack spacing={1} sx={{ alignItems: "center", flexGrow: '0' }}>
                            <h1>{name}</h1>
                            <span>{location}</span>
                            <Rating
                                size='small'
                                readOnly
                                precision={0.5}
                                value={
                                    totalRating !== undefined ?
                                        Math.round(totalRating.map(function (x, i, arr) { return x.rating / arr.length }).reduce(function (a, b) { return a + b }) / 0.5) * 0.5
                                        : 0}
                            />
                        </Stack>
                        <Stack width={"100%"} direction={"row"} sx={{ justifyContent: 'center', alignContent: 'center' }}>
                            <Stack className={styles['titleIconsContainer']}>
                                <div className={styles['titleIcons']}>
                                    <RestaurantIcon fontSize='small' />
                                    <span>Kitchen type: {kitchenType}</span>
                                </div>
                                <div className={styles['titleIcons']}>
                                    <PlaceIcon fontSize='small' />
                                    <span>Location: {location}</span>
                                </div>
                                <div className={styles['titleIcons']}>
                                    <CreditCardIcon fontSize='small' />
                                    <span>Average prize: {prizeRange} лв</span>
                                </div>
                            </Stack>
                        </Stack>
                    </div>
                    <div className={styles['sliderStyles']}>
                        <div className={styles['leftArrow']} onClick={goToPrevious}><ArrowBackIosIcon sx={{ fontSize: '64px' }} /></div>
                        <div className={styles['rightArrow']} onClick={goToNext}><ArrowForwardIosIcon sx={{ fontSize: '64px' }} /></div>
                        <img src={CoverImageList?.[currentIndex]} alt="coverPhoto" />
                        <div className={styles['slideDots']}>
                            {CoverImageList?.map((slide, slideInex) => (
                                <div key={slideInex} onClick={() => goToSlide(slideInex)}><FiberManualRecordIcon fontSize="small" /></div>
                            ))}
                        </div>
                    </div>
                </Stack>
            </div>
        </StyledEngineProvider>
    )
}