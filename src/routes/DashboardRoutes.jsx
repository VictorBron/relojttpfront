import React from 'react'
import Layout from '../components/ui/Layout'
import { Routes, Route } from 'react-router-dom'
import HomeScreen from '../components/home/HomeScreen'
import AgregarPersonalScreen from '../components/personal/AgregarPersonalScreen'
import ListaPersonalScreen from '../components/personal/ListaPersonalScreen'
import PersonaScreen from '../components/personal/PersonaScreen'
import AgregarMarcaScreen from '../components/marcas/AgregarMarcaScreen'
import ListaMarcas from '../components/marcas/ListaMarcas'
import SapScreen from '../components/sap/SapScreen'
import GeneralScreen from '../components/general/GeneralScreen'
import General2Screen from '../components/general2/General2Screen'
import EditarPersonaScreen from '../components/editarpersona/EditarPersonaScreen'
import EditMarca from '../components/marcas/EditMarca'

const DashboardRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={< Layout />}>
                <Route path="/" element={<HomeScreen />} />
                <Route path='personal/agregar' element={<AgregarPersonalScreen />} />
                <Route path='personal/lista' element={<ListaPersonalScreen />} />
                <Route path='persona/:id' element={<PersonaScreen />} />
                <Route path='editar-persona/:id' element={<EditarPersonaScreen />} />
                <Route path='marcas/agregar' element={<AgregarMarcaScreen />} />
                <Route path='marcas/lista' element={<ListaMarcas />} />
                <Route path='marca/editar/:id' element={<EditMarca />} />

                <Route path='informes/sap' element={<SapScreen />} />
                <Route path='informes/general' element={<GeneralScreen />} />


                <Route path="*" element={<h1>Pagina no encontrada</h1>} />
            </Route>
        </Routes>
    )
}

export default DashboardRoutes