import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'react-data-table-component';
import { customStyles, paginationComponentOptions} from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';




export default function TableDebtors({ debtorData }) {

    useEffect(() => {

        console.log(debtorData)

    }, [debtorData])


    const navigate = useNavigate()

    const printArrendatario = (data) => {
        console.log(data)
        if (data) {
            return data.name + " " + data.lastname
        } else {
            return "No hay arrendatario"
        }
    }

    const columnas = [
        {
            name: 'Propiedad',
            selector: row => row.expense.id,
            sortable: true,
            width: '10%',
            compact: true
        },
        {
            name: 'Arrendatario',
            selector: row => printArrendatario(row?.leaseholder),
            sortable: true
        },
        {
            name: 'Correo',
            selector: (row) => {
             
                if (row.leaseholder) {
                    return row.leaseholder.email
                } else {
                    return "No hay correo"
                }
            },
            sortable: true
        },
        {
            name: 'Número',
            selector: row => {
                if (row.leaseholder) {
                    return row.leaseholder.phone
                } else {
                    return "No hay telefono"
                }
            },
            sortable: true
        },
        {
            name: '',
            selector: row => <button
                type="button"
                className="inline-flex w-[70%] justify-center rounded-md border border-transparent bg-[#FF6F00] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-[#3A4348] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:ml-3 sm:text-sm"
                onClick={async () => {
                    let nav = `/propiedades/propiedad?=${row.expense.property.id}`
                    navigate(nav, {
                        state: {
                            id: row.expense.property.id
                        }
                    })
                }}
            >
                Ir a propiedad
            </button>,
            sortable: true,
            width: '25%',
        },
    ]
    
    return (
        <DataTable
            columns={columnas}
            data={debtorData}
            fixedHeader
            fixedHeaderScrollHeight='700px'
            pagination
            customStyles={customStyles}
            highlightOnHover
            paginationComponentOptions={paginationComponentOptions}
        />
    )
} 