import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp, faCircleCheck, faFileCircleCheck, faFile, faPaperPlane, faFileImport } from '@fortawesome/free-solid-svg-icons'
import { customStyles, paginationComponentOptions } from '../utils/constants';
import { sendTicket } from '../api/sendTicket'
import { uploadTicket } from '../api/uploadTicket'



export default function TableBoletas({ files, setFile, tablaData, boletasBody, setBoletasBody, setSendedTicket }) {

    useEffect(() => {

        const createStates = async () => {
            // console.log(data.data)
            let arr = []
            await tablaData.forEach((element, index) => {
                // console.log(element.sended, element.id)
                if (element.sended === true) {
                    arr[index] = { propertyId: element.id, nroTicket: "", ticket: null, amount: element.amount, sended: true }
                }
                if (element.sended === false) {
                    arr[index] = { propertyId: element.id, nroTicket: "", ticket: null, amount: element.amount, sended: false }
                }
            });
            setBoletasBody(arr)
        }
        createStates()


    }, [])


    const getIndex = (id) => {
        //* Funcion para obtener el index a cambiar
        const idFind = (element) => element.propertyId === id
        //* Se ejecuta la funcion para obtener el index y se guarda en indexArr
        let indexArr = boletasBody.findIndex(idFind)
        return indexArr
    }

    // const getIndexFiles = (id) => {
    //     //* Funcion para obtener el index a cambiar
    //     const idFind = (element) => element.id == id
    //     //* Se ejecuta la funcion para obtener el index y se guarda en indexArr
    //     let indexArr = files.findIndex(idFind)
    //     return indexArr
    // }


    const setNroBoleta = async (row, data) => {
        let index = getIndex(row.id)
        // console.log(index)
        // console.log(boletasBody[index].nroTicket)
        let arr = [...boletasBody]
        if (Number(data) === 0) {
            arr[index].nroTicket = ""
        } else (
            arr[index].nroTicket = Number(data)
        )
        // console.log(arr)
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

    const amountSort = (rowA, rowB) => {
        let date1 = boletasBody[getIndex(rowA.id)]?.amount
        let date2 = boletasBody[getIndex(rowB.id)]?.amount

        if (date1 > date2) {
            return 1;
        }

        if (date2 > date1) {
            return -1;
        }
        return 0;
    };


    const estadoSort = (rowA, rowB) => {
        console.log(rowA.sended, rowB.sended)


        if (rowA.sended === true && rowB.sended === false) {
            return 1;
        }

        if (rowB.sended === true && rowA.sended === false) {
            return -1;
        }
        return 0;
    };


    const columnas = [
        {
            name: 'ID Propiedad',
            selector: row => row.propertyId,
            sortable: true,
            width: "9%",
        },
        {
            name: 'Costo por administración',
            selector: row =>
                <input
                    value={boletasBody[getIndex(row.id)]?.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    onChange={e => {
                        setCostoAdm(row, Number(e.target.value))
                    }}
                    disabled
                    className={`w-[120px] h-7 text-center text-gray-700 bg-gray-200/50 rounded-sm focus:bg-white`} />,
            sortable: true,
            center: true,
            width: '19%',
            compact: true,
            sortFunction: amountSort

        },
        {
            name: 'Subir boleta',
            selector: (row, index) => {
                let result = boletasBody[getIndex(row.id)]?.ticket
                // console.log(row)
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
                                    <input id={"dropzone-file" + index}
                                        accept=".pdf"
                                        onChange={(e) => {
                                            setFileBoleta(row, e.target.files[0])
                                        }} type="file" className="hidden" />
                                </div>
                            </label>
                        </div>
                    )
                }
            },
            width: "25%",
            center: true,
            compact: true
        },
        {
            name: 'Nro de boleta',
            selector: row =>
                <input value={boletasBody[getIndex(row.id)]?.nroTicket}
                    onChange={e => {
                        setNroBoleta(row, e.target.value)
                    }}
                    className={`w-[55px] h-7 text-center text-black bg-gray-200/50 rounded-sm
                    focus:bg-white`} />
            ,
            center: true,
            width: "10%",
            compact: true
        },
        {
            name: 'Nro de boleta anterior',
            selector: row => row.lastTicket || "No hay boleta anterior",
            sortable: true,
            center: true,
            width: "20%",
            compact: true
        },
        {
            name: "Estado",
            center: true,
            sortFunction: estadoSort,
            sortable: true,
            selector: (row, index) => {
                if (boletasBody[getIndex(row.id)]?.sended === false) {
                    return (<FontAwesomeIcon icon={faFile} className={`w-6 h-6`} />)
                }
                else {
                    return (<FontAwesomeIcon icon={faFileCircleCheck} className={`w-6 h-6 text-emerald-400`} />)
                }
            }
        },
        {
            selector: (row, index) => <button onClick={async () => {
                // console.log(row)
                let obj = boletasBody[getIndex(row.id)]
                console.log(obj.propertyId, obj.nroTicket, obj.ticket)
                const form = new FormData();
                form.append("id", obj.propertyId);
                form.append("nroTicket", obj.nroTicket)
                form.append("ticket", obj.ticket)
                if (obj.nroTicket === "" || obj.ticket === null) {
                    console.log("Faltan datos")
                } else {
                    let resp = await uploadTicket(form)
                    console.log(resp.status)
                    if (resp.status === 200) {
                        let sendResp = await sendTicket(obj.propertyId)
                        console.log(sendResp)
                        console.log(sendResp.data.adm_exp.sended)
                        if (sendResp.data.adm_exp.sended === true) {
                            setSendedTicket(obj.propertyId)
                        }

                    }
                }
            }}>
                <FontAwesomeIcon icon={faFileImport} className={`w-5 h-5 hover:text-emerald-400 active:hover:text-emerald-600`} />
            </button>,
            sortable: true,
            center: true,
            width: "5%",
            compact: true,
        }
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