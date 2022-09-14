import { Card, CardContent, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

import FingerprintIcon from '@mui/icons-material/Fingerprint';




const PersonalDataFrom = ({ register, errors }) => {



    return (
        <Card>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="span" component="h4">
                            Datos Personales
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            onInput={(e) => {
                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 8)
                            }} // maxima cantidad de caracteres

                            type={"number"}
                            required
                            InputProps={{
                                inputProps: {
                                    type: 'number',
                                    min: 0, max: 6,
                                },
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FingerprintIcon />
                                    </InputAdornment>
                                ),

                            }}
                            label="Rut"
                            fullWidth
                            {
                            ...register('rut', {
                                required: true
                            })
                            }
                            error={errors.rut ? true : false}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            required
                            label="DV"
                            fullWidth
                            onInput={(e) => {
                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 1)
                            }}

                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FingerprintIcon />
                                    </InputAdornment>
                                )

                            }}

                            {
                            ...register('dv', {
                                required: true
                            })
                            }
                            error={errors.dv ? true : false}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            label="Código Sap"
                            fullWidth
                            {
                            ...register('codigoSap', {
                                required: true
                            })
                            }
                            error={errors.codigoSap ? true : false}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            label="Nombres"
                            fullWidth
                            {
                            ...register('nombres', {
                                required: true
                            })
                            }
                            error={errors.nombres ? true : false}

                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            label="Apellido Paterno"
                            fullWidth
                            {
                            ...register('apellidoPaterno', {
                                required: true

                            })
                            }
                            error={errors.apellidoPaterno ? true : false}

                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            label="Apellido Materno"
                            fullWidth
                            {
                            ...register('apellidoMaterno', {
                                required: true

                            })
                            }
                            error={errors.apellidoMaterno ? true : false}

                        />
                    </Grid>

                </Grid>
            </CardContent>
        </Card>
    )
}

export default PersonalDataFrom