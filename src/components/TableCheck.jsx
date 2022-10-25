import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable, { createTheme } from 'react-data-table-component';

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






const paginationComponentOptions = {
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
    noRowsPerPage: true
};

export default function TableCheck({ dataCheck, setDataCheck }) {

    const columnas = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true
        },
        {
            name: 'Descripcion',
            selector: row => row.descripcion,
            sortable: true
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
                }} className='bg-green-300 w-20 h-7 rounded active:bg-purple-500 active:text-white'>Revisado</button> :
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
                }} className='bg-red-400 w-20 h-7 rounded active:bg-violet-600 text-white'>No revisado</button>,
            sortable: true
        },
    ]

    return (


        <DataTable
            columns={columnas}
            data={dataCheck}
            fixedHeaderå
            fixedHeaderScrollHeight='700px'
            pagination
            theme='solarized'
            paginationComponentOptions={paginationComponentOptions}
        />


    )
} 