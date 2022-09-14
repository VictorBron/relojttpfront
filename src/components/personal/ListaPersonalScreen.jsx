import { Grid, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { deletePersonal, getPersonal } from '../../services/apiPersonal'
import Tabla from '../ui/Tabla'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link } from 'react-router-dom'
import swal from 'sweetalert';






const ListaPersonalScreen = () => {
    const [data, setData] = useState([])
    const columns = [
        {
            name: 'id',
            selector: row => row.id,
            sortable: true
        },
        {
            name: "Rut",
            selector: row => row.rut + '-' + row.dv,
            sortable: true

        },
        {
            name: "SAP",
            selector: row => row.sap,
            sortable: true

        },
        {
            name: "Apellidos",
            selector: row => row.apellido_paterno + ' ' + row.apellido_materno,
            sortable: true
        },
        {
            name: "Nombres",
            selector: row => row.nombres,
            sortable: true
        },
        {
            name: "Email",
            selector: row => (row.mail == 0 ? "No" : row.mail),
            sortable: true
        },
        {
            name: "Perfil",
            selector: row => row.nombre,
            sortable: true
        },
        {
            name: "Recibe Email",
            selector: row => row.acepta_mail,
            sortable: true
        },
        {
            name: "Acciones",
            selector: row => (
                <Stack direction={'row'}>
                    <Link to={"/persona/" + row.id} >
                        <IconButton aria-label="Ver" size="small">
                            <RemoveRedEyeIcon fontSize="inherit" />
                        </IconButton>
                    </Link>
                    <IconButton aria-label="Eliminar" size="small" onClick={() => eliminarPersona(row.id)}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>

                    <Link to={"/editar-persona/" + row.id}>
                        <IconButton aria-label="Editar" size="small">
                            <EditIcon fontSize="inherit" />
                        </IconButton>
                    </Link>
                </Stack>
            )

        },
    ]

    const [pendiente, setPendiente] = useState(false)

    const obtenerPersonal = () => {
        setPendiente(true)
        getPersonal().then(res => {
            setData(res)
            setPendiente(false)
        })
    }

    const eliminarPersona = (id) => {
        swal({
            title: "¿Estas seguro?",
            text: "Al eliminar este perfil no podras recuperarlo",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    deletePersonal(id).then(() => swal({
                        title: "Perfil eliminado",
                        icon: "success",
                        timer: 2000
                    })).then(() => obtenerPersonal())
                } else {
                    swal("No se elimino", {
                        buttons: false,
                        timer: 2000,
                        icon: "error"
                    });
                }
            })
    }

    useEffect(() => {
        obtenerPersonal()
    }, [])

    return (
        <>
            <Grid item xs={12} sx={{ mb: 2 }}>
                <Typography variant="h4" component="h1" fontWeight={"bold"} >
                    Lista Personal
                </Typography>
            </Grid>
            <Tabla data={data} columns={columns} pendiente={pendiente} />
        </>
    )
}

export default ListaPersonalScreen