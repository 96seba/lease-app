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
    {
        propiedad: 26, fecha: "27/02/2022",
        monto: "$ 50.000", ggcc: "$ 0",
        luz: "$ 0", agua: "$ 0",
        gas: "$ 0", estado: "Deuda",
    },
    {
        propiedad: 26, fecha: "27/02/2022",
        monto: "$ 50.000", ggcc: "$ 0",
        luz: "$ 0", agua: "$ 0",
        gas: "$ 0", estado: "Deuda",
    },
    {
        propiedad: 26, fecha: "27/02/2022",
        monto: "$ 50.000", ggcc: "$ 0",
        luz: "$ 0", agua: "$ 0",
        gas: "$ 0", estado: "Deuda",
    },
    {
        propiedad: 26, fecha: "27/02/2022",
        monto: "$ 50.000", ggcc: "$ 0",
        luz: "$ 0", agua: "$ 0",
        gas: "$ 0", estado: "Deuda",
    },
    {
        propiedad: 26, fecha: "27/02/2022",
        monto: "$ 50.000", ggcc: "$ 0",
        luz: "$ 0", agua: "$ 0",
        gas: "$ 0", estado: "Deuda",
    },
    {
        propiedad: 26, fecha: "27/02/2022",
        monto: "$ 50.000", ggcc: "$ 0",
        luz: "$ 0", agua: "$ 0",
        gas: "$ 0", estado: "Deuda",
    },
]


const columnas = [
    {
        name: 'Propiedad',
        selector: 'propiedad',
        sortable: true
    },
    {
        name: 'Fecha',
        selector: 'fecha',
        sortable: true
    },
    {
        name: 'Monto',
        selector: 'monto',
        sortable: true
    },
    {
        name: 'GG.CC',
        selector: 'ggcc',
        sortable: true
    },
    {
        name: 'Luz',
        selector: 'luz',
        sortable: true
    },
    {
        name: 'Agua',
        selector: 'agua',
        sortable: true
    },
    {
        name: 'Gas',
        selector: 'gas',
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

export default function TableDebtors() {

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