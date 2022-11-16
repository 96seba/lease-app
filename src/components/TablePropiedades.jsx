import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'react-data-table-component';
import { useNavigate } from "react-router-dom"

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