import { Button, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import ContactForm from './ContactForm';
import EmpresaForm from './EmpresaForm';
import PersonalDataFrom from './PersonalDataFrom';
import { addPersonal } from '../../services/apiPersonal';
import swal from 'sweetalert';

const AgregarPersonalScreen = () => {


    const { register, handleSubmit, control, getValues, watch, formState: { errors }, reset } = useForm()
    const [dataform, setDataform] = useState()

    const onSubmit = data => {
        console.log({
            ...data,
        })
        if (data.apellidoMaterno == "" || data.apellidoPaterno == "" || data.calleCasa == "" || data.codigoSap == "" || data.dv == "" || data.email == "") {
            swal({
                text: "Los campos con * son requeridos",
                timer: 3000,
                buttons:false,
                icon:"error"
            })
        } else if (data.password != data.password2) {
            swal({
                text: "Las claves deben ser iguales",
                timer: 3000,
                buttons:false,
                icon:"error"
            })
        } else {
            addPersonal({
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
            }).then(() => reset())
        }
    }

    return (
        <Grid container >
            <Grid item xs={12} sx={{ mb: 2 }}>
                <Typography variant="h4" component="h1" fontWeight={"bold"}>
                    Ingresar Personal
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Box component="form" >
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <PersonalDataFrom errors={errors} register={register} />
                            <br />
                            <EmpresaForm errors={errors} register={register} watch={watch} getValues={getValues} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ContactForm errors={errors} register={register} dataform={dataform} setDataform={setDataform} />
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
                <Button onClick={handleSubmit(onSubmit)} variant='contained' size='large' fullWidth>Guardar</Button>
            </Grid>
        </Grid >
    )
}


export default AgregarPersonalScreen