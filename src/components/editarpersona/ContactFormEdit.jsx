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

const ContactFormEdit = ({ dataform, onChange, setDataform }) => {


    const [provincias, setProvincias] = useState([]);
    const [regiones, setRegiones] = useState([]);
    const [comunas, setComunas] = useState([]);


    const [region, setRegion] = useState()
    const [provincia, setProvincia] = useState();
    const [comuna, setComuna] = useState();

    const obtenerProvincias = () => {
        getProvincias().then(res => setProvincias(res))
    }
    const obtenerRegiones = () => {
        getRegiones().then(res => {
            setRegiones(res)
            return res
        })
    }
    const obtenerComunas = () => {
        getComunas().then(res => setComunas(res))
    }
    useEffect(() => {
        const encontrada = regiones.find(item => item.region_id == dataform.region)
        setRegion(encontrada)
    }, [regiones])

    useEffect(() => {
        const encontrada = provincias.find(item => item.provincia_id == dataform.provincia)
        setProvincia(encontrada)
    }, [provincias])

    useEffect(() => {
        const encontrada = comunas.find(item => item.comuna_id == dataform.comuna)
        setComuna(encontrada)
    }, [comunas])

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
                            name="calle"
                            value={dataform.calle}
                            onChange={onChange}
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
                            name="numero"
                            value={dataform.numero}
                            onChange={onChange}
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
                            name="depto"
                            value={dataform.depto}
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        {
                            region ? <Autocomplete
                                fullWidth
                                options={regiones}
                                value={
                                    region
                                }
                                required
                                isOptionEqualToValue={(option, value) => option.region_id === value.region_id}
                                onChange={(e, data) => setDataform({
                                    ...dataform,
                                    region: data.region_id
                                }
                                )}
                                getOptionLabel={option => option.region_nombre}
                                renderInput={(params) => <TextField required  {...params}
                                    label="Region"
                                    helperText="Selecciona la region"
                                />
                                }
                            /> : null
                        }
                    </Grid>
                    <Grid item xs={6}>
                        {
                            provincia ?
                                <Autocomplete
                                    fullWidth
                                    options={provincias}
                                    value={
                                        provincia
                                    }
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
                                    />
                                    }
                                /> : null
                        }

                    </Grid>
                    <Grid item xs={6}>
                        {
                            comuna ?
                                <Autocomplete
                                    fullWidth
                                    options={comunas}
                                    value={
                                        comuna
                                    }
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
                                    />
                                    }
                                    isOptionEqualToValue={(option, value) => option.comuna_id === value.comuna_id}
                                /> : null
                        }
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
                            name="mail"
                            value={dataform.mail}
                            onChange={onChange}
                        />
                    </Grid>
                </Grid>
            </CardContent>

        </Card>
    )

}

export default ContactFormEdit