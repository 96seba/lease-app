import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import TableCheck from '../components/TableCheck'
import TableDebtors from '../components/TableDebtors'
import TableToResolveNVisits from '../components/TableToResolveNVisits';
import ModalAddFile from '../components/ModalAddFile';
import { getDebtors } from '../api/getDebtors';



export default function Dashboard() {
    const [debtorData, setDebtorData] = useState([])


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


    useEffect(() => {
        const getData = async () => {
            const respDebtors = await getDebtors()
            console.log(respDebtors)
            setDebtorData(respDebtors.data)
        }
        getData()
    }, [])


    return (
        <div className="flex bg-gray-100 mt-3 flex-col h-auto sm:w-[100vw] md:w-[100vw] lg:w-[100vw] xl:w-[85vw] 2xl:w-[80vw] items-start justify-start">
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
                    {
                        debtorData === [] ?
                            <TableDebtors debtorData={debtorData} />
                            :
                            <div className="w-full h-[20vh] flex justify-center items-center flex-col">
                                <p>No hay deudores aun :/</p>
                                <img src={require('../assets/velociraptor.png')} className={'w-[12vh]'} alt="" />
                            </div>
                    }
                </div>
                <div className='flex justify-between items-end w-[99%] h-[36vh] '>
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
            </div>
            <ModalAddFile open={open} setOpen={setOpen} />
        </div>
    )
} 