import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable, { createTheme } from 'react-data-table-component';
import { useNavigate } from "react-router-dom"

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
            disabled: '#d1d5db',
        },
        sortFocus: {
            default: '#000000',
        },
    },
    'dark',
);

const customStyles = {

    rows: {
        style: {
            minHeight: '60px', // override the row height
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
        },
    },
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
            backgroundColor: '#F8A28C',
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




const columnas = [
    {
        name: 'Tipo',
        selector: row => row.id,
        sortable: true
    },
    {
        name: 'Direccion',
        selector: row => row.address,
        sortable: true,
        grow: 1
    },
    {
        name: 'Arrendador',
        selector: row => row.owner.name + " " + row.owner.lastname,
        sortable: true
    },
    // {
    //     name: 'Arrendatario',
    //     selector: row => row.arrendatario,
    //     sortable: true,
    // },
    {
        name: 'Monto',
        selector: row => "$ " + row.amounts[0]?.amount_lease.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
        // selector: row => "$ " + row.amounts[0].amount_lease.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
        sortable: true
    },
    {
        name: 'Estado',
        selector: row => row.estado,
        sortable: true
    },
]

const paginationComponentOptions = {
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
    noRowsPerPage: true
};

export default function TablePropiedades({ dataProp }) {
    let navigate = useNavigate()

    React.useEffect(() => {

        console.log(dataProp)
    }, [])


    return (
        <div className='w-full shadow-sm rounded'>

            <DataTable
                columns={columnas}
                data={dataProp}
                highlightOnHover
                fixedHeader
                theme='solarized'
                fixedHeaderScrollHeight='700px'
                pagination
                customStyles={customStyles}
                onRowDoubleClicked={(e) => {
                    let nav = `/propiedades/propiedad?=${e.id}`
                    navigate(nav, {
                        state: {
                            data: e
                        }
                    })
                }}
                paginationComponentOptions={paginationComponentOptions}
            />

        </div>

    )
} 