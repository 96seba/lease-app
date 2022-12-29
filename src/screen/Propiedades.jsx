import TablePropiedades from "../components/TablePropiedades"
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getPropiedades } from "../api/getPropiedades"
import ModalAddFile from '../components/ModalAddFile';

export default function Propiedades() {

    let navigate = useNavigate()
    const [dataProp, setDataProp] = useState("")
    const [open, setOpen] = useState(false)



    useEffect(() => {
        document.title = 'Propiedades'
        const propiedades = async () => {
            const resp = await getPropiedades()
            if (resp.status === 401) {
                navigate('/login')
            }
            setDataProp(resp.data.properties)
            console.log(resp.data.properties)

        }
        propiedades()
    }, [])

    return (
        <div className="bg-gray-100 h-[100vh] flex flex-col justify-start items-start p-1  
        sm:w-[100vw] md:w-[100vw] lg:w-[100vw] xl:w-[85vw] 2xl:w-[80vw]">

            <div className="flex items-end justify-end w-full pr-[0.8vw] h-[10vh] mb-4">
                <button onClick={async () => {
                    navigate("/propiedades/agregarPropiedad")
                }}
                    className="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow-sm">
                    <div className="absolute inset-0 w-0 bg-[#FF6F00] transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                    <span className="relative group-hover:text-white">Agregar propiedad</span>
                </button>
                <button
                    onClick={() => setOpen(true)}
                    className="group relative ml-4 h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow-sm">
                    <div className="absolute inset-0 w-0 bg-[#FF6F00] transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                    <span className="relative group-hover:text-white">Subir excel</span>
                </button>
            </div>

            <div className='flex pt-3 px-4 mb-10 flex-col justify-start items-end w-[99%] h-auto bg-white rounded-lg shadow-sm '>
                <div className='w-full'>
                    <p className='text-lg font-semibold'>Propiedades</p>
                </div>
                {dataProp !== "" ?
                    dataProp.length !== 0 ?
                        <TablePropiedades dataProp={dataProp} />
                        :
                        <div className="w-full h-[20vh] flex justify-center items-center flex-col">
                            <p>No hay propiedades aun :/</p>
                            <img src={require('../assets/velociraptor.png')} className={'w-[12vh]'} alt="" />
                        </div>

                    :
                    <div className="w-full h-[35vh] flex justify-center items-center">
                        <div role="status">
                            <svg className="inline mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                }
            </div>
            <ModalAddFile open={open} setOpen={setOpen} />
        </div>
    )
}