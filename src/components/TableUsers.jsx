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
            default: '#ffffff',
            focus: '#000000',
        },
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: '#f3f3f5',
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
    { propiedad: 19, descripcion: "Pryx", fecha: "18/10/2019", urgencia: "Nivel 2" },
    { propiedad: 27, descripcion: "La moneda", fecha: "11/09/1973", urgencia: "Nivel 2" },
    { propiedad: 74, descripcion: "La moneda", fecha: "11/09/1973", urgencia: "Nivel 2" },
    { propiedad: 94, descripcion: "La moneda", fecha: "11/09/1973", urgencia: "Nivel 2" },
]


const columnas = [
    {
        name: 'Propiedad',
        selector: 'propiedad',
        sortable: true
    },
    {
        name: 'Descripcion',
        selector: 'descripcion',
        sortable: true
    },
    {
        name: 'Fecha',
        selector: 'fecha',
        sortable: true
    },
    {
        name: 'Urgencia',
        selector: 'urgencia',
        sortable: true
    },
]

const paginationComponentOptions = {
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
    noRowsPerPage: true
};

export default function TableUsers() {

    return (
        <div className='shadow-lg'>
            <DataTable
                columns={columnas}
                data={tablaData}
                highlightOnHover
                fixedHeader
                fixedHeaderScrollHeight='700px'
                pagination
                theme='solarized'
                paginationComponentOptions={paginationComponentOptions}
            />
        </div>

    )
} 