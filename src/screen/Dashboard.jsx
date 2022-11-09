import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import TableCheck from '../components/TableCheck'
import TableDebtors from '../components/TableDebtors'
import TableToResolveNVisits from '../components/TableToResolveNVisits';



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

    return (
        <div className="flex flex-col h-[91.5vh] bg-gray-50 w-screen items-start justify-start">
            <div className=" flex mt-3 bg-gray-50 h-[5vh] w-screen justify-start px-6">
                <button className="flex text-white bg-[#374151] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Subir Excel</button>
            </div>
            <div className="flex h-[86.5vh] mt-4 bg-gray-50 w-screen items-center justify-center">
                <div className='flex w-3/4  h-[91.5vh] items-center justify-center flex-col'>
                    <div className='flex h-[46vh] w-full  items-end justify-center flex-column p-4'>
                        <TableDebtors />
                    </div>
                    <div className='flex flex-row h-[46vh] w-full items-center justify-center'>
                        <div className='flex w-1/2 h-full items-end justify-center flex-column p-4 pt-0'>
                            <TableToResolveNVisits />
                        </div>
                        <div className='flex w-1/2 h-full items-end justify-center flex-column p-4 pt-0'>
                            <TableToResolveNVisits />
                        </div>
                    </div>
                </div>
                <div className='flex w-1/4  h-[91.5vh] items-end justify-start flex-column p-4'>
                    <TableCheck dataCheck={dataCheck} setDataCheck={setDataCheck} />
                </div>
            </div>
        </div>
    )
} 