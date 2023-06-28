import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from "@mui/material";
import { StyledEngineProvider } from '@mui/material/styles';
import { NavLink, useNavigate } from 'react-router-dom';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import { auth } from "../../config/firebase";

import styles from './NavigationHeader.module.css';


export default function NavigationHeader() {

    const navigate = useNavigate();

    return (
        <StyledEngineProvider injectFirst>
            <AppBar position="static" className={styles["navBar"]}>
                <Toolbar>
                    <IconButton size="large" edge='start' color="inherit" aria-label="logo" onClick={() => { navigate('/') }}>
                        <DeliveryDiningIcon />
                    </IconButton>
                    <Typography variant="h6" component='div' sx={{ flexGrow: 1 }}>
                        <NavLink to={'/'} className={styles['links']}>Fuber</NavLink>
                    </Typography>
                    <Stack direction={'row'} spacing={2}>
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
                </Toolbar>
            </AppBar>
        </StyledEngineProvider>
    )
}