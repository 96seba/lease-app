import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { customStyles , paginationComponentOptions } from '../utils/constants';

export default function TableBoletas({ files, setFile, tablaData }) {

    const columnas = [
        {
            name: 'ID Propiedad',
            selector: row => row.id,
            sortable: true,
            width: "9%",
        },
        {
            name: 'Costo por administración',
            selector: row => row.costoadministracion,
            sortable: true,
            center: true,
            width: '25%',
            compact: true
        },
        {
            name: 'Subir boleta',
            selector: (row, index) => {
                let result = files.filter(file => file.id === index)
                if (result.length !== 0) {
                    return (
                        <button onClick={() => {
                            setFile(current =>
                                current.filter(file => {
                                    console.log(file.id, index)
                                    return file.id !== index;
                                }),
                            );

                        }} className="flex justify-center items-center mb-1 h-7 w-44">
                            <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-full bg-[#00ff00] rounded-lg 
                cursor-pointer dark:bg-[#00ff00]  dark:hover:bg-[#ff0000]">
                                <div className='h-[100%] w-[100%] flex justify-start pl-4 items-center'>
                                    <FontAwesomeIcon icon={faCircleCheck} />
                                    <span className='text-sm mx-2'>
                                        {result[0].name}
                                    </span>
                                </div>
                            </label>
                        </button>
                    )
                } else {
                    return (
                        <div className="flex justify-center items-center mb-1 h-7 w-44">
                            <label htmlFor={"dropzone-file" + index} className="flex flex-col 
                            justify-center items-center w-full h-full bg-gray-50 rounded-lg 
                            cursor-pointer dark:bg-gray-300 dark:hover:bg-[#FF6F00]">
                                <div className='h-[100%] w-[100%] flex justify-start pl-4 items-center'>
                                    <FontAwesomeIcon icon={faCloudArrowUp} className='text-black'/>
                                    <span className='text-sm mx-2 text-black'>
                                        Elige un archivo...
                                    </span>
                                    <input id={"dropzone-file" + index} onChange={(e) => {
                                        let file = e.target.files[0]
                                        file.id = index
                                        console.log(file, index)
                                        setFile(current => [...current, file])
                                    }} type="file" className="hidden" />
                                </div>
                            </label>
                        </div>
                    )
                }
            },
            sortable: true,
            width: "26%",
            center: true,
            compact: true
        },
        {
            name: 'Nro de boleta',
            selector: row => row.nroboleta,
            sortable: true,
            center: true,
            width: "15%",
            compact: true
        },
        {
            name: 'Nro de boleto anterior',
            selector: row => row.nroboletaanterior,
            sortable: true,
            center: true,
            width: "20%",
            compact: true
        },
    ]


    return (


        <DataTable
            columns={columnas}
            data={tablaData}
            onRowClicked={(e) => {
                console.log(e)
            }}
            highlightOnHover
            fixedHeader
            fixedHeaderScrollHeight='700px'
            pagination
            customStyles={customStyles}
            paginationComponentOptions={paginationComponentOptions}
        />


    )
} 