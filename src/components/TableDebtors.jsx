import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'react-data-table-component';


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




const columnas = [
    {
        name: 'Propiedad',
        selector: row => row.propiedad,
        sortable: true
    },
    {
        name: 'Fecha',
        selector: row => row.fecha,
        sortable: true
    },
    {
        name: 'Monto',
        selector: row => row.monto,
        sortable: true
    },
    {
        name: 'GG.CC',
        selector: row => row.ggcc,
        sortable: true
    },
    {
        name: 'Luz',
        selector: row => row.luz,
        sortable: true
    },
    {
        name: 'Agua',
        selector: row => row.agua,
        sortable: true
    },
    {
        name: 'Gas',
        selector: row => row.gas,
        sortable: true
    },
]

const paginationComponentOptions = {
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
    noRowsPerPage: true
};

export default function TableDebtors({debtorData}) {

    return (
        <DataTable
            columns={columnas}
            data={debtorData}
            fixedHeader
            fixedHeaderScrollHeight='700px'
            pagination
            customStyles={customStyles}
            highlightOnHover
            paginationComponentOptions={paginationComponentOptions}
        />
    )
} 