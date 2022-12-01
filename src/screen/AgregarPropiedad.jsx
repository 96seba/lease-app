import { useState, useEffect, useRef } from 'react'
import ModalGuardar from '../components/ModalGuardar'
import { createPropiedad } from '../api/createPropiedad'
// import { uploadPropiedadImagen } from '../api/uploadPropiedadImagen'
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
    const [selectIncomplete, setSelectIncomplete] = useState(false)

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

    const [rutArrendadorCheck, setRutArrendadorCheck] = useState(false)


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
            //* Minimo un input required esta vacio de la propiedad
            setError(true)
            inputRef.current?.scrollIntoView({ behavior: 'smooth' })
        } else {
            //* Objeto de propiedad
            var objProp = {}
            //* Objeto de propiedad sin propiedades null o ""
            var objPropClean = {}
            //* Objeto de contrato
            var objContrato = {}
            //* Objeto de arrendatario
            var objHolder = {}
            //* Contador de campos nulos del arrendatario 
            var contArrendatario = 0

            //* Se agregan los campos al objPropiedad
            objProp.property_id = id
            objProp.address = direccion
            objProp.amount_lease = Number(monto)
            objProp.amount_adm = Number(administracion)
            objProp.type_property = tipo
            objProp.bedrooms = dormitorios
            objProp.bathrooms = baños
            objProp.floor = nroPiso
            objProp.cellar = bodega
            objProp.parking = estacionamiento
            objProp.type_property = tipo
            let date = new Date(arrendador.fechaNacArrendador)

            if (arrendador.fechaNacArrendador !== "") {
                objProp.birthday = date.toISOString()
            }
            //* Se verifica si el arrendador esta vacio o completo, en el caso de estar completo se agrega al objeto de la propiedad
            let contArrendador = 0
            for (var key in arrendador) {
                if (arrendador[key] === "") {
                    contArrendador += 1
                }
            }

            if (contArrendador > 0 && contArrendador < 6) {
                //* Se ingreso un dato, pero los demas estan vacios
                setArrendadorIncomplete(true)
            } else if (contArrendador === 6) {
                //* El contrato esta vacio
                setArrendadorIncomplete(false)
            }
            else if (contArrendador === 0) {
                //* El contrato esta completo
                setArrendadorIncomplete(false)
                objProp.rut = arrendador.rut
                objProp.name = arrendador.nombre
                objProp.lastname = arrendador.apellido
                objProp.email = arrendador.correo
                objProp.phone = arrendador.telefono
            }

            //* Se agregan los datos no vacios al objPropClean
            for (const property in objProp) {
                let prop = String(`${objProp[property]}`)
                let propName = `${property}`
                if (prop.length !== 0) {
                    let isnum = /^\d+$/.test(prop);
                    // console.log(propName, prop, isnum)
                    if (isnum === true && propName !== 'property_id') {
                        objPropClean[propName] = Number(prop)
                    } else {
                        if (prop === 'true') {
                            objPropClean[propName] = true
                        } else if (prop === 'false') {
                            objPropClean[propName] = false
                        } else {
                            objPropClean[propName] = prop
                        }
                    }
                }
            }

            //* Se comprueba si la propiedad es con contrato o sin contrato
            if (newContrato === true) {
                if (inicioContrato !== "" && terminoContrato !== "") {
                    //* El contrato tiene las fechas completas
                    let init = new Date(inicioContrato)
                    let endy = new Date(terminoContrato)
                    objContrato.initial_date = init.toISOString()
                    objContrato.end_date = endy.toISOString()
                } else {
                    //*El contrato tiene los datos incompletos
                    console.log("El contrato no tiene los datos buenos")
                    setContratoIncomplete(true)
                }
                if (newArrendatario === false) {
                    //* Se selecciona un arrendatario ya creado
                    console.log("ES CON ARRENDATARIO YA creado")
                    // setSelectIncomplete
                    if (selected === "") {
                        setSelectIncomplete(true)
                    } else {
                        objContrato.leaseholderId = selected.id
                    }
                } else {

                    //* El contrato es con arrendatario nuevo
                    for (var key1 in arrendatario) {
                        if (arrendatario[key1] === "") {
                            contArrendatario += 1
                            console.log(arrendatario[key1])
                        }
                    }
                    if (contArrendatario !== 0) {
                        //* Arrendatario  incompleto dios mio 
                        setArrendatarioIncomplete(true)
                    } else if (contArrendatario === 0) {
                        setArrendatarioIncomplete(false)
                        //* Se agrega una nuevo arrendatario al objeto
                        objHolder.rut = arrendatario.rut
                        objHolder.name = arrendatario.nombre
                        objHolder.lastname = arrendatario.apellido
                        objHolder.email = arrendatario.correo
                        objHolder.phone = arrendatario.telefono
                        let date = new Date(arrendatario.fechaNacArrendatario)
                        objHolder.birthday = date.toISOString()
                    }
                }
            }


            //* Ejecucion de fetchs para crear propiedad, uploadImage y leaseholder 
            if (contArrendador === 0 || contArrendador === 6) {
                //* Se crea la propiedad con el objeto limpio de props vacios
                const respProp = await createPropiedad(objPropClean)
                console.log("respProp", respProp)
                //* Se agrega el id de la propiedad al objeto del contrato
                objContrato.propertyId = respProp.data.property.id
                //* Se verifica si se eligio una imagen para la propiedad
                if (fotoUri !== "") {
                    uploadImage(respProp.data.property.id)
                }
                //* Se crea el arrendatario en el caso de que se eliga agregar arrendatario nuevo
                if (newContrato === true) {
                    if (newArrendatario === true) {
                        //* Se crea el arrendatario
                        //* Se agregan los datos del nuevo arrendatario al objeto del contrato
                        objContrato.rut = arrendatario.rut
                        objContrato.name = arrendatario.nombre
                        objContrato.lastname = arrendatario.apellido
                        objContrato.email = arrendatario.correo
                        objContrato.phone = arrendatario.telefono
                        let date = new Date(arrendatario.fechaNacArrendatario)
                        objContrato.birthday = date.toISOString()
                        //* Se crea el contrato
                        if (contArrendatario === 0) {
                            const respLease = await addLease(objContrato)
                            console.log("respLease", respLease)
                        }
                    } else {
                        //* Se agrega el id del leaseHolder seleccionado al objContrato
                        objContrato.leaseholderId = selected.id
                        if (selected.id !== '') {
                            //* Se crea el contrato
                            const respLease = await addLease(objContrato)
                            console.log("respLease", respLease)
                        }
                    }
                }
                // console.log(objContrato)
                // console.log(objPropClean)
                // console.log(objHolder)
            }
        }
    }

    const checkInput = async () => {

        console.log(arrendador.rut)
        const resp = await rutFunction.validaRut(arrendador.rut)
        if (rutFunction.validaRut(arrendador.rut) === false) {
            console.log("RUT NO VALIDO")
            setRutArrendadorCheck(true)
        }
        else {
            console.log("RUT VALIDO")
        }

    }

    const rutFunction = {
        // Valida el rut con su cadena completa "XXXXXXXX-X"
        validaRut: function (rutCompleto) {
            if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
                return false;
            var tmp = rutCompleto.split('-');
            var digv = tmp[1];
            var rut = tmp[0];
            if (digv == 'K') digv = 'k';
            return (rutFunction.dv(rut) == digv);
        },
        dv: function (T) {
            var M = 0, S = 1;
            for (; T; T = Math.floor(T / 10))
                S = (S + T % 10 * (9 - M++ % 6)) % 11;
            return S ? S - 1 : 'k';
        }
    }

    function checkRut(rut) {
        // Despejar Puntos
        let valor = rut.value.replace(".", "");
        // Despejar Guión
        valor = valor.replace('-', '');

        // Aislar Cuerpo y Dígito Verificador
        const cuerpo = valor.slice(0, -1);
        const dv = valor.slice(-1).toUpperCase();

        // Formatear RUN
        rut.value = cuerpo + '-' + dv
        setArrendador({ ...arrendador, rut: cuerpo + '-' + dv })

        // Si no cumple con el mínimo ej. (n.nnn.nnn)
        if (cuerpo.length < 7) { rut.setCustomValidity("RUT Incompleto"); return false; }

        // Calcular Dígito Verificador
        let suma = 0;
        let multiplo = 2;

        // Para cada dígito del Cuerpo
        for (let i = 1; i <= cuerpo.length; i++) {

            // Obtener su Producto con el Múltiplo Correspondiente
            const index = multiplo * valor.charAt(cuerpo.length - i);

            // Sumar al Contador General
            suma = suma + index;

            // Consolidar Múltiplo dentro del rango [2,7]
            if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }

        }

        // Calcular Dígito Verificador en base al Módulo 11
        const dvEsperado = 11 - (suma % 11);

        // Casos Especiales (0 y K)
        dv = (dv == 'K') ? 10 : dv;
        dv = (dv == 0) ? 11 : dv;

        // Validar que el Cuerpo coincide con su Dígito Verificador
        if (dvEsperado != dv) { rut.setCustomValidity("RUT Inválido"); return false; }

        // Si todo sale bien, eliminar errores (decretar que es válido)
        rut.setCustomValidity('');
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
                sm:px-4 md:px-20 lg:px-6 xl:px-32'>
                    <p ref={inputRef} className="flex mb-[7.3vh] mt-4 text-xl">
                        Datos de la propiedad
                    </p>
                    <div className="mb-1 w-[90%] flex flex-col justify-center items-start">
                        <input
                            value={id} onChange={text => {
                                if (text.target.value.length < 10 && text.target.value > 0) {
                                    setId(text.target.value)
                                }
                            }}
                            className={`bg-gray-100 appearance-none
                            ${error && id.length <= 0 && " outline outline-2 outline-red-300"}
                            border h-[4vh]  rounded-sm w-[95%] py-2 px-3 text-grey-darker`}
                            type="number" min={0}
                            placeholder="Id*" />
                    </div>
                    <div className="mb-1 w-[90%] flex flex-col justify-center items-start py-2">
                        <input
                            value={direccion} onChange={text => { setDireccion(text.target.value) }}
                            className={`bg-gray-100 appearance-none h-[4vh] border  
                            ${error && direccion.length <= 0 && " outline outline-2 outline-red-300"}
                            rounded-sm w-[95%] py-2 px-3 text-grey-darke`} type="text"
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
                                if (e.target.value.length < 3 && e.target.value > 0) {
                                    setNroPiso(e.target.value)
                                }
                            }}
                            className={`bg-gray-100 appearance-none border  h-[4vh]  rounded-sm w-[95%] py-2 px-3 text-grey-darker`} type="number" min={0}
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
                                value={baños} onChange={text => {
                                    if (text.target.value.length < 3 && text.target.value > 0) {
                                        setBaños(text.target.value)
                                    }
                                }}
                                className={`appearance-none bg-gray-100 
                                border  h-[4vh]  rounded-sm w-[90%] px-3 text-grey-darker`} type="number" min={0}
                                placeholder="Baños" />
                        </div>
                        <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                            <input
                                value={dormitorios} onChange={text => {
                                    if (text.target.value.length < 3 && text.target.value > 0) {
                                        setDormitorios(text.target.value)
                                    }
                                }}
                                className={`appearance-none bg-gray-100 
                                border h-[4vh] rounded-sm w-[90%] px-3 text-grey-darker`} type="number" min={0}
                                placeholder="Dormitorios" />
                        </div>
                    </div>
                    <div className="mb-3 w-[90%] flex flex-col justify-center items-start">
                        <input
                            value={monto} onChange={text => {
                                if (text.target.value > 0) {
                                    setMonto(text.target.value)
                                }
                            }}
                            className={`appearance-none bg-gray-100
                            ${error && monto.length <= 0 && " outline outline-2 outline-red-300"}
                            border  h-[4vh] rounded-sm w-[95%] py-2 px-3 text-grey-darker`} type="number"
                            placeholder="Monto*" />
                    </div>
                    <div className="mb-3 w-[90%] flex flex-col justify-center items-start">
                        <input
                            value={administracion} onChange={text => {
                                if (text.target.value > 0) {
                                    setAdministracion(text.target.value)
                                }
                            }
                            }
                            className={`appearance-none bg-gray-100 
                            ${error && administracion.length <= 0 && " outline outline-2 outline-red-300"}
                            border  h-[4vh]  rounded-sm w-[95%] py-2 px-3 text-grey-darker`} type="number"
                            placeholder="Comision por administracion*" />
                    </div>
                    <div className="mb-3 w-[90%] flex flex-col justify-center items-start">
                        <input
                            value={ggcc} onChange={text => {
                                if (text.target.value > 0) {
                                    setGgcc(text.target.value)
                                }
                            }}
                            className={`appearance-none bg-gray-100 
                        border h-[4vh] rounded-sm w-[95%] py-2 px-3 text-grey-darker`} type="number"
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
                                `} type="text"
                                placeholder="Nombre" />
                        </div>
                        <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                            <input
                                value={arrendador.apellido} onChange={text => setArrendador({ ...arrendador, apellido: text.target.value })}
                                className={`appearance-none bg-gray-100
                                border h-[4vh] rounded-sm w-[90%] py-2 px-3 text-grey-darker
                                ${arrendadorIncomplete && arrendador.apellido.length <= 0 && " outline outline-2 outline-red-300"}`} type="text"
                                placeholder="Apellido" />
                        </div>
                    </div>
                    <div className="mb-3 w-[90%] flex flex-col justify-center items-start">
                        <input
                            value={arrendador.rut} onChange={text => {
                                // setArrendador({ ...arrendador, rut: text.target.value })
                                checkRut(text.target.value)
                            }}
                            className={`appearance-none bg-gray-100 
                            border h-[4vh] rounded-sm w-[95%] py-2 px-3 text-grey-darker
                            ${arrendadorIncomplete && arrendador.rut.length <= 0 && " outline outline-2 outline-red-300"}
                            ${rutArrendadorCheck === true && 'outline outline-2 outline-red-300'}
                            ${rutArrendadorCheck === false && 'outline outline-2 outline-red-600'}`} type="text"
                            placeholder="Rut (*Sin puntos y con guión)" />
                    </div>
                    <div className="mb-3 w-[90%] flex flex-col justify-center items-start">
                        <p className='font-medium'>Fecha de nacimiento</p>
                        <input
                            value={arrendador.fechaNacArrendador} onChange={text => { setArrendador({ ...arrendador, fechaNacArrendador: text.target.value }) }}
                            className={`appearance-none bg-gray-100 
                            border h-[4vh] rounded-sm w-[95%]  px-3 text-grey-darker
                            ${arrendadorIncomplete && arrendador.fechaNacArrendador.length <= 0 && " outline outline-2 outline-red-300"}`} type="date"
                        />
                    </div>

                    <div className="mb-4 w-[90%] flex justify-around flex-row">
                        <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                            <input
                                value={arrendador.correo} onChange={text => { setArrendador({ ...arrendador, correo: text.target.value }) }}
                                className={`appearance-none bg-gray-100 
                                border h-[4vh] rounded-sm w-[90%] py-2 px-3 text-grey-darker
                                ${arrendadorIncomplete && arrendador.correo.length <= 0 && " outline outline-2 outline-red-300"}`} type="email"
                                placeholder="Correo" />
                        </div>
                        <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                            <input
                                value={arrendador.telefono}
                                onChange={text => setArrendador({ ...arrendador, telefono: text.target.value })}
                                className={`appearance-none bg-gray-100 
                                border h-[4vh] rounded-sm w-[90%] py-2 px-3 text-grey-darker
                                ${arrendadorIncomplete && arrendador.telefono.length <= 0 && " outline outline-2 outline-red-300"}`} type="number"
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
                        {newContrato === true &&

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
                                            ${contratoIncomplete === true && inicioContrato === "" && "outline outline-2 outline-red-300"}`} type="date"
                                            placeholder="Inicio de contrato" />
                                    </div>
                                    <div className="mb-5 w-[85%] flex flex-col justify-center items-start">
                                        <p className='font-medium'>Termino de contrato</p>
                                        <input
                                            value={terminoContrato}
                                            onChange={e => { setTerminoContrato(e.target.value) }}
                                            className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[95%] py-2 px-3 text-grey-darker
                                            ${contratoIncomplete === true && terminoContrato === "" && "outline outline-2 outline-red-300"}`} type="date"
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
                                            onClick={() => {
                                                setSelected("")
                                                setNewArrendatario(true)
                                            }}
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
                                                            type="text"
                                                            placeholder="Nombre" />
                                                    </div>
                                                    <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                                                        <input
                                                            value={arrendatario.apellido}
                                                            onChange={text => { setArrendatario({ ...arrendatario, apellido: text.target.value }) }}
                                                            className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[90%] py-2 px-3 text-grey-darker
                                                            ${arrendatarioIncomplete && arrendatario.apellido.length <= 0 && " outline outline-2 outline-red-300"}`}
                                                            type="text"
                                                            placeholder="Apellido" />
                                                    </div>
                                                </div>
                                                <div className="mb-3 w-[85%] flex flex-col justify-center items-start">
                                                    <input
                                                        value={arrendatario.rut}
                                                        onChange={text => { setArrendatario({ ...arrendatario, rut: text.target.value }) }}
                                                        className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[95%] py-2 px-3 text-grey-darker
                                                        ${arrendatarioIncomplete && arrendatario.rut.length <= 0 && " outline outline-2 outline-red-300"}`}
                                                        type="text"
                                                        placeholder="Rut" />
                                                </div>
                                                <div className="mb-3 w-[85%] flex flex-col justify-center items-start">
                                                    <p className='font-medium'>Fecha de nacimiento</p>
                                                    <input
                                                        value={arrendatario.fechaNacArrendatario}
                                                        onChange={text => { setArrendatario({ ...arrendatario, fechaNacArrendatario: text.target.value }) }}
                                                        className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[95%] py-2 px-3 text-grey-darker
                                                        ${arrendatarioIncomplete && arrendatario.fechaNacArrendatario.length <= 0 && " outline outline-2 outline-red-300"}`}
                                                        type="date"
                                                        placeholder="Inicio de contrato" />
                                                </div>
                                                <div className="mb-5 w-[85%] flex justify-around flex-row">
                                                    <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                                                        <input
                                                            value={arrendatario.correo}
                                                            onChange={text => { setArrendatario({ ...arrendatario, correo: text.target.value }) }}
                                                            className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[90%] py-2 px-3 text-grey-darker
                                                            ${arrendatarioIncomplete && arrendatario.correo.length <= 0 && " outline outline-2 outline-red-300"}`} type="text"
                                                            placeholder="Correo" />
                                                    </div>
                                                    <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                                                        <input
                                                            value={arrendatario.telefono}
                                                            onChange={text => { setArrendatario({ ...arrendatario, telefono: text.target.value }) }}
                                                            className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[90%] py-2 px-3 text-grey-darker
                                                            ${arrendatarioIncomplete && arrendatario.telefono.length <= 0 && " outline outline-2 outline-red-300"}`} type="Number"
                                                            placeholder="Telefono" />
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <ArrendatarioFinder selected={selected} setSelected={setSelected}
                                                selectIncomplete={selectIncomplete} setSelectIncomplete={setSelectIncomplete} />
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
                                // addPropiedad()
                                // uploadImage()
                                // setOpen(true)
                                checkInput()
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