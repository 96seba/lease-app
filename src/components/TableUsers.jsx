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



const columnas = [
    {
        name: 'Id',
        selector:  row => row.id,
        sortable: true
    },
    {
        name: 'Correo',
        selector: row => row.correo,
        sortable: true
    },
    {
        name: 'Nombre',
        selector:  row => row.nombre,
        sortable: true
    },
    {
        name: 'Apellido',
        selector:  row => row.apellido,
        sortable: true
    },
]

const paginationComponentOptions = {
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
    noRowsPerPage: true
};

export default function TableUsers({tableData,setModal}) {

    return (
        <div className='shadow-lg'>
            <DataTable
                columns={columnas}
                data={tableData}
                highlightOnHover
                fixedHeader
                fixedHeaderScrollHeight='700px'
                pagination
                theme='solarized'
                paginationComponentOptions={paginationComponentOptions}
                onRowDoubleClicked={(e) => {
                    console.log(e)
                    setModal(true)
                }}
            />
        </div>

    )
} 