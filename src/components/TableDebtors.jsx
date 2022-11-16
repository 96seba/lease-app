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
            backgroundColor: '#F8A28C',
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
    {
        name: 'Estado',
        selector: row => row.estado,
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
            customStyles={customStyles}
            highlightOnHover
            theme='solarized'
            paginationComponentOptions={paginationComponentOptions}
        />
    )
} 