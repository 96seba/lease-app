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


    return (
        <div className="flex bg-gray-100 mt-3 flex-col h-auto sm:w-[100vw] md:w-[100vw] lg:w-[100vw] xl:w-[85vw] 2xl:w-[80vw] items-start justify-start">
            {/* <div className='flex pt-4 px-12  flex-col justify-start items-start w-screen h-[8vh]'>
                <button onClick={() => setOpen(true)} setOpen={setOpen} openModal={openModal}
                    className="flex text-white bg-[#3A4348] hover:bg-primary-700 focus:ring-4 
                    focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5
                     py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Subir Excel</button>
            </div> */}
            <div className="flex h-[125.5vh] py-6  w-full items-center justify-start flex-col">
                <div className='flex pt-3 px-4 mb-10 flex-col justify-start items-end w-[99%] h-[36vh] bg-white rounded-lg shadow-sm '>
                    <div className='w-full'>
                        <p className='text-lg font-semibold'>Propiedades a revisar</p>
                    </div>
                    <TableCheck dataCheck={dataCheck} setDataCheck={setDataCheck} />
                </div>
                <div className='flex pt-3 px-4 mb-10 flex-col justify-start items-end w-[99%] h-[36vh] bg-white rounded-lg shadow-sm '>
                    <div className='w-full'>
                        <p className='text-lg font-semibold'>Deudores</p>
                    </div>
                    <TableDebtors />
                </div>
                <div className='flex  justify-between items-end w-[99%] h-[36vh] '>
                    <div className='flex  flex-col  pt-3 px-4 justify-start items-start h-full w-[48%]  rounded-lg shadow-sm bg-white'>
                        <div className='w-full'>
                            <p className='text-lg font-semibold'>Visitas pendientes</p>
                        </div>
                        <TableToResolveNVisits />
                    </div>
                    <div className='flex  flex-col  pt-3 px-4 justify-start items-start h-full w-[48%] rounded-lg shadow-sm bg-white'>
                        <div className='w-full'>
                            <p className='text-lg font-semibold'>Pendientes criticos</p>
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