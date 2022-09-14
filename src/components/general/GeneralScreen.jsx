import { Button, Card, Grid, TextField, Typography } from '@mui/material'
import { saveAs } from 'file-saver'
import React, { useState } from 'react'
import { useEffect } from 'react'
import swal from 'sweetalert'
import { generaraInformeGeneral } from '../../services/apiInformes'
import Tabla from '../ui/Tabla'

import * as XLSX from "xlsx"

const columns = [
    {
        name: 'Rut',
        selector: row => row.RUT
    },
    {
        name: 'Nombres',
        selector: row => row.NOMBRES
    }, {
        name: 'Ape Paterno',
        selector: row => row.APELLIDO_PAT
    }, {
        name: 'Ape Materno',
        selector: row => row.APELLIDO_MAT
    }, {
        name: 'Movimiento',
        selector: row => row.MOVIMIENTO
    }, {
        name: 'Fecha',
        selector: row => row.FECHA
    }, {
        name: 'Hora',
        selector: row => row.HORA
    },
]

const GeneralScreen = () => {

    const [dataform, setDataform] = useState({
        fechauno: "",
        fechados: ""
    })

    const [data, setData] = useState([]);
    const [pendiente, setPendiente] = useState(false);

    /* function exportXLSX(lista) {

        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const fileName = 'Lista de insumos';
        const ws = XLSX.utils.json_to_sheet(lista
            .map(item => ({
                cInsumo: insumo.cInsumo,
                nombreInsumo: insumo.nombreInsumo,
                cantidad: insumo.cantidad,
                costo: insumo.costo,
            })));
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    } */


    const exportXLSX = () => {
        let wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);

        XLSX.utils.book_append_sheet(wb, ws, "Reporte");

        XLSX.writeFile(wb, "ReporteGenear.xlsx")
    }

    const generarInforme = (e) => {
        e.preventDefault()
        setPendiente(true)
        generaraInformeGeneral(dataform).then(res => {
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

    useEffect(() => {
        setPendiente(false)
    }, [data])


    /*   const crearTxt = () => {
  
          const blob = new Blob(["Hola que tal"], { type: 'text/plain;/charset=utf-8' })
  
          saveAs(blob, 'informeGeneral.txt');
      } */


    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sx={{ mb: 2 }}>
                <Typography variant="h4" component="h1" fontWeight={"bold"}>
                    Listado general
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
                        Exportar
                    </Button> : null
                }
            </Grid>
            <Grid item xs={12}>
                {
                    data.length > 0 ? <Card sx={{ p: 2 }}>
                        <Tabla data={data} columns={columns} pendiente={pendiente} />
                    </Card> : null
                }
            </Grid>
        </Grid>
    )
}

export default GeneralScreen