import { avatarClasses, Button, FormHelperText, Grid, MenuItem, Modal, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getMarcaById } from '../../services/apiMarcas'
import { editMarca } from '../../services/apiMarcas'
import EditIcon from '@mui/icons-material/Edit';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const EditMarca = ({ row, listarMarcas }) => {

    const [data, setData] = useState({})
    const [cargando, setCargando] = useState(true)
    const [open, setOpen] = useState(false);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const abrirModal = () => {
        obtenerMarca()
        handleOpen();
    }

    const cerrarModal = () => {
        handleClose();
    }

    const submitEdit = () => {
        editMarca(data, row.id).then((res) => {
            console.log(res)
        }).then(() => {
            swal({
                title: "Marca editada",
                timer: 2500,
                buttons: false,
                icon: "success",
                text: "Marca editada correctamente"
            })
        }).then(() => {
            listarMarcas()
            handleClose()
        })

    }

    const obtenerMarca = async () => {
        await getMarcaById(row.id).then(res => {
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


    return (
        <>
            <Button onClick={abrirModal}
                type={'submit'}
                name={'editar'}
                color="primary"
                endIcon={<EditIcon />}></Button>
            <Modal
                open={open}
                onClose={cerrarModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Grid container sx={style}>
                    <Grid item xs={12} sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
                        <h1>Editando Marca</h1>
                        <Link to="/marcas/lista">
                            <Button variant='contained' onClick={cerrarModal}>
                                Cancelar
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
            </Modal>

        </>
    )
}

export default EditMarca