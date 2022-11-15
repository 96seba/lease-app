import { useState, useEffect } from 'react'
import ModalGuardar from '../components/ModalGuardar'
import { createPropiedad } from '../api/createPropiedad'
import { uploadPropiedadImagen } from '../api/uploadPropiedadImagen'


export default function AgregarPropiedad() {

    //* Datos propiedad

    const [id, setId] = useState("")
    const [estacionamiento, setEstacionamiento] = useState(false)
    const [direccion, setDireccion] = useState("")
    const [bodega, setBodega] = useState(false)
    const [baños, setBaños] = useState("")
    const [dormitorios, setDormitorios] = useState("")
    const [foto, setFoto] = useState("")
    const [fotoUri, setFotoUri] = useState("")
    const [nroPiso, setNroPiso] = useState("")

    //* Datos arrendador

    const [correo, setCorreo] = useState("")
    const [telefono, setTelefono] = useState("")
    const [nombreArrendador, setNombreArrendador] = useState("")
    const [apellidoArrendador, setApellidoArrendador] = useState("")
    const [rutArrendador, setRutArrendador] = useState("")

    const [monto, setMonto] = useState("")
    const [administracion, setAdministracion] = useState("")
    const [fechaNacArrendador, setFechaNacArrendador] = useState("")
    const [fechaNacArrendatario, setFechaNacArrendatario] = useState("")

    const [tipo, setTipo] = useState("")

    useEffect(() => {
        document.title = 'Agrega una propiedad';
    }, []);

    const uploadImage = async () => {

        console.log(fotoUri)
        const form = new FormData();
        form.append("id", "1");
        form.append("image", fotoUri);

        const options = {
            method: 'POST',
            body: form
        };

        fetch('http://54.172.21.15:9000/api/v1/property/uploadImage', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));

    }


    const addPropiedad = async () => {
        let date = new Date(fechaNacArrendador)
        let obj = {}
        obj.property_id = id
        obj.address = direccion
        obj.amount_lease = Number(monto)
        obj.amount_adm = Number(administracion)
        obj.type_property = tipo
        obj.rut = rutArrendador
        obj.name = nombreArrendador
        obj.lastname = apellidoArrendador
        obj.birthday = date.toISOString()
        obj.email = correo
        obj.phone = telefono
        obj.bedrooms = dormitorios
        obj.bathrooms = baños
        obj.floor = nroPiso
        obj.cellar = bodega
        obj.parking = estacionamiento


        console.log(obj)

        const resp = await createPropiedad(obj)
        console.log(resp)

    }



    const [open, setOpen] = useState(false)


    return (
        <div className='w-screen flex  justify-center items-center bg-white'>
            <div className="w-[100vw] sm:w-[100vw] md:w-[100vw] lg:w-[80vw] xl:w-[65vw] shadow-lg h-[180.5vh] p-6  flex items-center">

                {open === true ?
                    <ModalGuardar open={open} setOpen={setOpen} /> : <></>
                }

                <div className='w-1/2 h-full flex flex-col justify-start items-center'>
                    <p className="flex my-4 text-xl">
                        Datos de la propiedad
                    </p>
                    <div className="mb-1 w-[90%] flex flex-col justify-center items-start">
                        <p>Id</p>
                        <input
                            value={id} onChange={text => { setId(text.target.value) }}
                            className="appearance-none outline-pink-400 border h-[90%] rounded-sm w-[95%] py-2 px-3 text-grey-darker" id="username" type="text"
                            placeholder="Id" />
                    </div>
                    <div className="mb-1 w-[90%] flex flex-col justify-center items-start">
                        <p>Direccion</p>
                        <input
                            value={direccion} onChange={text => { setDireccion(text.target.value) }}
                            className="appearance-none outline-pink-400 border h-[90%] rounded-sm w-[95%] py-2 px-3 text-grey-darker" id="username" type="text"
                            placeholder="Direccion" />
                    </div>
                    <div className="mb-1 w-[90%] flex flex-col justify-center items-start">
                        <p>Tipo</p>
                        <select
                            onChange={e => {
                                console.log(e.target.value)
                                setTipo(e.target.value)
                            }}
                            className="appearance-none outline-pink-400 border h-[90%] rounded-sm w-[95%] py-2 px-3 text-grey-darker">
                            <option value="Casa">Casa</option>
                            <option value="Depto">Depto</option>
                            <option value="Oficina">Oficina</option>
                        </select>
                    </div>
                    <div className="mb-1 w-[90%] flex flex-col justify-center items-start">
                        <p>Nro piso</p>
                        <input
                            value={nroPiso}
                            onChange={e => {
                                setNroPiso(Number(e.target.value))
                            }}
                            className="appearance-none outline-pink-400 border h-[90%] rounded-sm w-[95%] py-2 px-3 text-grey-darker" id="username" type="text"
                            placeholder="Nro piso" />
                    </div>
                    <div className="my-4 w-[90%]">
                        <label htmlFor="teal-toggle" className="inline-flex relative items-center mr-5 cursor-pointer">
                            <input type="checkbox" value="" id="teal-toggle" className="sr-only peer"
                                checked={estacionamiento} onChange={() => { setEstacionamiento(!estacionamiento) }} />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700  peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-900">Estacionamiento</span>
                        </label>


                        <label htmlFor="d-toggle" className="inline-flex relative items-center mr-5 cursor-pointer">
                            <input type="checkbox" value="" id="d-toggle" className="sr-only peer"
                                checked={bodega} onChange={() => { setBodega(!bodega) }} />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700  peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-900">Bodega</span>
                        </label>

                    </div>
                    <div className="mb-1 w-[90%] flex justify-around flex-row">
                        <div className='w-1/2 h-[10vh] flex flex-col justify-center items-start'>
                            <p>Baños</p>
                            <input
                                value={baños} onChange={text => setBaños(text.target.value)}
                                className="appearance-none outline-pink-400 border h-[40%] rounded-sm w-[90%] py-2 px-3 text-grey-darker" id="username" type="number"
                                placeholder="Baños" />
                        </div>
                        <div className='w-1/2 h-[10vh] flex flex-col justify-center items-start'>
                            <p>Dormitorios</p>
                            <input
                                value={dormitorios} onChange={text => setDormitorios(text.target.value)}
                                className="appearance-none outline-pink-400 border h-[40%] rounded-sm w-[90%] py-2 px-3 text-grey-darker" id="username" type="number"
                                placeholder="Dormitorios" />
                        </div>
                    </div>
                    <div className="mb-3 w-[90%] flex flex-col justify-center items-start">
                        <p>Monto</p>
                        <input
                            value={monto} onChange={text => { setMonto(text.target.value) }}
                            className="appearance-none outline-pink-400 border h-[90%] rounded-sm w-[95%] py-2 px-3 text-grey-darker" id="username" type="text"
                            placeholder="Monto" />
                    </div>
                    <div className="mb-3 w-[90%] flex flex-col justify-center items-start">
                        <p>Comision por administracion</p>
                        <input
                            value={administracion} onChange={text => { setAdministracion(text.target.value) }}
                            className="appearance-none outline-pink-400 border h-[90%] rounded-sm w-[95%] py-2 px-3 text-grey-darker" id="username" type="text"
                            placeholder="Comision por administracion" />
                    </div>
                    <div className="mb-3 w-[90%] flex flex-col justify-center items-start">
                        <p>Gastos comunes</p>
                        <input className="appearance-none outline-pink-400 border h-[90%] rounded-sm w-[95%] py-2 px-3 text-grey-darker" id="username" type="text"
                            placeholder="Gastos comunes" />
                    </div>

                    <div className="mb-1 w-[90%] flex justify-around flex-row">
                        <div className='w-1/2 h-[10vh] flex flex-col justify-center items-start'>
                            <p>Nombre arrendador</p>
                            <input
                                value={nombreArrendador} onChange={text => setNombreArrendador(text.target.value)}
                                className="appearance-none outline-pink-400 border h-[40%] rounded-sm w-[90%] py-2 px-3 text-grey-darker" id="username" type="text"
                                placeholder="Nombre" />
                        </div>
                        <div className='w-1/2 h-[10vh] flex flex-col justify-center items-start'>
                            <p>Apellido arrendador</p>
                            <input
                                value={apellidoArrendador} onChange={text => setApellidoArrendador(text.target.value)}
                                className="appearance-none outline-pink-400 border h-[40%] rounded-sm w-[90%] py-2 px-3 text-grey-darker" id="username" type="text"
                                placeholder="Apellido" />
                        </div>
                    </div>

                    <div className="mb-3 w-[90%] flex flex-col justify-center items-start">
                        <p>Rut arrendador</p>
                        <input
                            value={rutArrendador} onChange={text => { setRutArrendador(text.target.value) }}
                            className="appearance-none outline-pink-400 border h-[90%] rounded-sm w-[95%] py-2 px-3 text-grey-darker" id="username" type="text"
                            placeholder="Rut arrendador" />
                    </div>
                    <div className="mb-3 w-[90%] flex flex-col justify-center items-start">
                        <p>Fecha de nacimiento</p>
                        <input
                            value={fechaNacArrendador} onChange={text => { setFechaNacArrendador(text.target.value) }}
                            className="appearance-none outline-pink-400 border h-[90%] rounded-sm w-[95%] py-2 px-3 text-grey-darker" id="username" type="date"
                            placeholder="Inicio de contrato" />
                    </div>

                    <div className="mb-4 w-[90%] flex justify-around flex-row">
                        <div className='w-1/2 h-[10vh] flex flex-col justify-center items-start'>
                            <p>Correo</p>
                            <input
                                value={correo} onChange={text => { setCorreo(text.target.value) }}
                                className="appearance-none outline-pink-400 border h-[40%] rounded-sm w-[90%] py-2 px-3 text-grey-darker" id="username" type="text"
                                placeholder="Correo" />
                        </div>
                        <div className='w-1/2 h-[10vh] flex flex-col justify-center items-start'>
                            <p>Teléfono</p>
                            <input
                                value={telefono}
                                onChange={text => setTelefono(text.target.value)}
                                className="appearance-none outline-pink-400 border h-[40%] rounded-sm w-[90%] py-2 px-3 text-grey-darker" id="username" type="Number"
                                placeholder="Teléfono" />
                        </div>
                    </div>


                    {foto === "" ?
                        <div className="flex justify-center items-center mb-1 h-[25vh] w-[90%]">
                            <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-full bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-100 hover:bg-gray-100 dark:border-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                    <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p className="mb-2 text-sm text-center text-gray-500 dark:text-gray-400"><span className="font-semibold">Presiona para subir un archivo</span> o arrastra y sueltalo</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-300">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>

                                <input id="dropzone-file" onChange={(e) => {
                                    console.log(e.target.files[''])
                                    setFoto(e.target.files[0].name)
                                    setFotoUri(e.target.files[0])
                                }} type="file" className="hidden" />
                            </label>
                        </div>
                        : <div className='flex rounded justify-center flex-col  mb-1 items-center  h-[25vh] w-[90%] bg-gray-200'>
                            <p>{foto}</p>
                            <button
                                onClick={() => {
                                    setFoto("")
                                }}
                                className='bg-teal-300 w-2/4 rounded-lg h-[10%] hover:bg-red-600  hover:text-white active:bg-blue-600'>Eliminar foto</button>
                        </div>
                    }
                    <div className='flex justify-center items-center h-[10vh] border-t-2 w-[90%] '>

                        <button
                            type="button"
                            className="inline-flex w-[70%] justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:ml-3 sm:text-sm"
                            onClick={() => {
                                addPropiedad()
                                // uploadImage()
                                // setOpen(true)
                            }}
                        >
                            Guardar
                        </button>
                    </div>
                </div>



                <div className='w-1/2 h-full flex flex-col border-l-2   justify-start items-center '>
                    <p className="flex my-4 text-xl">
                        Contrato
                    </p>
                    <div className="mb-1 w-[90%] flex justify-around flex-row">
                        <div className='w-1/2 h-[10vh] flex flex-col justify-center items-start'>
                            <p>Arrendatario</p>
                            <input className="appearance-none outline-pink-400 border h-[40%] rounded-sm w-[90%] py-2 px-3 text-grey-darker" id="username" type="text"
                                placeholder="Arrendatario" />
                        </div>
                        <div className='w-1/2 h-[10vh] flex flex-col justify-center items-start'>
                            <p>Rut arrendatario</p>
                            <input className="appearance-none outline-pink-400 border h-[40%] rounded-sm w-[90%] py-2 px-3 text-grey-darker" id="username" type="text"
                                placeholder="Rut arrendatario" />
                        </div>
                    </div>
                    <div className="mb-3 w-[90%] flex flex-col justify-center items-start">
                        <p>Fecha de nacimiento</p>
                        <input
                            value={fechaNacArrendatario} onChange={text => { setFechaNacArrendatario(text.target.value) }}
                            className="appearance-none outline-pink-400 border h-[90%] rounded-sm w-[95%] py-2 px-3 text-grey-darker" id="username" type="date"
                            placeholder="Inicio de contrato" />
                    </div>
                    <div className="mb-1 w-[90%] flex justify-around flex-row">
                        <div className='w-1/2 h-[10vh] flex flex-col justify-center items-start'>
                            <p>Correo</p>
                            <input
                                value={correo} onChange={text => { setCorreo(text.target.value) }}
                                className="appearance-none outline-pink-400 border h-[40%] rounded-sm w-[90%] py-2 px-3 text-grey-darker" id="username" type="text"
                                placeholder="Correo" />
                        </div>
                        <div className='w-1/2 h-[10vh] flex flex-col justify-center items-start'>
                            <p>Telefono</p>
                            <input
                                value={telefono}
                                onChange={text => setTelefono(text.target.value)}
                                className="appearance-none outline-pink-400 border h-[40%] rounded-sm w-[90%] py-2 px-3 text-grey-darker" id="username" type="Number"
                                placeholder="Telefono" />
                        </div>
                    </div>
                    <div className="mb-4 w-[90%] flex flex-col justify-center items-start">
                        <p>Inicio de contrato</p>
                        <input className="appearance-none outline-pink-400 border h-[90%] rounded-sm w-[95%] py-2 px-3 text-grey-darker" id="username" type="date"
                            placeholder="Inicio de contrato" />
                    </div>
                    <div className="mb-20 w-[90%] flex flex-col justify-center items-start">
                        <p>Termino de contrato</p>
                        <input className="appearance-none outline-pink-400 border h-[90%] rounded-sm w-[95%] py-2 px-3 text-grey-darker" id="username" type="date"
                            placeholder="Termino de contrato" />
                    </div>

                    <div className='flex justify-center items-center h-[10vh] border-t-2 w-[90%] '>

                        <button
                            type="button"
                            className="inline-flex w-[70%] justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:ml-3 sm:text-sm"
                            onClick={() => {
                                // createPropiedad()
                                uploadImage()
                                // setOpen(true)
                            }}
                        >
                            Guardar
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}