import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'react-data-table-component';
import { customStyles, paginationComponentOptions} from '../utils/constants';

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
        selector: row => row.name,
        sortable: true,
        center: true,
        compact: true
    },
    {
        name: 'Apellido',
        selector: row => row.lastname,
        sortable: true,
        center: true,
        compact: true
    },
]

export default function TableUsers({ tableData, openModal }) {


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