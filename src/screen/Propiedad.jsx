import { useState, useEffect } from 'react'
import TableBill from '../components/TableBill'
import TableVisits from '../components/TableVisits'
import { useNavigate, useLocation } from 'react-router-dom'
import { API_HOST } from '../utils/constants'

export default function Propiedad() {

    let navigate = useNavigate()


    const [fotoUrL, setFotoUrl] = useState("")
    const [loaded, setLoaded] = useState(false)


    const location = useLocation()
    const getData = async () => {

        let data = await location.state.data
        console.log(data.amounts.length)
        setData(data)
        setAlerts(data.alerts)
        console.log(data.alerts, "asdka")
        console.log(data.image?.slice(7, data.image.length))
        setFotoUrl(API_HOST + data.image.slice(7, data.image.length))
        document.title = 'Propiedad ' + data.property_id;
    }

    useEffect(() => {
        getData()
    }, [])


    const [logs, setLogs] = useState([
        { fecha: '23/04/2022  20:02', mensaje: "Se cayo gente" },
        { fecha: '13/02/2012  13:45:', mensaje: "Se callo gente" },
        { fecha: '02/10/1925  15:10', mensaje: "Se caio gente" },
    ])

    const [alerts, setAlerts] = useState("")

    const [data, setData] = useState("")

    const [inputLog, setInputLog] = useState("")

    const [inputData, setInputData] = useState("")

    const renderAlerts = () => {


        console.log(alerts, 23)

        return (
            alerts.map((item, index) =>

                <p key={index}>{item.id + " " + item.note + " " + item.level}</p>
            )
        )
    }


    const parseAvaliable = (state) => {

        console.log(state)
        if (state === false) {
            return "No"
        }
        else if (state === true) {
            return "Si"
        }

    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log(inputLog)
            setInputLog("")
            let separator = '/'
            let newDate = new Date()
            let date = newDate.getDate();
            let month = newDate.getMonth() + 1;
            let year = newDate.getFullYear();
            let hour = newDate.getHours()
            let minutes = newDate.getMinutes()


            let fecha = `${date}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year}  ${hour}: ${String(minutes).length === 1 ? `0${minutes}` : `${minutes}`}`
            setLogs(current => [{ fecha: fecha, mensaje: inputLog }, ...current])

        }
    }

    const handleKeyDownData = (event) => {
        if (event.key === 'Enter') {
            console.log(inputData)
            setInputData("")
            let separator = '/'
            let newDate = new Date()
            let date = newDate.getDate();
            let month = newDate.getMonth() + 1;
            let year = newDate.getFullYear();
            let hour = newDate.getHours()
            let minutes = newDate.getMinutes()


            let fecha = `${date}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year}  ${hour}: ${String(minutes).length === 1 ? `0${minutes}` : `${minutes}`}`
            setAlerts(current => [{ fecha: fecha, mensaje: inputData }, ...current])

        }
    }

    if (data === "") {
        return <></>
    }
    return (
        <div className='bg-gray-100 w-[100vw] flex justify-center'>
            <div className="flex sm:w-[100vw] md:w-[100vw] lg:w-[100vw] xl:w-[80vw]  2xl:w-[75vw] bg-gray-100 flex-column justify-start items-center p-8">
                <div className="flex my-10 justify-center rounded items-center w-[96%] h-[40vh]  shadow-md ">
                    <div className="flex justify-center rounded-l items-center w-[33vw] h-[40vh] ">
                        <img alt="propiedad"
                            onLoad={() => {
                                console.log("SE CARGO")
                                setLoaded(true)
                            }}
                            className='w-[35vw] h-[40vh] rounded-l' src={fotoUrL} />
                        {loaded === false &&
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
                            <p>ID: {data.property_id}</p>
                            <p>Direccion: {data.address}</p>
                            <p>Dueño:  {data.owner?.name} {data.owner?.lastname} </p>
                            <p>Arrendatario: </p>
                            <p>Nro Piso: 25</p>
                            <p>Tipo: {data.type_property}</p>
                        </div>
                        <div className='w-full '>
                            <button onClick={() => {
                                let nav = `/propiedades/propiedad/editarPropiedad`
                                navigate(nav, {
                                    state: {
                                        data: data
                                    }
                                })
                            }} className='bg-slate-200 active:bg-slate-100  w-full justify-center items-center flex rounded'>
                                Editar propiedad
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center flex-col rounded-r p-6 items-start w-[28vw] h-[40vh] bg-white">
                        <button className='w-full mb-3 h-[4vh] rounded-lg flex justify-center item-center bg-slate-100'>
                            Ver boletas de honorarios
                        </button>
                        <div className='flex rounded flex-col w-full h-full p-6 justify-center items-start bg-slate-100'>
                            <p>Dormitorios:(DORMITORIOS)</p>
                            <p>Baños: (Baños)</p>
                            <p>Estacionamiento: {parseAvaliable(data.parking)}</p>
                            <p>Bodega: {parseAvaliable(data.cellar)}</p>
                        </div>
                    </div>
                </div>
                <div className="flex mb-10 bg-blue-500 rounded items-center max-w-full w-[96%]">
                    {/* <div className="flex flex-col justify-center  items-start p-6 w-[22vw] sm:w-[38vw] md:w-[40vw]  lg:w-[34vw] xl:w-[30vw] h-[36vh] bg-slate-200 rounded shadow-md">
                        <p className='text-lg'>Ultimo pago</p>
                        <p className='text-sm'>Fecha de pago: (FECHA)</p>
                        <p className='text-sm'>Monto: </p>
                        <p className='text-sm'>Luz: (MONTO)</p>
                        <p className='text-sm'>Agua: (MONTO)</p>
                        <p className='text-sm'>Gas: (MONTO)</p>
                    </div> */}
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

                                <p className='text-sm'>Inicio: 25/22/2222 - Termino : 25/22/2222</p>
                                {/* <p className='text-sm'>Termino de contrato: (FECHA)</p> */}

                            </div>
                        </div>
                    </div>

                </div>

                <div className="flex mb-10  rounded justify-between items-center w-[96%]  ">
                    <div className="flex justify-center  items-start p-6 w-[48%] h-[36vh] bg-white rounded shadow-md">
                        <div className='flex w-[100%] h-[100%] rounded flex-col  p-3 justify-start items-start '>
                            <div className="mb-6 w-full">
                                <input
                                    onKeyDown={handleKeyDown}
                                    value={inputLog}
                                    onChange={event => setInputLog(event.target.value)}
                                    type="text"
                                    id="large-input" className="block p-4 w-full h-10  bg-white rounded-lg  outline outline-1 outline-[#3A4348] focus:outline-2 sm:text-md " />
                            </div>
                            <div className='flex flex-col break-normal w-full overflow-auto justify-start items-start p-2 rounded  bg-white'>
                                {logs.map((item, index) =>
                                    <p key={index} className='text-sm break-words'>{item.fecha} - {item.mensaje}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center  items-start p-6 w-[48%] h-[36vh] bg-white rounded shadow-md">
                        <div className='flex w-[100%] h-[100%] rounded flex-col p-3 justify-start items-start '>
                            <div className="mb-6 w-full">
                                <input
                                    onKeyDown={handleKeyDownData}
                                    value={inputData}
                                    onChange={event => setInputData(event.target.value)}
                                    type="text"
                                    id="large-input-data" className="block p-4 w-full h-10  bg-white rounded-lg  outline outline-1 outline-[#3A4348] focus:outline-2 sm:text-md " />
                            </div>
                            <div className='flex flex-col break-normal w-full overflow-auto justify-start items-start p-2 rounded bg-white'>
                                {alerts !== "" &&
                                    renderAlerts()
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex pt-3 px-4 mb-10 flex-col justify-start items-end w-[96%] h-[45vh] bg-white rounded-lg shadow-sm'>
                    <div className='w-full'>
                        <p className='text-lg font-semibold'>Historial de pagos</p>
                    </div>
                    <TableBill />
                </div>

                {/* <div className='flex p-6 mb-10 flex-col justify-start items-end w-[96%] h-[45vh] bg-white shadow-md'>
                    <div className='fles w-full'>
                        <p>Historial de pagos</p>
                    </div>
                 

                </div> */}
                <div className='flex pt-3 px-4 mb-10 flex-col justify-start items-end w-[96%] h-[45vh] bg-white rounded-lg shadow-sm'>
                    <div className='w-full'>
                        <p className='text-lg font-semibold'>Visitas</p>
                    </div>

                    <TableVisits />

                </div>
            </div>
        </div >
    )
}