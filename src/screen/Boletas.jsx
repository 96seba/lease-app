import React, { useState, useEffect } from 'react'
import TableBoletas from '../components/TableBoletas'
import { addAdminExp } from '../api/addAdminExp'
import { getAllExpenses } from '../api/getAllExpenses'
import { uploadTicket } from '../api/uploadTicket'
import { sendAllTickets } from '../api/sendAllTickets'


export default function Propiedades() {
    const [files, setFile] = useState([])
    const [boletasBody, setBoletasBody] = useState([])
    const [boletasIds, setBoletasIds] = useState([])

    const [tablaData, setTableData] = useState([
        // {
        //     id: 1, costoadministracion: 92000, nroboleta: "20", nroboletaanterior: "14",
        // },
        // {
        //     id: 2, costoadministracion: 100000, nroboleta: "13", nroboletaanterior: "8",
        // },
        // {
        //     id: 3, costoadministracion: 98000, nroboleta: "11", nroboletaanterior: "15",
        // },
    ])


    useEffect(() => {
        const getData = async () => {
            let resp = await getAllExpenses()
            console.log(resp.data.allAdminExpenses)
            setTableData(resp.data.allAdminExpenses)
        }
        getData()
    }, [])


    const saveTicket = () => {
        boletasBody.forEach(async (element, index) => {
            console.log(element)
            const form = new FormData();
            form.append("id", element.propertyId);
            form.append("nroTicket", element.nroTicket)
            form.append("ticket", element.ticket)
            let resp = await uploadTicket(form)
            console.log(resp)
        })
    }

    const sendBoletas = async () => {
        let resp = await sendAllTickets()
        console.log(resp)

    }


    return (
        <div className="h-[100vh] flex flex-col justify-start items-start p-1  sm:w-[100vw] md:w-[100vw] lg:w-[100vw] xl:w-[85vw]  2xl:w-[80vw]">
            <div className="flex  items-end justify-end w-full h-[10vh] mb-4 ">
                <button onClick={() => {
                    saveTicket()
                }}
                    className="group relative h-12 mr-4   w-48 overflow-hidden rounded-lg bg-white text-lg shadow-sm">
                    <div className="absolute inset-0 w-0 bg-[#FF6F00] transition-all duration-[150ms] ease-out group-hover:w-full"></div>
                    <span className="relative  group-hover:text-white">Guardar boletas</span>
                </button>
                <button onClick={() => {
                    sendBoletas()
                }}
                    className="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow-sm">
                    <div className="absolute inset-0 w-0 bg-[#FF6F00] transition-all duration-[150ms] ease-out group-hover:w-full"></div>
                    <span className="relative  group-hover:text-white">Enviar boletas</span>
                </button>

            </div>

            <div className='flex pt-3 px-4 mb-10 flex-col justify-start items-end w-[100%] h-auto bg-white rounded-lg shadow-sm'>
                <div className='w-full'>
                    <p className='text-lg font-semibold'>Boletas</p>
                </div>
                {
                    tablaData.length === 0 ?
                        <>asd</>
                        :
                        <TableBoletas tablaData={tablaData} files={files} setFile={setFile}
                            boletasBody={boletasBody} setBoletasBody={setBoletasBody} />
                }

            </div>

        </div>
    )
}