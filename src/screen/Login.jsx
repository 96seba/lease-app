import { useNavigate } from "react-router-dom"


export default function Login() {

    const navigate = useNavigate()

    return (
        <div className="w-screen h-[91.5vh] p-6 flex justify-center items-center">
            <div className=" bg-white-500 flex justify-center w-[75vw]">
                <div className="bg-white-300 shadow-lg rounded px-8 pt-6 pb-8 m-auto w-1/2">
                    <div className="mb-4">
                        <label className="block text-grey-darker text-sm font-bold mb-2" for="username">
                            Usuario
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="Usuario" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-grey-darker text-sm font-bold mb-2" for="password">
                            Contraseña
                        </label>
                        <input className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************" />
                        <p className="text-red text-xs italic"></p>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => {
                                navigate('/dashboard')
                            }}
                            className="bg-blue hover:bg-blue-dark text-slate font-bold py-2 px-4 rounded" type="button">
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