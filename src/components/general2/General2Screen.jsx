import React, { useState } from 'react'
import Tabla from '../ui/Tabla'
import { useEffect } from 'react'
import swal from 'sweetalert'


import { Button, Card, Grid, TextField, Typography } from '@mui/material'
import { generaraInformeGeneral2 } from '../../services/apiInformes'

import * as XLSX from "xlsx"
import DownloadIcon from '@mui/icons-material/Download';

const columns = [
    {
        name: 'Fecha',
        selector: row => row.FECHA
    },
    {
        name: 'rut',
        selector: row => row.RUT
    }, {
        name: 'Nombres',
        selector: row => row.NOMBRES
    }, {
        name: 'Ape Paterno',
        selector: row => row.APELLIDO_PATERNO
    }, {
        name: 'Ape Materno',
        selector: row => row.APELLIDO_MATERNO
    }, {
        name: 'Hora Entrada',
        selector: row => row.HORA_ENTRADA_TRABAJADOR
    }, {
        name: 'Hora Colacion1',
        selector: row => row.HORA_COLACION1
    }, {
        name: 'Hora Colacion2',
        selector: row => row.HORA_COLACION2
    }, {
        name: 'Hora Salida',
        selector: row => row.HORA_SALIDA_TRABAJADOR
    },
]

const General2Screen = () => {

    const [dataform, setDataform] = useState({
        fechauno: "",
        fechados: ""
    })
    const [data, setData] = useState([]);
    const [pendiente, setPendiente] = useState(false);

    const generarInforme = (e) => {
        e.preventDefault()
        setPendiente(true)
        generaraInformeGeneral2(dataform).then(res => {
            setData(res)
            console.log(res)
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

    const exportXLSX = () => {
        let wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);

        XLSX.utils.book_append_sheet(wb, ws, "Reporte");

        XLSX.writeFile(wb, "ReporteGenear2.xlsx")
    }

    useEffect(() => {
        setPendiente(false)
    }, [data])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sx={{ mb: 2 }}>
                <Typography variant="h4" component="h1" fontWeight={"bold"}>
                    Listado general original
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
                {
                    data.length > 0 ? <Button align='right'
                        size='small'
                        variant="contained"
                        title='Exportar Excel'
                        sx={{ p: '5px 15px', backgroundColor: "#00796b" }}
                        onClick={() => exportXLSX()}
                        fullWidth
                    >
                        <DownloadIcon />
                        Exportar Excel
                    </Button> : null
                }
            </Grid>
            <Grid item xs={12}>
                <Card sx={{ p: 2 }}>
                    {
                        data.length > 0 ? <Tabla data={data} columns={columns} pendiente={pendiente} /> : null
                    }
                </Card>
            </Grid>
        </Grid>
    )
}

export default General2Screen