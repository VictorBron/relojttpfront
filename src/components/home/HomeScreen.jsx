import { Grid, Typography } from '@mui/material'
import React from 'react'
import logo from '../../assets/LOGO.fw.png'
const HomeScreen = () => {
  return (
    <Grid container display={'flex'} justifyContent={'center'} alignContent="center" height={"80vh"}>
      <Typography variant="h1" component="h1" sx={{ fontWeight: "bold" }}>Sistema de Asistencia</Typography>
      <Grid item>
        <img src={logo} />
      </Grid>
    </Grid>

  )
}

export default HomeScreen