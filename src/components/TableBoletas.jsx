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






const paginationComponentOptions = {
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
    noRowsPerPage: true
};



export default function TableBoletas({ files, setFile, tablaData }) {





    const columnas = [
        {
            name: 'ID Propiedad',
            selector: row => row.id,
            sortable: true,
            width: "9vw",
            center: true
        },
        {
            name: 'Costo por administración',
            selector: row => row.costoadministracion,
            sortable: true,
            center: true
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
                            <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-full bg-gray-50 rounded-lg 
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
                                    <FontAwesomeIcon icon={faCloudArrowUp} />
                                    <span className='text-sm mx-2'>
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
            width: "26vw",
            center: true
        },
        {
            name: 'Nro de boleta',
            selector: row => row.nroboleta,
            sortable: true,
            center: true
        },
        {
            name: 'Nro de boleto anterior',
            selector: row => row.nroboletaanterior,
            sortable: true,
            center: true
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