import { Card, CardContent, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

import FingerprintIcon from '@mui/icons-material/Fingerprint';




const PersonalDataFromEdit = ({ dataform, onChange }) => {
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
                                )
                            }}
                            label="Rut"
                            fullWidth
                            type={"number"}
                            value={dataform.rut}
                            onChange={onChange}
                            name="rut"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            inputProps={{ maxLength: 1 }}
                            type="text"
                            label="DV"
                            name="dv"
                            InputLabelProps={{ shrink: true }}

                            value={dataform.dv}
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            type="text"
                            InputLabelProps={{ shrink: true }}

                            label="Código Sap"
                            fullWidth
                            value={dataform.sap}
                            onChange={onChange}
                            name="sap"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            label="Nombres"
                            type="text"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={dataform.nombres ? dataform.nombres : null}
                            onChange={onChange}
                            name="nombres"

                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            InputLabelProps={{ shrink: true }}
                            label="Apellido Paterno"
                            fullWidth
                            disabled={false}
                            name="apellido_paterno"
                            onChange={onChange}
                            value={dataform.apellido_paterno}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            label="Apellido Materno"
                            fullWidth
                            name="apellido_materno"
                            InputLabelProps={{ shrink: true }}
                            onChange={onChange}
                            value={dataform.apellido_materno}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default PersonalDataFromEdit