import { useState, useEffect, useRef } from 'react'
import ModalGuardar from '../components/ModalGuardar'
import { createPropiedad } from '../api/createPropiedad'
import { uploadPropiedadImagen } from '../api/uploadPropiedadImagen'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import ArrendatarioFinder from '../components/ArrendatarioFinder'
import { addLease } from '../api/addLease'
import { addLeaseholder } from '../api/addLeaseholder'



export default function AgregarPropiedad() {

    //* Datos propiedad

    const [id, setId] = useState("")
    const [estacionamiento, setEstacionamiento] = useState(false)
    const [bodega, setBodega] = useState(false)
    const [direccion, setDireccion] = useState("")
    const [baños, setBaños] = useState("")
    const [dormitorios, setDormitorios] = useState("")
    const [foto, setFoto] = useState("")
    const [fotoUri, setFotoUri] = useState("")
    const [nroPiso, setNroPiso] = useState("")

    //* Datos arrendador

    const [arrendador, setArrendador] = useState({
        nombre: "",
        apellido: "",
        rut: "",
        fechaNacArrendador: "",
        correo: "",
        telefono: ""
    })

    //* Datos arrendatario

    const [arrendatario, setArrendatario] = useState({
        nombre: "",
        apellido: "",
        rut: "",
        fechaNacArrendatario: "",
        correo: "",
        telefono: ""
    })

    //* Datos contrato

    const [inicioContrato, setInicioContrato] = useState("")
    const [terminoContrato, setTerminoContrato] = useState("")

    const [arrendadorIncomplete, setArrendadorIncomplete] = useState(false)
    const [arrendatarioIncomplete, setArrendatarioIncomplete] = useState(false)
    const [contratoIncomplete, setContratoIncomplete] = useState(false)

    const [selected, setSelected] = useState("")

    const [monto, setMonto] = useState("")
    const [administracion, setAdministracion] = useState("")
    const [ggcc, setGgcc] = useState("")


    const [tipo, setTipo] = useState("Tipo")

    const [newContrato, setNewContrato] = useState(false)
    const [newArrendatario, setNewArrendatario] = useState(false)

    const [error, setError] = useState(false)

    const bottomRef = useRef(null)
    const inputRef = useRef(null)

    useEffect(() => {
        document.title = 'Agrega una propiedad'
    }, []);

    const uploadImage = async (id) => {

        console.log(fotoUri)
        const form = new FormData();
        form.append("id", id);
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
        if (id.length === 0 || direccion.length === 0 || monto.length === 0 || administracion.length === 0 || tipo === "Tipo") {
            setError(true)
            inputRef.current?.scrollIntoView({ behavior: 'smooth' })
        } else {
            //* Se revisa si el objeto de arrendador tiene algun campo sin completar
            let contArrendador = 0
            for (var key in arrendador) {
                if (arrendador[key] === "") {
                    contArrendador += 1
                }
            }

            if (contArrendador > 0 && contArrendador < 6) {
                //* Se ingreso un dato, pero los demas estan vacios
                setArrendadorIncomplete(true)
            }
            else if (contArrendador === 0 || contArrendador === 6) {
                //* Bien hecho, llenaste todos los campos o no llenaste ninguno wtff
                setArrendadorIncomplete(false)
                var objContrato = {}
                var contArrendatario = 0
                var objHolder = {}
                if (newContrato === true) {
                    if (inicioContrato !== "" && terminoContrato !== "") {
                        //* El contrato tiene los datos bien
                        console.log("El contrato tiene los datos bien")
                        let init = new Date(inicioContrato)
                        let endy = new Date(terminoContrato)
                        objContrato.initial_date = init.toISOString()
                        objContrato.end_date = endy.toISOString()
                        console.log(objContrato)
                    } else {
                        //*El contrato tiene los datos incompletos
                        console.log("El contrato no tiene los datos buenos")
                        setContratoIncomplete(true)
                    }

                    if (newArrendatario === true) {
                        //*El contrato esta abierto 
                        console.log("ES CON ARRENDATARIO NUEVO PARGELA")
                        for (var key in arrendatario) {
                            if (arrendatario[key] === "") {
                                contArrendatario += 1
                                console.log(arrendatario[key])
                            }
                        }
                        if (contArrendatario !== 0) {
                            //* Arrendatario  incompleto dios mio 
                            setArrendatarioIncomplete(true)
                        } else if (contArrendatario === 0) {
                            //* Se agrega una nuevo arrendatario al objeto
                            objHolder.rut = arrendatario.rut
                            objHolder.name = arrendatario.nombre
                            objHolder.lastname = arrendatario.apellido
                            objHolder.email = arrendatario.correo
                            objHolder.phone = arrendatario.telefono
                            let date = new Date(arrendatario.fechaNacArrendatario)
                            objHolder.birthday = date.toISOString()
                        }
                        console.log(objHolder)
                    } else {
                        //* Se selecciona un arrendatario ya creado
                        console.log("ES CON ARRENDATARIO YA creado")
                        objContrato.leaseholderId = selected.id
                        console.log(objContrato)
                    }

                    console.log("El contrato esta activo god")
                } else if (newContrato === false) {
                    console.log("El contrato no esta activo lolaso")
                }

                let date = new Date(arrendador.fechaNacArrendador)

                //* Objeto para agregar todos los input
                let obj = {}
                //* Objeto limpio de inputs vacios
                let objClean = {}

                //* Se agregan todos los inputs al objeto (obj)
                obj.property_id = id
                obj.address = direccion
                obj.amount_lease = Number(monto)
                obj.amount_adm = Number(administracion)
                obj.type_property = tipo
                obj.rut = arrendador.rut
                obj.name = arrendador.nombre
                obj.lastname = arrendador.apellido
                obj.email = arrendador.correo
                obj.phone = arrendador.telefono
                obj.bedrooms = dormitorios
                obj.bathrooms = baños
                obj.floor = nroPiso
                obj.cellar = bodega
                obj.parking = estacionamiento

                if (arrendador.fechaNacArrendador !== "") {
                    obj.birthday = date.toISOString()
                }

                //* Se agregan los datos no vacios al objClean
                for (const property in obj) {
                    let prop = String(`${obj[property]}`)
                    let propName = `${property}`
                    if (prop.length !== 0) {
                        let isnum = /^\d+$/.test(prop);
                        // console.log(propName, prop, isnum)
                        if (isnum === true && propName !== 'property_id') {
                            objClean[propName] = Number(prop)
                        } else {
                            if (prop === 'true') {
                                objClean[propName] = true
                            } else if (prop === 'false') {
                                objClean[propName] = false
                            } else {
                                objClean[propName] = prop
                            }
                        }

                    }
                }

                objClean.type_property = tipo


                console.log("Propiedad: ", objClean)
                console.log("Leaseholder: ", objHolder)


                //* Se crea la propiedad
                const respProp = await createPropiedad(objClean)

                console.log(respProp)
                uploadImage(respProp.data.property.id)
                console.log(respProp.data.property.id)

                var respHolder

                if (newArrendatario === true && contArrendatario === 0) {
                    // objHolder.name = objContrato.name
                    // objHolder.lastname = objContrato.lastname
                    // objHolder.rut = objContrato.rut
                    // objHolder.phone = objContrato.phone
                    // objHolder.email = objContrato.email
                    // objHolder.birthday = objContrato.birthday

                    respHolder = await addLeaseholder(objHolder)
                    console.log(respHolder)
                    objContrato.propertyId = respHolder.data.leaseholder.id
                }

                //* Se crea el contrato
                const respLease = await addLease(objContrato)
                console.log(respLease)

                // if (newArrendatario === true && contArrendatario === 0) {
                //     // objHolder.name = objContrato.name
                //     // objHolder.lastname = objContrato.lastname
                //     // objHolder.rut = objContrato.rut
                //     // objHolder.phone = objContrato.phone
                //     // objHolder.email = objContrato.email
                //     // objHolder.birthday = objContrato.birthday


                //     objContrato.propertyId = respHolder.data.leaseholder.id
                // } else {
                //     //* Se agrega el id de la propiedad creada al objeto de contrato
                //     objContrato.propertyId = respProp.data.property.id
                // }
                // console.log("Contrato: ", objContrato)


            }
        }


    }

    useEffect(() => {
        if (newContrato === true) {
            console.log(newContrato, "Arrendatario")
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [newContrato])



    const [open, setOpen] = useState(false)

    return (
        <div className='w-screen flex  justify-center items-center bg-white'>
            <div className={`w-[100vw] sm:w-[100vw] md:w-[100vw] lg:w-[60vw] xl:w-[55vw] shadow-lg 
            ${newContrato ? "h-[230.5vh]" : "h-[160.5vh]"}
            p-6 flex items-center`}>


                {open === true ?
                    <ModalGuardar open={open} setOpen={setOpen} /> : <></>
                }
                <div className='w-full h-full flex flex-col justify-start items-center 
                 sm:px-4 md:px-20 lg:px-6 xl:px-32
              '>
                    <p ref={inputRef} className="flex mb-[7.3vh] mt-4 text-xl">
                        Datos de la propiedad
                    </p>
                    <div className="mb-1 w-[90%] flex flex-col justify-center items-start">
                        <input
                            value={id} onChange={text => { setId(text.target.value) }}
                            className={`bg-gray-100 appearance-none
                            ${error && id.length <= 0 && " outline outline-2 outline-red-300"}

                            border h-[4vh]  rounded-sm w-[95%] py-2 px-3 text-grey-darker`}
                            id="username" type="text"
                            placeholder="Id*" />
                    </div>
                    <div className="mb-1 w-[90%] flex flex-col justify-center items-start py-2">
                        <input
                            value={direccion} onChange={text => { setDireccion(text.target.value) }}
                            className={`bg-gray-100 appearance-none h-[4vh] border  
                             ${error && direccion.length <= 0 && " outline outline-2 outline-red-300"}
                             rounded-sm w-[95%] py-2 px-3 text-grey-darke`} id="username" type="text"
                            placeholder="Direccion*" />
                    </div>
                    <div className="mb-1 w-[90%] flex flex-col justify-center items-start">
                        <p className='font-medium'>Tipo</p>
                        <select
                            onChange={e => {
                                console.log(e.target.value)
                                setTipo(e.target.value)
                            }}
                            className={`bg-gray-100 appearance-none  border  h-[4vh]  rounded-sm w-[95%]  px-3 text-grey-darker
                            ${error && tipo === 'Tipo' && " outline outline-2 outline-red-300"}`}>
                            <option value="Tipo">Tipo</option>
                            <option value="Casa">Casa</option>
                            <option value="Depto">Depto</option>
                            <option value="Oficina">Oficina</option>
                        </select>
                    </div>
                    <div className="mb-1 w-[90%] flex flex-col justify-center items-start py-2">
                        <input
                            value={nroPiso}
                            onChange={e => {
                                setNroPiso(Number(e.target.value))
                            }}
                            className={`bg-gray-100 appearance-none border  h-[4vh]  rounded-sm w-[95%] py-2 px-3 text-grey-darker`} id="username" type="number"
                            placeholder="Nro piso" />
                    </div>
                    <div className="py-2 w-[90%]">
                        <label htmlFor="teal-toggle" className="inline-flex relative items-center mr-5 cursor-pointer">
                            <input type="checkbox" value="" id="teal-toggle" className="sr-only peer"
                                checked={estacionamiento} onChange={(e) => {
                                    setEstacionamiento(e.target.checked)
                                }} />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700  peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#FF6F00]"></div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-900">Estacionamiento</span>
                        </label>
                        <label htmlFor="d-toggle" className="inline-flex relative items-center mr-5 cursor-pointer">
                            <input type="checkbox" value="" id="d-toggle" className="sr-only peer"
                                checked={bodega} onChange={(e) => { setBodega(e.target.checked) }} />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700  peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#FF6F00]"></div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-900">Bodega</span>
                        </label>
                    </div>
                    <div className="w-[90%] mb-3 flex justify-around flex-row">
                        <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                            <input
                                value={baños} onChange={text => setBaños(text.target.value)}
                                className={`appearance-none bg-gray-100 
                                border  h-[4vh]  rounded-sm w-[90%] px-3 text-grey-darker`} id="username" type="number" min={0}
                                placeholder="Baños" />
                        </div>
                        <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                            <input
                                value={dormitorios} onChange={text => setDormitorios(text.target.value)}
                                className={`appearance-none bg-gray-100 
                                border h-[4vh] rounded-sm w-[90%] px-3 text-grey-darker`} id="username" type="number" min={0}
                                placeholder="Dormitorios" />
                        </div>
                    </div>
                    <div className="mb-3 w-[90%] flex flex-col justify-center items-start">
                        <input
                            value={monto} onChange={text => { setMonto(text.target.value) }}
                            className={`appearance-none bg-gray-100
                            ${error && monto.length <= 0 && " outline outline-2 outline-red-300"}
                            border  h-[4vh] rounded-sm w-[95%] py-2 px-3 text-grey-darker`} id="username" type="text"
                            placeholder="Monto*" />
                    </div>
                    <div className="mb-3 w-[90%] flex flex-col justify-center items-start">
                        <input
                            value={administracion} onChange={text => { setAdministracion(text.target.value) }}
                            className={`appearance-none bg-gray-100 
                            ${error && administracion.length <= 0 && " outline outline-2 outline-red-300"}
                            border  h-[4vh]  rounded-sm w-[95%] py-2 px-3 text-grey-darker`} id="username" type="text"
                            placeholder="Comision por administracion*" />
                    </div>
                    <div className="mb-3 w-[90%] flex flex-col justify-center items-start">
                        <input
                            value={ggcc} onChange={text => setGgcc(text.target.value)}
                            className={`appearance-none bg-gray-100 
                        border h-[4vh] rounded-sm w-[95%] py-2 px-3 text-grey-darker`} id="username" type="text"
                            placeholder="Gastos comunes" />
                    </div>
                    <b className='mb-3'>Datos Arrendador</b>
                    <div className="mb-3 w-[90%] flex justify-around flex-row">
                        <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                            <input
                                value={arrendador.nombre} onChange={text => setArrendador({ ...arrendador, nombre: text.target.value })}
                                className={`appearance-none bg-gray-100  
                                border h-[4vh] rounded-sm w-[90%] py-2 px-3 text-grey-darker
                                ${arrendadorIncomplete && arrendador.nombre.length <= 0 && " outline outline-2 outline-red-300"}
                                `} id="username" type="text"
                                placeholder="Nombre" />
                        </div>
                        <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                            <input
                                value={arrendador.apellido} onChange={text => setArrendador({ ...arrendador, apellido: text.target.value })}
                                className={`appearance-none bg-gray-100
                                border h-[4vh] rounded-sm w-[90%] py-2 px-3 text-grey-darker
                                ${arrendadorIncomplete && arrendador.apellido.length <= 0 && " outline outline-2 outline-red-300"}`} id="username" type="text"
                                placeholder="Apellido" />
                        </div>
                    </div>
                    <div className="mb-3 w-[90%] flex flex-col justify-center items-start">
                        <input
                            value={arrendador.rut} onChange={text => { setArrendador({ ...arrendador, rut: text.target.value }) }}
                            className={`appearance-none bg-gray-100 
                            border h-[4vh] rounded-sm w-[95%] py-2 px-3 text-grey-darker
                            ${arrendadorIncomplete && arrendador.rut.length <= 0 && " outline outline-2 outline-red-300"}`} id="username" type="text"
                            placeholder="Rut" />
                    </div>
                    <div className="mb-3 w-[90%] flex flex-col justify-center items-start">
                        <p className='font-medium'>Fecha de nacimiento</p>
                        <input
                            value={arrendador.fechaNacArrendador} onChange={text => { setArrendador({ ...arrendador, fechaNacArrendador: text.target.value }) }}
                            className={`appearance-none bg-gray-100 
                            border h-[4vh] rounded-sm w-[95%]  px-3 text-grey-darker
                            ${arrendadorIncomplete && arrendador.fechaNacArrendador.length <= 0 && " outline outline-2 outline-red-300"}`} id="username" type="date"
                        />
                    </div>

                    <div className="mb-4 w-[90%] flex justify-around flex-row">
                        <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                            <input
                                value={arrendador.correo} onChange={text => { setArrendador({ ...arrendador, correo: text.target.value }) }}
                                className={`appearance-none bg-gray-100 
                                border h-[4vh] rounded-sm w-[90%] py-2 px-3 text-grey-darker
                                ${arrendadorIncomplete && arrendador.correo.length <= 0 && " outline outline-2 outline-red-300"}`} id="username" type="text"
                                placeholder="Correo" />
                        </div>
                        <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                            <input
                                value={arrendador.telefono}
                                onChange={text => setArrendador({ ...arrendador, telefono: text.target.value })}
                                className={`appearance-none bg-gray-100 
                                border h-[4vh] rounded-sm w-[90%] py-2 px-3 text-grey-darker
                                ${arrendadorIncomplete && arrendador.telefono.length <= 0 && " outline outline-2 outline-red-300"}`} id="username" type="Number"
                                placeholder="Teléfono" />
                        </div>
                    </div>
                    <b className='pb-4'> Foto de la propiedad</b>
                    <div className="mb-3 w-[90%] flex flex-col justify-center items-start">
                        {foto === "" ?
                            <div className="flex justify-center items-center mb-1 h-[25vh] w-[95%] ">
                                <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-full bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-100 hover:bg-gray-100 dark:border-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                        <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                        <p className="mb-2 text-sm text-center text-gray-500 dark:text-gray-400"><span className="font-semibold">Presiona para subir un archivo</span></p>
                                        <p className="text-xs text-gray-500 dark:text-gray-300">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input id="dropzone-file" onChange={(e) => {
                                        setFoto(e.target.files[0].name)
                                        setFotoUri(e.target.files[0])
                                        let fileImg = e.target.files[0]
                                        console.log(fileImg)
                                    }} type="file" className="hidden" />
                                </label>
                            </div>
                            : <div className='flex rounded justify-center flex-col  mb-1 items-center  h-[25vh] w-[95%] bg-gray-200'>
                                <p>{foto}</p>
                                <button
                                    onClick={() => {
                                        setFoto("")
                                    }}
                                    className='bg-teal-300 w-2/4 rounded-lg h-[10%] hover:bg-red-600  hover:text-white active:bg-blue-600'>Eliminar foto</button>
                            </div>
                        }

                    </div>
                    {/* Agregar contrato  */}

                    <div className='w-[90%] h-auto mt-5 flex flex-col items-start justify-center'>
                        <button onClick={() => {
                            setNewContrato(!newContrato)
                            setNewArrendatario(false)
                        }}
                            className='flex justify-between px-4 items-center w-[95%] h-[5vh] bg-gray-100 
                        hover:bg-gray-200
                        '>
                            <span className='font-bold'>
                                Agregar contrato
                            </span>
                            <span className='text-2xl'>
                                <FontAwesomeIcon icon={faCirclePlus} />
                            </span>
                        </button>
                        {newContrato == true &&

                            <div ref={bottomRef} className='flex justify-between shadow-md items-center w-[95%] h-auto  '>
                                <div className='w-full h-full flex flex-col justify-start items-center '>
                                    <p className="flex my-4 text-xl">
                                        Contrato
                                    </p>
                                    <div className="mb-3 w-[85%] flex flex-col justify-center items-start">
                                        <p className='font-medium'>Inicio de contrato</p>
                                        <input
                                            value={inicioContrato}
                                            onChange={e => { setInicioContrato(e.target.value) }}
                                            className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[95%] py-2 px-3 text-grey-darker
                                            ${contratoIncomplete === true && inicioContrato === "" && "outline outline-2 outline-red-300"}`} id="username" type="date"
                                            placeholder="Inicio de contrato" />
                                    </div>
                                    <div className="mb-5 w-[85%] flex flex-col justify-center items-start">
                                        <p className='font-medium'>Termino de contrato</p>
                                        <input
                                            value={terminoContrato}
                                            onChange={e => { setTerminoContrato(e.target.value) }}
                                            className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[95%] py-2 px-3 text-grey-darker
                                            ${contratoIncomplete === true && terminoContrato === "" && "outline outline-2 outline-red-300"}`} id="username" type="date"
                                            placeholder="Termino de contrato" />
                                    </div>

                                    <div
                                        className='flex justify-between  items-center w-[100%] h-[5vh]   bg-gray-100'>
                                        <button className={`h-full w-1/2  flex justify-center items-center
                                       ${newArrendatario === false && 'bg-white'}`}
                                            onClick={() => {
                                                setNewArrendatario(false)
                                                setArrendatarioIncomplete(false)
                                            }}
                                        >
                                            Buscar arrendatario
                                        </button>
                                        <button
                                            onClick={() => { setNewArrendatario(true) }}
                                            className={`h-full w-1/2 bg-slate-50  flex justify-center items-center hover:bg-gray-300
                                            ${newArrendatario === true && 'bg-white'}`}>
                                            Agregar arrendatario
                                        </button>

                                    </div>
                                    <div className='h-auto w-full pt-4'>
                                        {newArrendatario === true ?
                                            <div className='w-full h-full flex flex-col justify-start items-center '>
                                                <b className='mb-3'>Datos Arrendatario</b>
                                                <div className="mb-3 w-[85%] flex justify-around flex-row">
                                                    <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                                                        <input
                                                            value={arrendatario.nombre}
                                                            onChange={text => { setArrendatario({ ...arrendatario, nombre: text.target.value }) }}
                                                            className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[90%] py-2 px-3 text-grey-darker
                                                            ${arrendatarioIncomplete && arrendatario.nombre.length <= 0 && " outline outline-2 outline-red-300"}`}
                                                            id="username" type="text"
                                                            placeholder="Nombre" />
                                                    </div>
                                                    <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                                                        <input
                                                            value={arrendatario.apellido}
                                                            onChange={text => { setArrendatario({ ...arrendatario, apellido: text.target.value }) }}
                                                            className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[90%] py-2 px-3 text-grey-darker
                                                            ${arrendatarioIncomplete && arrendatario.apellido.length <= 0 && " outline outline-2 outline-red-300"}`}
                                                            id="username" type="text"
                                                            placeholder="Apellido" />
                                                    </div>
                                                </div>
                                                <div className="mb-3 w-[85%] flex flex-col justify-center items-start">
                                                    <input
                                                        value={arrendatario.rut}
                                                        onChange={text => { setArrendatario({ ...arrendatario, rut: text.target.value }) }}
                                                        className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[95%] py-2 px-3 text-grey-darker
                                                        ${arrendatarioIncomplete && arrendatario.rut.length <= 0 && " outline outline-2 outline-red-300"}`}
                                                        id="username" type="text"
                                                        placeholder="Rut" />
                                                </div>
                                                <div className="mb-3 w-[85%] flex flex-col justify-center items-start">
                                                    <p className='font-medium'>Fecha de nacimiento</p>
                                                    <input
                                                        value={arrendatario.fechaNacArrendatario}
                                                        onChange={text => { setArrendatario({ ...arrendatario, fechaNacArrendatario: text.target.value }) }}
                                                        className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[95%] py-2 px-3 text-grey-darker
                                                        ${arrendatarioIncomplete && arrendatario.fechaNacArrendatario.length <= 0 && " outline outline-2 outline-red-300"}`}
                                                        id="username" type="date"
                                                        placeholder="Inicio de contrato" />
                                                </div>
                                                <div className="mb-5 w-[85%] flex justify-around flex-row">
                                                    <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                                                        <input
                                                            value={arrendatario.correo}
                                                            onChange={text => { setArrendatario({ ...arrendatario, correo: text.target.value }) }}
                                                            className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[90%] py-2 px-3 text-grey-darker
                                                            ${arrendatarioIncomplete && arrendatario.correo.length <= 0 && " outline outline-2 outline-red-300"}`} id="username" type="text"
                                                            placeholder="Correo" />
                                                    </div>
                                                    <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                                                        <input
                                                            value={arrendatario.telefono}
                                                            onChange={text => { setArrendatario({ ...arrendatario, telefono: text.target.value }) }}
                                                            className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[90%] py-2 px-3 text-grey-darker
                                                            ${arrendatarioIncomplete && arrendatario.telefono.length <= 0 && " outline outline-2 outline-red-300"}`} id="username" type="Number"
                                                            placeholder="Telefono" />
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <ArrendatarioFinder selected={selected} setSelected={setSelected} />
                                        }
                                    </div>
                                </div>
                            </div>

                        }
                    </div>



                    <div className='flex justify-center items-center h-[10vh] w-[85%]'>
                        <button
                            type="button"
                            className="inline-flex w-[70%] justify-center rounded-md border border-transparent bg-[#FF6F00] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-[#3A4348] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:ml-3 sm:text-sm"
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



            </div>
        </div>
    )
}