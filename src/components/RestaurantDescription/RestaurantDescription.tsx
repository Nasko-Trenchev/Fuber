import { Stack } from "@mui/material"
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PlaceIcon from '@mui/icons-material/Place';
import CreditCardIcon from '@mui/icons-material/CreditCard';

import { StyledEngineProvider } from '@mui/material/styles'


import styles from './RestaurantDescription.module.css';

interface DescriptionProps {
    description: string | undefined,
    kitchenType: string | undefined,
    location: string | undefined,
    prizeRange: number | undefined,
}

const RestaurantDescription: React.FC<DescriptionProps> = ({ description, kitchenType, location, prizeRange }) => {

    return (
        <StyledEngineProvider>
            <div className={styles['restaurantDescriptionContainer']}>
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
                        <span>Average prize: {prizeRange} lv</span>
                    </div>
                </Stack>
                <Stack className={styles['restaurantDescription']}>
                    <h1>About us</h1>
                    <span>{description}</span>
                </Stack>
            </div>
        </StyledEngineProvider>
    )
}

export default RestaurantDescription;