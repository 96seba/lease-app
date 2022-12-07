
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable, { createTheme } from 'react-data-table-component';
import { customStyles, paginationComponentOptions} from '../utils/constants';

const tablaData = [
    {
        descripcion: "NO PUEDO CREERLO", fechap: "25/02/2021", fechae: "10/03/2021", estado: "Realizada", anotaciones: "Increible"
    },
    {
        descripcion: "NO PUEDO CREERLO", fechap: "25/02/2021", fechae: "10/03/2021", estado: "Realizada", anotaciones: "Increible"
    },
    {
        descripcion: "NO PUEDO CREERLO", fechap: "25/02/2021", fechae: "10/03/2021", estado: "Realizada", anotaciones: "Increible"
    },
    {
        descripcion: "NO PUEDO CREERLO", fechap: "25/02/2021", fechae: "10/03/2021", estado: "Realizada", anotaciones: "Increible"
    },
    {
        descripcion: "NO PUEDO CREERLO", fechap: "25/02/2021", fechae: "10/03/2021", estado: "Realizada", anotaciones: "Increible"
    },

]

const columnas = [
    {
        name: 'Descripcion',
        selector: row => row.descripcion,
        sortable: true,
        wrap: true,
        compact: true,
        width: '12%'
    },
    {
        name: 'Fecha Programada',
        selector: row => row.fechap,
        sortable: true,
        wrap: true,
        compact: true,
        width: '18%'
    },
    {
        name: 'Fecha efectuada',
        selector: row => row.fechae,
        sortable: true,
        wrap: true,
        compact: true,
        width: '18%'
    },
    {
        name: 'Estado Visita',
        selector: row => <button className='bg-[#00ff00] w-20 h-7 rounded active:bg-green-600 active:text-white'>Realizada</button>,
        sortable: true,
        wrap: true,
        compact: true,
        width: '18%'
    },
    {
        name: 'Anotaciones',
        selector: row =>
            <textarea data-tooltip-target="tooltip-default" id="message" rows="1"
                class="block p-2.5 w-[24vw] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Anotaciones"></textarea>
        ,
        sortable: true,
        wrap: true,
        width: '34%'
    },
]

export default function TableVisits() {
    return (
        <DataTable
            columns={columnas}
            data={tablaData}
            fixedHeader
            fixedHeaderScrollHeight='700px'
            pagination
            theme='solarized'
            customStyles={customStyles}
            highlightOnHover
            paginationComponentOptions={paginationComponentOptions}
        />
    )
} 