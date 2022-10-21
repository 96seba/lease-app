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
        id: "1", costoadministracion:"$92.000", nroboleta:"20", nroboletaanterior:"14",
    },
    {
        id: "2", costoadministracion:"$100.000", nroboleta:"13", nroboletaanterior:"8",
    },
    {
        id: "3", costoadministracion:"$98.000", nroboleta:"10", nroboletaanterior:"15",
    },
]


const columnas = [
    {
        name: 'ID Propiedad',
        selector: 'id',
        sortable: true
    },
    {
        name: 'Costo por administración',
        selector: 'costoadministracion',
        sortable: true
    },
    {
        name: 'Subir boleta',
        selector: () => <input type="file"></input>,
        sortable: true
    },
    {
        name: 'Nro de boleta',
        selector: 'nroboleta',
        sortable: true,
    },
    {
        name: 'Nro de boleto anterior',
        selector: 'nroboletaanterior',
        sortable: true
    },
]

const paginationComponentOptions = {
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
    noRowsPerPage: true
};

export default function TableBoletas() {

    return (


        <DataTable
            columns={columnas}
            data={tablaData}
            onRowClicked={(e) => {
                console.log(e)
            }}
            highlightOnHover
            fixedHeader
            fixedHeaderScrollHeight='700px'
            pagination
            theme='solarized'
            paginationComponentOptions={paginationComponentOptions}
        />


    )
} 