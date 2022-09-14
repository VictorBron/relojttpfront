import { avatarClasses, Button, FormHelperText, Grid, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getMarcaById } from '../../services/apiMarcas'
import { editMarca } from '../../services/apiMarcas'

const EditMarca = () => {

    const { id } = useParams()
    console.log(id)
    const [data, setData] = useState({})
    const [cargando, setCargando] = useState(true)

    const submitEdit = () => {
        editMarca(data, id).then((res) => {
            console.log(res)
        }).then(() => {
            swal({
                title: "Marca editada",
                timer: 2500,
                buttons: false,
                icon: "success",
                text: "Marca editada correctamente"
            })
        })

    }

    const obtenerMarca = async () => {
        await getMarcaById(id).then(res => {
            setData(res[0])
            console.log(res[0])
            setCargando(false)
        })
    }

    const onChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        obtenerMarca()
    }, [])


    return (
        <Grid container>
            <Grid item xs={12} sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
                <h1>Editando Marca</h1>
                <Link to="/marcas/lista">
                    <Button variant='contained'>
                        Volver Atras
                    </Button>
                </Link>
            </Grid>
            <Grid item >
                {
                    cargando ? "Cargando..." : null
                }
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth
                    type='datetime-local'
                    name="fecha_marcaje"
                    onChange={onChange}
                    helperText="Selecciona dia y hora"
                    value={data.fecha_marcaje}
                    required
                />
            </Grid>
            <Grid item xs={12}>
                {
                    data.movimiento ? <Select
                        fullWidth
                        placeholder='Movimiento'
                        value={data.movimiento}
                        name="movimiento"
                        onChange={onChange}
                    >
                        <MenuItem value={1}>Entrada</MenuItem>
                        <MenuItem value={2}>Salida a Colación</MenuItem>
                        <MenuItem value={3}>Entrada desde Colación</MenuItem>
                        <MenuItem value={4}>Salida</MenuItem>
                    </Select> : null
                }
                <FormHelperText>Selecciona el tipo de movimiento</FormHelperText>
            </Grid>
            <Grid item xs={12}>
                <Button onClick={submitEdit} variant={'contained'} size="large" fullWidth> Actualizar Marca </Button>
            </Grid>
        </Grid>
    )
}

export default EditMarca