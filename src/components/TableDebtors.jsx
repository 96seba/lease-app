import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'react-data-table-component';
import { customStyles, paginationComponentOptions } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';




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
            selector: row => row?.property_id,
            sortable: true,
            width: '10%',
            compact: true,
            center: true,
            wrap:true
        },
        {
            name: 'Arrendatario',
            selector: row => row?.name + " " + row?.lastname,
            sortable: true
        },
        {
            name: 'Correo',
            selector: (row) => {

                if (row.email) {
                    return row?.email
                } else {
                    return "No hay correo"
                }
            },
            sortable: true
        },
        {
            name: 'Número',
            selector: row => {
                if (row.phone) {
                    return row?.phone
                } else {
                    return "No hay telefono"
                }
            },
            sortable: true,
        },
        {
            name: 'Nro de deudas',
            selector: row => row?.amount_debts,
            sortable: true,
            center: true
        },
        // {
        //     name: "Notificar",
        //     center: true,
        //     selector: row =>
        //         <button className={`hover:text-emerald-400`}>
        //             <FontAwesomeIcon icon={faEnvelope} className={`w-6 h-6`} />
        //         </button>,
        //     width: '8%'
        // },
        // {
        //     name: '',
        //     selector: row => <button
        //         type="button"
        //         className="inline-flex w-28 justify-center rounded-md border border-transparent bg-[#FF6F00] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-[#3A4348] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:ml-3 sm:text-sm"
        //         onClick={async () => {
        //             let nav = `/propiedades/propiedad?=${row.id}`
        //             navigate(nav, {
        //                 state: {
        //                     id: row.id
        //                 }
        //             })
        //         }}
        //     >
        //         Ir a propiedad
        //     </button>,
        //     sortable: true,
        //     width: '15%',
        // },

    ]


    if (debtorData.length === 0) {
        return (<div className="w-full h-[22vh] flex justify-center items-center flex-col">
            <p>No hay deudores a revisar aun uyuiiiiiiii (Lease modo huaso)</p>
            <img src={require('../assets/loading.JPG')} className={'w-[160px] h-[180px]'} />
        </div>)
    }
    return (
        <DataTable
            columns={columnas}
            data={debtorData}
            fixedHeader
            fixedHeaderScrollHeight='700px'
            pagination
            customStyles={customStyles}
            highlightOnHover
            onRowDoubleClicked={e => {
                let nav = `/propiedades/propiedad`
                navigate(nav, {
                    state: {
                        id: e.id
                    }
                })
            }}
            paginationComponentOptions={paginationComponentOptions}
        />
    )
} 