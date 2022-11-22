import React, { useState } from 'react'




export default function ArrendatarioFinder() {

    const [buscar, setBuscar] = useState("")

    const [data, setData] = useState([
        { rut: 205916326, name: "Julian Casablancas" },
        { rut: 204316326, name: "Padre Casablancas" },
        { rut: 205923326, name: "Main Casablancas" },
        { rut: 204568355, name: "Reberto Casablancas" },
        { rut: 205978626, name: "Sebastian Acosta Cruz" },
        { rut: 205916321, name: "Julian Casablancas" },
        { rut: 264354322, name: "Jul Cas" }
    ])

    const [tablaArrendatarios, setTableArrendatarios] = useState([
        { rut: 205916326, name: "Julian Casablancas" },
        { rut: 204316326, name: "Padre Casablancas" },
        { rut: 205923326, name: "Main Casablancas" },
        { rut: 204568355, name: "Reberto Casablancas" },
        { rut: 205978626, name: "Sebastian Acosta Cruz" },
        { rut: 205916321, name: "Julian Casablancas" },
        { rut: 264354322, name: "Jul Cas" }
    ])

    const filtrar = (terminoBusqueda) => {
        var resultadosBusqueda = tablaArrendatarios.filter((elemento) => {
            if (elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.rut.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
                return elemento;
            }
        })
        setData(resultadosBusqueda)
    }

    return (
        <div className='flex justify-center items-center flex-col'>
            <p className='text-xl'>Buscar Arrendatario</p>
            <input
                className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[85%] py-2 px-3  text-grey-darker`}
                value={buscar}
                onChange={e => {
                    filtrar(e.target.value)
                    setBuscar(e.target.value)
                }}
                id="username"
                placeholder="Rut"
            />

            <div className='flex mb-4 justify-start items-start  flex-col w-[85%] h-[16vh] bg-slate-200'>
                <div className='h-auto overflow-auto w-full'>

                    {data.map((user, index) => (
                        <button key={index}
                            className='bg-gray-100 w-full  h-[5vh] flex justify-start items-center  px-4 hover:bg-gray-200'
                        >{user.name}</button>
                    ))}




                </div>

            </div>
        </div>
    )



}