import React from 'react';
import DataTable from 'react-data-table-component';
import { customStyles, paginationComponentOptions } from '../utils/constants';



export default function TableVisitsPending(data) {

    const parseDate = (fecha) => {

        let date = new Date(fecha)

        if (fecha === undefined) {
            return "No hay fecha"
        } else {
            console.log(date, fecha)
            const yyyy = date.getFullYear();
            let mm = date.getMonth() + 1; // Months start at 0!
            let dd = date.getDate();

            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            let formattedToday = dd + '/' + mm + '/' + yyyy;
            return formattedToday
        }
    }

    const columnas = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
            center: true,
            compact: true,
            width: '7%'
        },
        // {
        //     name: 'Descripcion',
        //     selector: row => row.descripcion,
        //     sortable: true,
        //     wrap: true
        // },
        {
            name: 'Direccion',
            selector: row => row.direccion,
            sortable: true,
            wrap: true
        },
        {
            name: 'Fecha',
            selector: row => parseDate(row?.date?.slice(0, 10)),
            sortable: true,
            center: true,
            compact: true,
            width: '16%'
        },
        {
            name: 'Prioridad',
            selector: row => row.urgencia,
            sortable: true,
            center: true,
            compact: true,
            width: '16%',
        },
    ]

    if (data.data.length === 0) {
        return <div className="w-full h-[22vh] flex justify-center items-center flex-col">
            <p>No hay visitas pendientes aun :/</p>
            <img src={require('../assets/velociraptor.png')} className={'w-[12vw]'} />
        </div>
    }

    return (
        <DataTable
            columns={columnas}
            data={data.data}
            customStyles={customStyles}
            fixedHeader
            fixedHeaderScrollHeight='700px'
            pagination
            highlightOnHover
            paginationComponentOptions={paginationComponentOptions}
        />
    )
} 