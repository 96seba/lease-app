import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { customStyles, paginationComponentOptions } from '../utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { visitIsDone } from '../api/visitIsDone';
import { getVisitsForProperty } from '../api/getVisitsForProperty';


export default function TableVisits({ id, visits, setVisits }) {
    React.useEffect(() => {
        console.log(visits)
        // setAnnotation(visits[0]?.observations[0])
    }, [])

    const [annotation, setAnnotation] = useState("")
    const [dateDone, setDateDone] = useState("")


    const parseDate = (fecha) => {
        let date = new Date(fecha)
        // console.log(fecha, "asd")

        if (fecha === undefined) {
            return "No hay fecha"
        } else {
            const yyyy = date.getFullYear();
            let mm = date.getMonth() + 1; // Months start at 0!
            let dd = date.getUTCDate();

            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            let formattedToday = dd + '/' + mm + '/' + yyyy;
            // console.log(formattedToday)
            return formattedToday
        }
    }

    const renderFechaInput = (index, date) => {
        // console.log(index, date)
        if (index !== 0) {
            return (
                <input
                    disabled
                    type={'date'}
                    className='block p-2.5 cursor-not-allowed w-[120px] text-sm text-gray-900
                bg-gray-200 rounded-lg border border-gray-300
                focus:ring-blue-500 focus:border-blue-500
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
            )
        }
        return (
            <input
                min={date.slice(0, 10)}
                value={dateDone}
                onChange={e => {
                    setDateDone(e.target.value)
                }}
                type={'date'}
                className='block p-2.5 w-[120px] text-sm text-gray-900
             bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500
               dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />

        )
    }

    const renderAnotacionInput = (row, index) => {
        // console.log(row.observations[0]?.note)
        if (index !== 0) {
            return (
                <textarea
                    value={row.observations[0]?.note} disabled
                    data-tooltip-target="tooltip-default" id="message" rows="1"
                    className="block p-2.5 w-full text-sm cursor-not-allowed text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Anotaciones"></textarea>
            )
        }
        return (
            <textarea
                value={annotation}
                onChange={e => { setAnnotation(e.target.value) }}
                data-tooltip-target="tooltip-default" id="message" rows="1"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Anotaciones"></textarea>

        )
    }

    const renderIcon = (row, index) => {
        if (index !== 0) {
            return (

                <FontAwesomeIcon icon={faCircleCheck}
                    className={`w-[23px] h-[23px] text-emerald-400`} />

            )
        }
        return (
            <button
                onClick={async () => {
                    let obj = {}
                    let arr = []
                    arr[0] = { note: annotation }
                    let date = new Date(dateDone)
                    obj.date = date.toISOString()
                    obj.observations = arr
                    obj.id = row.id
                    // console.log(obj)
                    let resp = await visitIsDone(obj)
                    console.log(resp)
                    let visitsData = await getVisitsForProperty(id)
                    console.log(visitsData)
                    setVisits(visitsData.visits)
                }}
            >
                <FontAwesomeIcon icon={faFloppyDisk}
                    className={`w-[23px] h-[23px]`} />
            </button>

        )
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
            name: 'Fecha Agendada',
            selector: row => parseDate(row.date),
            sortable: true,
            wrap: true,
            compact: true,
            width: '24%'
        },
        {
            name: 'Fecha Visita',
            selector: (row, index) => renderFechaInput(index, row.date),
            sortable: true,
            wrap: true,
            compact: true,
            width: '24%'
        },
        {
            name: 'Anotaciones',
            selector: (row, index) =>
                renderAnotacionInput(row, index)
            ,
            sortable: true,
            compact: true,
            wrap: true,
            width: '30%'
        },
        {
            selector: (row, index) => renderIcon(row, index),
            sortable: true,
            wrap: true,
            compact: true,
            width: '10%'
        }

    ]

    return (
        <DataTable
            columns={columnas}
            data={visits}
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