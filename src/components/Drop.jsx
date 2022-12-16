import { useState } from 'react'

export default function Drop({ status, index, name, setArray, id }) {

    const [value, setValue] = useState(status)


    return (
        <select
            value={value}
            onChange={e => {
                console.log(e.target.value)
                setValue(e.target.value)
                setArray(index, name, e.target.value, id)
            }}
            className={`sm:w-24 md:w-28 lg:w-28  text-black rounded-[5px] px-2
           
                ${value === 'PAGADO' && 'bg-[#06d6a0]'}
                ${value === 'NO_PAGADO' && 'bg-[#ef476f]'}
                ${value === 'PENDIENTE' && 'bg-[#ffd166]'}
                `}>

            {value === 'PAGADO' ?
                <>
                    <option value={'ESTADO'} disabled selected>Estado</option>
                    <option value={'PAGADO'}>Pagado</option>
                </>
                :
                <>  <option value={'ESTADO'} disabled selected>Estado</option>
                    <option value={'PENDIENTE'}>Pendiente</option>
                    <option value={'PAGADO'}>Pagado</option>
                    <option value={'NO_PAGADO'}>No pagado</option>
                </>
            }

        </select>

    )
}