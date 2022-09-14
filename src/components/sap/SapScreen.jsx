import { Button, Card, Grid, TextField, Typography } from '@mui/material'
import { saveAs } from 'file-saver';
import React, { useEffect } from 'react'
import { useState } from 'react'
import swal from 'sweetalert';
import { generaraInformeSap } from '../../services/apiInformes';
import Tabla from '../ui/Tabla';


const columns = [
    {
        name: 'SATZA',
        selector: row => row.campo1
    }, {
        name: 'TERID	',
        selector: row => row.campo2
    }, {
        name: 'LDATE',
        selector: row => row.campo3
    }, {
        name: 'LTIME',
        selector: row => row.campo4
    }, {
        name: 'ERDAT',
        selector: row => row.campo5
    }, {
        name: 'ERTIM',
        selector: row => row.campo6
    }, {
        name: 'ZAUSW',
        selector: row => row.campo7
    }, {
        name: 'PERNR',
        selector: row => row.campo8
    }
]

const SapScreen = () => {

    const [dataform, setDataform] = useState({
        fechauno: "",
        fechados: ""
    })

    const [data, setData] = useState([]);
    const [valortxt, setValortxt] = useState("Hola");
    const [pendiente, setPendiente] = useState(false)

    const generarInforme = (e) => {
        e.preventDefault()
        setPendiente(true)

        generaraInformeSap({
            fechauno: dataform.fechauno + " 00:00:00",
            fechados: dataform.fechados + " 23:59:59"
        }).then(res => {
            console.log(res)
            setData(res)
            if (res.length === 0) {
                swal("Noy hay datos para generar el informe", {
                    timer: 3000,
                    buttons: false,
                    icon: "error"
                })
                setPendiente(false)
            }
        }).catch(() => {
            setPendiente(false)
            swal("Noy hay datos para generar el informe", {
                timer: 3000,
                buttons: false,
                icon: "error"
            })
        })
    }

    const handleChange = (e) => {
        setDataform({
            ...dataform,
            [e.target.name]: e.target.value
        })
    }

    const crearTxt = () => {
        let texto = ''

        console.log(data)

        data.forEach(item => {
            
            texto = texto.concat(item.campo1 + item.campo2 + item.campo3 + item.campo4 + item.campo5 + item.campo6 + item.campo7 + item.campo8 + "\n")
        })

        const nombreArchivo = dataform.fechauno + " " + dataform.fechados

        const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' })
        saveAs(blob, `${dataform.fechauno + " " + dataform.fechados}`)
    }

    useEffect(() => {
        setPendiente(false)
    }, [data])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sx={{ mb: 2 }}>
                <Typography variant="h4" component="h1" fontWeight={"bold"}>
                    Informe SAP
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body" component="body" fontWeight={"bold"}>
                    Rango de fechas
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <form onSubmit={generarInforme}>
                    <Grid container spacing={2} >
                        <Grid item md={6}>
                            <TextField type="date" name="fechauno" fullWidth helperText="Rango de fecha inicial" required onChange={handleChange} />
                        </Grid>
                        <Grid item md={6}>
                            <TextField type="date" name="fechados" fullWidth helperText="Rango de fecha final" required onChange={handleChange} />
                        </Grid>
                        <Grid item md={12}>
                            <Button type="submit" variant="contained" size="large" fullWidth>
                                Generar Informe
                            </Button>
                        </Grid>
                    </Grid>
                </form>

            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={crearTxt}>
                    Guardar txt
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Card sx={{ p: 2 }}>
                    <Tabla data={data} columns={columns} pendiente={pendiente} />
                </Card>
            </Grid>
        </Grid>
    )
}

export default SapScreen