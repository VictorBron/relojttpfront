import { Autocomplete, Button, Chip, Grid, IconButton, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Tabla from '../ui/Tabla'
import { getPersonal } from '../../services/apiPersonal'
import { deleteMarca, getListaMarcas } from '../../services/apiMarcas'


import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom'


const ListaMarcas = () => {

    const [formdata, setFormdata] = useState({
        id: '',
        fechauno: '',
        fechados: ''
    })

    const [data, setData] = useState([])
    const [personal, setPersonal] = useState([])
    const [seleccionado, setSeleccionado] = useState({})
    const obtenerPersonal = () => {
        getPersonal().then(res => setPersonal(res))
    }

    const columns = [
        {
            name: 'Movimiento',
            selector: row => (row.movimiento == "1") ? "Entrada" : (row.movimiento == "2") ? "Salida a Colación" : (row.movimiento == "3") ? "Entrada desde Colación" : "Salida"

        }, {
            name: 'Fecha',
            selector: row => {
                let item = row.fecha_marcaje.split(' ')
                return item[0]
            }
        }, {
            name: 'Hora',
            selector: row => {
                let item = row.fecha_marcaje.split(' ')
                return item[1]
            }
        }, {
            name: 'Acción',
            selector: row => <>
                <Stack direction={"row"}>
                    <IconButton onClick={() => eliminarMarca(row.id)} > <DeleteIcon /></IconButton>
                    <Link to={"/marca/editar/" + row.id}><IconButton  > <EditIcon /></IconButton></Link>
                </Stack>

            </>
        }
    ]


    const eliminarMarca = (id) => {

        swal({
            title: "¿Estas seguro?",
            text: "Al eliminar esta marca no podras recuperarlo",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    deleteMarca(id).then((res) => {
                        console.log(res)
                        swal("Marca eliminada correctamente", {
                            icon: "success",
                            timer: 2000,
                            buttons: false
                        })
                    }).then(() => listarMarcas())
                } else {
                    swal("No se elimino", {
                        buttons: false,
                        timer: 2000,
                        icon: "error",
                        buttons: false
                    });
                }
            })


    }

    const handleChange = (data) => {
        setSeleccionado(data)
        setFormdata({
            ...formdata,
            id: data.id
        })
    }

    const handleChangeDates = (e) => {
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    const listarMarcas = () => {
        getListaMarcas(formdata).then(response => setData(response))
    }

    useEffect(() => {
        obtenerPersonal()
    }, [])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sx={{ mb: 2 }}>
                <Typography variant="h4" component="h1" fontWeight={"bold"}>
                    Lista Marcas
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Autocomplete
                    fullWidth
                    options={personal}
                    required
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={(e, data) => handleChange(data)}
                    getOptionLabel={option => option.rut + " " + option.nombres + ' ' + option.apellido_paterno + ' ' + option.apellido_materno}
                    renderInput={(params) => <TextField required  {...params}
                        label="Personas"
                        helperText="Selecciona el perfil para ver marcas"
                    /*   error={} */
                    />
                    }
                />

            </Grid>
            <Grid item xs={4}>
                <TextField
                    type="date"
                    fullWidth
                    name="fechauno"
                    helperText="Día de inicio"
                    value={formdata.fechauno}
                    onChange={handleChangeDates}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    type="date"
                    fullWidth
                    helperText="Día de final"
                    value={formdata.fechados}
                    name="fechados"

                    onChange={handleChangeDates}

                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" size="large" fullWidth onClick={listarMarcas}>Buscar</Button>
            </Grid>
            <Grid item xs={12}>
                <Tabla data={data} columns={columns} />
            </Grid>
        </Grid>
    )
}

export default ListaMarcas