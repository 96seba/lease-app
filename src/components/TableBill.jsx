import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable, { createTheme } from 'react-data-table-component';
import Drop from '../components/Drop'
import { getExpensesId } from '../api/getExpensesId';
import { dateFormatNames } from '@progress/kendo-intl';
import { customStyles, paginationComponentOptions } from '../utils/constants';

const getMonth = (period) => {
    let m = Number(period.slice(0, 2)) - 1
    let monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];


    return monthNames[m]
}

export default function TableBill({ id, arrayExpenses, setArrayExpenses, dataExp }) {

    const [data, setData] = useState("");

    useEffect(() => {
        console.log(dataExp, arrayExpenses)
    }, [])


    const setArray = (index, name, data, id) => {
        console.log(index, name, data, id)
        //* Funcion para obtener el index a cambiar
        const idFind = (element) => element.id == id
        //* Se ejecuta la funcion para obtener el index y se guarda en indexArr
        let indexArr = arrayExpenses.findIndex(idFind)
        //* Se crea una copia del arrayExpenses
        let newArr = [...arrayExpenses]
        console.log(newArr)
        if (indexArr !== -1) {
            //* se crea una copia del objeto a actualizar
            let newObj = newArr[indexArr]
            newObj[name] = data
            console.log(newObj, "el index es:", indexArr)
            newArr[indexArr] = newObj
        } else {
            //* se actualiza el registro por primera vez
            let newObj = {}
            newObj.id = id
            newObj[name] = data
            console.log(newObj, "el index es:", indexArr)
            newArr.push(newObj)
        }
        //* Se setea el arrayExpenses con la nueva informacion
        setArrayExpenses(newArr)
    }


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
            // selector: row => row.arrendatario,
            selector: row => row.id,
            sortable: true,
            compact: true,
            wrap: true,
            width: '16%'
        },
        {
            name: 'Monto',
            selector: (row, index) => <Drop id={row.id} index={index} name={"arriendo"} setArray={setArray} status={row.arriendo} />,
            sortable: true,
            compact: true,
            width: '15%'
        },
        {
            name: 'GG.CC',
            selector: (row, index) => <Drop id={row.id} index={index} name={"gastos_comunes"} setArray={setArray} status={row.gastos_comunes} />,
            sortable: true,
            compact: true,
            width: '15%'
        },
        {
            name: 'Agua',
            selector: (row, index) => <Drop id={row.id} index={index} name={"agua"} setArray={setArray} status={row.agua} />,
            sortable: true,
            compact: true,
            width: '15%'
        },
        {
            name: 'Luz',
            selector: (row, index) => <Drop id={row.id} index={index} name={"luz"} setArray={setArray} status={row.luz} />,
            sortable: true,
            compact: true,
            width: '15%'
        },
        {
            name: 'Gas',
            selector: (row, index) => <Drop id={row.id} index={index} name={"gas"} setArray={setArray} status={row.gas} />,
            sortable: true,
            compact: true,
            width: '15%'
        }
    ]

    if (dataExp.length === 0) {
        return <div className="w-full h-[22vh] mt-6 flex justify-center items-center flex-col">
            <p>No hay propiedades a revisar aun uyuiiiiiiii (Lease modo huaso)</p>
            <img src={require('../assets/loading.JPG')} className={'w-[160px] h-[180px]'} />
        </div>
    }
    return (
        < DataTable
            columns={columnas}
            data={dataExp}
            fixedHeader
            fixedHeaderScrollHeight='700px'
            pagination
            highlightOnHover
            customStyles={customStyles}
            defaultSortFieldId={1}
            paginationComponentOptions={paginationComponentOptions}
        />


    )
} 