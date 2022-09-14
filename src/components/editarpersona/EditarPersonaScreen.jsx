import { Button, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom"
import swal from 'sweetalert';
import { addPersonal, getPersonalById, updatePersonal } from '../../services/apiPersonal';
import ContactFormEdit from './ContactFormEdit';
import EmpresaFormEdit from './EmpresaFormEdit';
import PersonalDataFromEdit from './PersonalDataFormEdit';

const EditarPersonaScreen = () => {

    const { id } = useParams()
    const [dataform, setDataform] = useState({})

    const onChange = (e) => {
        setDataform({
            ...dataform,
            [e.target.name]: e.target.value
        })
    }

    const obtenerPersona = () => {
        getPersonalById(id).then(res => {
            setDataform({
                ...res,
                password: res.password ? res.password : "",
                password2: res.password ? res.password : ""
            })
        })
    }

    const editarPersona = () => {

        if (dataform.apellido_materno == "" || dataform.apellido_paterno == "" || dataform.calle == "" || dataform.comuna == "" || dataform.dv == "" || dataform.mail == "" || dataform.nombres == "" || dataform.numero == "" || dataform.sap == "" || dataform.region == "" || dataform.rut == "" || dataform.provincia == "") {
            swal({
                title: "Faltan campos",
                timer: 3000,
                icon: "error",
                buttons: false,
                text: "Rellena los campos requeridos *"
            })
        } else if (dataform.password != dataform.password2) {
            swal({
                timer: 3000,
                icon: "error",
                buttons: false,
                text: "Las claves no son iguales"
            })

        } else {
            updatePersonal(dataform).then(res => {
                console.log(res)
                if (res.status == 200) {
                    swal({
                        title: "Editado Correctamente",
                        text: "Personal editado correctamente!",
                        icon: "success",
                        timer: 2000,
                        buttons: false
                    });
                } else {
                    swal({
                        title: "Error al editar ",
                        text: "Error al editar datos persona",
                        icon: "error",
                        timer: 2000,
                        buttons: false
                    });
                }
            })
        }
    }





    const onSubmit = (e) => {
        e.preventDefault()
        editarPersona()
        /*  addPersonal({
             ...data,
             ...dataform
         }).then((res) => {
             if (res.status == 200) {
                 swal({
                     title: "Agregado Correctamente",
                     text: "Personal agregada correctamente!",
                     icon: "success",
                     timer: 2000,
                     buttons: false
                 });
             } else {
                 swal({
                     title: "Error al agregar personal",
                     text: "Contacta a tu proovedor del servicio",
                     icon: "error",
                     timer: 2000,
                     buttons: false
                 });
             }
         }).then(() => reset()) */

    }

    useEffect(() => {
        obtenerPersona()
    }, [])

    return (
        <Grid container >
            <Grid item xs={12} sx={{ mb: 2, display: "flex", justifyContent: "space-between" }} >
                <Typography variant="h4" component="h1" fontWeight={"bold"}>
                    Editar Persona
                </Typography>
                <Link to="/personal/lista">
                    <Button variant='contained'>
                        Volver Atras
                    </Button>
                </Link>
            </Grid>
            <Grid item xs={12}>
                <Box component="form" >
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <PersonalDataFromEdit dataform={dataform} setDataform={setDataform} onChange={onChange} />
                            <br />
                            <EmpresaFormEdit dataform={dataform} setDataform={setDataform} onChange={onChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ContactFormEdit dataform={dataform} setDataform={setDataform} onChange={onChange} />
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
            <Grid item xs={12} style={{
                position: "sticky",
                bottom: "0",
                zIndex: 999
            }}>
                <br />
                <Button onClick={onSubmit} variant='contained' size='large' fullWidth>Guardar</Button>
            </Grid>
        </Grid >
    )
}


export default EditarPersonaScreen