import { AppBar, Toolbar, IconButton, Typography, Stack, Button, Badge } from "@mui/material";
import { StyledEngineProvider } from '@mui/material/styles';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Order } from "../../contexts/OrderContext";
import { auth } from "../../config/firebase";
import ShoppingCart from "../ShoppingCart/ShoppingCart";

import styles from './NavigationHeader.module.css';


export default function NavigationHeader() {

    const navigate = useNavigate();

    const { order, setShowOrder, showOrder } = Order();


    return (
        <StyledEngineProvider injectFirst>
            <AppBar position="static" className={styles["navBar"]}>
                <Toolbar>
                    <IconButton size="large" edge='start' color="inherit" aria-label="logo" onClick={() => { navigate('/') }}>
                        <DeliveryDiningIcon />
                    </IconButton>
                    <Typography variant="h6" component='div' sx={{ flexGrow: 1, fontFamily: 'Inter sans-serif', fontSize: '24px', fontStyle: 'italic' }}>
                        <NavLink to={'/'} className={styles['links']}>Fuber</NavLink>
                    </Typography>

                    <Stack direction={'row'}>
                        {auth.currentUser ?
                            <>
                                <Button color="inherit"><NavLink to={'/'} className={styles['links']}>Home</NavLink></Button>
                                <Button color="inherit"><NavLink to={'/logout'} className={styles['links']}>Logout</NavLink></Button>
                            </>
                            :
                            <>
                                <Button color="inherit"><NavLink to={'/register'} className={styles['links']}>Register</NavLink></Button>
                                <Button color="inherit"><NavLink to={'/login'} className={styles['links']}>Login</NavLink></Button>
                            </>
                        }
                    </Stack>
                    <IconButton size="large" edge='start' color="inherit" aria-label="logo" sx={{ margin: '1px' }}
                        onClick={() => navigate('/profile')}>
                        <AccountCircleIcon />
                    </IconButton>
                    <IconButton size="large" edge='start' color="inherit" aria-label="logo" sx={{ margin: '1px' }}>
                        <FacebookIcon />
                    </IconButton>
                    <IconButton size="large" edge='start' color="inherit" aria-label="logo" sx={{ margin: '1px' }}>
                        <InstagramIcon />
                    </IconButton>
                    <IconButton onClick={() => setShowOrder(!showOrder)} size="large" edge='start' color="inherit" aria-label="logo" sx={{ margin: '1px' }}>
                        <Badge color="primary" badgeContent={order.length || 0} sx={{ margin: '1px' }}>
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>

            {showOrder && <ShoppingCart />}
        </StyledEngineProvider>
    )
}