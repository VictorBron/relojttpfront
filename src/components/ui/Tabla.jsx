import { Card } from '@mui/material';
import axios from 'axios';
import React from 'react'
import DataTable from 'react-data-table-component'

const myNewTheme = {
    rows: {
        fontSize: '40px'
    }
}

const Tabla = ({ data, columns, pendiente = false }) => {
    return (
        <Card sx={{ p: 2 }}>
            <DataTable
                data={data}
                columns={columns}
                pagination={true}
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 10, 15]}
                paginationComponentOptions={{
                    rowsPerPageText: 'Filas por página:',
                    rangeSeparatorText: 'de',
                    selectAllRowsItem: true,
                    selectAllRowsItemText: 'Todas',
                    selectAllRowsItemTooltip: 'Todas',
                    firstPageTooltip: 'Primera página',
                    previousPageTooltip: 'Página anterior',
                    nextPageTooltip: 'Página siguiente',
                    lastPageTooltip: 'Última página',
                    labelDisplayedRows: '{from}-{to} de {count}',
                    labelRowsPerPage: 'Filas por página'
                }}
                customTheme={myNewTheme}
                progressPending={pendiente}
            />
        </Card>
    )
}

export default Tabla