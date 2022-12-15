import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import TableCheck from '../components/TableCheck'
import TableDebtors from '../components/TableDebtors'
import TableVisitsPending from '../components/TableVisitsPending';
import ModalAddFile from '../components/ModalAddFile';
import { getDebtors } from '../api/getDebtors';
import { getVisitsPending } from '../api/getVisitsPending';
import { useNavigate } from 'react-router-dom';
import TableAlerts from '../components/TableAlerts';




export default function Dashboard() {



    const [debtorData, setDebtorData] = useState([])
    const [visitsData, setVisitsData] = useState([
        { id: 10, descripcion: "Arreglar baño", fecha: '02/10/2022', urgencia: 'Alta' },
        { id: 20, descripcion: "Arreglar baño", fecha: '02/10/2022', urgencia: 'Alta' }
    ])
    const [alertsData, setAlertsData] = useState([
        { id: 1, note: "Arreglar el bañete", priority: "ALTA", by: "Julian Casablancas", date: "21/09/2022" },
        { id: 2, note: "Hablar con conserjeria", priority: "MEDIA", by: "Julian Casablancas", date: "02/10/2022" },
        { id: 3, note: "Renovar contrato", priority: "BAJA", by: "Julian Casablancas", date: "10/09/2022" }
    ])




    const [dataCheck, setDataCheck] = useState([
        { id: 26, descripcion: "Revisar la luz, revisar el bañete, porque el wc tiene un problema, esta tapado gente, no lo usen o terminara mal", estado: "No revisado" },
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
            console.log(respDebtors.data)
            setDebtorData(respDebtors.data.debtors)
            const respVisits = await getVisitsPending()
            setVisitsData(respVisits.data.visits)
            console.log(respVisits)
            let token = localStorage.getItem('token')

            console.log(token)
        }
        getData()
    }, [])


    return (
        <div className="flex bg-gray-100 mt-3 flex-col h-auto sm:w-[100vw] md:w-[100vw] lg:w-[100vw] xl:w-[85vw] 2xl:w-[80vw] items-start justify-start">
            <div className="flex h-[185.5vh] sm:h-[170.5vh] md:h-[165.5vh] lg:h-[125.5vh]  py-6  w-full items-center justify-start flex-col">
                <div className='flex pt-3 px-4 mb-10 flex-col justify-start items-end w-[99%] h-[36vh] bg-white rounded-lg shadow-sm '>
                    <div className='w-full'>
                        <p className='text-lg font-semibold'>Propiedades a revisar</p>
                    </div>
                    <TableCheck dataCheck={dataCheck} setDataCheck={setDataCheck} />
                </div>
                <div className='flex pt-3 px-4 mb-10 flex-col justify-start items-end w-[99%] h-[36vh] rounded-lg shadow-sm
                bg-white '>
                    <div className='w-full'>
                        <p className='text-lg font-semibold'>Deudores</p>
                    </div>
                    {
                        debtorData !== [] ?
                            <TableDebtors debtorData={debtorData} />
                            :
                            <div className="w-full h-[20vh] flex justify-center items-center flex-col">
                                <p>No hay deudores aun :/</p>
                                <img src={require('../assets/velociraptor.png')} className={'w-[12vh]'} alt="" />
                            </div>
                    }
                </div>
                <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row  justify-between items-end w-[99%] h-[36vh] '>
                    <div className='flex  flex-col  pt-3 px-4 justify-start items-end h-full sm:w-full md:w-full lg:w-[48%] sm:mb-10 md:mb-10 lg:mb-0 rounded-lg shadow-sm bg-white'>
                        <div className='w-full'>
                            <p className='text-lg font-semibold'>Visitas pendientes</p>
                        </div>
                        {visitsData !== [] ?
                            <TableVisitsPending data={visitsData} /> :
                            <div className="w-full h-[20vh] flex justify-center items-center flex-col">
                                <p>No hay visitas aun :/</p>
                                <img src={require('../assets/velociraptor.png')} className={'w-[12vh]'} alt="" />
                            </div>
                        }
                    </div>
                    <div className='flex  flex-col  pt-3 px-4 justify-start items-end h-full sm:w-full md:w-full lg:w-[48%] rounded-lg shadow-sm bg-white'>
                        <div className='w-full'>
                            <p className='text-lg font-semibold'>Pendientes criticos</p>
                        </div>
                        {alertsData !== [] ?
                            <TableAlerts data={alertsData} /> :
                            <div className="w-full h-[20vh] flex justify-center items-center flex-col">
                                <p>No hay pendientes criticos aun :/</p>
                                <img src={require('../assets/velociraptor.png')} className={'w-[12vh]'} alt="" />
                            </div>

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


