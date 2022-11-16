import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable, { createTheme } from 'react-data-table-component';

createTheme(
    'solarized',
    {
        text: {
            primary: '#000000',
            secondary: '#FFFFFF',
            hover: '#FFFFFF',
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
            focus: '#059669',
            disabled: '#2C8C99',
        },
        sortFocus: {
            default: '#FFFFFF',
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
            text:'#FFFFFF',
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
            sortable: true
        },
    ]

    return (
        <DataTable
            columns={columnas}
            data={dataCheck}
            fixedHeader
            fixedHeaderScrollHeight='700px'
            pagination
            theme='solarized'
            customStyles={customStyles}
            highlightOnHover
            paginationComponentOptions={paginationComponentOptions}
        />
    )
} 