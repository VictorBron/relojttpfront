import { Alert, Autocomplete, Card, CardContent, FormControlLabel, FormHelperText, FormLabel, Grid, InputAdornment, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import EmailIcon from '@mui/icons-material/Email';
import EditRoadIcon from '@mui/icons-material/EditRoad';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import PasswordIcon from '@mui/icons-material/Password';
import AutoCompletar from '../ui/AutoCompletar';
import { comparePassword } from '../../functions/comparePassword'
import { Co2Sharp } from '@mui/icons-material';

const EmpresaFormEdit = ({ dataform, onChange }) => {
    return (
        <Card>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="span" component="h4">
                            Información Empresa
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {
                            dataform.nivel ? <Select
                                fullWidth
                                placeholder='Nivel trabajador'
                                name="nivel"
                                onChange={onChange}
                                defaultValue={dataform.nivel}
                                value={dataform.nivel}
                                displayEmpty
                            >
                                <MenuItem value={2}>Trabajador</MenuItem>
                                <MenuItem value={1}>Administrador</MenuItem>
                            </Select> : null
                        }
                        <FormHelperText>Selecciona el Nivel</FormHelperText>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PasswordIcon />
                                    </InputAdornment>
                                )
                            }}
                            label="Password"
                            fullWidth
                            type={"password"}
                            name="password"
                            onChange={onChange}
                            value={dataform.password}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PasswordIcon />
                                    </InputAdornment>
                                )
                            }}
                            label="Confirm Password"
                            fullWidth
                            type={"password"}
                            name="password2"
                            onChange={onChange}
                            value={dataform.password2}
                        />
                    </Grid>
                    <Grid item xs={12} alignItems="center">
                    </Grid>
                    <Grid item xs={12}>
                        {
                            dataform.acepta_mail ? <RadioGroup row name="acepta_mail" value={dataform.acepta_mail} onChange={onChange} >
                                <Stack direction="row" justifyContent={'center'} alignItems='center'   >
                                    <FormLabel sx={{ mr: 2 }}>Mail Asistencia</FormLabel>
                                    <FormControlLabel value="S" control={<Radio />} label="Si" />
                                    <FormControlLabel value="N" control={<Radio />} label="No" />
                                </Stack>
                            </RadioGroup> : null
                        }
                    </Grid>

                </Grid>
            </CardContent>
        </Card>
    )
}

const perfiles = ["Administrador", "Trabajador"]


export default EmpresaFormEdit