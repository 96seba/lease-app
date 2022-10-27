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
        selector: row => row.mes,
        sortable: true
    },
    {
        name: 'Arrendatario',
        selector: row => row.arrendatario,
        sortable: true
    },
    {
        name: 'Monto',
        selector: row => <button className='bg-green-300 w-20 h-7 rounded active:bg-purple-500 active:text-white'>Revisado</button>,
        sortable: true
    },
    {
        name: 'GG.CC',
        selector: row => row.ggcc,
        sortable: true
    },
    {
        name: 'Agua',
        selector: row => row.agua,
        sortable: true
    },
    {
        name: 'Luz',
        selector: row => row.luz,
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