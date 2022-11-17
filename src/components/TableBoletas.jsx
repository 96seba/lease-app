import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable, { createTheme } from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp, faCircleCheck } from '@fortawesome/free-solid-svg-icons'

createTheme(
    'solarized',
    {
        text: {
            primary: '#000000',
            secondary: '#000000',
        },
        background: {
            default: '#f0f9ff',
        },
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: '#FFFFFF',
        },
        button: {
            hover: '#059669',
            focus: '#059669',
            disabled: '#2C8C99',
        },
        sortFocus: {
            default: '#000000',
        },
    },
    'dark',
);

const customStyles = {
    head: {
        style: {
            backgroundColor: '#FFFFFF',
        },
    },
    rows: {
        style: {
            backgroundColor: '#FFFFFF',
        },
        highlightOnHoverStyle: {
            backgroundColor: '#3A4348',
        },
    },
    headRow: {
        style: {
            backgroundColor: '#FFFFFF',
        },
    },
    pagination: {
        style: {
            backgroundColor: '#FFFFFF',
        },
    },
};


const tablaData = [
    {
        id: "1", costoadministracion: "$92.000", nroboleta: "20", nroboletaanterior: "14",
    },
    {
        id: "2", costoadministracion: "$100.000", nroboleta: "13", nroboletaanterior: "8",
    },
    {
        id: "3", costoadministracion: "$98.000", nroboleta: "10", nroboletaanterior: "15",
    },
]




const paginationComponentOptions = {
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
    noRowsPerPage: true
};



export default function TableBoletas({ files, setFile }) {



    const columnas = [
        {
            name: 'ID Propiedad',
            selector: row => row.id,
            sortable: true
        },
        {
            name: 'Costo por administración',
            selector: row => row.costoadministracion,
            sortable: true
        },
        {
            name: 'Subir boleta',
            selector: () => {
                if (files.length === 0) {
                    return (
                        <div className="flex justify-center items-center mb-1 h-7 w-44">
                            <label htmlFor="dropzone-file" className="flex flex-col
     justify-center items-center w-full h-full bg-gray-50 rounded-lg 
   cursor-pointer dark:bg-gray-300 dark:hover:bg-[#FF6F00]">
                                <div className='h-[100%] w-[100%] flex justify-center items-center'>
                                    <FontAwesomeIcon icon={faCloudArrowUp} />
                                    <span className='text-sm mx-2'>
                                        Elige un archivo...
                                    </span>
                                    <input id="dropzone-file" onChange={(e) => {
                                        setFile(current => [e.target.files[0], ...current])
                                    }} type="file" className="hidden" />
                                </div>
                            </label>
                        </div>
                    )
                } else {
                    return (
                        <button onClick={() => {
                            setFile([])
                        }} className="flex justify-center items-center mb-1 h-7 w-44">
                            <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-full bg-gray-50 rounded-lg 
            cursor-pointer dark:bg-[#00ff00]  dark:hover:bg-slate-200">
                                <div className='h-[100%] w-[100%] flex justify-center items-center'>
                                    <FontAwesomeIcon icon={faCircleCheck} />
                                    <span className='text-sm mx-2'>
                                        {files[0].name}
                                    </span>

                                </div>
                            </label>
                        </button>
                    )
                }
            },
            sortable: true
        },
        {
            name: 'Nro de boleta',
            selector: row => row.nroboleta,
            sortable: true,
        },
        {
            name: 'Nro de boleto anterior',
            selector: row => row.nroboletaanterior,
            sortable: true
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
            theme='solarized'
            customStyles={customStyles}
            paginationComponentOptions={paginationComponentOptions}
        />


    )
} 