import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { updateUser } from '../api/updateUser'

export default function ModalEditUser({ open, setOpen, dataRow, tableData, setTableData }) {

    const [user, setUser] = useState({
        email: "",
        name: "",
        lastname: "",
        password: "",
    })


    useEffect(() => {

        if (dataRow !== '') {
            setUser({ email: dataRow.email, name: dataRow.name, lastname: dataRow.lastname })
            console.log("VIVA CHILE")
            console.log(dataRow)
        }

    }, [dataRow])


    const cancelButtonRef = useRef(null)


    const executeEnter = (event) => {
        if (event.key === 'Enter') {
            updateDataUser()
        }
    }

    const updateDataUser = async () => {

        console.log(user)

        let obj = {}
        obj.name = user.name
        obj.lastname = user.lastname
        obj.password = user.password
        obj.id = dataRow.id
        console.log(obj)

        const data = await updateUser(obj)
        console.log(data)


        const getId = (element) => element.id === dataRow.id;
        const index = tableData.findIndex(getId)
        console.log(index)

        let newArr = [...tableData]
        let newObj = data.data.user


        newArr[index] = newObj
        setTableData(newArr)
        setOpen(false)


    }


    if (dataRow === '') {
        return <></>
    }
    return (
        <div>
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
                                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-black dark:text-white">Correo</label>
                                                    <input value={user.email} disabled
                                                        onKeyDown={event => { executeEnter(event) }}
                                                        onChange={event => setUser({ ...user, email: event.target.value })} type="email" name="email" id="email" className="bg-gray-200 border border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                                        required="" />
                                                </div>
                                                <div>
                                                    <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-black dark:text-white">Nombre</label>
                                                    <input value={user.name}
                                                        onKeyDown={event => { executeEnter(event) }}
                                                        onChange={event => setUser({ ...user, name: event.target.value })} type="text" name="nombre" id="nombre" className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Nombre" required="" />
                                                </div>
                                                <div>
                                                    <label htmlFor="apellido" className="block mb-2 text-sm font-medium text-black dark:text-white">Apellido</label>
                                                    <input value={user.lastname}
                                                        onKeyDown={event => { executeEnter(event) }}
                                                        onChange={event => setUser({ ...user, lastname: event.target.value })} type="text" name="apellido" id="apellido" className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Apellido" required="" />
                                                </div>
                                                <div>
                                                    <label htmlFor="contraseña" className="block mb-2 text-sm font-medium text-black dark:text-white">Contraseña</label>
                                                    <input value={user.password}
                                                        onKeyDown={event => { executeEnter(event) }}
                                                        onChange={event => setUser({ ...user, password: event.target.value })} type="password" name="contraseña" id="contraseña" className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Contraseña" required="" />
                                                </div>
                                                <button className="w-full text-white bg-[#A0D8CE] hover:bg-[#383D48] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                                    onClick={() => updateDataUser()}>Actualizar</button>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}