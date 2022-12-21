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
        setAnnotations(data.property.annotations.reverse())
        setFotoUrl(API_HOST + data.property?.image || '')
        document.title = 'Propiedad ' + data.property.property_id
        const respExpenses = await getExpensesId(data.property.id)
        setDataExp(respExpenses.data.expenses)
    }

    const getVisits = async (id) => {
        let resp = await getVisitsForProperty(id)
        console.log(resp.visits)
        setVisits(resp.visits)
    }


    useEffect(() => {
        getData()
    }, [])

    const [logs, setLogs] = useState([])

    const [annotations, setAnnotations] = useState("")

    const [data, setData] = useState("")

    const [priority, setPriority] = useState("priority")

    const [inputLog, setInputLog] = useState("")

    const [inputAnnotation, setInputAnnotation] = useState("")

    const [errorAnnotation, setErrorAnnotation] = useState(false)

    const [inputLogIncomplete, setInputLogIncomplete] = useState(false)

    const [inputPriorityIncomplete, setInputPriorityIncomplete] = useState(false)

    const renderAlerts = () => {
        // console.log(annotations)
        return (
            annotations.map((item, index) =>
                <p key={index}>{item.value + " -- " + item.by}</p>
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
        if (inputLog === "" || priority === "priority") {
            if (inputLog === "") {
                setInputLogIncomplete(true)
                console.log("TE FALTA EL MENSAJE")
            }
            if (priority === "priority") {
                setInputPriorityIncomplete(true)
                console.log("TE FALTA LA PRIORIDAD")
            }
            console.log("ERROR TE FALTA UN DATO")
        }
        else {
            //* Se crea el objeto y se llena con los datos
            let obj = {}
            obj.propertyId = data.id
            obj.note = inputLog
            obj.level = priority.toUpperCase()

            //* Se hace un fetch con los datos
            const respAlert = await addAlerts(obj)
            console.log(respAlert.data.alert)
            //* Se limpian los campos
            setInputLog('')
            setPriority('priority')

            //* Se agregan los nuevos datos en el primer lugar del array
            setLogs(current => [{
                level: respAlert.data.alert.level,
                note: respAlert.data.alert.note,
                by: respAlert.data.alert.by
            }, ...current])
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
                let resp = await addAnnotations(body)
                console.log(resp)
                setAnnotations(current => [resp.data.annotation, ...current])
                setInputAnnotation('')
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
    }

    const parseType = () => {
        let str = data?.type_property
        str = str.toLowerCase()
        let str2 = str.charAt(0).toUpperCase() + str.slice(1)
        console.log(str, str2)
        return str2

    }

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

    useEffect(() => {
        if (data.image === null) {
            setLoaded(false)
        }
        console.log(data?.image)
    }, [data])


    if (data === "") {
        return <></>
    }
    return (
        <div className='bg-gray-100 w-[100vw] flex justify-center '>
            <div className="flex sm:w-[100vw] md:w-[100vw] lg:w-[100vw] xl:w-[80vw]  2xl:w-[75vw] bg-gray-100 flex-column justify-start items-center p-8">
                <div className="flex my-10 justify-center rounded items-center w-[96%] h-[40vh]  shadow-md ">
                    <div className="flex justify-center rounded-l items-center w-[33vw] h-[40vh] ">
                        {data.image === null ? <p>No hay foto</p> :
                            <img alt="propiedad"
                                onLoad={() => {
                                    console.log("SE CARGO")
                                    setLoaded(false)
                                }}
                                onError={() => {
                                    console.log("ERROOOOOOR")
                                    setLoaded(false)
                                    setFotoUrl("")
                                }}
                                className='w-[35vw] h-[40vh] rounded-l' src={fotoUrL} />}

                        {loaded === true &&
                            <div className='w-[33vw] h-[40vh] absolute rounded-l  flex justify-center items-center' >
                                <div role="status">
                                    <svg className="inline mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="flex  justify-between flex-column items-start p-6 w-[32vw] 2xl:w-[32vw] h-[40vh] bg-white ">
                        <div>
                            <p>ID: {data?.property_id}</p>
                            <p>Direccion: {data?.address}</p>
                            <p>Dueño:  {data.owner?.name} {data.owner?.lastname} </p>
                            <p>Arrendatario: {data?.leases[0]?.leaseholder?.name} {data?.leases[0]?.leaseholder?.lastname}</p>
                            <p>Nro Piso: {data?.floor}</p>
                            <p>Tipo: {parseType()}</p>
                        </div>
                        <div className='w-full '>

                            <button onClick={() => {
                                let nav = `/propiedades/propiedad/editarPropiedad`
                                navigate(nav, {
                                    state: {
                                        data: data
                                    }
                                })
                            }}
                                className="group relative h-12 w-48 overflow-hidden rounded-lg text-white bg-[#FF6F00] hover:bg-[#3A4348] text-lg shadow-sm">Editar Propiedad
                            </button>

                        </div>
                    </div>
                    <div>
                    </div>
                    <div className="flex justify-center flex-col rounded-r p-6 items-start w-[28vw] h-[40vh] bg-white">
                        <div className='flex rounded flex-col w-full h-full p-6 justify-center items-start bg-slate-100'>
                            <p>Dormitorios: {data.bedrooms || "Sin data"}</p>
                            <p>Baños: {data.bathrooms || "Sin data"}</p>
                            <p>Estacionamiento: {parseAvaliable(data.parking)}</p>
                            <p>Bodega: {parseAvaliable(data.cellar)}</p>
                        </div>
                    </div>
                </div>
                <div className="flex mb-10 bg-blue-500 rounded items-center max-w-full w-[96%]">
                    <div className="flex flex-col p-6 w-[96%] sm:w-[100%] md:w-[100%] lg:w-[100%]  xl:w-[100%]  h-[12vh] bg-white rounded shadow-md">
                        <b className='mb-2'>Contrato</b>
                        <div className='flex w-full h-full pt-'>
                            <div className='flex w-1/2 h-full flex-col '>
                                <p className='text-sm'>Monto de arriendo: $ {data.amounts[0]?.amount_lease}</p>
                            </div>
                            <div className='flex w-1/2 h-full flex-col '>
                                <div>
                                    <p className='text-sm'>Comision por administracion: $ {data.amounts[0]?.amount_adm}</p>
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
                    <div className="flex justify-center  items-start p-6 w-[48%] h-[36vh] bg-white rounded shadow-md">
                        <div className='flex w-[100%] h-[100%] rounded flex-col  p-3 justify-start items-start '>
                            <div className="mb-6 w-full">
                                <div className='w-full'>
                                    <p className='text-lg font-semibold'>Pendientes críticos</p>
                                </div>
                                <div className='flex flex-row'>
                                    <input
                                        value={inputLog}
                                        onChange={event => setInputLog(event.target.value)}
                                        type="text"
                                        id="large-input" className={`block p-3 w-[75%] h-10  bg-white rounded-lg  outline outline-1 outline-[#3A4348] focus:outline-2 sm:text-md ${inputLogIncomplete === true && inputLog === '' && 'outline outline-[2.5px] outline-red-500'}`} />
                                    <select value={priority} name="priority" onChange={e => { setPriority(e.target.value) }}
                                        className={`w-[25%] px-2 ml-1 text-start ${inputPriorityIncomplete === true && priority === 'priority' && 'outline outline-[2.5px] outline-red-500'}`}>
                                        <option value="priority" disabled selected hidden>Prioridad</option>
                                        <option value="Alta">Alta</option>
                                        <option value="Media">Media</option>
                                        <option value="Baja">Baja</option>
                                    </select>
                                    <button><FontAwesomeIcon onClick={() => {
                                        addAlert()
                                    }} className="w-[100%] ml-1 text-orange-500" icon={faPlus} /></button>
                                </div>
                            </div>
                            <div className='flex flex-col break-normal w-full overflow-auto justify-start items-start p-2 rounded  bg-white'>
                                {logs.map((item, index) =>
                                    <p key={index} className='text-sm break-words'>{item.level} - {item.note} - {item.by}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Anotaciones */}
                    <div className="flex justify-center  items-start p-6 w-[48%] h-[36vh] bg-white rounded shadow-md">
                        <div className='flex w-[100%] h-[100%] rounded flex-col p-3 justify-start items-start '>
                            <div className="mb-6 w-full">
                                <div className='w-full'>
                                    <p className='text-lg font-semibold'>Anotaciones </p>
                                    <span className={`text-[12px] m-0 absolute top-[80vh] text-red-400 ${errorAnnotation ? 'block' : 'hidden'}`}>Debes ingresar la anotacion</span>
                                </div>
                                <input
                                    onKeyDown={addAnotacion}
                                    value={inputAnnotation}
                                    onChange={event => {
                                        setInputAnnotation(event.target.value)
                                        setErrorAnnotation(false)
                                    }}
                                    type="text"
                                    className={`p-4 w-full appearance-none h-10 bg-white rounded-lg sm:text-md focus:outline-0 focus:outline-black  ${errorAnnotation && 'outline outline-2 outline-red-400'}`} />
                            </div>
                            <div className='flex flex-col break-normal w-full overflow-auto justify-start items-start p-2 rounded bg-white'>
                                {annotations !== "" &&
                                    renderAlerts()
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex pt-3 px-4 mb-10 flex-col justify-start items-end w-[96%] h-[45vh] bg-white rounded-lg shadow-sm'>
                    <div className='w-full flex flex-row justify-between items-center'>
                        <p className='text-lg font-semibold'>Historial de pagos</p>
                        <div className='h-full w-[30%] flex justify-end items-center'>
                            <button
                                onClick={() => {
                                    updateExpenses()
                                }}
                                className='h-[4vh]  w-40 bg-emerald-400
                             hover:bg-emerald-600  rounded'>
                                Guardar
                            </button>
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
                            <>No hay na</> :
                            <TableVisits visits={visits} />
                    }
                </div>
            </div>
        </div >
    )
}