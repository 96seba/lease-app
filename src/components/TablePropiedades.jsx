import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'react-data-table-component';
import { useNavigate } from "react-router-dom"
import { customStyles, paginationComponentOptions } from '../utils/constants';

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
        selector: row => validaArrendatario(row.arrendatario),
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

const validaArrendador=(userName, userLastName)=>{
    if(userName == "undefined" && userLastName == "undefined" || userName == null && userLastName == null){
        return <p className=' pt-3'>No hay arrendador</p>
    }
    else{
        return <p className=' pt-3'> {userName} {userLastName}</p>
    }
}

const validaArrendatario=(user)=>{
    if(user == "" || user == null){
        return <p className='pt-3'> No hay arrendatario</p>
    }
    else{
        return <p className='pt-3'> {user}</p>
    }
}

export default function TablePropiedades({ dataProp }) {
    let navigate = useNavigate()

    React.useEffect(() => {
        console.log(dataProp)
    }, [])


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