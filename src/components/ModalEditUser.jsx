import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function ModalEditUser({open,setOpen,dataRow}) {
    const [correo, setCorreo] = useState('')

    const [nombre, setNombre] = useState('')

    const [apellido, setApellido] = useState('')

    useEffect(() => {
        
        if(dataRow!==''){
            setCorreo(dataRow.correo)
            setNombre(dataRow.nombre)
            setApellido(dataRow.apellido)
            console.log("VIVA CHILE")
            console.log(dataRow)
        }
    
    }, [dataRow])
    





    const cancelButtonRef = useRef(null)

    if (dataRow===''){
        return <></>
    }
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="w-full bg-white rounded-lg shadow  md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700 p-2 pb-4">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl dark:text-white  text-center">
                                    Editar cuenta
                                </h1>
                                <div className="space-y-4 md:space-y-6" action="#">
                                    <div className="">
                                        <label for="email" className="block mb-2 text-sm font-medium text-black dark:text-white">Correo</label>
                                        <input value={correo}  onChange={event=>setCorreo(event.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" required="" />
                                    </div>
                                    <div>
                                        <label for="nombre" className="block mb-2 text-sm font-medium text-black dark:text-white">Nombre</label>
                                        <input value={nombre}  onChange={event=>setNombre(event.target.value)} type="text" name="nombre" id="nombre" className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Nombre" required="" />
                                    </div>
                                    <div>
                                        <label for="apellido" className="block mb-2 text-sm font-medium text-black dark:text-white">Apellido</label>
                                        <input value={apellido} onChange={event=>setApellido(event.target.value)}  type="text" name="apellido" id="apellido" className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Apellido" required="" />
                                    </div>                                    
                                    <button className="w-full text-white bg-[#023E8A] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Actualizar</button>
                                </div>
                            </div>
                        </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}