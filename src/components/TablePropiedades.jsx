import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'react-data-table-component';
import { useNavigate } from "react-router-dom"
import { getPropiedad } from '../api/getPropiedad';


const customStyles = {
    head: {
        style: {
            backgroundColor: '#FFFFFF',
        },
    },
    rows: {
        style: {
            backgroundColor: '#FFFFFF',
            borderBottomColor: '#FFFFFF',
            '&:not(:last-of-type)': {
                borderStyle: 'none',
                borderBottomWidth: '1px',
                borderBottomColor: '#FFFFFF',
            },

        },
        highlightOnHoverStyle: {
            backgroundColor: '#3A4348',
            color: '#FFFFFF',
        },
    },
    headRow: {
        style: {
            backgroundColor: '#FFFFFF',
            borderStyle: 'none',
            borderBottomWidth: '1px',
            borderBottomColor: '#FFFFFF',
        },
    },
    pagination: {
        style: {
            backgroundColor: '#FFFFFF',
            borderStyle: 'none',
            borderBottomWidth: '1px',
            borderBottomColor: '#FFFFFF',
        },
        pageButtonsStyle: {
            color: '#FF0000',
            fill: '#FF6F00',
            '&:hover:not(:disabled)': {
                backgroundColor: '#3A4348',
                fill: '#FFFFFF',
            },
            '&:focus': {
                outline: 'none',
                backgroundColor: '#FF0000',
            },
        },
    },
};





const columnas = [
    {
        name: 'Tipo',
        selector: row => Number(row.property_id),
        sortable: true,
        width: '8%'
    },
    {
        name: 'Direccion',
        selector: row => row.address,
        sortable: true,
        grow: 1
    },
    {
        name: 'Arrendador',
        selector: row => validaArrendador(row.owner?.name, row.owner?.lastname),
        sortable: true,
    },
    {
        name: 'Arrendatario',
        selector: row => validaArrendatario(row?.leases[0]),
        sortable: true,
    },
    {
        name: 'Monto',
        selector: row => "$ " + row.amounts[0]?.amount_lease.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
        // selector: row => "$ " + row.amounts[0].amount_lease.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
        sortable: true,
        width: '13%'
    },
    {
        name: 'Estado',
        selector: row => <button onClick={() => {

        }} className='bg-[#00ff00] w-20 h-7 rounded '>Al dia</button>,
        sortable: true,
        center: true,
        width: '12%'
    },
]

const validaArrendador = (userName, userLastName) => {
    if (userName == "undefined" && userLastName == "undefined" || userName == null && userLastName == null) {
        return <p className=' pt-3'>No hay Dueño</p>
    }
    else {
        return <p className=' pt-3'> {userName} {userLastName}</p>
    }
}

const validaArrendatario = (data) => {

    console.log(data?.leaseholder)
    if (data?.leaseholder === undefined) {
        return "No hay arrendatario"
    } else {

        return data?.leaseholder?.name + " " + data?.leaseholder?.lastname
    }
    // if (user == "" || user == null) {
    //     return <p className='pt-3'> No hay arrendatario</p>
    // }
    // else {
    //     return <p className='pt-3'> {user}</p>
    // }
}

const paginationComponentOptions = {
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
    noRowsPerPage: true
};

export default function TablePropiedades({ dataProp }) {
    let navigate = useNavigate()

    return (
        <div className='w-full rounded'>

            <DataTable
                columns={columnas}
                data={dataProp}
                highlightOnHover
                fixedHeader
                fixedHeaderScrollHeight='700px'
                pagination
                customStyles={customStyles}
                defaultSortFieldId={1}
                onRowDoubleClicked={async (e) => {
                   
                    let nav = `/propiedades/propiedad?=${e.id}`
                    navigate(nav, {
                        state: {
                            id: e.id
                        }
                    })
                }}
                paginationComponentOptions={paginationComponentOptions}
            />

        </div>

    )
} 