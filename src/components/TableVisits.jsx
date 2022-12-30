import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { customStyles, paginationComponentOptions } from '../utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { visitIsDone } from '../api/visitIsDone';
import { getVisitsForProperty } from '../api/getVisitsForProperty';


export default function TableVisits({ id, visits, setVisits }) {

    const maxDate = new Date(
        Math.max(
            ...visits.map(element => {
                return new Date(element.date);
            }),
        ),
    );

    React.useEffect(() => {
        console.log(visits)





        // console.log(resp.getUTCDate(), resp.getMonth() + 1, resp.getFullYear())
        // setAnnotation(visits[0]?.observations[0])
    }, [])

    const [annotation, setAnnotation] = useState("")
    const [dateDone, setDateDone] = useState("")

    const getIndex = (id) => {
        //* Funcion para obtener el index a cambiar
        const idFind = (element) => element.id === id
        //* Se ejecuta la funcion para obtener el index y se guarda en indexArr
        let indexArr = visits.findIndex(idFind)
        return indexArr
    }


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

    const renderFechaInput = (row) => {
        let resp = new Date(maxDate)

        if (row.date === resp.toISOString()) {
            return (
                <input
                    min={row.date.slice(0, 10)}
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
        } else {
            if (row?.isDone === null) {
                return (

                    <div>
                        No hay fecha
                    </div>
                )
            } else {
                return (
                    <div>
                        {parseDate(row?.isDone)}
                    </div>

                )
            }

        }


    }

    const renderAnotacionInput = (row) => {
        let resp = new Date(maxDate)

        if (row.date === resp.toISOString()) {
            return (
                <textarea
                    value={annotation}
                    onChange={e => { setAnnotation(e.target.value) }}
                    data-tooltip-target="tooltip-default" id="message" rows="1"
                    className="block p-2.5 w-[220px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Anotaciones"></textarea>
            )
        } else {
            if (row.observations.length === 0) {
                return (<div>No hay anotaciones</div>)
            } else {

                return (
                    <div className=''>
                        {row.observations[0]?.note}
                    </div>
                )
            }
        }

        // if (index !== 0) {

        // }

    }

    const renderIcon = (row, index) => {
        if (index !== 0) {
            return (
                <FontAwesomeIcon icon={faCircleCheck} className={`w-[23px] h-[23px] text-emerald-400`} />
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
                    console.log(obj)
                    let resp = await visitIsDone(obj)
                    console.log(resp)
                    setAnnotation('')
                    setDateDone('')
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


    const dateSort = (rowA, rowB) => {
        let date1 = new Date(rowA.date)
        let date2 = new Date(rowB.date)

        if (date1.getTime() > date2.getTime()) {
            return 1;
        }

        if (date2.getTime() > date1.getTime()) {
            return -1;
        }

        return 0;
    };

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
            wrap: true,
            compact: true,
            width: '24%',
            // sortable: true,
            sortFunction: dateSort
        },
        {
            name: 'Fecha Visita',
            selector: row => renderFechaInput(row),
            wrap: true,
            compact: true,
            width: '18%',
            center: true
        },
        {
            name: 'Anotaciones',
            selector: row => renderAnotacionInput(row)
            ,
            compact: true,
            wrap: true,
            width: '35%'
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
            defaultSortFieldId={2}
            defaultSortAsc={false}
            highlightOnHover
            onRowDoubleClicked={e => {
                console.log(e)
            }}
            paginationComponentOptions={paginationComponentOptions}
        />
    )
} 