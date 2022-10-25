import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable, { createTheme } from 'react-data-table-component';
import { useNavigate } from "react-router-dom"

createTheme(
    'solarized',
    {
        text: {
            primary: '#268bd2',
            secondary: '#2aa198',
        },
        background: {
            default: '#002b36',
        },
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: '#073642',
        },
        button: {
            default: '#2aa198',
            hover: 'rgba(0,0,0,.08)',
            focus: 'rgba(255,255,255,.12)',
            disabled: 'rgba(255, 255, 255, .34)',
        },
        sortFocus: {
            default: '#2aa198',
        },
    },
    'dark',
);

const customStyles = {
    // headRow: {
    // 	style: {
    // 		backgroundColor: '',
    // 		minHeight: '52px',
    // 		borderBottomWidth: '1px',
    // 		borderBottomColor: theme.divider.default,
    // 		borderBottomStyle: 'solid',
    // 	},
    // 	denseStyle: {
    // 		minHeight: '32px',
    // 	},
    // },
    // head: {
    // 	style: {
    // 		fontSize: '17px',
    // 		backgroundColor: '#000000',
    // 		minHeight: '50px',
    // 		paddingLeft: '16px',
    // 		paddingRight: '8px',
    // 	},
    // },
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
        selector: row => row.arrendatario,
        sortable: true,
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

export default function TablePropiedades() {
    let navigate = useNavigate()

    return (
        <div className='w-full shadow-sm rounded'>
            <DataTable
                columns={columnas}
                data={tablaData}
                highlightOnHover

                fixedHeader
                fixedHeaderScrollHeight='700px'
                pagination
                customStyles={customStyles}
                onRowDoubleClicked={(e) => {
                    let nav = `/propiedades/propiedad?=${e.id}`
                    navigate(nav)
                }}
                paginationComponentOptions={paginationComponentOptions}
            />

        </div>

    )
} 