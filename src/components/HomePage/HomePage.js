import { Typography } from '@mui/material'
import { StyledEngineProvider } from '@mui/material/styles'
import styles from './HomePage.module.css'
import Catalog from '../Catalog/Catalog'


export default function HomePage() {
    return (
        <StyledEngineProvider injectFirst>
            <Typography variant='h1' component={'h1'} className={styles['homePage']}>
                Welcome to Fuber
            </Typography>
            <Typography variant='subtitle1' component={'p'}>
                Browse restaurants
            </Typography>
            <Catalog/>
        </StyledEngineProvider>
    )
}