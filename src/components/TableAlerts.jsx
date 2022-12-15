import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { customStyles, paginationComponentOptions } from '../utils/constants';



export default function TableAlerts(data) {

    const [check, setCheck] = useState(false)


    useEffect(() => {

        console.log(check)

    }, [check])



    const columnas = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
            center: true,
            compact: true,
            width: '7%'
        },
        // {
        //     name: 'Descripcion',
        //     selector: row => row.descripcion,
        //     sortable: true,
        //     wrap: true
        // },
        {
            name: 'Direccion',
            selector: row => row.note,
            sortable: true,
            wrap: true
        },
        {
            name: 'Fecha',
            selector: row => row?.date,
            sortable: true,
            center: true,
            compact: true,
            width: '16%'
        },
        {
            name: 'Estado',
            selector: row =>
                <div class="flex h-auto w-auto hover:bg-[#3A4348]">
                    <input
                        value={check}
                        onChange={e => { setCheck(e.target.value) }}
                        type={'checkbox'}
                        className={`select-none cursor-pointer rounded-lg border-2
                      border-[#FF6F00] w-6 h-6 checked:bg-teal-700
              font-bold transition-colors duration-200 ease-in-out
               `} />

                </div>
            ,
            sortable: true,
            center: true,
            compact: true,
            width: '16%',
        },
    ]



    return (
        <DataTable
            columns={columnas}
            data={data.data}
            customStyles={customStyles}
            fixedHeader
            fixedHeaderScrollHeight='700px'
            pagination
            highlightOnHover
            paginationComponentOptions={paginationComponentOptions}
        />
    )
} 