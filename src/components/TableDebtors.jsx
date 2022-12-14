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

    const debtsSort = (rowA, rowB) => {

        console.log(rowA.amount_debts, rowB.amount_debts)


        if (rowA.amount_debts > rowB.amount_debts) {
            return 1;
        }

        if (rowB.amount_debts > rowA.amount_debts) {
            return -1;
        }

        return 0;
    };


    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    const duenoSort = (rowA, rowB) => {
        let data1 = removeAccents(rowA?.name+" "+rowA.lastname)
        let data2 = removeAccents(rowB?.name+" "+rowB.lastname)

        console.log(data1, data2)

        if (data1 > data2) {
            return 1;
        }

        if (data2 > data1) {
            return -1;
        }
        return 0;
    };


    const columnas = [
        // {
        //     name: 'Propiedad',
        //     selector: row => row?.property_id,
        //     sortable: true,
        //     width: '10%',
        //     compact: true,
        //     center: true,
        //     wrap:true
        // },
        {
            name: 'Arrendatario',
            selector: row => row?.name + " " + row?.lastname,
            sortable: true,
            sortFunction: duenoSort
        },
        {
            name: 'Direccion',
            // selector: row => <></>,
            selector: row => row?.address,
            sortable: true,
            wrap: true

        },
        // {
        //     name: 'Correo',
        //     selector: (row) => {

        //         if (row.email) {
        //             return row?.email
        //         } else {
        //             return "No hay correo"
        //         }
        //     },
        //     sortable: true
        // },
        // {
        //     name: 'N??mero',
        //     selector: row => {
        //         if (row.phone) {
        //             return row?.phone
        //         } else {
        //             return "No hay telefono"
        //         }
        //     },
        //     sortable: true,
        // },
        {
            name: 'Nro de deudas',
            selector: row => {


                return (
                    <div className={`
                    ${row?.amount_debts >= 3 && row?.amount_debts <= 4 && 'bg-[#FFCFA3] text-[#DE7A1E]'}
                        ${row?.amount_debts >= 5 && 'bg-[#FFD7D7] text-[#E46262]'}
                        ${row?.amount_debts <= 2 && 'bg-[#F7E6AE] text-[#D9940E]'}
                        w-[60px] h-[3vh] flex justify-center items-center rounded-md`}>
                        {row?.amount_debts}
                    </div>
                )

            },
            sortFunction: debtsSort,
            sortable: true,
            center: true
        },
        // {
        //     name: "Notificar",
        //     center: true,
        //     selector: row =>
        //         <button className={`hover: text - emerald - 400`}>
        //             <FontAwesomeIcon icon={faEnvelope} className={`w - 6 h - 6`} />
        //         </button>,
        //     width: '8%'
        // },
        // {
        //     name: '',
        //     selector: row => <button
        //         type="button"
        //         className="inline-flex w-28 justify-center rounded-md border border-transparent bg-[#FF6F00] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-[#3A4348] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:ml-3 sm:text-sm"
        //         onClick={async () => {
        //             let nav = `/ propiedades / propiedad ?= ${ row.id } `
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
                console.log(e)
                let nav = `/propiedades/propiedad`
                navigate(nav, {
                    state: {
                        id: e.propertyId
                    }
                })
            }}
            paginationComponentOptions={paginationComponentOptions}
        />
    )
} 