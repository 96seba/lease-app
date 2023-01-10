import { useState, useEffect, useRef } from 'react'
import TableBill from '../components/TableBill'
import TableVisits from '../components/TableVisits'
import { useNavigate, useLocation } from 'react-router-dom'
import { API_HOST } from '../utils/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { addAlerts } from '../api/addAlerts'
import { addAnnotations } from '../api/addAnnotations'
import { getExpensesId } from '../api/getExpensesId'
import { editExpenses } from '../api/editExpenses'
import { getPropiedad } from '../api/getPropiedad'
import { getVisitsForProperty } from '../api/getVisitsForProperty'
import ModalPagos from '../components/ModalPagos'
import ModalCorreos from '../components/ModalCorreos'
import { sendDebtorMail } from '../api/sendDebtorMail'

export default function Propiedad() {

    //* Array de objetos para enviar los gastos por mes
    var [arrayExpenses, setArrayExpenses] = useState([])

    const [dataExp, setDataExp] = useState("")

    let navigate = useNavigate()
    const [fotoUrL, setFotoUrl] = useState("")
    const [loaded, setLoaded] = useState(true)

    const [visits, setVisits] = useState([])


    const location = useLocation()
    const getData = async () => {

        let id = await location.state.id
        console.log(id)
        const data = await getPropiedad(id)
        console.log(data)

        //* Se traen los datos de las visitas pendientes
        getVisits(id)

        setData(data.property)
        setLogs(data.property.alerts.reverse())
        // console.log(data.property.alerts)
        setAnnotations(data.property.annotations.reverse())
        setFotoUrl(API_HOST + data.property?.image || '')
        console.log(data.property.property_id)
        document.title = 'Propiedad ' + data.property.property_id
        const respExpenses = await getExpensesId(data.property.id)
        console.log(respExpenses)
        setDataExp(respExpenses.data.expenses)
    }

    const getVisits = async (id) => {
        let resp = await getVisitsForProperty(id)
        console.log(resp.visits)
        setVisits(resp.visits)
    }


    useEffect(() => {
        console.log(minDate)
        getData()
    }, [])

    const [logs, setLogs] = useState([])

    const [annotations, setAnnotations] = useState("")

    const [data, setData] = useState("")

    const [priority, setPriority] = useState("priority")

    const [inputAlert, setInputAlert] = useState("")

    const [dateAlert, setDateAlert] = useState("")

    const [inputAnnotation, setInputAnnotation] = useState("")

    const [errorAnnotation, setErrorAnnotation] = useState(false)

    const [inputAlertIncomplete, setInputAlertIncomplete] = useState(false)

    const [inputPriorityIncomplete, setInputPriorityIncomplete] = useState(false)

    const [dateAlertIncomplete, setDateAlertIncomplete] = useState(false)

    const [open, setOpen] = useState(false)

    const [openCorreos, setOpenCorreos] = useState(false)

    const [anotacionesTrigger, setAnotacionesTriger] = useState(false)

    const [alertsTrigger, setAlertsTriger] = useState(false)

    const [minDate, setMinDate] = useState(() => {
        let date = new Date()
        return date.toISOString().slice(0, 10)
    })

    const renderAlerts = () => {
        // console.log(annotations)
        return (
            annotations.map((item, index) =>
                <p key={index} className='text-sm break-words'>{parseDate(item.createdAt)} - {item.value} - <strong className=' text-[#3A4348]'>{item.by}</strong></p>
            )
        )
    }


    const parseAvaliable = (state) => {
        if (state === false) {
            return "No"
        }
        else if (state === true) {
            return "Si"
        }
    }

    const addAlert = async () => {
        if (inputAlert === "" || priority === "priority" || dateAlert === "") {
            if (inputAlert === "") {
                setInputAlertIncomplete(true)
                console.log("TE FALTA EL MENSAJE")
            }
            if (priority === "priority") {
                setInputPriorityIncomplete(true)
                console.log("TE FALTA LA PRIORIDAD")
            }
            console.log("ERROR TE FALTA UN DATO")
            if (dateAlert === '') {
                setDateAlertIncomplete(true)
                console.log("TE FALTA LA FECHA")
            }
        }
        else {
            let obj = {}
            let objDate = new Date(dateAlert)
            obj.propertyId = data.id
            obj.note = inputAlert
            obj.level = priority.toUpperCase()
            obj.dateResolve = objDate.toISOString()
            // let objDay = objDate.getUTCDate()
            // let objMonth = objDate.getMonth() + 1
            // let objYear = objDate.getFullYear()
            // let objFecha = `${objDay < 10 ? `0${objDay}` : `${objDay}`}/${objMonth < 10 ? `0${objMonth}` : `${objMonth}`}/${objYear}`

            console.log(obj)
            setAlertsTriger(true)
            const respAlert = await addAlerts(obj)
            console.log(respAlert)

            setLogs(current => [{
                dateResolve: respAlert.data.alert.dateResolve,
                level: respAlert.data.alert.level,
                note: respAlert.data.alert.note,
                by: respAlert.data.alert.by
            }, ...current])
            setInputAlert("")
            setPriority("priority")
            setDateAlert("")
            setAlertsTriger(false)
        }
    }

    const addAnotacion = async (event) => {
        if (event.key === 'Enter') {
            if (inputAnnotation === "") {
                console.log("NO HAY NADA ESCRITO")
                setErrorAnnotation(true)
            } else {
                let body = {}
                body.propertyId = data.id
                body.value = inputAnnotation
                setAnotacionesTriger(true)
                let resp = await addAnnotations(body)
                console.log(resp)
                setAnnotations(current => [resp.data.annotation, ...current])
                setInputAnnotation('')
                setAnotacionesTriger(false)
            }
        }
    }

    const updateExpenses = async () => {
        console.log(arrayExpenses)
        arrayExpenses.forEach(async (element) => {
            console.log(element)
            const resp = await editExpenses(element)
            console.log(resp)
        });
        setOpen(true)
    }

    const parseType = () => {
        let str = data?.type_property
        str = str.toLowerCase()
        let str2 = str.charAt(0).toUpperCase() + str.slice(1)
        // console.log(str, str2)
        return str2
    }

    const parseDate = (fecha) => {

        let date = new Date(fecha)

        if (fecha === undefined) {
            return "No hay fecha"
        } else {
            // console.log(date, fecha)
            const yyyy = date.getFullYear();
            let mm = date.getMonth() + 1;
            let dd = date.getUTCDate();

            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            let formattedToday = dd + '/' + mm + '/' + yyyy;
            return formattedToday
        }
    }

    const renderPendientes = () => {
        if (logs.length === 0) {

            return (
                <>No hay Pendientes criticos</>
            )
        }
        return (
            logs.map((item, index) =>
                <p key={index} className='text-sm break-words'>{parseDate(item.dateResolve)} - <strong className='text-[#FF6F00]'>{item.level}</strong> - {item.note} - <strong className=' text-[#3A4348]'>{item.by}</strong></p>
            )
        )
    }

    useEffect(() => {
        if (data.image === null) {
            setLoaded(false)
        }
        // console.log(data?.image)
    }, [data])


    if (data === "") {
        return <></>
    }
    return (
        <div className='bg-gray-100 w-[100vw] flex justify-center '>
            <ModalPagos open={open} setOpen={setOpen} />
            <ModalCorreos open={openCorreos} setOpen={setOpenCorreos} />

            <div className="flex sm:w-[100vw] md:w-[100vw] lg:w-[100vw] xl:w-[80vw]  2xl:w-[75vw] bg-gray-100 flex-column justify-start items-center p-8">


                <div className="flex my-10 justify-start px-4 rounded items-center w-[96%] h-[40vh] gap-[2vw]   shadow-md bg-white ">

                    <div className='w-[36vh] h-[36vh] bg-gray-100 rounded-md' >

                    </div>

                    <div className='w-[36vh] h-[32vh]  flex flex-col justify-start items-start gap-2 ' >
                        <p className='text-[#383D48] text-[24px] font-[700]'>ID: {data?.property_id}</p>
                        <div className='w-full h-[5vh]'>
                            <h5 className='font-extrabold text-[15px] h-[15px] m-0 text-[#383D48]'>Dirección</h5>
                            <h6 className='text-[15px] h-[15px] font-normal ext-[#383D48]'>{data?.address}</h6>
                        </div>
                        <div className='w-full h-[5vh]'>
                            <h5 className='font-extrabold text-[15px] h-[15px] m-0 text-[#383D48]'>Dueño</h5>
                            <h6 className='text-[15px] h-[15px]'>Elvira Caballero</h6>
                        </div>
                        <div className='w-full h-[5vh]'>
                            <h5 className='font-extrabold text-[15px] h-[15px] m-0 text-[#383D48]'>Arrendatario</h5>
                            <h6 className='text-[15px] h-[15px] text-[#383D48]'>Rebeca Guevara</h6>
                        </div>
                        <div className='w-full h-[5vh]'>
                            <h5 className='font-extrabold text-[15px] h-[15px] m-0 text-[#383D48]'>Tipo de Propiedad</h5>
                            <h6 className='text-[15px] h-[15px] text-[#383D48]'>Departamento</h6>
                        </div>
                    </div>

                    <div className='w-[36vh] h-[34vh] pt-[15px] pl-[30px]  flex flex-col justify-start items-start gap-2  border-l-[2px]' >
                        <div className='w-full h-[5vh]'>
                            <h5 className='font-extrabold text-[15px] h-[15px] m-0 text-[#383D48]'>Número Depto / Casa</h5>
                            <h6 className='text-[15px] h-[15px] font-normal ext-[#383D48]'>Glorieta Conchita Arellano 79, León</h6>
                        </div>
                        <div className='w-full h-[5vh]'>
                            <h5 className='font-extrabold text-[15px] h-[15px] m-0 text-[#383D48]'>Dormitorios</h5>
                            <h6 className='text-[15px] h-[15px] font-normal ext-[#383D48]'>Glorieta Conchita Arellano 79, León</h6>
                        </div>
                        <div className='w-full h-[5vh]'>
                            <h5 className='font-extrabold text-[15px] h-[15px] m-0 text-[#383D48]'>Baños</h5>
                            <h6 className='text-[15px] h-[15px] font-normal ext-[#383D48]'>Glorieta Conchita Arellano 79, León</h6>
                        </div>
                        <div className='w-full h-[5vh]'>
                            <h5 className='font-extrabold text-[15px] h-[15px] m-0 text-[#383D48]'>Estacionamiento</h5>
                            <h6 className='text-[15px] h-[15px] font-normal ext-[#383D48]'>Glorieta Conchita Arellano 79, León</h6>
                        </div>
                        <div className='w-full h-[5vh]'>
                            <h5 className='font-extrabold text-[15px] h-[15px] m-0 text-[#383D48]'>Bodega</h5>
                            <h6 className='text-[15px] h-[15px] font-normal ext-[#383D48]'>Glorieta Conchita Arellano 79, León</h6>
                        </div>
                    </div>

                </div>


                <div className="flex mb-10 bg-blue-500 rounded items-center max-w-full w-[96%]">
                    <div className="flex flex-col p-6 w-[96%] sm:w-[100%] md:w-[100%] lg:w-[100%]  xl:w-[100%]  h-[12vh] bg-white rounded shadow-md">
                        <b className='mb-2'>Contrato</b>
                        <div className='flex w-full h-full pt-'>
                            <div className='flex w-1/2 h-full flex-col '>
                                <p className='text-sm'>Monto de arriendo: $ {data.amounts[0]?.amount_lease.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                            </div>
                            <div className='flex w-1/2 h-full flex-col '>
                                <div>
                                    <p className='text-sm'>Comision por administracion: $ {data.amounts[0]?.amount_adm.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                                </div>
                            </div>
                            <div className='flex w-1/2 h-full flex-col '>

                                <p className='text-sm'>Inicio: {parseDate(data?.leases[0]?.initial_date.slice(0, 10))}  - Termino : {parseDate(data?.leases[0]?.end_date.slice(0, 10))} </p>

                            </div>
                        </div>
                    </div>

                </div>
                {/* Pendientes críticos */}
                <div className="flex mb-10  rounded justify-between items-center w-[96%]  ">
                    <div className="flex justify-center  items-start p-6 w-[56%] h-[36vh] bg-white rounded  shadow-md">
                        <div className='flex w-[100%] h-[100%] rounded flex-col   p-3 justify-start items-start '>
                            <div className="mb-6 w-full">
                                <div className='w-full'>
                                    <p className='text-lg font-semibold'>Pendientes críticos</p>
                                </div>
                                <div className='flex flex-row '>
                                    <div className={` w-[100%] h-[49px] flex justify-end items-center 
                                        bg-white  sm:text-md  rounded-[6px]`} >
                                        <input
                                            value={inputAlert}
                                            onChange={event => setInputAlert(event.target.value)}
                                            type="text"
                                            className={`block  w-[22vw] h-full outline outline-[2px]  outline-slate-300/80 border-0 rounded-l-md
                                        bg-white 
                                        text-[15px]
                                        ${inputAlertIncomplete === true && inputAlert === '' && 'outline outline-[2px] outline-red-500'}`} />

                                        <select defaultValue={priority} name="priority" onChange={e => { setPriority(e.target.value) }}
                                            className={`w-[100px] h-full  outline outline-[2px]  outline-slate-300/80 border-0 text-[15px]  px-2 text-start 
                                            ${inputPriorityIncomplete === true && priority === 'priority' && 'outline outline-[2px] outline-red-500'}`}>
                                            <option value={priority} disabled > Prioridad </option>
                                            <option value="Alta">Alta</option>
                                            <option value="Media">Media</option>
                                            <option value="Baja">Baja</option>
                                        </select>

                                        <input
                                            value={dateAlert}
                                            // min={minDate}
                                            onChange={e => { setDateAlert(e.target.value) }}
                                            className={`w-[124px]  p-1 h-[100%]  outline outline-[2px]  outline-slate-300/80 border-0  text-[15px] 
                                            ${dateAlertIncomplete === true && dateAlert === '' && 'outline outline-[2px] outline-red-500'} `}
                                            type={'date'}
                                        />
                                        <button
                                            onClick={() => {
                                                console.log(priority, inputAlert, dateAlert)
                                                if (alertsTrigger === false) {
                                                    addAlert()
                                                }
                                                else {
                                                    console.log("TRIGGER LO HIZO OTRA VEZ :^)")
                                                }
                                            }}
                                            className={`h-full w-12  outline outline-[2px]  outline-slate-300/80 border-0
                                        flex rounded-r-[6px] justify-center items-center bg-[#A0D8CE] hover:bg-[#86B5AC]`}>
                                            <FontAwesomeIcon icon={faPlus} className={`w-6 h-6 text-white`} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col break-normal w-full overflow-auto justify-start items-start p-2 rounded  bg-white'>
                                {renderPendientes()}
                            </div>
                        </div>
                    </div>
                    {/* Anotaciones */}
                    <div className="flex justify-center  items-start p-6 w-[42%] h-[36vh] bg-white rounded shadow-md">
                        <div className='flex w-[100%] h-[100%] rounded flex-col p-3 justify-start items-start '>
                            <div className="mb-6 w-full">
                                <div className='w-full'>
                                    <p className='text-lg font-semibold'>Anotaciones </p>
                                    <span className={`text-[12px] m-0 absolute top-[80vh] text-red-400 ${errorAnnotation ? 'block' : 'hidden'}`}>Debes ingresar la anotacion</span>
                                </div>
                                <input
                                    onKeyDown={(e) => {
                                        if (anotacionesTrigger === false) {
                                            addAnotacion(e)
                                        }
                                        else {
                                            console.log("TRIGGER LO HIZO OTRA VEZ :^)")
                                        }
                                    }}
                                    value={inputAnnotation}
                                    onChange={event => {
                                        setInputAnnotation(event.target.value)
                                        setErrorAnnotation(false)
                                    }}
                                    type="text"
                                    className={`p-4 w-full appearance-none h-10 bg-white rounded-lg sm:text-md outline outline-[2px]  outline-slate-300/80 border-0 focus:outline-0 focus:outline-black  ${errorAnnotation && 'outline outline-2 outline-red-400'}`} />
                            </div>
                            <div className='flex flex-col break-normal w-full overflow-auto justify-start items-start p-2 rounded bg-white'>
                                {annotations.length !== 0 ?
                                    renderAlerts() : <>No hay anotaciones</>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex pt-3 px-4 mb-10 flex-col justify-start items-end w-[96%] h-[45vh] bg-white rounded-lg shadow-sm'>
                    <div className='w-full  flex flex-row justify-between items-center'>
                        <p className='text-lg font-semibold'>Historial de pagos</p>
                        <div className='h-full w-[40%] flex justify-end items-center'>
                            {dataExp.length !== 0 &&
                                <>
                                    <button
                                        onClick={async () => {
                                            let resp = await sendDebtorMail(data.id)
                                            console.log(resp)
                                            setOpenCorreos(true)
                                        }}
                                        className='h-[4vh] mr-2  w-60 bg-[#A0D8CE]
                                hover:bg-[#86B5AC]  rounded-md'>
                                        Enviar correos
                                    </button>
                                    <button
                                        onClick={() => {
                                            updateExpenses()
                                        }}
                                        className='h-[4vh]  w-40 bg-[#A0D8CE]
                                hover:bg-[#86B5AC]  rounded'>
                                        Guardar
                                    </button>
                                </>
                            }
                        </div>
                    </div>
                    <TableBill id={data.id} arrayExpenses={arrayExpenses} setArrayExpenses={setArrayExpenses} dataExp={dataExp} />
                </div>
                <div className='flex pt-3 px-4 mb-10 flex-col justify-start items-end w-[96%] h-[45vh] bg-white rounded-lg shadow-sm'>
                    <div className='w-full'>
                        <p className='text-lg font-semibold'>Visitas</p>
                    </div>
                    {
                        visits.length === 0 ?
                            <div className="w-full h-[22vh] flex justify-center items-center flex-col">
                                <p>No hay propiedades a revisar aun uyuiiiiiiii (Lease modo huaso)</p>
                                <img src={require('../assets/loading.JPG')} className={'w-[160px] h-[180px]'} />
                            </div> :
                            <TableVisits id={data.id} visits={visits} setVisits={setVisits} />
                    }
                </div>
            </div>
        </div >
    )
}