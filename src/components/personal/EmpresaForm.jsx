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

const EmpresaForm = ({ errors, register, watch, getValues }) => {
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
                        {/* <Autocomplete
                            fullWidth
                            id="combo-box-demo"
                            options={perfiles}
                            sx={{ width: 300 }}
                            required
                            renderInput={(params) => <TextField required  {...params}  {
                                ...register('perfil', {
                                    required: true
                                })
                            }
                                label="Perfiles"
                                error={errors.perfil ? true : false}
                            />
                            }
                        /> */}
                        <Select
                            fullWidth
                            placeholder='Movimiento'
                            defaultValue={2}
                            name="perfil"
                            {
                            ...register('perfil', {
                            })
                            }
                            error={errors.perfil ? true : false}
                        >
                            <MenuItem value={2}>Trabajador</MenuItem>
                            <MenuItem value={1}>Administrador</MenuItem>
                        </Select>
                        <FormHelperText>Selecciona el tipo de movimiento</FormHelperText>
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
                            {
                            ...register('password', {
                            })
                            }
                            error={errors.password ? true : false}

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
                            {
                            ...register('password2', {
                            })
                            }
                            error={errors.password2 ? true : false}

                        />

                    </Grid>
                    <Grid item xs={12} alignItems="center">
                        {
                            watch("password2") !== watch("password") &&
                                getValues("password2") ? (
                                <Alert severity="error">
                                    Contraseña no coincide
                                </Alert>
                            ) : null
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <RadioGroup name="radio-buttons-group" row >
                            <Stack direction="row" justifyContent={'center'} alignItems='center'   >
                                <FormLabel sx={{ mr: 2 }}>Mail Asistencia</FormLabel>
                                <FormControlLabel {
                                    ...register('mailAsistencia',
                                        {
                                            required: true
                                        })
                                } value="S" defaultChecked control={<Radio />} label="Si" />
                                <FormControlLabel {
                                    ...register('mailAsistencia',
                                        {
                                            required: true
                                        })
                                } value="N" control={<Radio />} label="No" />
                            </Stack>
                        </RadioGroup>
                        {errors.mailAsistencia && <Alert severity="error"  >Debe seleccionar si tendrá mail de asistencia</Alert>}

                    </Grid>

                </Grid>
            </CardContent>
        </Card>
    )
}

const perfiles = ["Administrador", "Trabajador"]


export default EmpresaForm