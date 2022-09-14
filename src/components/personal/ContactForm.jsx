import { Autocomplete, Card, CardContent, FormHelperText, Grid, InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import EmailIcon from '@mui/icons-material/Email';
import EditRoadIcon from '@mui/icons-material/EditRoad';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import PasswordIcon from '@mui/icons-material/Password';
import { useState } from 'react';
import { getComunas, getProvincias, getRegiones } from '../../services/apiUbicacion';
import { ConstructionOutlined } from '@mui/icons-material';
const ContactForm = ({ register, errors, dataform, setDataform }) => {


    const [provincias, setProvincias] = useState([]);
    const [regiones, setRegiones] = useState([]);
    const [comunas, setComunas] = useState([]);
    const [provincia, setProvincia] = useState("");

    const obtenerProvincias = () => {
        getProvincias().then(res => setProvincias(res))
    }
    const obtenerRegiones = () => {
        getRegiones().then(res => setRegiones(res))
    }
    const obtenerComunas = () => {
        getComunas().then(res => setComunas(res))
    }


    useEffect(() => {
        obtenerProvincias()
        obtenerRegiones()
        obtenerComunas()
    }, [])

    return (
        <Card>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="span" component="h4">
                            Información de Contacto
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>

                        <TextField
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EditRoadIcon />
                                    </InputAdornment>
                                )
                            }}
                            label="Calle"
                            fullWidth
                            {
                            ...register('calleCasa', {
                                required: true
                            })
                            }
                            error={errors.calleCasa ? true : false}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <HomeIcon />
                                    </InputAdornment>
                                )
                            }}
                            label="Numero de Casa"
                            fullWidth
                            {
                            ...register('numeroCasa', {
                                required: true
                            })
                            }
                            error={errors.numeroCasa ? true : false}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ApartmentIcon />
                                    </InputAdornment>
                                )
                            }}

                            label="Depto"
                            fullWidth
                            {
                            ...register('depto', {
                                required: false
                            })
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete
                            fullWidth
                            options={regiones}
                            required
                            isOptionEqualToValue={(option, value) => option.region_id === value.region_id}
                            onChange={(e, data) => setDataform({
                                ...dataform,
                                region: data.region_id
                            }
                            )}
                            getOptionLabel={option => option.region_ordinal + " " + option.region_nombre}
                            renderInput={(params) => <TextField required  {...params}
                                label="Regiones"
                                helperText="Selecciona la Region"

                            /*   error={ } */
                            />
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>

                        <Autocomplete
                            fullWidth
                            options={provincias}
                            required
                            isOptionEqualToValue={(option, value) => option.provincia_id === value.provincia_id}
                            onChange={(e, data) => setDataform({
                                ...dataform,
                                provincia: data.provincia_id
                            }
                            )}
                            getOptionLabel={option => option.provincia_nombre}
                            renderInput={(params) => <TextField required  {...params}
                                label="Provincias"
                                helperText="Selecciona la provincia"
                            /*  error={errors.provincia ? true : false} */
                            /* {
                            ...register('provincia')
                            } */
                            />
                            }

                        />

                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete
                            fullWidth
                            options={comunas}
                            required
                            onChange={(e, data) => setDataform({
                                ...dataform,
                                comuna: data.comuna_id
                            }
                            )}
                            getOptionLabel={option => option.comuna_id + " " + option.comuna_nombre}
                            renderInput={(params) => <TextField required  {...params}
                                label="Comunas"
                                helperText="Selecciona Comuna"
                            /*  {
                             ...register('comuna', { required: true })
                             } */
                            /*   error={ } */
                            />
                            }
                            isOptionEqualToValue={(option, value) => option.comuna_id === value.comuna_id}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                )
                            }}
                            label="Email"
                            fullWidth
                            {
                            ...register('email', {
                                required: true
                            })
                            }
                            error={errors.email ? true : false}

                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default ContactForm