import { useState } from 'react'
import TableBill from '../components/TableBill'
import TableVisits from '../components/TableVisits'
import { useNavigate } from 'react-router-dom'


export default function Propiedad() {

    let navigate = useNavigate()

    const [logs, setLogs] = useState([
        { fecha: '23/04/2022  20:02', mensaje: "Se cayo gente" },
        { fecha: '13/02/2012  13:45:', mensaje: "Se callo gente" },
        { fecha: '02/10/1925  15:10', mensaje: "Se caio gente" },

    ])

    const [data, setData] = useState([
        { fecha: '23/04/2022  20:02', mensaje: "Prueba 1" },
        { fecha: '13/02/2012  13:45:', mensaje: "Prueba 2" },
        { fecha: '02/10/1925  15:10', mensaje: "Prueba 3" },

    ])

    const [inputLog, setInputLog] = useState("")

    const [inputData, setInputData] = useState("")

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
            setData(current => [{ fecha: fecha, mensaje: inputData }, ...current])

        }
    }

    return (
        <div>
            <div className="flex sm:w-[100vw] md:w-[100vw] lg:w-[80vw] shadow-lg bg-slate-100   flex-column justify-start items-center p-6">
                <div className="flex my-10 justify-center rounded items-center w-[96%] h-[40vh] bg-white shadow-md">
                    <div className="flex justify-center rounded-l items-center w-[35vw] h-[40vh] bg-white ">
                        <img alt="propiedad"
                            className='w-[35vw] h-[40vh] rounded-l' src={require('../assets/lamoneda.jpeg')} />
                    </div>
                    <div className="flex justify-center rounded-r items-center w-[55vw] h-[40vh] bg-white ">
                        <div className="flex  justify-between flex-column items-start p-6 w-[27vw] h-[40vh] bg-white ">
                            <div>
                                <p>ID: 25</p>
                                <p>Direccion: Maipu 852</p>
                                <p>Dueño: Julian casablancas</p>
                                <p>Arrendatario: Luis Gnecco</p>
                                <p>Nro Piso: 25</p>
                            </div>
                            <div className='w-full '>
                                <button onClick={() => {
                                    let nav = `/propiedades/propiedad/editarPropiedad`
                                    navigate(nav)
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
                                <p>Estacionamiento: (Est)</p>
                                <p>Bodega: (Bodega)</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex mb-10 bg-white  rounded justify-between items-center w-[96%]  ">
                    <div className="flex flex-col justify-center  items-start p-6 w-[22vw] sm:w-[38vw] md:w-[40vw]  lg:w-[34vw] xl:w-[30vw] h-[36vh] bg-slate-200 rounded shadow-md">
                        <p className='text-lg'>Ultimo pago</p>
                        <p className='text-sm'>Fecha de pago: (FECHA)</p>
                        <p className='text-sm'>Monto: (MONTO)</p>
                        <p className='text-sm'>Luz: (MONTO)</p>
                        <p className='text-sm'>Agua: (MONTO)</p>
                        <p className='text-sm'>Gas: (MONTO)</p>
                    </div>
                    <div className="flex flex-col p-6 w-[22vw] sm:w-[38vw] md:w-[40vw] lg:w-[34vw]  xl:w-[30vw]  h-[36vh] bg-slate-200 rounded shadow-md">
                        <p>Contrato</p>
                        <div className='flex w-full h-full'>
                            <div className='flex w-1/2 h-full flex-col '>
                                <p className='text-sm'>Monto: (MONTO)</p>
                                <p className='text-sm'>Gastos Comunes: (MONTO)</p>
                                <p className='text-sm'>Comision por administracion: (MONTO)</p>

                            </div>
                            <div className='flex w-1/2 h-full flex-col '>
                                <div>
                                    <p className='text-sm'>Inicio de contrato: (FECHA)</p>
                                    <p className='text-sm'>Termino de contrato: (FECHA)</p>
                                    <p className='text-sm'>Proximo pago: (Fecha)</p>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

                <div className="flex mb-10 bg-white rounded justify-between items-center w-[96%]  ">
                    <div className="flex justify-center  items-start p-6 w-[22vw] sm:w-[38vw] md:w-[40vw]  lg:w-[34vw] xl:w-[30vw] h-[36vh] bg-slate-200 rounded shadow-md">
                        <div className='flex w-[100%] h-[100%] rounded flex-col  p-3 justify-start items-start '>
                            <div className="mb-6 w-full">
                                <input
                                    onKeyDown={handleKeyDown}
                                    value={inputLog}
                                    onChange={event => setInputLog(event.target.value)}
                                    type="text"
                                    id="large-input" className="block p-4 w-full h-10 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div className='flex flex-col break-normal w-full overflow-auto justify-start items-start p-2 rounded  bg-white'>
                                {logs.map((item, index) =>
                                    <p key={index} className='text-sm break-words'>{item.fecha} - {item.mensaje}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center  items-start p-6 w-[22vw] sm:w-[38vw] md:w-[40vw] lg:w-[34vw]  xl:w-[30vw]  h-[36vh] bg-slate-200 rounded shadow-md">
                        <div className='flex w-[100%] h-[100%] rounded flex-col p-3 justify-start items-start '>
                            <div className="mb-6 w-full">
                                <input
                                    onKeyDown={handleKeyDownData}
                                    value={inputData}
                                    onChange={event => setInputData(event.target.value)}
                                    type="text"
                                    id="large-input-data" className="block p-4 w-full h-10 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div className='flex flex-col break-normal w-full overflow-auto justify-start items-start p-2 rounded bg-white'>
                                {data.map((item, index) =>
                                    <p key={index} className='text-sm break-words'>{item.fecha} - {item.mensaje}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>


                <div className='flex p-6 mb-10 flex-col justify-start items-end w-[96%] h-[45vh] bg-white shadow-md'>
                    <div className='fles w-full'>
                        <p>Historial de pagos</p>
                    </div>
                    <TableBill />

                </div>
                <div className='flex p-6 flex-col justify-start items-end w-[96%] h-[45vh] bg-white shadow-md'>
                    <div className='fles w-full'>
                        <p>Visitas</p>
                    </div>

                    <TableVisits />

                </div>
            </div>
        </div>
    )
}