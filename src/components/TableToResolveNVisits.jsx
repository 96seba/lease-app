import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'react-data-table-component';






const columnas = [
    {
        name: 'Id',
        selector: row => row.propiedad,
        sortable: true,
        center: true,
        compact: true,
        width: '7%'
    },
    {
        name: 'Descripcion',
        selector: row => row.descripcion,
        sortable: true,
        wrap: true
    },
    {
        name: 'Fecha',
        selector: row => row.fecha,
        sortable: true,
        center: true,
        compact: true,
        width: '16%'
    },
    {
        name: 'Urgencia',
        selector: row => row.urgencia,
        sortable: true,
        center: true,
        compact: true,
        width: '16%',
    },
]

const paginationComponentOptions = {
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
    noRowsPerPage: true
};

const customStyles = {
    head: {
        style: {
            backgroundColor: '#FFFFFF',
        },
    },
    rows: {
        style: {
            backgroundColor: '#FFFFFF',
            borderBottomColor: '#FFFFFF',
            '&:not(:last-of-type)': {
                borderStyle: 'none',
                borderBottomWidth: '1px',
                borderBottomColor: '#FFFFFF',
            },

        },
        highlightOnHoverStyle: {
            backgroundColor: '#3A4348',
            color: '#FFFFFF',
        },
    },
    headRow: {
        style: {
            backgroundColor: '#FFFFFF',
            borderStyle: 'none',
            borderBottomWidth: '1px',
            borderBottomColor: '#FFFFFF',
        },
    },
    pagination: {
        style: {
            backgroundColor: '#FFFFFF',
            borderStyle: 'none',
            borderBottomWidth: '1px',
            borderBottomColor: '#FFFFFF',
        },
        pageButtonsStyle: {
            color: '#FF0000',
            fill: '#FF6F00',
            '&:hover:not(:disabled)': {
                backgroundColor: '#3A4348',
                fill: '#FFFFFF',
            },
            '&:focus': {
                outline: 'none',
                backgroundColor: '#FF0000',
            },
        },
    },
};


export default function TableToResolveNVisits(data) {

    return (
        <DataTable
            columns={columnas}
            data={data}
            customStyles={customStyles}
            fixedHeader
            fixedHeaderScrollHeight='700px'
            pagination
            highlightOnHover
            paginationComponentOptions={paginationComponentOptions}
        />
    )
} 