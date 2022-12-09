import React, { useState, useEffect } from "react"
import TableUsers from "../components/TableUsers"
import ModalEditUser from "../components/ModalEditUser"
import { createUser } from "../api/createUser"
import { getAllUsers } from "../api/getAllUsers"

export default function Register() {

    const [tableData, setTableData] = useState("")


    // useEffect(() => {
    //     console.log(tableData)
    //     console.log("SE BUSCA RIVAL EN LATINOAMERICA")
    // }, [tableData])

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

    const [nombreCheck, setNombreCheck] = useState(true)

    const [apellidoCheck, setApellidoCheck] = useState(true)

    const [passwordCheck, setPasswordCheck] = useState(true)

    const [emailUserError, setEmailUserError] = useState(false)


    const checkInput = async () => {

        if (nombre.length === 0) {
            setNombreCheck(false)
        }

        if (apellido.length === 0) {
            setApellidoCheck(false)
        }

        if (password.length === 0) {
            setPasswordCheck(false)
        }

        const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        const emailCheck = emailRegex.test(correo)
        console.log("Revision de correo: ", emailCheck);

        console.log(correo.length)
        if (emailCheck == false || correo.length === 0) {
            setEmailUserError(true)
            console.log(emailUserError)
            console.log("EMAIL INVALIDO")
            return
        }
        console.log("Ejecutando addUsers")
        addUsers()
    }

    const addUsers = async () => {
        let obj = {}
        obj.email = correo
        obj.password = password
        obj.name = nombre
        obj.lastname = apellido

        console.log(obj)
        let contUser = 0
        for (var key in obj) {
            if (obj[key].length === 0) {
                console.log(obj[key])
                contUser += 1
            }
        }
        if (contUser === 0) {
            console.log("SE EJECUTA EL CREAR USER")
            const resp = await createUser(obj)
            console.log(resp)
            setTableData(current => [...current, resp.data.user])
            setCorreo("")
            setNombre("")
            setApellido("")
            setPassword("")
        }

    }


    const openModal = (data) => {
        setDataRow(data)
        setOpen(true)
        console.log(data)
    }

    return (
        <div className="bg-gray-100 w-screen h-[90vh] flex items-center justify-center">
            <div className="flex justify-between items-center w-[100vw] sm:w-[100vw] md:w-[90vw] lg:w-[90vw] xl:w-[75vw] h-full ">

                <div className="flex justify-start items-center flex-col h-[80%] bg-white w-[45%] rounded-lg shadow py-5">
                    <h1 className="text-lg font-semibold text-center mb-4">
                        Crea una cuenta
                    </h1>
                    <div className="space-y-4 md:space-y-6 w-[80%]" action="#">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-black dark:text-white">Correo</label>
                            <input value={correo} onChange={event => {
                                setEmailUserError(false)
                                setCorreo(event.target.value)
                            }} type="email" name="email" id="email"
                                className={`bg-gray-50 border  border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5
                            ${emailUserError == true && "outline outline-2 outline-red-400"}`}
                                placeholder="name@company.com" required="" />
                        </div>
                        <div>
                            <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-black dark:text-white">Nombre</label>
                            <input value={nombre} onChange={event => {
                                setNombreCheck(true)
                                setNombre(event.target.value)
                            }} type="text" name="nombre" id="nombre"
                                className={`bg-gray-50 border  border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5
                            ${nombreCheck == false && "outline outline-2 outline-red-400"}`}
                                placeholder="Nombre" required="" />
                        </div>
                        <div>
                            <label htmlFor="apellido" className="block mb-2 text-sm font-medium text-black dark:text-white">Apellido</label>
                            <input value={apellido} onChange={event => {
                                setApellidoCheck(true)
                                setApellido(event.target.value)
                            }} type="text" name="apellido" id="apellido"
                                className={`bg-gray-50 border  border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5
                            ${apellidoCheck == false && "outline outline-2 outline-red-400"}`}
                                placeholder="Apellido" required="" />
                        </div>
                        <div >
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-black dark:text-white">Contraseña</label>
                            <input value={password} onChange={event => {
                                setPasswordCheck(true)
                                setPassword(event.target.value)
                            }} type="password" name="password" id="password" placeholder="••••••••"
                                className={`bg-gray-50 border  border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5
                            ${passwordCheck == false && "outline outline-2 outline-red-400"}`}
                                required="" />
                        </div>
                        {/* <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300 text-xs">Acepto los <button className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Términos y Condiciones </button></label>
                            </div>
                        </div> */}
                        <button onClick={() => {
                            checkInput()
                        }} className="w-full mt-5 text-white bg-[#FF6F00] hover:bg-[#3A4348] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Crear cuenta</button>

                    </div>
                </div>

                <div className="flex justify-start items-center flex-col h-[80%] bg-white w-[45%] rounded-lg shadow py-5">
                    <h1 className="text-lg font-semibold text-center mb-4">
                        Usuarios
                    </h1>
                    {
                        tableData !== "" ?
                            <TableUsers tableData={tableData} setOpen={setOpen} openModal={openModal} />
                            : <></>
                    }
                </div>


            </div>
            <ModalEditUser open={open} setOpen={setOpen} dataRow={dataRow} tableData={tableData} setTableData={setTableData} />
        </div>
    )
}