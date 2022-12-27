import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { getAlertsPending } from '../api/getAlertsPending';
import { customStyles, paginationComponentOptions } from '../utils/constants';
import ModalResolveAlert from './ModalResolveAlert';


export default function TableAlerts(data) {

    const [modalStates, setModalStates] = useState([])

    const [handleData, setHandleData] = useState([])

    useEffect(() => {
        console.log("HA LLEGADO DEL DATA CHAVALES")
        // console.log(data)
        setHandleData(data)
    }, [])


    useEffect(() => {
        const createStates = async () => {
            // console.log(data.data)
            // console.log(data.data.length)
            let arr = []
            await data.data.forEach((element, index) => {
                // console.log(index)
                arr[index] = { id: element.id, state: false }
            });
            // console.log(arr)
            setModalStates(arr)
        }
        createStates()
    }, [])

    const refreshAlerts = async () => {
        const respAlerts = await getAlertsPending()
        // console.log(respAlerts.data.alerts)
        let obj = { data: respAlerts.data.alerts }

        setHandleData(obj)

    }


    const getIndex = (id) => {
        //* Funcion para obtener el index a cambiar
        const idFind = (element) => element.id == id
        //* Se ejecuta la funcion para obtener el index y se guarda en indexArr
        let indexArr = modalStates.findIndex(idFind)
        return indexArr
    }

    const setCheckState = async (row) => {
        let index = getIndex(row.id)
        // console.log(index)
        // console.log(modalStates[index].state)
        if (modalStates[index].state === true) {
            let arr = [...modalStates]
            arr[index].state = false
            // console.log(arr)
            setModalStates(arr)
        } else if (modalStates[index].state === false) {
            let arr = [...modalStates]
            arr[index].state = true
            // console.log(arr)
            setModalStates(arr)
        }

    }

    const setCheckStateFalse = async (row) => {
        let index = getIndex(row.id)
        // console.log(index)
        // console.log("Se va a false gente", row.id)
        // console.log(modalStates[index].state)
        let arr = [...modalStates]
        arr[index].state = false
        console.log(arr)
        setModalStates(arr)
    }

    const dateSort = (rowA, rowB) => {
        let date1 = new Date(rowA.dateResolve)
        let date2 = new Date(rowB.dateResolve)

        console.log(rowA)

        console.log(rowB)

        if (date1.getTime() > date2.getTime()) {
            return 1;
        }

        if (date2.getTime() > date1.getTime()) {
            return -1;
        }

        return 0;
    };

    const parseDate = (fecha) => {

        let date = new Date(fecha)

        if (fecha === undefined) {
            return "No hay fecha"
        } else {
            // console.log(date, fecha)
            const yyyy = date.getFullYear();
            let mm = date.getMonth() + 1; // Months start at 0!
            let dd = date.getDate();

            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            let formattedToday = dd + '/' + mm + '/' + yyyy;
            return formattedToday
        }
    }


    const renderModal = (row) => {
        let index = getIndex(row.id)

        if (modalStates[index]?.state === true) {
            return (
                <ModalResolveAlert row={row} setCheckStateFalse={setCheckStateFalse} refreshAlerts={refreshAlerts} />
            )
        }
    }

    const parsePriority = (priority) => {
        if (priority === "BAJA") {
            return 0
        }
        if (priority === "MEDIA") {
            return 1
        }
        if (priority === "ALTA") {
            return 2
        }

    }


    const prioritySort = (rowA, rowB) => {
        let p1 = parsePriority(rowA.level)
        let p2 = parsePriority(rowB.level)

        if (p1 > p2) {
            return 1;
        }

        if (p2 > p1) {
            return -1;
        }

        return 0;
    };


    const columnas = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
            center: true,
            compact: true,
            width: '7%'
        },
        {
            name: 'Descripcion',
            selector: row => row.note,
            sortable: true,
            wrap: true,
            width: '36%'
        },
        {
            name: 'Fecha',
            selector: row => parseDate(row?.dateResolve?.slice(0, 10)),
            sortable: true,
            center: true,
            compact: true,
            width: '16%',
            sortFunction: dateSort
        },
        {
            name: 'Prioridad',
            selector: row => row?.level,
            sortable: true,
            wrap: true,
            width: '18%',
            sortFunction: prioritySort
        },
        {
            name: 'Estado',
            selector: row =>

                <div className="flex h-auto w-auto hover:bg-[#3A4348]">
                    <button
                        onClick={() => {
                            setCheckState(row)
                        }}
                        className={`bg-emerald-400 w-24 h-8 hover:bg-emerald-600 text-white rounded-[3px] text-[15px]`} >
                        Listo
                    </button>
                    {/* <input
                        checked={modalStates[getIndex(row.id)]?.state}
                        onClick={() => {
                            setCheckState(row)
                        }}
                        type={'checkbox'}
                        className={`select-none cursor-pointer rounded-lg border-2
                  border-[#FF6F00] w-6 h-6 checked:bg-teal-700 font-bold transition-colors duration-200 ease-in-out`}
                    /> */}
                    {renderModal(row)}
                </div>
            ,
            center: true,
            compact: true,
            width: '16%',
        },
    ]


    return (
        <DataTable
            columns={columnas}
            data={handleData.data}
            customStyles={customStyles}
            defaultSortFieldId={4}
            fixedHeader
            fixedHeaderScrollHeight='700px'
            pagination
            highlightOnHover
            paginationComponentOptions={paginationComponentOptions}
        />
    )
} 