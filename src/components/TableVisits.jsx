import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { customStyles, paginationComponentOptions } from '../utils/constants';




export default function TableVisits(visits) {
    React.useEffect(() => {
        console.log(visits)
        setAnnotation(visits)
    }, [])

    const [annotation, setAnnotation] = useState("")


    const parseDate = (fecha) => {

        let date = new Date(fecha)

        if (fecha === undefined) {
            return "No hay fecha"
        } else {
            console.log(date, fecha)
            const yyyy = date.getFullYear();
            let mm = date.getMonth() + 1; // Months start at 0!
            let dd = date.getDate();

            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            let formattedToday = dd + '/' + mm + '/' + yyyy;
            return formattedToday
        }
    }

    const columnas = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
            wrap: true,
            compact: true,
            width: '12%'
        },
        {
            name: 'Fecha',
            selector: row => parseDate(row.date),
            sortable: true,
            wrap: true,
            compact: true,
            width: '24%'
        },
        {
            name: 'Fecha',
            selector: row => <input 
            type={'date'}
            className='block p-2.5 w-[120px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>,
            sortable: true,
            wrap: true,
            compact: true,
            width: '24%'
        },
        {
            name: 'Anotaciones',
            selector: row =>
                <textarea
                    value={row.observations[0]}
                    data-tooltip-target="tooltip-default" id="message" rows="1"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Anotaciones"></textarea>
            ,
            sortable: true,
            compact: true,
            wrap: true,
            width: '34%'
        },
    ]


    return (
        <DataTable
            columns={columnas}
            data={visits.visits}
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