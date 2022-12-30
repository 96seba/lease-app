import React from 'react';
import DataTable from 'react-data-table-component';
import { customStyles, paginationComponentOptions } from '../utils/constants';
import { useNavigate } from 'react-router-dom';



export default function TableVisitsPending(data) {

    React.useEffect(()=>{
        console.log(data)
    },[])

    const navigate = useNavigate()

    const parseDate = (fecha) => {

        let date = new Date(fecha)

        if (fecha === undefined) {
            return "No hay fecha"
        } else {
            // console.log(date, fecha)
            const yyyy = date.getFullYear();
            let mm = date.getMonth() + 1; // Months start at 0!
            let dd = date.getDate();

            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            let formattedToday = dd + '/' + mm + '/' + yyyy;
            return formattedToday
        }
    }

    const dateSort = (rowA, rowB) => {
        let date1 = new Date(rowA.date)
        let date2 = new Date(rowB.date)

        if (date1.getTime() > date2.getTime()) {
            return 1;
        }

        if (date2.getTime() > date1.getTime()) {
            return -1;
        }

        return 0;
    };

    const calculoFecha = (fecha) => {

        let dateVisit = new Date(fecha).getTime()
        let dateActual = new Date().getTime()


        var diff = dateActual - dateVisit;

        let calculo = Math.round((diff / (1000 * 60 * 60 * 24)))


        if (calculo <= 0) {
            return "No existe atraso"
        }
        else {
            return calculo
        }

    }

    const columnas = [
        // {
        //     name: 'Id',
        //     selector: row => row.id,
        //     sortable: true,
        //     compact: true,
        //     width: '14%'
        // },
        {
            name: 'Direccion',
            selector: row => row.Lease?.property?.address,
            sortable: true,
            wrap: true,
            width: '35%'
        },
        {
            name: 'Fecha',
            selector: row => parseDate(row?.date?.slice(0, 10)),
            sortable: true,
            center: true,
            compact: true,
            width: '20%',
            sortFunction: dateSort
        },
        {
            name: 'Días de atraso',
            selector: row => calculoFecha(row?.date?.slice(0, 10)),
            sortable: true,
            center: true,
            compact: true,
            width: '25%'
        },

    ]

    if (data.data.length === 0) {
        return <div className="w-full h-[22vh] mt-2 flex justify-center items-center flex-col">
            <p>No hay propiedades a revisar aun uyuiiiiiiii (Lease modo huaso)</p>
            <img src={require('../assets/loading.JPG')} className={'w-[130px] h-[130px]'} />
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
            onRowDoubleClicked={(e) => {
                console.log(e)
                let nav = `/propiedades/propiedad`
                navigate(nav, {
                    state: {
                        id: e.Lease.propertyId
                    }
                })
            }}
            paginationComponentOptions={paginationComponentOptions}
        />
    )
} 