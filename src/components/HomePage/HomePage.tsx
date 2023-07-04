import { Typography, Box, ImageListItem, CircularProgress } from '@mui/material'
import { StyledEngineProvider } from '@mui/material/styles'
import { Suspense, lazy } from 'react';
import Footer from '../Footer/Footer';

import styles from './HomePage.module.css'



export default function HomePage() {

    const Catalog = lazy(() => import('../Catalog/Catalog'));

    return (
        <StyledEngineProvider injectFirst>
            <ImageListItem className={styles['homePageImage']}>
                <div>
                    <img src="../../../images/pexels-photo-326281.jpeg" alt="1" />
                </div>
            </ImageListItem>
            <div className={styles['homePageTitle']}>
                <Typography variant='h1' component={'h1'} sx={{ fontFamily: 'Inter sans-serif', fontSize: '18px', fontStyle: 'italic' }}
                    className={styles['homePage']}>
                    Fuber
                </Typography>
                <Typography component={'p'} sx={{ fontFamily: 'Inter sans-serif', fontSize: '18px', fontStyle: 'italic', textIndent: '5px' }}>
                    Welcome to <b>Fuber</b>, your one-stop solution for ordering delicious food from a variety of
                    restaurants, all in the comfort of your own home! Whether you're craving a
                    mouthwatering burger, a piping hot pizza, or a healthy salad, we've got you covered.
                </Typography>
                <Typography component={'p'} sx={{ fontFamily: 'Inter sans-serif', fontSize: '18px', fontStyle: 'italic', textIndent: '5px' }}>
                    <b>Fuber</b> has simplified the way you order food online,
                    making it effortless and convenient. Say goodbye to long queues and busy phone lines,
                    and say hello to a seamless, user-friendly experience that puts the power of choice at your fingertips.
                </Typography>
            </div>
            <Suspense fallback={<CircularProgress variant="determinate" value={100} />}>
                <Catalog />
                <Footer />
            </Suspense>
        </StyledEngineProvider>
    )
}