import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import TableCheck from '../components/TableCheck'
import TableDebtors from '../components/TableDebtors'
import TableToResolveNVisits from '../components/TableToResolveNVisits';
import ModalAddFile from '../components/ModalAddFile';



export default function Dashboard() {

    const [dataCheck, setDataCheck] = useState([
        { id: 26, descripcion: "Revisar la luz", estado: "No revisado" },
        { id: 16, descripcion: "Revisar el agua", estado: "Revisado" },
        { id: 63, descripcion: "LLevar ampolletas", estado: "Revisado" },
        { id: 37, descripcion: "Echarlos de la casa", estado: "Revisado" },
        { id: 59, descripcion: "Revisar la luz", estado: "No revisado" },
        { id: 85, descripcion: "Revisar la ducha", estado: "No revisado" },
        { id: 75, descripcion: "Revisar la luz", estado: "No revisado" },
        { id: 72, descripcion: "Revisar la ducha", estado: "No revisado" },
        { id: 71, descripcion: "Revisar la luz", estado: "No revisado" },
        { id: 41, descripcion: "Revisar la ducha", estado: "No revisado" },
        { id: 81, descripcion: "Revisar la luz", estado: "No revisado" },
    ])

    const [open, setOpen] = useState(false)

    const openModal = (data) => {
        setOpen(true)
        // console.log("AAAAAAAAAAAAAA")
        console.log(data)
    }

    return (
        <div className="flex flex-col h-auto bg-gray-100 w-screen items-start justify-start">
            <div className=" flex mt-3 bg-gray-100 w-screen justify-start px-6">
                <button onClick={() => setOpen(true)} setOpen={setOpen} openModal={openModal} className="flex text-white bg-[#3A4348] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Subir Excel</button>
            </div>
            <div className="flex h-[150.5vh] py-6 mt-4 w-screen items-center justify-start flex-col">

                <div className='flex pt-3 px-4 mb-10 flex-col justify-start items-end w-[96%] h-[36vh] bg-white shadow-md'>
                    <div className='w-full'>
                        <p>Propiedades a revisar</p>
                    </div>
                    <TableCheck dataCheck={dataCheck} setDataCheck={setDataCheck} />

                </div>
                <div className='flex pt-3 px-4 mb-10 flex-col justify-start items-end w-[96%] h-[36vh] bg-white shadow-md'>
                    <div className='w-full'>
                        <p>Deudores</p>
                    </div>

                    <TableDebtors />
                </div>

                <div className='flex  justify-between items-end w-[96%] h-[36vh] '>
                    <div className='flex  flex-col  pt-3 px-4 justify-start items-start h-full w-5/12  shadow-md bg-white'>
                        <div className='w-full'>
                            <p>Visitas pendientes</p>
                        </div>
                        <TableToResolveNVisits />
                    </div>
                    <div className='flex  flex-col  pt-3 px-4 justify-start items-start h-full w-5/12  shadow-md bg-white'>
                        <div className='w-full'>
                            <p>Pendientes criticos</p>
                        </div>
                        <TableToResolveNVisits />
                    </div>
                </div>

                {/* <div className='flex p-6 mb-10 flex-col justify-start items-end w-[96%] h-[45vh] bg-white shadow-md'>
                        <div className='fles w-full'>
                            <p>Propiedades a revisar</p>
                        </div>
                        <TableCheck dataCheck={dataCheck} setDataCheck={setDataCheck} />

                    </div>
                    <div className='flex p-6 mb-10 flex-col justify-start items-end w-[96%] h-[45vh] bg-white shadow-md'>
                        <div className='fles w-full'>
                            <p>Historial de pagos</p>
                        </div>
                        <TableDebtors />

                    </div> */}
                {/* <div className='flex h-[46vh] w-full items-end justify-center flex-column px-4 '>
                        <TableDebtors />
                    </div>
                    <div className='flex flex-row h-[46vh] w-full items-center justify-center'>
                        <div className='flex w-1/2 h-full items-end justify-center flex-column p-4 pt-0'>
                            <TableToResolveNVisits />
                        </div>
                        <div className='flex w-1/2 h-full items-end justify-center flex-column p-4 pt-0'>
                            <TableToResolveNVisits />
                        </div>
                    </div> */}

                {/* <div className='flex w-1/4  h-[91.5vh] items-end justify-start flex-column p-4'>
                    <TableCheck dataCheck={dataCheck} setDataCheck={setDataCheck} />
                </div> */}
            </div>
            <ModalAddFile open={open} setOpen={setOpen} />
        </div>
    )
} 