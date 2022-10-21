
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
            disabled: '#2C8C99',
        },
        sortFocus: {
            default: '#000000',
        },
    },
    'dark',
);

const tablaData = [
    {
        descripcion: "NO PUEDO CREERLO", fechap: "25/02/2021", fechae: "10/03/2021", estado: "Realizada",  anotaciones: "Increible"
    },
    {
        descripcion: "NO PUEDO CREERLO", fechap: "25/02/2021", fechae: "10/03/2021", estado: "Realizada",  anotaciones: "Increible"
    },
    {
        descripcion: "NO PUEDO CREERLO", fechap: "25/02/2021", fechae: "10/03/2021", estado: "Realizada",  anotaciones: "Increible"
    },
    {
        descripcion: "NO PUEDO CREERLO", fechap: "25/02/2021", fechae: "10/03/2021", estado: "Realizada",  anotaciones: "Increible"
    },
    {
        descripcion: "NO PUEDO CREERLO", fechap: "25/02/2021", fechae: "10/03/2021", estado: "Realizada",  anotaciones: "Increible"
    },

]


const columnas = [
    {
        name: 'Descripcion',
        selector: 'descripcion',
        sortable: true
    },
    {
        name: 'Fecha Programada',
        selector: 'fechap',
        sortable: true
    },
    {
        name: 'Fecha efectuada',
        selector: 'fechae',
        sortable: true
    },
    {
        name: 'Estado Visita',
        selector: 'estado',
        sortable: true
    },
    {
        name: 'Anotaciones',
        selector: 'anotaciones',
        sortable: true
    },
]

const paginationComponentOptions = {
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
    noRowsPerPage: true
};

export default function TableVisits() {





    return (


        <DataTable
            columns={columnas}
            data={tablaData}
            fixedHeader
            fixedHeaderScrollHeight='700px'
            pagination
            theme='solarized'
            paginationComponentOptions={paginationComponentOptions}
        />


    )
} 