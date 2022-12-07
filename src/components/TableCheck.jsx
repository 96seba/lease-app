import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'react-data-table-component';
import { customStyles, paginationComponentOptions } from '../utils/constants';

export default function TableCheck({ dataCheck, setDataCheck }) {

    const columnas = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
            width: '10%'
        },
        {
            name: 'Descripcion',
            selector: row => row.descripcion,
            sortable: true,
            wrap: true
        },
        {
            name: 'Estado',
            selector: row => row.estado === "Revisado" ?
                <button onClick={() => {
                    let newDataCheck = []
                    dataCheck.forEach((element, index) => {
                        if (element.id === row.id) {
                            newDataCheck[index] = { id: element.id, descripcion: element.descripcion, estado: "No revisado" }
                        } else {
                            newDataCheck[index] = element
                        }
                    });
                    setDataCheck(newDataCheck)
                }} className='bg-[#00ff00] w-20 h-7 rounded '>Revisado</button> :
                <button onClick={() => {
                    let newDataCheck = []
                    dataCheck.forEach((element, index) => {
                        if (element.id === row.id) {
                            newDataCheck[index] = { id: element.id, descripcion: element.descripcion, estado: "Revisado" }
                        } else {
                            newDataCheck[index] = element
                        }
                    });
                    setDataCheck(newDataCheck)
                }} className=' bg-[#ff0000] w-20 h-7 rounded '>No revisado</button>,
            sortable: true,
            width: '18%',
            compact: true
        },
    ]

    return (
        <DataTable
            columns={columnas}
            data={dataCheck}
            fixedHeader
            fixedHeaderScrollHeight='700px'
            pagination
            customStyles={customStyles}
            highlightOnHover
            paginationComponentOptions={paginationComponentOptions}
        />
    )
} 