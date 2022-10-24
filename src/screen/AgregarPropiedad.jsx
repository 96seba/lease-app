import { useState } from 'react'

export default function AgregarPropiedad() {

    const [estacionamiento, setEstacionamiento] = useState(false)
    const [bodega, setBodega] = useState(false)
    const [foto, setFoto] = useState("")


    return (
        <div className="w-screen h-[91.5vh] p-6 flex justify-between items-center">
            <div className="flex rounded flex-col justify-center items-start p-6 w-5/12 h-full shadow-md bg-slate-200">
                <p className="flex my-4 text-xl">
                    Datos de la propiedad
                </p>
                <div className="mb-3 w-full">
                    <input className="shadow appearance-none border h-[90%] rounded w-full py-2 px-3 text-grey-darker" id="username" type="text"
                        placeholder="Dormitorios" />
                </div>
                <div className="mb-3 w-full">
                    <input className="shadow appearance-none border h-[90%] rounded w-full py-2 px-3 text-grey-darker" id="username" type="text"
                        placeholder="Baños" />
                </div>
                <div className="mb-3 w-full">
                    <label for="teal-toggle" class="inline-flex relative items-center mr-5 cursor-pointer">
                        <input type="checkbox" value="" id="teal-toggle" class="sr-only peer"
                            checked={estacionamiento} onChange={() => { setEstacionamiento(!estacionamiento) }} />
                        <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700  peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-900">Estacionamiento</span>
                    </label>


                    <label for="d-toggle" class="inline-flex relative items-center mr-5 cursor-pointer">
                        <input type="checkbox" value="" id="d-toggle" class="sr-only peer"
                            checked={bodega} onChange={() => { setBodega(!bodega) }} />
                        <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700  peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-900">Bodega</span>
                    </label>

                </div>
                <div className="mb-3 w-full">

                    <input className="shadow appearance-none border h-[90%] rounded w-full py-2 px-3 text-grey-darker" id="username" type="text"
                        placeholder="Bodega" />
                </div>
                <div className="mb-3 w-full">

                    <input className="shadow appearance-none border h-[90%] rounded w-full py-2 px-3 text-grey-darker" id="username" type="text"
                        placeholder="Id" />
                </div>
                <div className="mb-3 w-full">

                    <input className="shadow appearance-none border h-[90%] rounded w-full py-2 px-3 text-grey-darker" id="username" type="text"
                        placeholder="Direccion" />
                </div>
                <div className="mb-3 w-full">

                    <input className="shadow appearance-none border h-[90%] rounded w-full py-2 px-3 text-grey-darker" id="username" type="text"
                        placeholder="Dueño" />
                </div>

                <div className="flex justify-between mb-3 w-full">
                    <input className=" shadow appearance-none border h-[90%] rounded w-[48%] py-2 px-3 text-grey-darker" id="username" type="text"
                        placeholder="Rut arrendador" />
                    <input className="shadow appearance-none border h-[90%] rounded w-[48%] py-2 px-3 text-grey-darker" id="username" type="text"
                        placeholder="Nombre arrendador" />
                </div>

                <div className="flex justify-between mb-3 w-full">
                    <input className=" shadow appearance-none border h-[90%] rounded w-[48%] py-2 px-3 text-grey-darker" id="username" type="text"
                        placeholder="Rut arrendatario" />
                    <input className="shadow appearance-none border h-[90%] rounded w-[48%] py-2 px-3 text-grey-darker" id="username" type="text"
                        placeholder="Nombre arrendatario" />
                </div>
            </div>


            <div className="flex   justify-between flex-col items-center w-6/12 h-full ">
                <div className="flex flex-col p-6 rounded w-full h-[45%] justify-center items-center shadow-md bg-slate-200">
                    <p>Contrato</p>
                    <div className="mb-3 w-full">

                        <input className="shadow appearance-none border h-[90%] rounded w-full py-2 px-3 text-grey-darker" id="username" type="text"
                            placeholder="Monto" />
                    </div>
                    <div className="mb-3 w-full">

                        <input className="shadow appearance-none border h-[90%] rounded w-full py-2 px-3 text-grey-darker" id="username" type="text"
                            placeholder="Gastos comunes" />
                    </div>
                    <div className="mb-3 w-full">

                        <input className="shadow appearance-none border h-[90%] rounded w-full py-2 px-3 text-grey-darker" id="username" type="date"
                            placeholder="Inicio de contrato" />
                    </div>
                    <div className="mb-3 w-full">

                        <input className="shadow appearance-none border h-[90%] rounded w-full py-2 px-3 text-grey-darker" id="username" type="date"
                            placeholder="Termino de contrato" />
                    </div>
                </div>

                <div className="flex flex-col rounded w-full h-[45%] justify-center items-center shadow-md bg-slate-200">

                    {foto == "" ?
                        <div class="flex justify-center items-center h-full w-full">
                            <label for="dropzone-file" class="flex flex-col justify-center items-center w-full h-full bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-100 hover:bg-gray-100 dark:border-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div class="flex flex-col justify-center items-center pt-5 pb-6">
                                    <p>{foto}</p>
                                    <svg aria-hidden="true" class="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Presiona para subir un archivo</span> o arrastra y sueltalo</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-300">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>

                                <input id="dropzone-file" onChange={(e) => {
                                    console.log(e.target.files[0].name)
                                    setFoto(e.target.files[0].name)
                                }} type="file" class="hidden" />
                            </label>
                        </div>
                        : <>
                            <p>{foto}</p>
                            <button
                            onClick={()=>{
                                setFoto("")
                            }}
                            className='bg-teal-300 w-2/4 rounded-lg h-[10%] hover:bg-red-600  hover:text-white active:bg-blue-600'>Eliminar foto</button>
                        </>
                    }
                </div>

            </div>

        </div>
    )
}