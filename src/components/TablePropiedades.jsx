import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'react-data-table-component';
import { useNavigate } from "react-router-dom"
import { customStyles, paginationComponentOptions } from '../utils/constants';



const amountSort = (rowA, rowB) => {
    let date1 = rowA.amounts[0]?.amount_lease
    let date2 = rowB.amounts[0]?.amount_lease

    if (date1 > date2) {
        return 1;
    }

    if (date2 > date1 ) {
        return -1;
    }
    return 0;
};


const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const nameSort = (rowA, rowB) => {

    // if (date1 > date2) {
    //     return 1;
    // }

    // if (date2 > date1 ) {
    //     return -1;
    // }
    // return 0;
};



const columnas = [
    {
        name: 'Id',
        selector: row => row.property_id,
        sortable: true,
        width: '8%'
    },
    {
        name: 'Direccion',
        selector: row => row.address,
        sortable: true,
        width: '16%'
    },
    {
        name: 'Dueño',
        selector: row => validaArrendador(row.owner?.name, row.owner?.lastname),
        sortable: true,
        width: '13%'
    },
    {
        name: 'Correo',
        selector: row =>
            row.owner?.email
        ,
        sortable: true,
        wrap: true,
        width: '19%'
    },
    {
        name: 'Telefono',
        selector: row => row.owner?.phone
        ,
        sortable: true,
        wrap: true,
        width: '16%'
    },
    {
        name: 'Arrendatario',
        selector: row => validaArrendatario(row?.leases[0]),
        sortable: true,
        width: '15%',
        wrap: true
    },
    {
        name: 'Monto',
        selector: row => "$ " + row.amounts[0]?.amount_lease.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
        // selector: row => "$ " + row.amounts[0].amount_lease.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
        sortable: true,
        width: '13%',
        sortFunction: amountSort
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

    // console.log(data?.leaseholder)
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
                    let nav = `/propiedades/propiedad`
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