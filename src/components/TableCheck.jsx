import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'react-data-table-component';
import { customStyles, paginationComponentOptions } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

export default function TableCheck({ dataCheck, setDataCheck }) {

    const navigate = useNavigate()

    const mostrarArrendatario = (row) => {
        if(row.property?.leases[0]?.leaseholder.name===undefined){
            return "No hay arrendatario"
        }
        return row.property?.leases[0]?.leaseholder.name + " " + row.property?.leases[0]?.leaseholder.lastname
    }

    const columnas = [
        // {
        //     name: 'Id',
        //     selector: row => row.id,
        //     sortable: true,
        //     width: '10%'
        // },
        {
            name: 'Dueño',
            selector: row => row.property?.owner.name + " " + row.property?.owner.lastname,
            sortable: true,
            width: '22%',
            wrap: true
        },
        {
            name: 'Arrendatario',
            selector: row => mostrarArrendatario(row),
            sortable: true,
            width: '22%',
            wrap: true
        },
        {
            name: 'Direccion',
            selector: row => row.property.address,
            sortable: true,
            width: '30%',
            wrap: true
        },
        {
            name: 'Nro de pendientes',
            selector: row => row?.countPending,
            sortable: true,
            wrap: true,
            center:true
        },
    ]

    useEffect(() => {

        console.log(dataCheck)
    }, [])


    if (dataCheck.length === 0) {

        return (<div className="w-full h-[22vh] flex justify-center items-center flex-col">
            <p>No hay propiedades a revisar aun uyuiiiiiiii (Lease modo huaso)</p>
            <img src={require('../assets/loading.JPG')} className={'w-[130px] h-[130px]'} />
        </div>)

    }
    return (
        <DataTable
            columns={columnas}
            data={dataCheck}
            fixedHeader
            fixedHeaderScrollHeight='700px'
            pagination
            onRowDoubleClicked={e => {
                console.log(e)
                let nav = `/propiedades/propiedad?=${e.propertyId}`
                navigate(nav, {
                    state: {
                        id: e.propertyId
                    }
                })
            }}
            customStyles={customStyles}
            highlightOnHover
            paginationComponentOptions={paginationComponentOptions}
        />
    )
} 