import TablePropiedades from "../components/TablePropiedades"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"


    useEffect(() => {
        const options = { method: 'POST', body: '{"email":"deprueba","password":"deprueba"}' };

        fetch('http://54.172.21.15:9000/api/v1/login', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));

    


    let navigate = useNavigate()

    return (
        <div>
            <button onClick={() => {
                navigate("/propiedades/agregarPropiedad")
            }} className="flex items-center my-2 justify-start px-8 w-3/4 h-[6vh]">
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800  focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-blue-800">
                    <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Icon description</span>
                </button>

                <h2 className="text-2xl">
                    Agregar propiedad
                </h2>
            </button>
            <div className="flex px-4 items-end justify-start flex-col w-screen h-[82vh]">
                <TablePropiedades />
            </div>

        </div>
    )
}