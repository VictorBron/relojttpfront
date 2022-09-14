import { Box, Grid } from '@mui/material'
import { Outlet } from 'react-router-dom';
import React from 'react'
import NavBar from './NavBar'
import SideBar from './SideBar'

const Layout = () => {
    return (
        <Grid container>
            <Grid item xs={4} md={2} height="100vh">
                <SideBar />
            </Grid>
            <Grid item xs={8} md={10} style={{
                height: "100vh",
                overflow: "scroll",
                overflowX: "hidden"
            }}>
                <NavBar />
                <Box component={"main"} padding="20px"  >
                    <Outlet />
                </Box>
            </Grid>


        </Grid>
    )
}

export default Layout