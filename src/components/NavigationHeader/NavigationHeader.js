import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from "@mui/material";
import { StyledEngineProvider } from '@mui/material/styles'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import styles from './NavigationHeader.module.css'

export default function NavigationHeader() {

    return (
        <StyledEngineProvider injectFirst>
            <AppBar position="static" className={styles["navBar"]}>
                <Toolbar>
                    <IconButton size="large" edge='start' color="inherit" aria-label="logo">
                        <DeliveryDiningIcon />
                    </IconButton>
                    <Typography variant="h6" component='div' sx={{ flexGrow: 1 }}>
                        Fuber
                    </Typography>
                    <Stack direction={'row'} spacing={2}>
                        <Button color="inherit">Register</Button>
                        <Button color="inherit">Login</Button>
                        <Button color="inherit">Home</Button>
                    </Stack>
                </Toolbar>
            </AppBar>
        </StyledEngineProvider>
    )
}