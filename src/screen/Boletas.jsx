import React, { useState, useEffect } from 'react'
import TableBoletas from '../components/TableBoletas'
import { getAllExpenses } from '../api/getAllExpenses'
import { getExpensesForPeriod } from '../api/getExpensesForPeriod'



export default function Boletas() {

    const [files, setFile] = useState([])
    const [boletasBody, setBoletasBody] = useState([])
    const [tablaData, setTableData] = useState([])

    const [monthInput, setMonthInput] = useState()

    useEffect(() => {
        let date = new Date()
        let mm = date.getMonth() + 1
        let yyyy = date.getUTCFullYear()
        if (mm < 10) {
            mm = "0" + mm
        }
        console.log( mm+ "-" + yyyy)
        setMonthInput(yyyy + "-" +mm)
        document.title = 'Boletas'
        const getData = async () => {
            let resp = await getAllExpenses()
            console.log(resp.data.allAdminExpenses)
            setTableData(resp.data.allAdminExpenses)
            console.log(resp)
        }
        getData()
    }, [])

    // useEffect(() => {
    //     const getBoletasPorMes = async () => {
    //         let date = new Date(monthInput)
    //         let mm = date.getMonth() + 1
    //         let yyyy = date.getUTCFullYear()
    //         if (mm < 10) {
    //             mm = "0" + mm
    //         }
    //         console.log(mm + "-" + yyyy)
    //         // let resp = await getExpensesForPeriod({ period: mm + "-" + yyyy })
    //         // console.log(resp)
    //         // setTableData(resp.data.allAdminExpenses)
    //     }
    //     getBoletasPorMes()
    // }, [monthInput])


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




    return (
        <div className="h-[84vh] flex flex-col justify-start  items-start p-1 mt-[30px] sm:w-[100vw] md:w-[100vw] lg:w-[100vw] xl:w-[85vw]  2xl:w-[80vw]">
            <div className='w-full h-[5vh] flex justify-start items-center'>

                <input 
                className={` rounded-md border-0`}
                type={'month'}
                    value={monthInput}
                    onChange={async (e) => {
                        setMonthInput(e.target.value)
                        let date = e.target.value.split("-")
                        console.log(date[1] + "-" + date[0])
                        let resp = await getExpensesForPeriod({ period: date[1] + "-" + date[0] })
                        console.log(resp)
                        setTableData(resp.data.allAdminExpenses)
                    }}
                />
            </div>


            <div className='flex pt-3 px-4 mt-[12px] mb-10 flex-col justify-start items-end w-[100%] h-auto bg-white rounded-lg shadow-sm'>
                <div className='w-full'>
                    <p className='text-lg font-semibold'>Boletas</p>
                </div>
                {
                    tablaData.length === 0 ?
                        <div className={`w-full flex h-64 justify-center items-center`}>
                            <div className="w-full h-[22vh] mt-6 flex justify-center items-center flex-col">
                                <p>No hay boletas del mes seleccionado</p>
                                <img src={require('../assets/loading.JPG')} className={'w-[130px] h-[130px]'} />
                            </div>
                        </div>
                        :
                        <TableBoletas tablaData={tablaData} files={files} setFile={setFile}
                            boletasBody={boletasBody} setBoletasBody={setBoletasBody} setSendedTicket={setSendedTicket} />
                }
            </div>
        </div>
    )
}