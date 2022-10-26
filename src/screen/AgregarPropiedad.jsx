import { useState } from 'react'
import ModalGuardar from '../components/ModalGuardar'

export default function AgregarPropiedad() {

    const [estacionamiento, setEstacionamiento] = useState(false)
    const [bodega, setBodega] = useState(false)
    const [baños, setBaños] = useState("")
    const [foto, setFoto] = useState("")


    return (
        <div className='w-screen flex justify-center items-center bg-white'>
            <div className="w-[100vw] sm:w-[100vw] md:w-[80vw] lg:w-[80vw] xl:w-[65vw] shadow-lg h-[110.5vh] p-6  flex items-center">
<ModalGuardar/>
                <div className='w-1/2 h-full flex flex-col justify-start items-center'>
                    <p className="flex my-4 text-xl">
                        Datos de la propiedad
                    </p>

                    <div className="mb-1 w-[90%] flex flex-col justify-center items-start">
                        <p>Id</p>
                        <input className="appearance-none outline-pink-400 border h-[90%] rounded-sm w-[95%] py-2 px-3 text-grey-darker" id="username" type="text"
                            placeholder="Id" />
                    </div>
                    <div className="mb-1 w-[90%] flex flex-col justify-center items-start">
                        <p>Direccion</p>
                        <input className="appearance-none outline-pink-400 border h-[90%] rounded-sm w-[95%] py-2 px-3 text-grey-darker" id="username" type="text"
                            placeholder="Dormitorios" />
                    </div>
                    <div className="mb-1 w-[90%] flex flex-col justify-center items-start">
                        <p>Nro piso</p>
                        <input className="appearance-none outline-pink-400 border h-[90%] rounded-sm w-[95%] py-2 px-3 text-grey-darker" id="username" type="text"
                            placeholder="Nro piso" />
                    </div>
                    <div className="mb-1 w-[90%] flex justify-around flex-row">
                        <div className='w-1/2 h-[10vh] flex flex-col justify-center items-start'>
                            <p>Dormitorios</p>
                            <input className="appearance-none outline-pink-400 border h-[40%] rounded-sm w-[90%] py-2 px-3 text-grey-darker" id="username" type="Number"
                                placeholder="Dormitorios" />
                        </div>
                        <div className='w-1/2 h-[10vh] flex flex-col justify-center items-start'>
                            <p>Baños</p>
                            <input
                                value={baños}
                                onChange={text => setBaños(text)}
                                className="appearance-none outline-pink-400 border h-[40%] rounded-sm w-[90%] py-2 px-3 text-grey-darker" id="username" type="Number"
                                placeholder="Baños" />
                        </div>
                    </div>
                    <div className="mb-1 w-[90%] flex justify-around flex-row">
                        <div className='w-1/2 h-[10vh] flex flex-col justify-center items-start'>
                            <p>Arrendador</p>
                            <input className="appearance-none outline-pink-400 border h-[40%] rounded-sm w-[90%] py-2 px-3 text-grey-darker" id="username" type="text"
                                placeholder="Arrendador" />
                        </div>
                        <div className='w-1/2 h-[10vh] flex flex-col justify-center items-start'>
                            <p>Rut arrendador</p>
                            <input className="appearance-none outline-pink-400 border h-[40%] rounded-sm w-[90%] py-2 px-3 text-grey-darker" id="username" type="text"
                                placeholder="Rut arrendador" />
                        </div>
                    </div>
                    <div className="mb-1 w-[90%] flex justify-around flex-row">
                        <div className='w-1/2 h-[10vh] flex flex-col justify-center items-start'>
                            <p>Arrendatario</p>
                            <input className="appearance-none outline-pink-400 border h-[40%] rounded-sm w-[90%] py-2 px-3 text-grey-darker" id="username" type="text"
                                placeholder="Arrendatario" />
                        </div>
                        <div className='w-1/2 h-[10vh] flex flex-col justify-center items-start'>
                            <p>Rut arrendatario</p>
                            <input className="appearance-none outline-pink-400 border h-[40%] rounded-sm w-[90%] py-2 px-3 text-grey-darker" id="username" type="text"
                                placeholder="Rut arrendatario" />
                        </div>
                    </div>

                    <div className="my-3 w-[90%]">
                        <label for="teal-toggle" class="inline-flex relative items-center mr-5 cursor-pointer">
                            <input type="checkbox" value="" id="teal-toggle" class="sr-only peer"
                                checked={estacionamiento} onChange={() => { setEstacionamiento(!estacionamiento) }} />
                            <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700  peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-pink-400"></div>
                            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-900">Estacionamiento</span>
                        </label>


                        <label for="d-toggle" class="inline-flex relative items-center mr-5 cursor-pointer">
                            <input type="checkbox" value="" id="d-toggle" class="sr-only peer"
                                checked={bodega} onChange={() => { setBodega(!bodega) }} />
                            <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700  peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-pink-400"></div>
                            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-900">Bodega</span>
                        </label>

                    </div>
                    {foto === "" ?
                        <div class="flex justify-center items-center mb-1 h-[25vh] w-[90%]">
                            <label for="dropzone-file" class="flex flex-col justify-center items-center w-full h-full bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-100 hover:bg-gray-100 dark:border-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div class="flex flex-col justify-center items-center pt-5 pb-6">
                                    <svg aria-hidden="true" class="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p class="mb-2 text-sm text-center text-gray-500 dark:text-gray-400"><span class="font-semibold">Presiona para subir un archivo</span> o arrastra y sueltalo</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-300">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>

                                <input id="dropzone-file" onChange={(e) => {
                                    console.log(e.target.files[0].name)
                                    setFoto(e.target.files[0].name)
                                }} type="file" class="hidden" />
                            </label>
                        </div>
                        : <div className='flex rounded justify-center flex-col  mb-1 items-center  h-[25vh] w-[90%] bg-gray-200'>
                            <p>{foto}</p>
                            <button
                                onClick={() => {
                                    setFoto("")
                                }}
                                className='bg-teal-300 w-2/4 rounded-lg h-[10%] hover:bg-red-600  hover:text-white active:bg-blue-600'>Eliminar foto</button>
                        </div>
                    }




                </div>
                <div className='w-1/2 h-full flex flex-col border-l-2   justify-start items-center '>
                    <p className="flex my-4 text-xl">
                        Contrato
                    </p>
                    <div className="mb-3 w-[90%] flex flex-col justify-center items-start">
                        <p>Monto</p>
                        <input className="appearance-none outline-pink-400 border h-[90%] rounded-sm w-[95%] py-2 px-3 text-grey-darker" id="username" type="text"
                            placeholder="Monto" />
                    </div>
                    <div className="mb-3 w-[90%] flex flex-col justify-center items-start">
                        <p>Comision por administracion</p>
                        <input className="appearance-none outline-pink-400 border h-[90%] rounded-sm w-[95%] py-2 px-3 text-grey-darker" id="username" type="text"
                            placeholder="Comision por administracion" />
                    </div>
                    <div className="mb-3 w-[90%] flex flex-col justify-center items-start">
                        <p>Gastos comunes</p>
                        <input className="appearance-none outline-pink-400 border h-[90%] rounded-sm w-[95%] py-2 px-3 text-grey-darker" id="username" type="text"
                            placeholder="Gastos comunes" />
                    </div>
                    <div className="mb-3 w-[90%] flex flex-col justify-center items-start">
                        <p>Inicio de contrato</p>
                        <input className="appearance-none outline-pink-400 border h-[90%] rounded-sm w-[95%] py-2 px-3 text-grey-darker" id="username" type="date"
                            placeholder="Inicio de contrato" />
                    </div>
                    <div className="mb-20 w-[90%] flex flex-col justify-center items-start">
                        <p>Termino de contrato</p>
                        <input className="appearance-none outline-pink-400 border h-[90%] rounded-sm w-[95%] py-2 px-3 text-grey-darker" id="username" type="date"
                            placeholder="Termino de contrato" />
                    </div>


                    <button className='w-[50%] flex flex-row justify-center items-center h-[5vh] rounded-full bg-sky-300 active:bg-blue-500 hover:bg-sky-400'>
                        Guardar

                    </button>

                </div>
            </div>
        </div>
    )
}