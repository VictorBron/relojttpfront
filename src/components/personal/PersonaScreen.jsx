import { Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPersonalById } from '../../services/apiPersonal'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Link } from 'react-router-dom'

const PersonaScreen = () => {
    const { id } = useParams()
    const [persona, setPersona] = useState({})

    const obtenerPersona = id => {
        getPersonalById(id).then(res => setPersona(res))
    }

    useEffect(() => {
        obtenerPersona(id)
    }, [])

    return (
        <Grid container>
            <Grid item xs={9} sx={{ mb: 2 }} display="flex" alignItems={'center'}>
                <Typography variant="h4" component="h1" fontWeight={"bold"} style={{ marginBottom: "0" }}>
                    Información Perfil
                </Typography>
            </Grid>
            <Grid item xs={3} display="flex" justifyContent={'center'} >
                <Link to="/personal/lista">
                    <Button variant='contained' style={{ textDecoration: "none" }}>Volver Atrás</Button>
                </Link>
            </Grid>
            <Grid item xs={12}>
                <Card sx={{ p: 2 }}>
                    <CardContent>
                        <Stack orientation="vertical" spacing={2}>
                            <Typography component="h2" variant=''>
                                {persona.nombres} {persona.apellido_paterno} {persona.apellido_materno}
                            </Typography>

                            <Typography variant="body1">
                                <b>Rut:</b> {persona.rut}-{persona.dv}
                            </Typography>
                            <Typography variant="body1">
                                <b>Código Sap:</b> {persona.sap}
                            </Typography>
                            <Typography variant="body1">
                                <b>Perfil:</b> {persona.rut}
                            </Typography>
                            <Typography variant="body1">
                                <b>Dirección:</b> {persona.calle}, {persona.numero}, {(persona.depto != 0) && persona.depto + ","} {persona.comuna}
                            </Typography>
                            <Typography variant="body1">
                                <b>Provincia:</b> {persona.rut}
                            </Typography>
                            <Typography variant="body1">
                                <b>Region:</b> {persona.region}
                            </Typography>
                            <Typography variant="body1">
                                <b>Email:</b> {persona.mail}
                            </Typography>
                            <Typography variant="body1">
                                <b>Mail Marcas:</b> {persona.acepta_mail}
                            </Typography>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default PersonaScreen