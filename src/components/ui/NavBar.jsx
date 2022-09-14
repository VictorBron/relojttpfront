import React, { useContext } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Button, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import AuthContext from '../../context/AuthContext'
const NavBar = () => {

    const { auth, setAuth } = useContext(AuthContext);


    const cerrarSesion = () => {
        localStorage.setItem("auth", JSON.stringify({
            logged: false
        }))
        setAuth({ logged: false })

    }

    return (
        <>
            <AppBar position="sticky" >
                <Toolbar display="flex">
                    <IconButton color="inherit" arial-label="menu" style={{
                        marginRight: "15px"
                    }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

                    </Typography>
                    <Button color="inherit" onClick={() => cerrarSesion()}>Cerrar Sesión</Button>
                </Toolbar>

            </AppBar>
        </>
    )
}

export default NavBar