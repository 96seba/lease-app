import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'react-data-table-component';
import { customStyles, paginationComponentOptions} from '../utils/constants';

const columnas = [
    {
        name: 'Id',
        selector: row => row.propiedad,
        sortable: true,
        center: true,
        compact: true,
        width: '7%'
    },
    {
        name: 'Descripcion',
        selector: row => row.descripcion,
        sortable: true,
        wrap: true
    },
    {
        name: 'Fecha',
        selector: row => row.fecha,
        sortable: true,
        center: true,
        compact: true,
        width: '16%'
    },
    {
        name: 'Urgencia',
        selector: row => row.urgencia,
        sortable: true,
        center: true,
        compact: true,
        width: '16%',
    },
]

export default function TableToResolveNVisits(data) {

    return (
        <DataTable
            columns={columnas}
            data={data}
            customStyles={customStyles}
            fixedHeader
            fixedHeaderScrollHeight='700px'
            pagination
            highlightOnHover
            paginationComponentOptions={paginationComponentOptions}
        />
    )
} 