import { useState, useRef } from 'react'


export default function Drop() {

    const selectRef = useRef()

    const [value, setValue] = useState("")

    return (
        <button className={` h-[4vh] w-full rounded `}>
            <select
                onChange={e => {
                    console.log(e.target.value)
                    setValue(e.target.value)
                }}
                className={`select select-bordered select-xs w-full max-w-xs text-black rounded-sm px-2
                ${value === 'Pagado' && 'bg-green-300'}
                ${value === 'Atrasado' && 'bg-red-400'}
                ${value === 'Pendiente' && 'bg-yellow-200'}
                `}>
                <option disabled selected>Estado</option>
                <option>Pendiente</option>
                <option>Pagado</option>
                <option>Atrasado</option>
            </select>
        </button>
    )
}