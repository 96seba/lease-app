import { useNavigate } from "react-router-dom"
import { LoginUser } from "../api/LoginUser"
import React, { useState, useEffect } from "react"
import { getCurentUser } from "../api/getCurrentUser"

export default function Login() {

    useEffect(() => {
        document.title = 'Login'

    }, [])
    

    const navigate = useNavigate()

    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const loginUser = async () => {
        setLoading(true)
        let resp = await LoginUser(user, pass)
        console.log(resp)
        if (resp.msg === "Error en los datos ingresados") {
            setError(true)
            setLoading(false)
        } else {
            let respUser = await getCurentUser(resp.data.token)
            console.log(respUser.data.user.type)
            localStorage.setItem('token', resp.data.token)
            localStorage.setItem('type_user', respUser.data.user.type)

            navigate('/dashboard')
            window.location.reload(false);
            setLoading(false)
        }

    }

    const loginKey = (event) => {
        if (event.key === 'Enter') {
            console.log(user, pass)
            loginUser()
        }
    }

    return (
        <div className=" bg-gray-100 w-screen h-screen p-6 flex flex-col  justify-center items-center">
            {
                error === true ?

                    <div id="toast-danger" className="flex absolute top-28 items-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                        <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only"></span>
                        </div>
                        <div className="ml-3 text-sm font-normal">Usuario o contraseña incorrectos.</div>
                        <button
                            onClick={() => { setError(false) }}
                            type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
                            <span className="sr-only">Close</span>
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    : <></>
            }


            {loading === true &&
                <div className="absolute w-screen h-screen bg-gray-200 bg-opacity-50 flex justify-center items-center">
                    <div className="flex justify-center items-center">
                        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>

                    </div>
                    <p className="font-bold my-0 mx-4">Cargando...</p>
                </div>
            }

            <div className=" bg-white flex justify-center w-[400px]">
                <div className="bg-white shadow rounded-lg px-8 pt-6 pb-8 m-auto w-full">
                    <div className="mt-4 mb-6">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
                            Correo
                        </label>
                        <input
                            value={user}
                            onChange={(e) => { setUser(e.target.value) }}
                            onKeyDown={event => loginKey(event)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="Usuario" />
                    </div>
                    <div className="mb-2">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            value={pass}
                            onChange={(e) => { setPass(e.target.value) }}
                            onKeyDown={event => loginKey(event)}
                            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="Contraseña" />
                        <p className="text-red text-xs italic"></p>
                    </div>
                    <div className="w-full mb-3 h-[0.2px] bg-gray-200" />
                    <div className="flex items-center justify-end">
                        <button
                            onClick={() => {
                                loginUser()
                                // navigate('/dashboard')
                            }}
                            className="bg-[#FF6F00] hover:bg-[#3A4348] text-white font-bold py-2 px-4 rounded" type="button">
                            Iniciar sesión
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}