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
            className={`sm:w-24 md:w-28 lg:w-28  rounded-[5px] px-2
                text-[13.4px] border-0 text-[#383D48]
                ${value === 'PAGADO' && 'bg-[#C6E7B2]'}
                ${value === 'NO_PAGADO' && 'bg-[#FFD7D7]'}
                ${value === 'PENDIENTE' && 'bg-[#F7E6AE]'}
                `}>

            {value === 'PAGADO' ?
                <>
                    <option value={'ESTADO'} disabled >Estado</option>
                    <option value={'PAGADO'}>Pagado</option>
                </>
                :
                <>  <option value={'ESTADO'} disabled >Estado</option>
                    <option value={'PENDIENTE'}>Pendiente</option>
                    <option value={'PAGADO'}>Pagado</option>
                    <option value={'NO_PAGADO'}>No pagado</option>
                </>
            }

        </select>

    )
}