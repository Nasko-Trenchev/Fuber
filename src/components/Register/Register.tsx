import { Stack, TextField, Typography, Button, FormControl } from '@mui/material';
import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { UserAuth } from '../../contexts/UserContext';
import { User, getAuth, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";

import styles from './Register.module.css';

export const Register = () => {
    const [formInput, setformInput] = useState({
        email: '',
        password: '',
        rePassword: '',
    });

    const { user } = UserAuth();

    const email = user?.email;
    const { createUser } = UserAuth();
    const navigate = useNavigate();

    const onUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setformInput(oldData => ({
            ...oldData,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            await createUser(formInput.email, formInput.password)
            navigate('/');
        } catch (error) {
            setformInput({
                email: '',
                password: '',
                rePassword: '',
            })
        }
    }

    const onEmailVerification = () => {
        const auth = getAuth();
        sendEmailVerification(auth.currentUser as User)
            .then(() => {
                // Email verification sent!
                // ...
            });
    }

    const passwordReset = () => {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email as string)
            .then(() => {
                // Password reset email sent!
                // ..
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });

    }

    return (
        <StyledEngineProvider injectFirst>
            <Stack spacing={3} className={styles['login-form']}>
                <Typography variant='h1'>Register</Typography>
                <FormControl>
                    <TextField
                        label='E-mail'
                        helperText="Please type in your password"
                        name='email'
                        variant='outlined'
                        size='small'
                        required value={null}
                        onChange={onUserInput}
                    />
                    <TextField
                        label='Password'
                        helperText="Do not share this with anyone"
                        name='password'
                        type='password'
                        size='small'
                        required value={null}
                        onChange={onUserInput}
                    />
                    <TextField
                        label='Repeat Password'
                        helperText="Please type your password again"
                        name='rePassword'
                        type='password'
                        size='small'
                        required value={null}
                        onChange={onUserInput}
                    />
                    <Button variant='contained' size='medium' onClick={onSubmit}>Register</Button>
                    {/* <Button variant='contained' size='medium' onClick={onEmailVerification}>Verify</Button> */}
                    <NavLink to='/resetPassword'>Forgot your password?</NavLink>
                    {/* <Button variant='contained' size='medium' onClick={passwordReset}>Reset password</Button> */}
                </FormControl>
            </Stack>
        </StyledEngineProvider>
    )
}