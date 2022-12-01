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
        selector: row => row.id,
        sortable: true,
        width: '8%',
        center: true,
        compact: true
    },
    {
        name: 'Correo',
        selector: row => row.email,
        sortable: true,
        center: true,
        compact: true
    },
    {
        name: 'Nombre',
        selector: row => row.nombre,
        sortable: true,
        center: true,
        compact: true
    },
    {
        name: 'Apellido',
        selector: row => row.apellido,
        sortable: true,
        center: true,
        compact: true
    },
]

const paginationComponentOptions = {
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
    noRowsPerPage: true
};



export default function TableUsers({ tableData, openModal }) {

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
                backgroundColor: '#3A4348',
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


    return (
        <div className='w-[96%]'>
            <DataTable
                columns={columnas}
                data={tableData}
                customStyles={customStyles}
                highlightOnHover
                fixedHeader
                fixedHeaderScrollHeight='700px'
                pagination
                theme='solarized'
                paginationComponentOptions={paginationComponentOptions}
                onRowDoubleClicked={(e) => {

                    openModal(e)
                }}
            />
        </div>

    )
} 