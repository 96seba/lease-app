import { useNavigate } from "react-router-dom"
import { LoginUser } from "../api/LoginUser"
import React, { useState } from "react"
import axios from "axios"

export default function Login() {

    const navigate = useNavigate()

    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")


    const loginUser = async () => {
        let resp = await LoginUser(user, pass)
        console.log(resp)
        localStorage.setItem('token', resp.data.token)
        alert(resp.data.token)
    }

    return (
        <div className="w-screen h-[91.5vh] p-6 flex  justify-center items-center">
            <div className=" bg-white flex justify-center  sm:w-[70%] md:w-[55%] lg:w-[40%]">
                <div className="bg-white-300 shadow-lg rounded px-8 pt-6 pb-8 m-auto w-full">
                    <div className="mb-4">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
                            Usuario
                        </label>
                        <input
                            value={user}
                            onChange={(e) => { setUser(e.target.value) }}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="Usuario" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            value={pass}
                            onChange={(e) => { setPass(e.target.value) }}
                            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************" />
                        <p className="text-red text-xs italic"></p>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => {

                                loginUser()

                                // navigate('/dashboard')
                            }}
                            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded" type="button">
                            Iniciar sesion
                        </button>
                        <button className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="#" >
                            ¿Olvidó su contraseña?
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}