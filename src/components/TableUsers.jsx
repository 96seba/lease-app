import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'react-data-table-component';

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
                borderBottomColor: '#FFFFFF',
                '&:not(:last-of-type)': {
                    borderStyle: 'none',
                    borderBottomWidth: '1px',
                    borderBottomColor: '#FFFFFF',
                },
    
            },
            highlightOnHoverStyle: {
                backgroundColor: '#3A4348',
                color: '#FFFFFF',
            },
        },
        headRow: {
            style: {
                backgroundColor: '#FFFFFF',
                borderStyle: 'none',
                borderBottomWidth: '1px',
                borderBottomColor: '#FFFFFF',
            },
        },
        pagination: {
            style: {
                backgroundColor: '#FFFFFF',
                borderStyle: 'none',
                borderBottomWidth: '1px',
                borderBottomColor: '#FFFFFF',
            },
            pageButtonsStyle: {
                color: '#FF0000',
                fill: '#FF6F00',
                '&:hover:not(:disabled)': {
                    backgroundColor: '#3A4348',
                    fill: '#FFFFFF',
                },
                '&:focus': {
                    outline: 'none',
                    backgroundColor: '#FF0000',
                },
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
                paginationComponentOptions={paginationComponentOptions}
                onRowDoubleClicked={(e) => {

                    openModal(e)
                }}
            />
        </div>

    )
} 