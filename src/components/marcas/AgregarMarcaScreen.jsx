import { Autocomplete, Button, Card, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import { postMarca } from '../../services/apiMarcas'
import { getPersonal } from '../../services/apiPersonal'
import CloseIcon from '@mui/icons-material/Close';



const AgregarMarcaScreen = () => {

    const [dataform, setDataform] = useState({
        id: "",
        fecha_marcaje: "",
        ip: "WebApp",
        movimiento: "1",
        hasht: "HAstManual"
    })


    const [personal, setPersonal] = useState([])
    const [seleccionado, setSeleccionado] = useState({})
    const [openSnak, setOpenSnak] = useState(false)

    const obtenerPersonal = () => {
        getPersonal().then(res => {
            setPersonal(res)
        })
    }

    const handleClose = () => {
        setOpenSnak(false)
    }
    const handleChange = (data) => {
        setSeleccionado(data)
        setDataform({
            ...dataform,
            id: data.id
        })
    }

    const formChange = (e) => {
        setDataform({
            ...dataform,
            [e.target.name]: e.target.value
        })
    }


    const enviarMarca = (e) => {
        e.preventDefault();
        postMarca(dataform).then(() => {
            console.log("aa")
        });
        swal({
            title: "Agregado Correctamente",
            text: "Marca agregada correctamente!",
            icon: "success",
            timer: 2000,
            buttons: false
        });
        setOpenSnak(true)
        console.log(seleccionado, dataform);

    }


    useEffect(() => {
        obtenerPersonal()
    }, [])

    return (
        <Grid container >
            <Grid item xs={12} sx={{ mb: 2 }}>
                <Typography variant="h4" component="h1" fontWeight={"bold"}>
                    Agregar Marca
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <form onSubmit={enviarMarca}>
                    <Card sx={{ p: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item md={4}>
                                <Autocomplete
                                    fullWidth
                                    options={personal}
                                    required
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    onChange={(e, data) => handleChange(data)}
                                    getOptionLabel={option => option.rut + " " + option.nombres + " " + option.apellido_paterno + " " + option.apellido_materno}
                                    renderInput={(params) => <TextField required  {...params}
                                        label="Personas"
                                        helperText="Selecciona el perfil para agregar marca"
                                    /*   error={} */
                                    />
                                    }
                                />
                            </Grid>
                            <Grid item md={4}>

                                <TextField
                                    fullWidth
                                    type='datetime-local'
                                    name="fecha_marcaje"
                                    onChange={formChange}
                                    helperText="Selecciona dia y hora"
                                    value={dataform.fecha_marcaje}
                                    required
                                />
                            </Grid>
                            <Grid item md={4}>

                                <Select
                                    fullWidth
                                    placeholder='Movimiento'
                                    defaultValue={1}
                                    name="movimiento"
                                    onChange={formChange}
                                >

                                    <MenuItem value={1}>Entrada</MenuItem>
                                    <MenuItem value={2}>Salida a Colación</MenuItem>
                                    <MenuItem value={3}>Entrada desde Colación</MenuItem>
                                    <MenuItem value={4}>Salida</MenuItem>
                                </Select>
                                <FormHelperText>Selecciona el tipo de movimiento</FormHelperText>
                            </Grid>

                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" fullWidth size='large'>Agregar</Button>
                            </Grid>
                        </Grid>
                    </Card >
                </form>
            </Grid>
            <Snackbar
                open={openSnak}
                autoHideDuration={6000}
                onClose={handleClose}
                message={"Movimiento agragado a " + seleccionado.nombres}
            />
        </Grid >
    )
}

export default AgregarMarcaScreen