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

const customStyles = {
    rows: {
        style: {
            minHeight: '60px', // override the row height
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
        },
    },
};

const tablaData = [
    {
        tipo: "Depto", direccion: "Cochrane 284", arrendador: "Julian Casablancas",
        arrendatario: "George Michael", monto: "$ 0", ggcc: "$ 0",
        luz: "$ 0", agua: "$ 0",
        gas: "$ 0", estado: "Deuda", id: 1
    },
    {
        tipo: "Depto", direccion: "Cochrane 284", arrendador: "Julian Casablancas",
        arrendatario: "George Michael", monto: "$ 0", ggcc: "$ 0",
        luz: "$ 0", agua: "$ 200000",
        gas: "$ 0", estado: "Deuda", id: 2
    },
    {
        tipo: "Depto", direccion: "Cochrane 284", arrendador: "Julian Casablancas",
        arrendatario: "George Michael", monto: "$ 0", ggcc: "$ 0",
        luz: "$ 10000", agua: "$ 0",
        gas: "$ 0", estado: "Deuda", id: 3
    },
    {
        tipo: "Depto", direccion: "Cochrane 284", arrendador: "Julian Casablancas",
        arrendatario: "George Michael", monto: "$ 0", ggcc: "$ 0",
        luz: "$ 0", agua: "$ 0",
        gas: "$ 0", estado: "Deuda", id: 4
    },
    {
        tipo: "Depto", direccion: "Cochrane 284", arrendador: "Julian Casablancas",
        arrendatario: "George Michael", monto: "$ 0", ggcc: "$ 0",
        luz: "$ 0", agua: "$ 0",
        gas: "$ 0", estado: "Deuda", id: 5
    },
    {
        tipo: "Depto", direccion: "Cochrane 284", arrendador: "Julian Casablancas",
        arrendatario: "George Michael", monto: "$ 0", ggcc: "$ 0",
        luz: "$ 0", agua: "$ 0",
        gas: "$ 0", estado: "Deuda", id: 6
    },
    {
        tipo: "Depto", direccion: "Cochrane 284", arrendador: "Julian Casablancas",
        arrendatario: "George Michael", monto: "$ 0", ggcc: "$ 0",
        luz: "$ 0", agua: "$ 0",
        gas: "$ 0", estado: "Deuda", id: 7
    },
    {
        tipo: "Depto", direccion: "Cochrane 284", arrendador: "Julian Casablancas",
        arrendatario: "George Michael", monto: "$ 0", ggcc: "$ 0",
        luz: "$ 0", agua: "$ 0",
        gas: "$ 0", estado: "Deuda", id: 8
    },
    {
        tipo: "Depto", direccion: "Cochrane 284", arrendador: "Julian Casablancas",
        arrendatario: "George Michael", monto: "$ 0", ggcc: "$ 0",
        luz: "$ 0", agua: "$ 0",
        gas: "$ 0", estado: "Deuda", id: 9
    },
    {
        tipo: "Depto", direccion: "Cochrane 284", arrendador: "Julian Casablancas",
        arrendatario: "George Michael", monto: "$ 0", ggcc: "$ 0",
        luz: "$ 0", agua: "$ 0",
        gas: "$ 0", estado: "Deuda", id: 10
    },
    {
        tipo: "Depto", direccion: "Cochrane 284", arrendador: "Julian Casablancas",
        arrendatario: "George Michael", monto: "$ 0", ggcc: "$ 0",
        luz: "$ 0", agua: "$ 0",
        gas: "$ 0", estado: "Deuda", id: 11
    },

]


const columnas = [
    {
        name: 'Tipo',
        selector: (row) => <p className='my-3'>{row.tipo}</p>,
        // selector: 'tipo',
        sortable: true
    },
    {
        name: 'Direccion',
        selector: row => row.direccion,
        sortable: true,
        grow: 1
    },
    {
        name: 'Arrendador',
        selector: row => row.arrendador,
        sortable: true
    },
    {
        name: 'Arrendatario',
        selector: 'arrendatario',
        sortable: true,
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

export default function TablePropiedades() {

    return (

        <div className='w-full  shadow-md rounded '>

            <DataTable
                columns={columnas}
                data={tablaData}
                onRowClicked={(e) => {
                    console.log(e.id)
                }}
                highlightOnHover
                fixedHeader
                fixedHeaderScrollHeight='700px'
                pagination
                theme='solarized'
                customStyles={customStyles}
                onRowDoubleClicked={(e) => {
                }}
                paginationComponentOptions={paginationComponentOptions}
            />

        </div>

    )
} 