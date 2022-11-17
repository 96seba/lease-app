import React, { useState } from 'react'
import TableBoletas from '../components/TableBoletas'

export default function Propiedades() {
    const [files, setFile] = useState([])

    // [#00ff00] 

    return (
        <div className="h-[100vh] flex flex-col justify-start items-start p-1  sm:w-[100vw] md:w-[100vw] lg:w-[100vw] xl:w-[85vw]  2xl:w-[80vw]">
            <div className="flex  items-end justify-end w-full h-[10vh] mb-4 ">

                {/* {
                    files.length === 0 ?
                        <div className="flex justify-center items-center mb-1 h-7 w-44">
                            <label htmlFor="dropzone-file" className="flex flex-col
                     justify-center items-center w-full h-full bg-gray-50 rounded-lg 
                   cursor-pointer dark:bg-gray-300 dark:hover:bg-[#FF6F00]">
                                <div className='h-[100%] w-[100%] flex justify-center items-center'>
                                    <FontAwesomeIcon icon={faCloudArrowUp} />
                                    <span className='text-sm mx-2'>
                                        Elige un archivo...
                                    </span>
                                    <input id="dropzone-file" onChange={(e) => {
                                        setFile(current => [e.target.files[0], ...current])
                                    }} type="file" className="hidden" />
                                </div>
                            </label>
                        </div>
                        :
                        <div className="flex justify-center items-center mb-1 h-7 w-44">
                            <label htmlFor="dropzone-file" className="flex flex-col
                 justify-center items-center w-full h-full bg-gray-50 rounded-lg 
               cursor-pointer dark:bg-[#00ff00]  dark:hover:bg-[#FF6F00]">
                                <div className='h-[100%] w-[100%] flex justify-center items-center'>
                                    <FontAwesomeIcon icon={faCircleCheck} />
                                    <span className='text-sm mx-2'>
                                        {files[0].name}
                                    </span>
                                    <input id="dropzone-file" onChange={(e) => {
                                        files[0] = e.target.files[0]
                                    }} type="file" className="hidden" />
                                </div>
                            </label>
                        </div>
                } */}
                {/* <div className="flex justify-center items-center mb-1 h-7 w-44">
                    <label htmlFor="dropzone-file" className="flex flex-col
                     justify-center items-center w-full h-full bg-gray-50 rounded-lg 
                   cursor-pointer dark:bg-gray-300 dark:hover:bg-[#FF6F00]">
                        <div className='h-[100%] w-[100%] flex justify-center items-center'>
                            <FontAwesomeIcon icon={faCloudArrowUp} />
                            <span className='text-sm mx-2'>
                                Elige un archivo...
                            </span>
                            <input id="dropzone-file" onChange={(e) => {
                                files[0] = e.target.files[0]
                            }} type="file" className="hidden" />
                        </div>
              


                    </label>
                </div> */}

                <button onClick={() => {
                    console.log(files)
                }}
                    className="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow-sm">
                    <div className="absolute inset-0 w-0 bg-[#FF6F00] transition-all duration-[150ms] ease-out group-hover:w-full"></div>
                    <span className="relative  group-hover:text-white">Enviar boletas</span>
                </button>

            </div>

            <div className='flex pt-3 px-4 mb-10 flex-col justify-start items-end w-[100%] h-[36vh] bg-white rounded-lg shadow-sm'>
                <div className='w-full'>
                    <p className='text-lg font-semibold'>Boletas</p>
                </div>
                <TableBoletas files={files} setFile={setFile} />
            </div>
        </div>
    )
}