import React, { useState } from 'react'
import TableBoletas from '../components/TableBoletas'

export default function Propiedades() {
    const [files, setFile] = useState([])

    const tablaData = [
        {
            id: "1", costoadministracion: "$92.000", nroboleta: "20", nroboletaanterior: "14",
        },
        {
            id: "2", costoadministracion: "$100.000", nroboleta: "13", nroboletaanterior: "8",
        },
        {
            id: "3", costoadministracion: "$98.000", nroboleta: "11", nroboletaanterior: "15",
        },
        {
            id: "4", costoadministracion: "$198.000", nroboleta: "56", nroboletaanterior: "26",
        },
        {
            id: "5", costoadministracion: "$28.000", nroboleta: "40", nroboletaanterior: "16",
        },

    ]

    // [#00ff00] 

    return (
        <div className="h-[100vh] flex flex-col justify-start items-start p-1  sm:w-[100vw] md:w-[100vw] lg:w-[100vw] xl:w-[85vw]  2xl:w-[80vw]">
            <div className="flex  items-end justify-end w-full h-[10vh] mb-4 ">
                <button onClick={() => {

                    console.log(tablaData.length, files.length)
                    files.forEach(element => {
                        console.log(element)
                    });
                    if (tablaData.length === files.length) {
                        alert("Boletas enviadas")
                    } else {
                        alert("Faltan boletas por subir")
                    }
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
                <TableBoletas tablaData={tablaData} files={files} setFile={setFile} />
            </div>
        </div>
    )
}