import React, { useState, useEffect } from 'react'


export default function ArrendatarioFinder({ selected, setSelected, selectIncomplete, setSelectIncomplete, leaseholders }) {

    /* Varibles */
    const [buscar, setBuscar] = useState("")
    const [data, setData] = useState([])
    const [tablaArrendatarios, setTableArrendatarios] = useState([])

    /* Funciones */
    useEffect(() => {
        console.log(leaseholders)
        setTableArrendatarios(leaseholders)
        setData(leaseholders)
    }, [])

    const filtrar = (terminoBusqueda) => {
        var resultadosBusqueda = tablaArrendatarios.filter((elemento) => {
            if (elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.rut.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
                return elemento;
            }
        })
        setData(resultadosBusqueda)
    }

    if (data === []) {
        return <></>
    }
    return (
        <div className='flex justify-center items-center flex-col'>
            <div className='w-full h-[6vh] flex justify-start items-center flex-col'>
                <p className='mb-0 font-bold'>Buscar Arrendatario</p>
                <p className={`text-xs ${selectIncomplete === true ? 'block' : 'hidden'}`}>Debes seleccionar un arrendatario </p>
            </div>
            <input
                className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[85%] py-2 px-3 m-2 text-grey-darker
                ${selectIncomplete === true && 'outline outline-2 outline-red-400'}`}
                value={buscar}
                onChange={e => {
                    filtrar(e.target.value)
                    setBuscar(e.target.value)
                }}
                id="username"
                placeholder="Rut o nombre"
            />
            <div className='flex mb-4 justify-start items-start  flex-col w-[85%] h-[16vh] bg-slate-200'>
                <div className='h-auto overflow-auto w-full'>
                    {data.map((user, index) => (
                        <button key={index}
                            onClick={e => {
                                console.log(user, selected)
                                if (user.rut === selected.rut) {
                                    setSelected("")
                                } else {
                                    setSelected(user)
                                    setSelectIncomplete(false)
                                }
                            }}
                            className={` w-full  h-[5vh] flex justify-start items-center  px-4 
                            ${selected === user ? 'bg-[#FF6F00] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                        > {user.rut} - {user.name} {user.lastname} </button>
                    ))}

                </div>
            </div>
        </div >
    )

}