import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable, { createTheme } from 'react-data-table-component';
import Drop from '../components/Drop'
import { getExpensesId } from '../api/getExpensesId';

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
        hide: 'md'
    },
    {
        name: 'Monto',
        selector: row =>
            <Drop />
        ,
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

const getMonth=(period)=>{

    let monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
    const d = new Date();
    console.log(monthNames[d.getMonth()])
    
    return (<p className='pt-3'>{monthNames[d.getMonth()]}</p>)
    
    }

export default function TableBill({id}) {

const [data, setData] = useState("");

useEffect(() => {
    const getData= async (params) => {
        const resp = await getExpensesId(id)
        setData(resp.data.expenses)
        console.log(resp)
        console.log("viva el bicho")
    }
    getData()
},[])

// const getMonth=(period)=>{

// let monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
// "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

// const d = new Date();
// console.log(monthNames[d.getMonth()])


// }



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