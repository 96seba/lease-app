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
    { id: 26, descripcion: "Revisar la luz", estado: "No revisado" },
    { id: 16, descripcion: "Revisar el agua", estado: "Revisado" },
    { id: 63, descripcion: "LLevar ampolletas", estado: "Revisado" },
    { id: 37, descripcion: "Echarlos de la casa", estado: "Revisado" },
    { id: 59, descripcion: "Revisar la luz", estado: "No revisado" },
    { id: 85, descripcion: "Revisar la ducha", estado: "No revisado" },
    { id: 75, descripcion: "Revisar la luz", estado: "No revisado" },
    { id: 72, descripcion: "Revisar la ducha", estado: "No revisado" },
    { id: 71, descripcion: "Revisar la luz", estado: "No revisado" },
    { id: 41, descripcion: "Revisar la ducha", estado: "No revisado" },
    { id: 81, descripcion: "Revisar la luz", estado: "No revisado" },
]


const columnas = [
    {
        name: 'Id',
        selector: 'id',
        sortable: true
    },
    {
        name: 'Descripcion',
        selector: 'descripcion',
        sortable: true
    },
    {
        name: 'Estado',
        selector: 'estado',
        sortable: true
    },
]

const paginationComponentOptions = {
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
    noRowsPerPage: true
};

export default function TableCheck() {





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