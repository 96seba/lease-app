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
        mes: "Enero", arrendatario: "Samuel L Jackson", monto: "$ 200000", ggcc: "$ 30000",
        agua: "$ 6000", luz: "$ 40000", gas: "$ 10000"
    },
    
]


const columnas = [
    {
        name: 'Mes',
        selector: 'mes',
        sortable: true
    },
    {
        name: 'Arrendatario',
        selector: 'arrendatario',
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
        name: 'Agua',
        selector: 'agua',
        sortable: true
    },
    {
        name: 'Luz',
        selector: 'luz',
        sortable: true
    },
    {
        name: 'Gas',
        selector: 'gas',
        sortable: true
    },
]

const paginationComponentOptions = {
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
    noRowsPerPage: true
};

export default function TableBill() {





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