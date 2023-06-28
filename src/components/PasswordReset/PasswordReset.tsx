import { Stack, TextField, Typography, Button, FormControl } from '@mui/material';
import { useState } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import styles from './PasswordReset.module.css';


export default function PasswordReset() {
    const [error, setError] = useState("")
    const [confirm, setConfirm] = useState("");
    const [formInput, setformInput] = useState("");

    const passwordReset = () => {
        const auth = getAuth();
        sendPasswordResetEmail(auth, formInput)
            .then(() => {
                setConfirm("Password reset email sent!")
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

    return (
        <StyledEngineProvider injectFirst>
            <Stack spacing={3} className={styles['login-form']}>
                <Typography variant='h1'>Type your email</Typography>
                <FormControl>
                    <TextField
                        label='E-mail'
                        helperText={!confirm && !error ? "Please type in your E-Mail" : ""} 
                        name='email'
                        variant='outlined'
                        size='small'
                        required
                        onChange={(e) => setformInput(e.target.value)}
                    />
                    {confirm && <Typography color={'green'}>{confirm}</Typography>}
                    {error && <Typography color={'red'}>{error}</Typography>}
                    <Button variant='contained' size='medium' onClick={passwordReset}>Reset password</Button>
                </FormControl>
            </Stack>
        </StyledEngineProvider>
    )
}