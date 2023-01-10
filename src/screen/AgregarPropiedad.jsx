import { useState, useEffect, useRef } from 'react'
import ModalGuardar from '../components/ModalGuardar'
import { createPropiedad } from '../api/createPropiedad'
import { uploadPropiedadImagen } from '../api/uploadPropiedadImagen'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import ArrendatarioFinder from '../components/ArrendatarioFinder'
import DuenoFinder from '../components/DuenoFinder'
import { addLease } from '../api/addLease'
import { useNavigate } from "react-router-dom"
import { getLeaseholder } from '../api/getLeaseholder'



export default function AgregarPropiedad() {

    let navigate = useNavigate()

    //* Datos propiedad

    const [id, setId] = useState("")
    const [estacionamiento, setEstacionamiento] = useState("")
    const [bodega, setBodega] = useState("")
    const [direccion, setDireccion] = useState("")
    const [baños, setBaños] = useState("")
    const [dormitorios, setDormitorios] = useState("")
    const [foto, setFoto] = useState("")
    const [fotoUri, setFotoUri] = useState("")
    const [nroPiso, setNroPiso] = useState("")

    //* Datos Dueño

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
    const [newDueno, setNewDueno] = useState(true)
    const [newDuenoError, setNewDuenoError] = useState(false)

    const [error, setError] = useState(false)

    const bottomRef = useRef(null)
    const inputRef = useRef(null)
    const newDuenoRef = useRef(null)

    const [rutArrendadorCheck, setRutArrendadorCheck] = useState(false)

    const [rutArrendatarioCheck, setRutArrendatarioCheck] = useState(false)

    const [emailArrendadorCheck, setEmailArrendadorCheck] = useState(false)

    const [emailArrendatarioCheck, setEmailArrendatarioCheck] = useState(false)

    const [fechaContratoError, setFechaContratoError] = useState(false)

    const [leaseholders, setLeaseholders] = useState([])

    const [agua, setAgua] = useState({
        codigo: "",
        compañia: ""
    })

    const [gas, setGas] = useState({
        codigo: "",
        compañia: ""
    })

    const [luz, setLuz] = useState({
        codigo: "",
        compañia: ""
    })



    useEffect(() => {
        document.title = 'Agrega una propiedad'
        const getArrendatarios = async () => {
            let resp = await getLeaseholder()
            setLeaseholders(resp.data.leaseholder)
        }
        getArrendatarios()
    }, []);

    const uploadImage = async (id) => {

        console.log(fotoUri)
        const form = new FormData();
        form.append("id", Number(id));
        form.append("image", fotoUri);

        let resp = await uploadPropiedadImagen(form)
        console.log(resp)

    }

    const validarPasoUno = () => {

        if (id.length === 0 || direccion.length === 0 || monto.length === 0 ||
            administracion.length === 0 || tipo === "Tipo") {
            //* Minimo un input required esta vacio de la propiedad
            setError(true)
            // inputRef.current?.scrollIntoView({ behavior: 'smooth' })
        } else {
            setPasosForm(1)
            setError(false)
        }

    }

    const validarPasoTres = () => {

        if (newDueno === false) {
            setNewDuenoError(true)
            return
        }
        if (arrendador.nombre === "" || arrendador.apellido === "" || arrendador.correo === "" ||
            arrendador.fechaNacArrendador === "" || arrendador.rut.length === 0 ||
            arrendador.telefono === "") {
            //* Minimo un input required esta vacio de la propiedad
            setError(true)
            inputRef.current?.scrollIntoView({ behavior: 'smooth' })
        } else {
            setPasosForm(3)
            setError(false)
        }
    }



    const addPropiedad = async () => {
        if (newDueno === false) {
            //* Se debe ingresar un dueño 
            setNewDuenoError(true)
            newDuenoRef.current?.scrollIntoView({ behavior: 'smooth' })

        } else {
            if (selected === '' && newContrato === true && newArrendatario === false) {
                console.log("NO HAY seleccionado")
                return
            }

            if (id.length === 0 || direccion.length === 0 || monto.length === 0 ||
                administracion.length === 0 || tipo === "Tipo" || arrendador.nombre === "" ||
                arrendador.apellido === "" || arrendador.correo === "" ||
                arrendador.fechaNacArrendador === "" || arrendador.rut.length === 0 ||
                arrendador.telefono === "") {
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
                    objProp.rut = String(arrendador.rut).replaceAll(".", "")
                    objProp.name = arrendador.nombre
                    objProp.lastname = arrendador.apellido
                    objProp.email = arrendador.correo
                    objProp.phone = String(arrendador.telefono)
                }

                //* Se agregan los datos no vacios al objPropClean
                for (const property in objProp) {
                    let prop = String(`${objProp[property]}`)
                    let propName = `${property}`
                    if (prop.length !== 0) {
                        let isnum = /^\d+$/.test(prop);
                        // console.log(propName, prop, isnum)
                        if (isnum === true && propName !== 'property_id' && propName !== 'rut' && propName !== 'phone') {
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
                console.log(objPropClean)



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
                        console.log("ES CON ARRENDATARIO YA creado", selected)
                        // setSelectIncomplete
                        if (selected === "") {
                            console.log("selected === ''", selected)
                            setSelectIncomplete(true)
                        } else {
                            console.log("selected !== ''", selected)
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
                            objHolder.rut = (arrendatario.rut)
                            objHolder.name = arrendatario.nombre
                            objHolder.lastname = arrendatario.apellido
                            objHolder.email = arrendatario.correo
                            objHolder.phone = arrendatario.telefono
                            let date = new Date(arrendatario.fechaNacArrendatario)
                            objHolder.birthday = date.toISOString()
                        }
                    }
                }


                //* Objeto de propiedad sin propiedades null o ""
                console.log(objPropClean)
                //* Objeto de contrato
                console.log(objContrato)
                //* Objeto de arrendatario
                console.log(objHolder)
                //* Contador de campos nulos del arrendatario 
                console.log(contArrendatario)

                //* Ejecucion de fetchs para crear propiedad, uploadImage y leaseholder 
                if (contArrendador === 0) {
                    //* El id de compañia va por defecto en developer mode
                    // objPropClean.companyId = 1
                    //* Se crea la propiedad con el objeto limpio de props vacios
                    const respProp = await createPropiedad(objPropClean)
                    console.log("respProp", respProp)
                    if (respProp.status === 200) {
                        navigate("/propiedades")
                    }
                    //* Se agrega el id de la propiedad al objeto del contrato
                    objContrato.propertyId = respProp.data.property.id
                    //* Se verifica si se eligio una imagen para la propiedad
                    if (fotoUri !== "") {
                        uploadImage(respProp.data.property.id)
                    }
                    //* Se crea el arrendatario en el caso de que se eliga agregar arrendatario nuevo
                    if (newContrato === true) {
                        console.log("AGREGA CONTRATO")
                        if (newArrendatario === true) {
                            console.log("NUEVO ARRENDATARIO ES TRUE")
                            //* Se crea el arrendatario
                            //* Se agregan los datos del nuevo arrendatario al objeto del contrato
                            objContrato.rut = String(arrendatario.rut)
                            objContrato.name = arrendatario.nombre
                            objContrato.lastname = arrendatario.apellido
                            objContrato.email = arrendatario.correo
                            objContrato.phone = String(arrendatario.telefono)
                            let date = new Date(arrendatario.fechaNacArrendatario)
                            objContrato.birthday = date.toISOString()

                            console.log(objPropClean)

                            //* Se crea el contrato
                            if (contArrendatario === 0) {
                                console.log(objContrato)
                                console.log("Se crea un arrendatario")
                                const respLease = await addLease(objContrato)
                                console.log("respLease", respLease)
                            }
                        } else {
                            console.log("SE SELECCIONA UN ARRENDATARIO", selected)

                            //* Se agrega el id del leaseHolder seleccionado al objContrato
                            objContrato.leaseholderId = selected.id
                            if (selected.id !== '') {
                                console.log("es el arrendatario seleccionado", selected)
                                //* Se crea el contrato
                                console.log(selected.id)
                                console.log(objContrato)
                                console.log("Se selecciona el arrendatario")
                                const respLease = await addLease(objContrato)
                                console.log("respLease", respLease)

                            } else {

                            }
                        }
                    }

                    // console.log(objHolder)
                }
            }
        }
    }

    const checkInput = () => {

        if (inicioContrato === "" && terminoContrato === "" && arrendatario.nombre.length === 0 && arrendatario.apellido.length === 0 && arrendatario.correo.length === 0 &&
            arrendatario.fechaNacArrendatario.length === 0 && arrendatario.rut.length === 0 && arrendatario.telefono.length === 0 && selected.length === 0) {
            console.log("Esta todo incompleto asi que sera sin contrato")
            setNewContrato(false)
            addPropiedad()
        } else {
            setError(false)
            setNewContrato(true)
            if (newArrendatario === false) {
                if (selected === "") {
                    setSelectIncomplete(true)
                } else {
                    addPropiedad()
                }
                console.log("Es con arrendatario ya creado")
                console.log(selected)
            } else {
                console.log("Es con arrendatario nuevo")
                if (arrendatario.nombre.length === 0 || arrendatario.apellido.length === 0 || arrendatario.correo.length === 0 ||
                    arrendatario.fechaNacArrendatario.length === 0 || arrendatario.rut.length === 0 || arrendatario.telefono.length === 0 ||
                    inicioContrato.length === 0 || terminoContrato.length === 0) {
                    console.log("ESTAN VACIOS")
                    setError(true)
                    return
                } else {
                    console.log("TODO BIEN PARGELIN")
                    setNewContrato(true)
                    // addPropiedad()
                }
            }
        }



        // console.log("SE EJECUTA ADDPROPIEDAD")
        //  addPropiedad()
    }

    const checkInputRut = {
        // Valida el rut con su cadena completa "XXXXXXXX-X"
        validaRut: function (rutCompleto) {
            rutCompleto = rutCompleto.replace("‐", "-");
            if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
                return false;
            var tmp = rutCompleto.split('-');
            var digv = tmp[1];
            var rut = tmp[0];
            if (digv == 'K') digv = 'k';

            return (checkInputRut.dv(rut) == digv);
        },
        dv: function (T) {
            var M = 0, S = 1;
            for (; T; T = Math.floor(T / 10))
                S = (S + T % 10 * (9 - M++ % 6)) % 11;
            return S ? S - 1 : 'k';
        }
    }


    useEffect(() => {
        if (newContrato === true) {
            console.log(newContrato, "Arrendatario")
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [newContrato])


    function checkRut(rut) {

        var actual = rut.replace(/^0+/, "");
        if (actual !== '' && actual.length > 1) {
            var sinPuntos = actual.replace(/\./g, "");
            var actualLimpio = sinPuntos.replace(/-/g, "");
            var inicio = actualLimpio.substring(0, actualLimpio.length - 1);
            var rutPuntos = "";
            var i = 0;
            var j = 1;
            for (i = inicio.length - 1; i >= 0; i--) {
                var letra = inicio.charAt(i);
                rutPuntos = letra + rutPuntos;
                if (j % 3 === 0 && j <= inicio.length - 1) {
                    rutPuntos = "." + rutPuntos;
                }
                j++;
            }
            var dv = actualLimpio.substring(actualLimpio.length - 1);
            rutPuntos = rutPuntos + "-" + dv;
        }
        return rutPuntos;
    }


    const [open, setOpen] = useState(false)

    const [pasosForm, setPasosForm] = useState(0)


    const renderPasosForm = () => {

        if (pasosForm === 0) {
            return (
                <>
                    <div className='w-full h-[90%] mt-5 flex justify-start items-center flex-col '>
                        <div className='flex items-start justify-start w-[90%]'>
                            <b className="flex mb-[3vh] text-[18px]">
                                Datos de la propiedad
                            </b>
                        </div>
                        <div className="w-[90%] mb-3 flex justify-around flex-row gap-3">
                            <div className='w-1/4 h-[4vh] flex flex-col justify-center items-start'>
                                <input
                                    value={id} onChange={text => {
                                        if (text.target.value.length < 10 && text.target.value >= 0) {
                                            setId(text.target.value)
                                        }
                                    }}
                                    className={`bg-gray-100 appearance-none
                ${error && id.length <= 0 && " outline outline-2 outline-red-300"}
                border h-[4vh]  rounded-sm w-[100%] py-2 px-3 text-grey-darker`} min={0}
                                    placeholder="Identificador de propiedad" />
                            </div>
                            <div className='w-2/4 h-[4vh] flex flex-col justify-center items-start'>
                                <input
                                    value={direccion} onChange={text => { setDireccion(text.target.value) }}
                                    className={`bg-gray-100 appearance-none h-[4vh] border  
                ${error && direccion.length <= 0 && " outline outline-2 outline-red-300"}
                rounded-sm w-[100%] py-2 px-3 text-grey-darke`} type="text"
                                    placeholder="Direccion*" />
                            </div>
                            <div className='w-1/4 h-[4vh] flex flex-col justify-center items-start'>
                                <select
                                    defaultValue={tipo}
                                    onChange={e => {
                                        console.log(e.target.value)
                                        setTipo(e.target.value)
                                    }}
                                    className={`bg-gray-100 appearance-none cursor-pointer  border  h-[4vh]  rounded-sm w-[100%] py-0  px-3 text-grey-darker
                ${error && tipo === 'Tipo' && " outline outline-2 outline-red-300"}`}>
                                    <option value={tipo} disabled > Tipo de propiedad* </option>
                                    <option value="CASA">Casa</option>
                                    <option value="DEPARTAMENTO">Depto</option>
                                    <option value="OFICINA">Oficina</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-[90%] mb-3 flex justify-around flex-row gap-3">
                            <div className='w-1/3 h-[4vh] flex flex-col justify-center items-start'>
                                <input
                                    value={nroPiso}
                                    onChange={e => {
                                        if (e.target.value.length < 3 && e.target.value >= 0) {
                                            setNroPiso(e.target.value)
                                        }
                                    }}
                                    className={`bg-gray-100 appearance-none border  h-[4vh]  rounded-sm w-[100%] py-2 px-3 text-grey-darker`}
                                    placeholder="Nro piso" />
                            </div>
                            <div className='w-1/3 h-[4vh] flex flex-col justify-center items-start'>
                                <input
                                    value={baños} onChange={text => {
                                        if (text.target.value.length < 3 && text.target.value >= 0) {
                                            setBaños(text.target.value)
                                        }
                                    }}
                                    className={`appearance-none bg-gray-100 
                    border  h-[4vh]  rounded-sm w-[100%] px-3 text-grey-darker`} min={0}
                                    placeholder="Baños" />
                            </div>
                            <div className='w-1/3 h-[4vh] flex flex-col justify-center items-start'>
                                <input
                                    value={dormitorios} onChange={text => {
                                        if (text.target.value.length < 3 && text.target.value >= 0) {
                                            setDormitorios(text.target.value)
                                        }
                                    }}
                                    className={`appearance-none bg-gray-100 
                    border h-[4vh] rounded-sm w-[100%] px-3 text-grey-darker`} min={0}
                                    placeholder="Dormitorios" />
                            </div>
                        </div>
                        <div className="w-[90%] mb-3 flex justify-around flex-row gap-3">
                            <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                                <input
                                    value={estacionamiento} onChange={text => {
                                        if (text.target.value.length < 3 && text.target.value >= 0) {
                                            setEstacionamiento(text.target.value)
                                        }
                                    }}
                                    className={`appearance-none bg-gray-100 
                    border  h-[4vh]  rounded-sm w-[100%] px-3 text-grey-darker`} min={0}
                                    placeholder="Estacionamiento" />
                            </div>
                            <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                                <input
                                    value={bodega} onChange={text => {
                                        if (text.target.value.length < 3 && text.target.value >= 0) {
                                            setBodega(text.target.value)
                                        }
                                    }}
                                    className={`appearance-none bg-gray-100 
                    border h-[4vh] rounded-sm w-[100%] px-3 text-grey-darker`} min={0}
                                    placeholder="Bodega" />
                            </div>
                        </div>
                        <div className="w-[90%] mb-3 flex justify-around flex-row gap-3">
                            <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                                <input
                                    value={monto} onChange={text => {
                                        if (text.target.value >= 0) {
                                            setMonto(text.target.value)
                                        }
                                    }}
                                    className={`appearance-none bg-gray-100
                ${error && monto.length <= 0 && " outline outline-2 outline-red-300"}
                border  h-[4vh] rounded-sm w-[100%] py-2 px-3 text-grey-darker`}
                                    placeholder="Monto*" />
                            </div>
                            <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                                <input
                                    value={administracion} onChange={text => {
                                        if (text.target.value >= 0) {
                                            setAdministracion(text.target.value)
                                        }
                                    }
                                    }
                                    className={`appearance-none bg-gray-100 
                ${error && administracion.length <= 0 && " outline outline-2 outline-red-300"}
                border  h-[4vh]  rounded-sm w-[100%] py-2 px-3 text-grey-darker`}
                                    placeholder="Comision por administracion*" />
                            </div>
                        </div>
                        <div className='flex items-start justify-start w-[90%] h-auto mt-3'>

                            <b className='pb-4 text-[18px]'> Foto de la propiedad</b>
                        </div>
                        <div className="mb-3 w-[90%] flex flex-col justify-center items-start">
                            {foto === "" ?
                                <div className="flex justify-center items-center mb-1 h-[10vh] w-[100%] ">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-100 hover:bg-gray-100 dark:border-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg aria-hidden="true" className="w-10 h-10 mb-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                            <p className="text-sm text-center text-gray-500 dark:text-gray-400"><span className="font-semibold">Presiona para subir una foto</span></p>
                                        </div>
                                        <input id="dropzone-file" onChange={(e) => {
                                            setFoto(e.target.files[0].name)
                                            setFotoUri(e.target.files[0])
                                            let fileImg = e.target.files[0]
                                            console.log(fileImg)
                                        }} type="file" className="hidden" />
                                    </label>
                                </div>
                                : <div className='flex rounded justify-center flex-col  mb-1 items-center  h-[10vh] w-[100%] bg-gray-200'>
                                    {/* <p>{foto}</p> */}
                                    <button
                                        onClick={() => {
                                            setFoto("")
                                        }}
                                        className='w-full h-full text-[15px] italic  rounded-md hover:bg-[#FFD7D7]   active:bg-blue-600'>Eliminar foto</button>
                                </div>
                            }
                        </div>
                    </div>

                    <div className="w-[90%] relative mt-[4vh] flex justify-end flex-row gap-3">
                        <button
                            onClick={() => {
                                validarPasoUno()
                            }}
                            className='h-[4vh] w-32 bg-[#A0D8CE]
                                hover:bg-[#86B5AC] rounded-md text-white'>
                            Siguiente
                        </button>
                    </div>
                </>
            )
        }
        else if (pasosForm === 1) {
            return (
                <>
                    <div className='w-full h-[90%] mt-5 flex justify-start items-center flex-col '>
                        <div className='flex items-start justify-start w-[90%]'>

                            <b className="flex text-[18px] mb-4">
                                Servicios básicos
                            </b>
                        </div>

                        <div className='flex items-start justify-start w-[90%]'>
                            <b className="flex text-[16px] font-[400] mb-2">
                                Agua
                            </b>
                        </div>

                        <div className="w-[90%] mb-3 flex justify-around flex-row gap-3">
                            <div className='w-2/4 h-[4vh] flex flex-col justify-center items-start'>
                                <input
                                    value={agua.codigo}
                                    onChange={text => setAgua({ ...agua, codigo: text.target.value })}
                                    className={`bg-gray-100 appearance-none
                ${error && id.length <= 0 && " outline outline-2 outline-red-300"}
                border h-[4vh]  rounded-sm w-[100%] py-2 px-3 text-grey-darker`} min={0}
                                    placeholder="Código" />
                            </div>

                            <div className='w-2/4 h-[4vh] flex flex-col justify-center items-start'>
                                <select
                                    defaultValue={agua.compañia}
                                    onChange={text => setAgua({ ...agua, compañia: text.target.value })}
                                    className={`bg-gray-100 appearance-none cursor-pointer  border  h-[4vh]  rounded-sm w-[100%] py-0  px-3 text-grey-darker
                ${error && tipo === 'Tipo' && " outline outline-2 outline-red-300"}`}>
                                    <option value={tipo} disabled > Compañia </option>
                                    <option value="CASA">Casa</option>
                                    <option value="DEPARTAMENTO">Depto</option>
                                    <option value="OFICINA">Oficina</option>
                                </select>
                            </div>
                        </div>

                        <div className='flex items-start justify-start w-[90%]'>
                            <b className="flex text-[16px] font-[400] mb-2">
                                Luz
                            </b>
                        </div>

                        <div className="w-[90%] mb-3 flex justify-around flex-row gap-3">
                            <div className='w-2/4 h-[4vh] flex flex-col justify-center items-start'>
                                <input
                                    value={luz.codigo}
                                    onChange={text => setLuz({ ...luz, codigo: text.target.value })}
                                    className={`bg-gray-100 appearance-none
                ${error && id.length <= 0 && " outline outline-2 outline-red-300"}
                border h-[4vh]  rounded-sm w-[100%] py-2 px-3 text-grey-darker`} min={0}
                                    placeholder="Código" />
                            </div>

                            <div className='w-2/4 h-[4vh] flex flex-col justify-center items-start'>
                                <select
                                    defaultValue={luz.compañia}
                                    onChange={text => setLuz({ ...luz, compañia: text.target.value })}
                                    className={`bg-gray-100 appearance-none cursor-pointer  border  h-[4vh]  rounded-sm w-[100%] py-0  px-3 text-grey-darker
                ${error && tipo === 'Tipo' && " outline outline-2 outline-red-300"}`}>
                                    <option value={tipo} disabled > Compañia </option>
                                    <option value="CASA">Casa</option>
                                    <option value="DEPARTAMENTO">Depto</option>
                                    <option value="OFICINA">Oficina</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex items-start justify-start w-[90%]'>
                            <b className="flex text-[16px] font-[400] mb-2">
                                Gas
                            </b>
                        </div>

                        <div className="w-[90%] mb-3 flex justify-around flex-row gap-3">
                            <div className='w-2/4 h-[4vh] flex flex-col justify-center items-start'>
                                <input
                                    value={gas.codigo}
                                    onChange={text => setGas({ ...gas, codigo: text.target.value })}
                                    className={`bg-gray-100 appearance-none
                ${error && id.length <= 0 && " outline outline-2 outline-red-300"}
                border h-[4vh]  rounded-sm w-[100%] py-2 px-3 text-grey-darker`} min={0}
                                    placeholder="Código" />
                            </div>

                            <div className='w-2/4 h-[4vh] flex flex-col justify-center items-start'>
                                <select
                                    defaultValue={gas.compañia}
                                    onChange={text => setGas({ ...gas, compañia: text.target.value })}
                                    className={`bg-gray-100 appearance-none cursor-pointer  border  h-[4vh]  rounded-sm w-[100%] py-0  px-3 text-grey-darker
                ${error && tipo === 'Tipo' && " outline outline-2 outline-red-300"}`}>
                                    <option value={tipo} disabled > Compañia </option>
                                    <option value="CASA">Casa</option>
                                    <option value="DEPARTAMENTO">Depto</option>
                                    <option value="OFICINA">Oficina</option>
                                </select>
                            </div>
                        </div>

                    </div>
                    <div className="w-[90%] relative mt-[4vh] flex justify-end flex-row gap-3">
                        <div className=''>

                        </div>
                        <button
                            onClick={() => {
                                setPasosForm(0)
                                setError(false)
                            }}
                            className='h-[4vh] mr-2  w-32 bg-[#A0D8CE]
                                hover:bg-[#86B5AC]  rounded-md text-white'>

                            Volver
                        </button>
                        <button
                            onClick={() => {
                                console.log("agua", agua)
                                console.log("luz", luz)
                                console.log("gas", gas)
                                setPasosForm(2)
                            }}
                            className='h-[4vh]  w-32 bg-[#A0D8CE]
                                hover:bg-[#86B5AC]  rounded-md text-white'>
                            Siguiente
                        </button>
                    </div>
                </>
            )
        } else if (pasosForm === 2) {
            return (
                <>
                    <div className='w-full h-[90%] mt-5 flex justify-start items-center flex-col '>
                        <div className='flex items-start justify-start w-[90%]'>

                            <b className="flex text-[18px] mb-4">
                                Datos del dueño
                            </b>
                        </div>


                        <div className="w-[90%] mb-3 flex justify-end flex-row gap-3">
                            <div className='w-[100%] h-[50%] flex flex-col justify-start items-center '>

                                <div className='flex justify-between  items-center w-[100%] h-[10vh] bg-gray-100'>
                                    <button className={`h-10 w-1/2  flex justify-center items-center  hover:bg-gray-300/75
                ${newDueno === false && 'bg-white'}`}
                                        onClick={() => {
                                            setNewDueno(false)
                                            setArrendatarioIncomplete(false)
                                        }}
                                    >
                                        Buscar dueño
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelected("")
                                            setNewDueno(true)
                                            setNewDuenoError(false)
                                        }}
                                        className={`h-10 w-1/2 bg-slate-50 flex justify-center items-center   hover:bg-gray-300/75 
                    ${newDuenoError && ' outline outline-2 outline-red-400 rounded-sm'}
                    ${newDueno === true && 'bg-white  outline outline-1 outline-gray-400/50'}`}>
                                        Agregar dueño
                                    </button>
                                </div>


                                <div className='w-full h-auto pt-4'>
                                    {newDueno === true ?
                                        <div className='w-full h-[29vh] flex flex-col justify-start items-center '>

                                            <div className="mb-3 w-[100%] flex justify-around flex-row">
                                                <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                                                    <input
                                                        value={arrendador.nombre}
                                                        onChange={text => { setArrendador({ ...arrendador, nombre: text.target.value }) }}
                                                        className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[95%] py-2 px-3 text-grey-darker
                                    ${error && arrendador.nombre.length <= 0 && " outline outline-2 outline-red-300"}`}
                                                        type="text"
                                                        placeholder="Nombre" />
                                                </div>
                                                <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                                                    <input
                                                        value={arrendador.apellido}
                                                        onChange={text => { setArrendador({ ...arrendador, apellido: text.target.value }) }}
                                                        className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[100%] py-2 px-3 text-grey-darker
                                    ${error && arrendador.apellido.length <= 0 && " outline outline-2 outline-red-300"}`}
                                                        type="text"
                                                        placeholder="Apellido" />
                                                </div>
                                            </div>
                                            <div className="mb-3 w-[100%] flex flex-col justify-center items-start">
                                                <input
                                                    value={arrendador.rut}
                                                    onChange={text => {
                                                        if (text.target.value.length < 13) {
                                                            let resp = checkRut(text.target.value)
                                                            setArrendador({ ...arrendador, rut: resp })
                                                        }
                                                    }}
                                                    className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[100%] py-2 px-3 text-grey-darker
                                ${error && arrendador.rut?.length === 0 && " outline outline-2 outline-red-300"}`
                                                    }
                                                    type="text"
                                                    placeholder="Rut" />
                                            </div>
                                            <div className="mb-3 w-[100%] flex flex-col justify-center items-start">
                                                <p className='font-medium'>Fecha de nacimiento</p>
                                                <input
                                                    value={arrendador.fechaNacArrendador}
                                                    onChange={text => { setArrendador({ ...arrendador, fechaNacArrendador: text.target.value }) }}
                                                    className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[100%] py-2 px-3 text-grey-darker
                                ${error && arrendador.fechaNacArrendador.length <= 0 && " outline outline-2 outline-red-300"}`}
                                                    type="date"
                                                    placeholder="Fecha de Nacimiento" />
                                            </div>
                                            <div className="mb-5 w-[100%] flex justify-around flex-row">
                                                <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                                                    <input
                                                        value={arrendador.correo}
                                                        onChange={text => { setArrendador({ ...arrendador, correo: text.target.value }) }}
                                                        className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[95%] py-2 px-3 text-grey-darker
                                    ${error && arrendador.correo.length <= 0 && " outline outline-2 outline-red-300"}`} type="text"
                                                        placeholder="Correo" />
                                                </div>
                                                <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                                                    <input
                                                        value={arrendador.telefono}
                                                        onChange={text => {
                                                            if (text.target.value.length < 12 && text.target.value.length >= 0) {
                                                                setArrendador({ ...arrendador, telefono: text.target.value })
                                                            }
                                                        }}
                                                        pattern="[0-9]*"
                                                        type={'number'}
                                                        className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[100%] py-2 px-3 text-grey-darker
                                    ${error && arrendador.telefono.length <= 0 && " outline outline-2 outline-red-300"}`}
                                                        placeholder="Telefono" />
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className='h-[29vh]'>
                                            <p className='text-center'><i>Proximamente</i></p>
                                            <p className={`text-center text-red-500 ${newDuenoError ? 'block' : 'hidden'}`}>
                                                Debes seleccionar la opcion agregar dueño</p>
                                        </div>
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="w-[90%] relative mt-[4vh] flex justify-end flex-row gap-3">
                        <div className=''>

                        </div>
                        <button
                            onClick={() => {
                                setPasosForm(1)
                                setError(false)
                            }}
                            className='h-[4vh] mr-2  w-32 bg-[#A0D8CE]
                                hover:bg-[#86B5AC]  rounded-md text-white'>

                            Volver
                        </button>
                        <button
                            onClick={() => {
                                validarPasoTres()
                            }}
                            className='h-[4vh]  w-32 bg-[#A0D8CE]
                                hover:bg-[#86B5AC]  rounded-md text-white'>
                            Siguiente
                        </button>
                    </div>
                </>
            )
        } else if (pasosForm === 3) {
            return (
                <>
                    <div className='w-full h-[90%] mt-5 flex justify-start items-center flex-col '>
                        <div className='flex items-start  justify-start w-[90%]'>
                            <b className="flex text-[18px] justify-center items-center">
                                Contrato<span className='font-normal text-[16px] ml-[10px]'>(opcional)</span>
                            </b>
                        </div>
                        <div className={`w-full h-[90%] pt-3 max-h-[50vh] overflow-auto flex justify-start items-center flex-col`}>
                            <div className="w-[90%] h-[9vh] mb-3 flex justify-around flex-row gap-3 ">
                                <div className='flex flex-col items-start justify-start w-1/2 h-full '>
                                    <p className='mb-2 font-medium'>Inicio de contrato</p>
                                    <input
                                        value={inicioContrato}
                                        onChange={e => { setInicioContrato(e.target.value) }}
                                        className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[100%] py-2 px-3 text-grey-darker ${error && inicioContrato.length <= 0 && "outline outline-2 outline-red-300 border border-red-500"}`
                                        }
                                        type="date"
                                        placeholder="Inicio de contrato" />
                                </div>
                                <div className='flex flex-col items-start justify-start w-1/2 h-full '>
                                    <p className='mb-2 font-medium '>Termino de contrato</p>
                                    <input
                                        value={terminoContrato}
                                        onChange={e => { setTerminoContrato(e.target.value) }}
                                        className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[100%] py-2 px-3 text-grey-darker ${error && terminoContrato.length <= 0 && "outline outline-2 outline-red-300"}`} type="date"
                                        placeholder="Termino de contrato" min={inicioContrato} />
                                </div>
                            </div>


                            <div className='flex justify-between  items-center w-[90%] h-auto bg-gray-100'>
                                <button className={`h-10 w-1/2  flex justify-center items-center  hover:bg-gray-300/75
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
                                    className={`h-10 w-1/2 bg-slate-50  hover:bg-gray-300/75
        flex justify-center items-center hover:bg-gray-300
                    ${newArrendatario === true && 'bg-white'}`}>
                                    Agregar arrendatario
                                </button>
                            </div>

                            {newArrendatario === true ?
                                <div className='w-full h-[30vh] flex flex-col overflow-hidden justify-start pt-4 items-center '>
                                    {/* <b className='mb-3'>Datos Arrendatario</b> */}
                                    <div className="mb-3 w-[90%] flex justify-around flex-row">
                                        <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                                            <input
                                                value={arrendatario.nombre}
                                                onChange={text => { setArrendatario({ ...arrendatario, nombre: text.target.value }) }}
                                                className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[95%] py-2 px-3 text-grey-darker ${error && newArrendatario === true && arrendatario.nombre.length <= 0 && " outline outline-2 outline-red-300"}`}
                                                type="text"
                                                placeholder="Nombre" />
                                        </div>
                                        <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                                            <input
                                                value={arrendatario.apellido}
                                                onChange={text => { setArrendatario({ ...arrendatario, apellido: text.target.value }) }}
                                                className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[100%] py-2 px-3 text-grey-darker ${error && newArrendatario === true && arrendatario.apellido.length <= 0 && " outline outline-2 outline-red-300"}`}
                                                type="text"
                                                placeholder="Apellido" />
                                        </div>
                                    </div>
                                    <div className="mb-3 w-[90%] flex flex-col justify-center items-start">
                                        <input
                                            value={arrendatario.rut}
                                            onChange={text => {
                                                if (text.target.value.length < 13) {
                                                    let resp = checkRut(text.target.value)
                                                    setArrendatario({ ...arrendatario, rut: resp })
                                                }
                                            }}
                                            className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[100%] py-2 px-3 text-grey-darker
                                ${error && arrendatario.rut?.length === 0 && " outline outline-2 outline-red-300"}`
                                            }
                                            type="text"
                                            placeholder="Rut" />
                                    </div>
                                    <div className="mb-3 w-[90%] flex flex-col justify-center items-start">
                                        <p className='font-medium'>Fecha de nacimiento</p>
                                        <input
                                            value={arrendatario.fechaNacArrendatario}
                                            onChange={text => { setArrendatario({ ...arrendatario, fechaNacArrendatario: text.target.value }) }}
                                            className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[100%] py-2 px-3 text-grey-darker
                                ${error && newArrendatario === true && arrendatario.fechaNacArrendatario.length <= 0 && " outline outline-2 outline-red-300"}`}
                                            type="date"
                                            placeholder="Fecha de Nacimiento" />
                                    </div>
                                    <div className="mb-5 w-[90%] flex justify-around flex-row">
                                        <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                                            <input
                                                value={arrendatario.correo}
                                                onChange={text => { setArrendatario({ ...arrendatario, correo: text.target.value }) }}
                                                className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[95%] py-2 px-3 text-grey-darker
                                    ${error && newArrendatario === true && arrendatario.correo.length <= 0 && " outline outline-2 outline-red-300"}`} type="text"
                                                placeholder="Correo" />
                                        </div>
                                        <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                                            <input
                                                value={arrendatario.telefono}
                                                onChange={text => {
                                                    if (text.target.value.length < 12 && text.target.value.length >= 0) {
                                                        setArrendatario({ ...arrendatario, telefono: text.target.value })
                                                    }
                                                }}
                                                className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[100%] py-2 px-3 text-grey-darker
                                    ${error && newArrendatario === true && arrendatario.telefono.length <= 0 && " outline outline-2 outline-red-300"}`}
                                                placeholder="Telefono"
                                                pattern="[0-9]*" />
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className='h-[28vh] w-full pt-4'>
                                    {
                                        leaseholders !== [] &&

                                        <ArrendatarioFinder selected={selected} setSelected={setSelected}
                                            selectIncomplete={selectIncomplete} setSelectIncomplete={setSelectIncomplete}
                                            leaseholders={leaseholders}
                                        />
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    <div className="w-[90%] relative mt-[3vh] flex justify-end flex-row gap-3">
                        <div className=''>

                        </div>
                        <button
                            onClick={() => {
                                setPasosForm(2)
                                setError(false)
                            }}
                            className='h-[4vh] mr-2  w-32 bg-[#A0D8CE]
                                hover:bg-[#86B5AC]  rounded-md text-white'>

                            Volver
                        </button>
                        <button
                            onClick={() => {
                                checkInput()
                            }}
                            className='h-[4vh]  w-32 bg-[#A0D8CE]
                                hover:bg-[#86B5AC]  rounded-md text-white'>
                            Crear
                        </button>
                    </div>
                </>
            )
        }
    }


    return (
        <div className='w-[100vw] h-[90vh] bg-gray-100 flex justify-center items-center'>

            <div className={`w-[100vw] sm:w-[100vw] md:w-[100vw] lg:w-[70vw] xl:w-[58vw] relative shadow-lg h-[70vh] rounded-md  bg-white p-6 flex items-center flex-col`}>

                {renderPasosForm()}

                <div className='w-[25%] h-[6vh] absolute top-[4%]  flex justify-end px-3 items-center'>
                    <div className='flex items-center justify-center w-full h-full gap-2'>
                        <div className={` rounded-full w-[35px] h-[35px] flex justify-center items-center ${pasosForm === 0 ? 'bg-[#A0D8CE]' : 'bg-gray-200'}`}>
                            1
                        </div>
                        <div className={` rounded-full w-[35px] h-[35px] flex justify-center items-center ${pasosForm === 1 ? 'bg-[#A0D8CE]' : 'bg-gray-200'}`}>
                            2
                        </div>
                        <div className={` rounded-full w-[35px] h-[35px] flex justify-center items-center ${pasosForm === 2 ? 'bg-[#A0D8CE]' : 'bg-gray-200'}`}>
                            3
                        </div>
                        <div className={` rounded-full w-[35px] h-[35px] flex justify-center items-center ${pasosForm === 3 ? 'bg-[#A0D8CE]' : 'bg-gray-200'}`}>
                            4
                        </div>
                        {/* <b className={`font-[900] text-[50px]  ${pasosForm === 1 ? 'text-gray-400' : 'text-black'}`}>.</b>
                        <b className={`font-[900] text-[50px]  ${pasosForm === 2 ? 'text-gray-400' : 'text-black'}`}>.</b> */}

                    </div>
                </div>
            </div>

        </div>
    )
}