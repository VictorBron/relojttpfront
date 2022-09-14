import { Alert, Button, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import AuthContext from '../../context/AuthContext'
import { login } from '../../services/apiLogin'

const LoginScreen = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const [click, setClick] = useState(false)

    const { auth, setAuth } = useContext(AuthContext);

    const onSubmit = (data) => {
        login(data).then(res => {
            res ?
                (
                    localStorage.setItem("auth", JSON.stringify({
                        ...res,
                        logged: true
                    })),
                    setAuth({
                        ...res,
                        logged: true
                    })
                )
                :
                null
        }).then(() => {
            console.log(auth.logged)
            if (!auth.logged) {
                setClick(true);
                setTimeout(() => {
                    setClick(false);
                }, 3000)
            }
        })
    }



    return (
        <Grid container height="100vh" display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item>
                <Typography component="h1" variant="h4" textAlign='center' m={2}>
                    Bienvenido
                </Typography>

                <Box component='form'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Grid container spacing={2} sx={{ p: 3 }}>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                fullWidth
                                type="text"
                                name="email"
                                error={errors.email ? true : false}
                                {
                                ...register('email',
                                    {
                                        required: true,
                                        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
                                    })
                                }
                            />
                            {
                                errors.email?.type === 'required' ? <Alert severity="error">Correo electronico requerido</Alert> : null
                            }


                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                name="password"
                                error={errors.password ? true : false}

                                {
                                ...register('password',
                                    {
                                        required: true
                                    })
                                }
                            />
                            {

                                errors.password && <Alert severity="error">La contraseña es requerida</Alert>
                            }
                            <br /> <br />
                            {
                                click ? <Alert severity="error">Usuario o Contraseña equivocada</Alert> : null
                            }
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained" size='large' type="submit" >
                                Iniciar Sesión
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Grid >
        </Grid >
    )
}

export default LoginScreen