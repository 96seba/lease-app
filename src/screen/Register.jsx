import React, { useState, useEffect } from "react"
import TableUsers from "../components/TableUsers"
import ModalEditUser from "../components/ModalEditUser"
import { createUser } from "../api/createUser"
import { getAllUsers } from "../api/getAllUsers"

export default function Register() {

    const [tableData, setTableData] = useState("")


    useEffect(() => {
        const getUsers = async () => {
            const resp = await getAllUsers()
            console.log(resp.data.users)
            setTableData(resp.data.users)
        }
        getUsers()
    }, [])


    // const [modal, setModal] = useState(false)

    const [correo, setCorreo] = useState("")

    const [nombre, setNombre] = useState("")

    const [apellido, setApellido] = useState("")

    const [password, setPassword] = useState("")

    const [open, setOpen] = useState(false)

    const [dataRow, setDataRow] = useState("")

    const addUsers = async () => {
        const resp = await createUser(correo, password)
        console.log(resp)
        
    }


    const openModal = (data) => {
        setDataRow(data)
        setOpen(true)
        // console.log("AAAAAAAAAAAAAA")
        console.log(data)
    }

    return (
        <div className="bg-gray-100 w-screen">
            <section className="flex" >
                <div className="flex justify-center items-center px-6 py-8 mx-auto md:h-screen lg:py-0 md:w-[100vw]  lg:w-[90vw] 2xl:w-[80vw]">
                    <div className="flex justify-center items-end flex-col flex-wrap p-8  h-[78vh] w-5/12 ">
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 p-2">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl dark:text-white  text-center">
                                    Crea una cuenta
                                </h1>
                                <div className="space-y-4 md:space-y-6" action="#">
                                    <div className="">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-black dark:text-white">Correo</label>
                                        <input value={correo} onChange={event => setCorreo(event.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" required="" />
                                    </div>
                                    <div>
                                        <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-black dark:text-white">Nombre</label>
                                        <input value={nombre} onChange={event => setNombre(event.target.value)} type="text" name="nombre" id="nombre" className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Nombre" required="" />
                                    </div>
                                    <div>
                                        <label htmlFor="apellido" className="block mb-2 text-sm font-medium text-black dark:text-white">Apellido</label>
                                        <input value={apellido} onChange={event => setApellido(event.target.value)} type="text" name="apellido" id="apellido" className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Apellido" required="" />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-black dark:text-white">Contraseña</label>
                                        <input value={password} onChange={event => setPassword(event.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">Acepto los <button className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Términos y Condiciones </button></label>
                                        </div>
                                    </div>
                                    <button onClick={() => { addUsers() }} className="w-full text-white bg-[#023E8A] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Crear cuenta</button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        ¿Ya tienes una cuenta? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Ingresa aquí</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-start items-center h-[78vh] w-7/12 p-8">
                        {
                            tableData !== "" ?
                                <TableUsers tableData={tableData} setOpen={setOpen} openModal={openModal} />
                                : <></>
                        }
                    </div>
                </div>
            </section>
            <ModalEditUser open={open} setOpen={setOpen} dataRow={dataRow} />
        </div>
    )
}