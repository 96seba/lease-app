import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable, { createTheme } from 'react-data-table-component';

createTheme(
    'solarized',
    {
        text: {
            primary: '#000000',
            secondary: '#000000',
        },
        background: {
            default: '#f0f9ff',
        },
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: '#FFFFFF',
        },
        button: {
            hover: '#059669',
            focus: '#059669',
            disabled: '#d1d5db',
        },
        sortFocus: {
            default: '#000000',
        },
    },
    'dark',
);

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
        width: '16%'
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
        },
        highlightOnHoverStyle: {
            backgroundColor: '#3A4348',
        },
    },
    headRow: {
        style: {
            backgroundColor: '#FFFFFF',
        },
    },
    pagination: {
        style: {
            backgroundColor: '#FFFFFF',
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
            theme='solarized'
            highlightOnHover
            paginationComponentOptions={paginationComponentOptions}
        />
    )
} 