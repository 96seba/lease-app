import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable, { createTheme } from 'react-data-table-component';
import Drop from '../components/Drop'
import { getExpensesId } from '../api/getExpensesId';
import { dateFormatNames } from '@progress/kendo-intl';

createTheme(
    'solarized',
    {
        text: {
            primary: '#000000',
            secondary: '#000000',
        },
        background: {
            default: '#f0f9ff',
        },
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: '#FFFFFF',
        },
        button: {
            hover: '#059669',
            focus: '#059669',
            disabled: '#2C8C99',
        },
        sortFocus: {
            default: '#000000',
        },
    },
    'dark',
);


const columnas = [
    {
        name: 'Mes',
        selector: row => getMonth(row.period),
        sortable: true,
        width: '8%',
        compact: true
    },
    {
        name: 'Arrendatario',
        selector: row => row.arrendatario,
        sortable: true,
        hide: 'md'
    },
    {
        name: 'Monto',
        selector: row => <Drop status={row.arriendo}/> ,
        sortable: true
    },
    {
        name: 'GG.CC',
        selector: row => <Drop status={row.gastos_comunes}/>,
        sortable: true
    },
    {
        name: 'Agua',
        selector: row => <Drop status={row.agua}/>,
        sortable: true
    },
    {
        name: 'Luz',
        selector: row => <Drop status={row.luz}/>,
        sortable: true
    },
    {
        name: 'Gas',
        selector: row => <Drop status={row.gas}/>,
        sortable: true
    },
]

const paginationComponentOptions = {
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
    noRowsPerPage: true
};

const getMonth = (period) => {
    let m = Number(period.slice(0, 2)) - 1
    let monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];


    return <p className='pt-3'>{monthNames[m]}</p>
}

export default function TableBill({ id, arrayExpenses }) {

    const [data, setData] = useState("");

    const setArray = (index, name, data) => {
        let obj = {}
        obj[name] = data

        arrayExpenses[index] = obj
    }



    const customStyles = {
        head: {
            style: {
                backgroundColor: '#FFFFFF',
            },
        },
        rows: {
            style: {
                backgroundColor: '#FFFFFF',
            },
            highlightOnHoverStyle: {
                backgroundColor: '#3A4348',
            },
        },
        headRow: {
            style: {
                backgroundColor: '#FFFFFF',
            },
        },
        pagination: {
            style: {
                backgroundColor: '#FFFFFF',
            },
        },
    };

    const columnas = [
        {
            name: 'Mes',
            selector: row => getMonth(row.period),
            sortable: true,
            width: '8%',
            compact: true
        },
        {
            name: 'Arrendatario',
            selector: row => row.arrendatario,
            sortable: true,
            compact: true,
            wrap: true,
            width: '16%'
        },
        {
            name: 'Monto',
            selector: row => <Drop />,
            sortable: true,
            compact: true,
            width: '15%'
        },
        {
            name: 'GG.CC',
            selector: (row, index) => <Drop index={index} name={"gastos_comunes"} setArray={setArray} status={row.gastos_comunes} />,
            sortable: true,
            compact: true,
            width: '15%'
        },
        {
            name: 'Agua',
            selector: (row, index) => <Drop index={index} name={"agua"} setArray={setArray} status={row.agua} />,
            sortable: true,
            compact: true,
            width: '15%'
        },
        {
            name: 'Luz',
            selector: (row, index) => <Drop index={index} name={"luz"} setArray={setArray} status={row.luz} />,
            sortable: true,
            compact: true,
            width: '15%'
        },
        {
            name: 'Gas',
            selector: (row, index) => <Drop index={index} name={"gas"} setArray={setArray} status={row.gas} />,
            sortable: true,
            compact: true,
            width: '15%'
        }
    ]

    useEffect(() => {
        const getData = async (params) => {
            // const resp = await getExpensesId(id)
            // setData(resp.data.expenses)
            setData([

                {
                    "id": 1,
                    "arriendo": null,
                    "agua": "NO_PAGADO",
                    "luz": "PENDIENTE",
                    "gas": "PAGADO",
                    "gastos_comunes": "PENDIENTE",
                    "period": "12-2022",
                    "date_review": null,
                    "isReviewed": false,
                    "createdAt": "2022-12-06T14:43:45.627Z",
                    "propertyId": 1,
                    "active": true
                },
                {
                    "id": 2,
                    "arriendo": null,
                    "agua": "PAGADO",
                    "luz": "PAGADO",
                    "gas": "PAGADO",
                    "gastos_comunes": "PAGADO",
                    "period": "11-2022",
                    "date_review": null,
                    "isReviewed": false,
                    "createdAt": "2022-12-06T14:43:45.627Z",
                    "propertyId": 1,
                    "active": true
                },


            ])

            // console.log(resp)
        }
        getData()
    }, [])


    useEffect(() => {
        console.log(dateFormatNames)
    }, [data])

    return (


        <DataTable
            columns={columnas}
            data={data}
            fixedHeader
            fixedHeaderScrollHeight='700px'
            pagination
            highlightOnHover
            theme='solarized'
            customStyles={customStyles}
            paginationComponentOptions={paginationComponentOptions}
        />


    )
} 