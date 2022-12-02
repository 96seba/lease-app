import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'react-data-table-component';

const tablaData = [
    { propiedad: 29, descripcion: "La moneda", fecha: "11/09/1973", urgencia: "Nivel 2" },
    {
        propiedad: 19, descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto reiciendis illo doloribus",
        fecha: "18/10/2019", urgencia: "Nivel 2"
    },
    { propiedad: 27, descripcion: "La moneda", fecha: "11/09/1973", urgencia: "Nivel 2" },
    { propiedad: 74, descripcion: "La moneda", fecha: "11/09/1973", urgencia: "Nivel 2" },
    { propiedad: 94, descripcion: "La moneda", fecha: "11/09/1973", urgencia: "Nivel 2" },
]




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



export default function TableToResolveNVisits() {

    return (
        <DataTable
            columns={columnas}
            data={tablaData}
            customStyles={customStyles}
            fixedHeader
            fixedHeaderScrollHeight='700px'
            pagination
            highlightOnHover
            paginationComponentOptions={paginationComponentOptions}
        />
    )
} 