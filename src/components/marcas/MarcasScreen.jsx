import { Card, Grid, Typography } from '@mui/material'
import React from 'react'
import BuscadorPersona from './BuscadorPersona'

const MarcasScreen = () => {
    return (
        <Grid container>
            <Grid item xs={12} sx={{ mb: 2 }}>
                <Typography variant="h4" component="h1" fontWeight={"bold"}>
                    Agregar Marca
                </Typography>
            </Grid>
            <Card>
                <Grid item xs={12}>
                    <BuscadorPersona />
                </Grid>
            </Card>
        </Grid>
    )
}

export default MarcasScreen