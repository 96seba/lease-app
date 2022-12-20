import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { customStyles, paginationComponentOptions } from '../utils/constants';


export default function TableBoletas({ files, setFile, tablaData, boletasBody, setBoletasBody }) {

    useEffect(() => {

        const createStates = async () => {
            // console.log(data.data)

            let arr = []
            await tablaData.forEach((element, index) => {
                console.log(element)
                arr[index] = { propertyId: element.id, nroTicket: "", ticket: null, amount: element.amount }
            });
            console.log(arr)
            setBoletasBody(arr)
        }
        createStates()


    }, [])


    const getIndex = (id) => {
        //* Funcion para obtener el index a cambiar
        const idFind = (element) => element.propertyId == id
        //* Se ejecuta la funcion para obtener el index y se guarda en indexArr
        let indexArr = boletasBody.findIndex(idFind)
        return indexArr
    }

    const getIndexFiles = (id) => {
        //* Funcion para obtener el index a cambiar
        const idFind = (element) => element.id == id
        //* Se ejecuta la funcion para obtener el index y se guarda en indexArr
        let indexArr = files.findIndex(idFind)
        return indexArr
    }


    const setNroBoleta = async (row, data) => {
        let index = getIndex(row.id)
        console.log(index)
        console.log(boletasBody[index].nroTicket)
        let arr = [...boletasBody]
        arr[index].nroTicket = Number(data)
        console.log(arr)
        setBoletasBody(arr)
    }

    const setCostoAdm = async (row, data) => {
        let index = getIndex(row.id)
        console.log(index)
        console.log(boletasBody[index]?.amount)
        let arr = [...boletasBody]
        arr[index].amount = data
        console.log(arr)
        setBoletasBody(arr)
    }

    const setFileBoleta = async (row, data) => {
        let index = getIndex(row.id)
        console.log(index)
        console.log(boletasBody[index].ticket)
        let arr = [...boletasBody]
        arr[index].ticket = data
        console.log(arr)
        setBoletasBody(arr)
    }

    const deleteFileBoleta = async (row) => {
        let index = getIndex(row.id)
        let arr = [...boletasBody]
        arr[index].ticket = null
        console.log(arr)
        setBoletasBody(arr)
    }


    const columnas = [
        {
            name: 'ID Propiedad',
            selector: row => row.id,
            sortable: true,
            width: "9%",
        },
        {
            name: 'Costo por administración',
            selector: row =>
                <input
                    value={boletasBody[getIndex(row.id)]?.amount}
                    onChange={e => {
                        setCostoAdm(row, Number(e.target.value))

                    }}
                    className={`w-[120px] h-7 text-center text-black bg-gray-200/50 rounded-sm
            focus:bg-white`} />,
            sortable: true,
            center: true,
            width: '25%',
            compact: true
        },
        {
            name: 'Subir boleta',
            selector: (row, index) => {
                let result = boletasBody[getIndex(row.id)]?.ticket
                console.log(row)
                if (result !== null) {
                    return (
                        <button onClick={() => {
                            deleteFileBoleta(row)
                        }} className="flex justify-center items-center mb-1 h-7 w-44">
                            <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-full bg-emerald-400 rounded-lg 
                cursor-pointer dark:bg-[#00ff00]  dark:hover:bg-[#ff0000]">
                                <div className='h-[100%] w-[100%] flex justify-start pl-4 items-center'>
                                    <FontAwesomeIcon icon={faCircleCheck} />
                                    <span className='text-sm mx-2'>
                                        {result?.name}
                                    </span>
                                </div>
                            </label>
                        </button>
                    )
                } else {
                    return (
                        <div className="flex justify-center items-center mb-1 h-7 w-44">
                            <label htmlFor={"dropzone-file" + index} className="flex flex-col 
                            justify-center items-center w-full h-full bg-gray-50 rounded-lg 
                            cursor-pointer dark:bg-gray-300 dark:hover:bg-[#FF6F00]">
                                <div className='h-[100%] w-[100%] flex justify-start pl-4 items-center'>
                                    <FontAwesomeIcon icon={faCloudArrowUp} className='text-black' />
                                    <span className='text-sm mx-2 text-black'>
                                        Elige un archivo...
                                    </span>
                                    <input id={"dropzone-file" + index} onChange={(e) => {
                                        setFileBoleta(row, e.target.files[0])
                                    }} type="file" className="hidden" />
                                </div>
                            </label>
                        </div>
                    )
                }
            },
            sortable: true,
            width: "28%",
            center: true,
            compact: true
        },
        {
            name: 'Nro de boleta',
            selector: row =>
                <input value={boletasBody[getIndex(row.id)]?.nroTicket}
                    onChange={e => {
                        console.log(typeof e.target.value)
                        setNroBoleta(row, e.target.value)
                    }}
                    className={`w-[30px] h-7 text-center text-black bg-gray-200/50 rounded-sm
                    focus:bg-white`} />
            ,
            sortable: true,
            center: true,
            width: "15%",
            compact: true
        },
        {
            name: 'Nro de boleto anterior',
            selector: row => row.nroTicket,
            sortable: true,
            center: true,
            width: "20%",
            compact: true
        },
    ]

    if (boletasBody.length === 0) {
        return <></>
    }
    return (
        <DataTable
            columns={columnas}
            data={tablaData}
            onRowClicked={(e) => {
                console.log(e)
            }}
            highlightOnHover
            fixedHeader
            fixedHeaderScrollHeight='700px'
            pagination
            customStyles={customStyles}
            paginationComponentOptions={paginationComponentOptions}
        />


    )
} 