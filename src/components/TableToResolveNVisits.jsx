import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'react-data-table-component';








const paginationComponentOptions = {
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
    noRowsPerPage: true
};

const customStyles = {
    head: {
        style: {
            backgroundColor: '#FFFFFF',
        },
    },
    rows: {
        style: {
            backgroundColor: '#FFFFFF',
            borderBottomColor: '#FFFFFF',
            '&:not(:last-of-type)': {
                borderStyle: 'none',
                borderBottomWidth: '1px',
                borderBottomColor: '#FFFFFF',
            },

        },
        highlightOnHoverStyle: {
            backgroundColor: '#3A4348',
            color: '#FFFFFF',
        },
    },
    headRow: {
        style: {
            backgroundColor: '#FFFFFF',
            borderStyle: 'none',
            borderBottomWidth: '1px',
            borderBottomColor: '#FFFFFF',
        },
    },
    pagination: {
        style: {
            backgroundColor: '#FFFFFF',
            borderStyle: 'none',
            borderBottomWidth: '1px',
            borderBottomColor: '#FFFFFF',
        },
        pageButtonsStyle: {
            color: '#FF0000',
            fill: '#FF6F00',
            '&:hover:not(:disabled)': {
                backgroundColor: '#3A4348',
                fill: '#FFFFFF',
            },
            '&:focus': {
                outline: 'none',
                backgroundColor: '#FF0000',
            },
        },
    },
};


export default function TableToResolveNVisits(data) {

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