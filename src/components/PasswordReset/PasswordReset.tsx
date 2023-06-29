import { Stack, TextField, Typography, Button, FormControl, Snackbar, AlertProps, Alert } from '@mui/material';
import { useState, forwardRef } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import styles from './PasswordReset.module.css';

const SnackbarAlert = forwardRef<HTMLDivElement, AlertProps>(
    function SnackbarAlert(props, ref) {
        return <Alert elevation={6} ref={ref} {...props} />
    }
)

export default function PasswordReset() {
    const [error, setError] = useState("")
    const [formInput, setformInput] = useState("");
    const [open, setOpen] = useState(false);

    const passwordReset = () => {
        const auth = getAuth();
        setOpen(true);
        sendPasswordResetEmail(auth, formInput)
            .then(() => {
                setOpen(true)
                // Password reset email sent!
                // ..
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorMessage.includes("auth/user-not-found")) {
                    setError("There is no account related with this email!")
                }
                else if (errorMessage.includes("auth/invalid-email")) {
                    setError("Invalid email!")
                }
                else if (errorMessage.includes("auth/missing-email")) {
                    setError("Plase type in your email!")
                }
                else {
                    return
                }
                // ..
            });
    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false);
    }

    return (
        <StyledEngineProvider injectFirst>
            <Stack spacing={3} className={styles['login-form']}>
                <Typography variant='h1'>Type your email</Typography>
                <FormControl>
                    <TextField
                        label='E-mail'
                        helperText={!error ? "Please type in your E-Mail" : ""}
                        name='email'
                        variant='outlined'
                        size='small'
                        required
                        onChange={(e) => setformInput(e.target.value)}
                    />
                    {error && <Typography color={'red'}>{error}</Typography>}
                    <Button variant='contained' size='medium' onClick={passwordReset} className={styles['resetBtn']}>Reset password</Button>
                    <Snackbar
                        open={open}
                        onClose={handleClose}
                        autoHideDuration={40000}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center'
                        }} >
                        <SnackbarAlert onClose={handleClose} severity='success'>
                            Email for password reset was sent!
                        </SnackbarAlert>
                    </Snackbar>
                </FormControl>
            </Stack>
        </StyledEngineProvider>
    )
}