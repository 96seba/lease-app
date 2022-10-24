import React, {useState} from "react"
import TableUsers from "../components/TableUsers"


export default function Register() {

    const [tableData, setTableData] = useState(
        [
            { id: 1, correo: "bjara@pryx.cl", nombre: "Ricky", apellido: "Martin" },
            { id: 2, correo: "bjara@pryx.cl", nombre: "Peter", apellido: "Parker" },
            { id: 3, correo: "bjara@pryx.cl", nombre: "Carles", apellido: "Puyol" },
            { id: 4, correo: "bjara@pryx.cl", nombre: "Gonzalo", apellido: "Cáceres" },
            { id: 5, correo: "bjara@pryx.cl", nombre: "Tito", apellido: "El Bambino" },
        ]

    )

    const [correo, setCorreo] = useState("")

    const [nombre, setNombre] = useState("")

    const [apellido, setApellido] = useState("")

    const valores=()=>{
        // setTableData(current=>[{id:6, correo: correo, nombre:nombre, apellido:apellido},...current])
        console.log(correo,nombre,apellido)
    }


    return (
        <div className="">
            <section className=  "flex" >
                <div className="flex items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="flex flex-col flex-wrap p-8">
                        {/* <button href="#" className="flex place-self-center mb-6 text-2xl font-semibold text-white dark:text-white">
                            <img className="w-8 h-8 mr-2 " src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                            <h4 className=" text-gray-800">Registro</h4>
                        </button> */}
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 p-2">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl dark:text-white  text-center">
                                    Crea una cuenta
                                </h1>
                                <form className="space-y-4 md:space-y-6" action="#">
                                    <div className="">
                                        <label for="email" className="block mb-2 text-sm font-medium text-black dark:text-white">Correo</label>
                                        <input value={correo} onChange={event=>setCorreo(event.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                    </div>
                                    <div>
                                        <label for="nombre" className="block mb-2 text-sm font-medium text-black dark:text-white">Nombre</label>
                                        <input value={nombre} onChange={event=>setNombre(event.target.value)} type="text" name="nombre" id="nombre" className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre" required="" />
                                    </div>
                                    <div>
                                        <label for="apellido" className="block mb-2 text-sm font-medium text-black dark:text-white">Apellido</label>
                                        <input value={apellido} onChange={event=>setApellido(event.target.value)} type="text" name="apellido" id="apellido" className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Apellido" required="" />
                                    </div>
                                    <div>
                                        <label for="password" className="block mb-2 text-sm font-medium text-black dark:text-white">Contraseña</label>
                                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                    {/* <div>
                                        <label for="confirm-password" className="block mb-2 text-sm font-medium text-black dark:text-white">Confirm password</label>
                                        <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div> */}
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label for="terms" className="font-light text-gray-500 dark:text-gray-300">Acepto los <button className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Términos y Condiciones </button></label>
                                        </div>
                                    </div>
                                    <button onClick={()=>{valores()}} className="w-full text-white bg-[#374151] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Crear cuenta</button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        ¿Ya tienes una cuenta? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Ingresa aquí</a>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center p-8 ">
                        <h4 className=' text-gray-800 pb-3'> Editar Usuarios </h4>
                        <TableUsers tableData={tableData} />
                    </div>
                </div>
            </section>

        </div>
    )
}