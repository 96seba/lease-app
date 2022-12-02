import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable, { createTheme } from 'react-data-table-component';

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

const tablaData = [
    {
        mes: "Enero", arrendatario: "Samuel L Jackson", monto: "$ 200000", ggcc: "$ 30000",
        agua: "$ 6000", luz: "$ 40000", gas: "$ 10000"
    },
    {
        mes: "Enero", arrendatario: "Samuel L Jackson", monto: "$ 200000", ggcc: "$ 30000",
        agua: "$ 6000", luz: "$ 40000", gas: "$ 10000"
    },
    {
        mes: "Enero", arrendatario: "Samuel L Jackson", monto: "$ 200000", ggcc: "$ 30000",
        agua: "$ 6000", luz: "$ 40000", gas: "$ 10000"
    },
    {
        mes: "Enero", arrendatario: "Samuel L Jackson", monto: "$ 200000", ggcc: "$ 30000",
        agua: "$ 6000", luz: "$ 40000", gas: "$ 10000"
    },
    {
        mes: "Enero", arrendatario: "Samuel L Jackson", monto: "$ 200000", ggcc: "$ 30000",
        agua: "$ 6000", luz: "$ 40000", gas: "$ 10000"
    },
    {
        mes: "Enero", arrendatario: "Samuel L Jackson", monto: "$ 200000", ggcc: "$ 30000",
        agua: "$ 6000", luz: "$ 40000", gas: "$ 10000"
    },
    {
        mes: "Enero", arrendatario: "Samuel L Jackson", monto: "$ 200000", ggcc: "$ 30000",
        agua: "$ 6000", luz: "$ 40000", gas: "$ 10000"
    },
    {
        mes: "Enero", arrendatario: "Samuel L Jackson", monto: "$ 200000", ggcc: "$ 30000",
        agua: "$ 6000", luz: "$ 40000", gas: "$ 10000"
    },
    {
        mes: "Enero", arrendatario: "Samuel L Jackson", monto: "$ 200000", ggcc: "$ 30000",
        agua: "$ 6000", luz: "$ 40000", gas: "$ 10000"
    },
    {
        mes: "Enero", arrendatario: "Samuel L Jackson", monto: "$ 200000", ggcc: "$ 30000",
        agua: "$ 6000", luz: "$ 40000", gas: "$ 10000"
    },
    {
        mes: "Enero", arrendatario: "Samuel L Jackson", monto: "$ 200000", ggcc: "$ 30000",
        agua: "$ 6000", luz: "$ 40000", gas: "$ 10000"
    },
]


const columnas = [
    {
        name: 'Mes',
        selector: row => row.mes,
        sortable: true
    },
    {
        name: 'Arrendatario',
        selector: row => row.arrendatario,
        sortable: true,
        hide:'md'
    },
    {
        name: 'Monto',
        selector: row => <button className='bg-[#00ff00] w-20 h-7 rounded active:text-white'>Revisado</button>,
        sortable: true
    },
    {
        name: 'GG.CC',
        selector: row =>  <button className='bg-[#00ff00] w-20 h-7 rounded active:text-white'>Revisado</button>,
        sortable: true
    },
    {
        name: 'Agua',
        selector: row => <button className='bg-[#00ff00] w-20 h-7 rounded active:text-white'>Revisado</button>,
        sortable: true
    },
    {
        name: 'Luz',
        selector: row => <button className='bg-[#00ff00] w-20 h-7 rounded  active:text-white'>Revisado</button>,
        sortable: true
    },
    {
        name: 'Gas',
        selector: row =>  <button className='bg-[#00ff00] w-20 h-7 rounded  active:text-white'>Revisado</button>,
        sortable: true
    },
]

const paginationComponentOptions = {
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
    noRowsPerPage: true
};

export default function TableBill() {





    return (


        <DataTable
            columns={columnas}
            data={tablaData}
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