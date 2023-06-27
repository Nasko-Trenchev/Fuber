import { Stack, TextField, Typography, Button, FormControl } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { UserAuth } from '../../contexts/UserContext';

import styles from './Login.module.css';

export default function Login() {

    const [formInput, setformInput] = useState({
        email: '',
        password: '',
    });

    const { loginUser } = UserAuth();
    const navigate = useNavigate();

    const onUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.name)
        console.log(e.target.value)
        setformInput(oldData => ({
            ...oldData,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            await loginUser(formInput.email, formInput.password)
            navigate('/');
        } catch (error) {
            setformInput({
                email: '',
                password: '',
            })
        }
    }

    return (
        <StyledEngineProvider injectFirst>
            <Stack spacing={3} className={styles['login-form']}>
                <Typography variant='h1'>Login</Typography>
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
                    <Button variant='contained' size='medium' onClick={onSubmit}>Login</Button>
                </FormControl>
            </Stack>
        </StyledEngineProvider>
    )
}