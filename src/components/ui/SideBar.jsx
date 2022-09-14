import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText, Divider, Box, Typography, Grid, ListItemButton } from '@mui/material'
import { NavLink } from 'react-router-dom'

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

import BookmarksIcon from '@mui/icons-material/Bookmarks';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

import ArticleIcon from '@mui/icons-material/Article';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';

const SideBar = () => {
    return (
        <Box component="div" style={{
            height: "100%",
            backgroundColor: 'rgb(246 248 250)'
            /* 
            boxShadow: "-5px 0px 15px #000", */

        }} className="sidebar">
            <Grid container height={'60px'} justifyContent={'center'} alignItems="center">
                <Grid item>
                    <Typography component='h3' variant='span' >Sistema Asistencia</Typography>
                </Grid>
            </Grid>
            <List sx={{ p: 2 }}>
                <Typography variant="span" componen="span" fontWeight={"bold"}>
                    Personal
                </Typography>
                <NavLink to={'/personal/agregar'} className={({ isActive }) => "nav-NavLink " + (isActive ? "activated" : "")} >
                    <ListItemButton>
                        <ListItemIcon >
                            <PersonAddAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Agregar Personal" />
                    </ListItemButton>
                </NavLink>
                <NavLink to="/personal/lista" className={({ isActive }) => "nav-NavLink " + (isActive ? "activated" : "")}>
                    <ListItem button >
                        <ListItemIcon >
                            <PersonSearchIcon />
                        </ListItemIcon>
                        <ListItemText primary="Lista Personal" />
                    </ListItem>
                </NavLink>
                <Divider />
                <br />
                <Typography variant="span" componen="span" fontWeight={"bold"}>
                    Marcas
                </Typography>
                <NavLink to="/marcas/agregar" className={({ isActive }) => "nav-NavLink " + (isActive ? "activated" : "")}>
                    <ListItem button >
                        <ListItemIcon >
                            <BookmarkAddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Agregar Marca" />
                    </ListItem>
                </NavLink>
                <NavLink to="/marcas/lista" className={({ isActive }) => "nav-NavLink " + (isActive ? "activated" : "")}>
                    <ListItem button >
                        <ListItemIcon >
                            <BookmarksIcon />
                        </ListItemIcon>
                        <ListItemText primary="Lista Marcas" />
                    </ListItem>
                </NavLink>
                <Divider />
                <br />
                <Typography variant="span" componen="span" fontWeight={"bold"}>
                    Informes
                </Typography>
                <NavLink to="/informes/sap" className={({ isActive }) => "nav-NavLink " + (isActive ? "activated" : "")}>
                    <ListItem button >
                        <ListItemIcon >
                            <ArticleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sap" />
                    </ListItem>
                </NavLink>
                <NavLink to="/informes/general" className={({ isActive }) => "nav-NavLink " + (isActive ? "activated" : "")}>
                    <ListItem button >
                        <ListItemIcon >
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="General" />
                    </ListItem>
                </NavLink>
                {/* <NavLink to="/informes/general-original" className={({ isActive }) => "nav-NavLink " + (isActive ? "activated" : "")}>
                    <ListItem button >
                        <ListItemIcon >
                            <DescriptionIcon />
                        </ListItemIcon>
                        <ListItemText primary="General Original" />
                    </ListItem>
                </NavLink> */}
            </List>
        </Box>
    )
}

export default SideBar