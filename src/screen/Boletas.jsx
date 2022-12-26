import React, { useState, useEffect } from 'react'
import TableBoletas from '../components/TableBoletas'
import { getAllExpenses } from '../api/getAllExpenses'
import { sendTicket } from '../api/sendTicket'
import { uploadTicket } from '../api/uploadTicket'


export default function Propiedades() {

    const [files, setFile] = useState([])
    const [boletasBody, setBoletasBody] = useState([])
    const [tablaData, setTableData] = useState([])
    const [boletasSaved, setBoletasSaved] = useState(false)

    useEffect(() => {
        const getData = async () => {
            let resp = await getAllExpenses()
            console.log(resp.data.allAdminExpenses)
            setTableData(resp.data.allAdminExpenses)
        }
        getData()
    }, [])

    const getIndex = (id) => {
        //* Funcion para obtener el index a cambiar
        const idFind = (element) => element.propertyId === id
        //* Se ejecuta la funcion para obtener el index y se guarda en indexArr
        let indexArr = boletasBody.findIndex(idFind)
        return indexArr
    }

    const setSendedTicket = async (id) => {
        let index = getIndex(id)
        console.log(index)
        console.log(boletasBody[index].sended)
        let arr = [...boletasBody]
        arr[index].sended = true
        console.log(arr)
        setBoletasBody(arr)
    }


    const saveTicket = () => {
        let count = { emmpty: 0, nice: 0 }
        boletasBody.forEach(async (element, index) => {
            // console.log(element)
            const form = new FormData();
            form.append("id", element.propertyId);
            form.append("nroTicket", element.nroTicket)
            form.append("ticket", element.ticket)
            // console.log({ id: element.propertyId, nroTicket: element.nroTicket, ticket: element.ticket })
            if (element.nroTicket === "" || element.ticket === null) {
                count.emmpty += 1
            } else {
                let resp = await uploadTicket(form)
                console.log(resp.status)
                if (resp.status === 200) {
                    setSendedTicket(element.propertyId)
                }
                count.nice += 1
            }

        })
        // console.log(boletasBody)
        console.log(count)
        setBoletasSaved(true)
    }

    const sendBoletas = async () => {


    }


    return (
        <div className="h-[100vh] flex flex-col justify-start items-start p-1  sm:w-[100vw] md:w-[100vw] lg:w-[100vw] xl:w-[85vw]  2xl:w-[80vw]">
            <div className="flex  items-end justify-end w-full h-[10vh] mb-4 ">
                {boletasSaved === false ?
                    <button onClick={() => {
                        saveTicket()
                    }}
                        className="group relative h-12 mr-4   w-48 overflow-hidden rounded-lg bg-white text-lg shadow-sm">
                        <div className="absolute inset-0 w-0 bg-[#FF6F00] transition-all duration-[150ms] ease-out group-hover:w-full"></div>
                        <span className="relative  group-hover:text-white">Guardar boletas</span>
                    </button>

                    :
                    <button onClick={() => {
                        sendBoletas()
                    }}
                        className="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow-sm">
                        <div className="absolute inset-0 w-0 bg-[#FF6F00] transition-all duration-[150ms] ease-out group-hover:w-full"></div>
                        <span className="relative  group-hover:text-white">Enviar boletas</span>
                    </button>
                }

            </div>

            <div className='flex pt-3 px-4 mb-10 flex-col justify-start items-end w-[100%] h-auto bg-white rounded-lg shadow-sm'>
                <div className='w-full'>
                    <p className='text-lg font-semibold'>Boletas</p>
                </div>
                {
                    tablaData.length === 0 ?
                        <div className={`w-full flex h-10 justify-center items-center`}>
                            No hay data
                        </div>
                        :
                        <TableBoletas tablaData={tablaData} files={files} setFile={setFile}
                            boletasBody={boletasBody} setBoletasBody={setBoletasBody} setSendedTicket={setSendedTicket} />
                }
            </div>
        </div>
    )
}