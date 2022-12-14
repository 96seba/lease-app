import { useState, useEffect } from "react"
import { editPropiedad } from "../api/editPropiedad"
import { useLocation, useNavigate } from "react-router-dom"
import { uploadPropiedadImagen } from "../api/uploadPropiedadImagen"
import ModalEditPropiedad from "../components/ModalEditPropiedad"
import ModalNewContrato from "../components/ModalNewContrato"
import ModalDeleteContrato from "../components/ModalDeleteContrato"
import ArrendatarioFinder from '../components/ArrendatarioFinder'
import { editLease } from "../api/editLease"
import { addLease } from "../api/addLease"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faFileCirclePlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { deactivateLease } from "../api/deactivateLease"
import { getLeaseholder } from "../api/getLeaseholder"

export default function EditarPropiedad() {

    const location = useLocation()
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [openModalContrato, setOpenModalContrato] = useState(false)
    const [openModalDeactivate, setOpenModalDeactivate] = useState(false)

    const [data, setData] = useState("")
    const [idProp, setIdProp] = useState("")
    const [id, setId] = useState("")
    const [estacionamiento, setEstacionamiento] = useState(false)
    const [bodega, setBodega] = useState(false)
    const [direccion, setDireccion] = useState("")
    const [baños, setBaños] = useState("")
    const [dormitorios, setDormitorios] = useState("")
    const [nroPiso, setNroPiso] = useState("")

    const [foto, setFoto] = useState("")
    const [fotoUri, setFotoUri] = useState("")


    const [tipo, setTipo] = useState("Tipo")



    const [newArrendatario, setNewArrendatario] = useState(true)

    const [inicioContrato, setInicioContrato] = useState("")
    const [terminoContrato, setTerminoContrato] = useState("")

    const [arrendatarioIncomplete, setArrendatarioIncomplete] = useState(false)
    const [contratoIncomplete, setContratoIncomplete] = useState(false)
    const [selectIncomplete, setSelectIncomplete] = useState(false)
    const [selected, setSelected] = useState("")

    const [newContrato, setNewContrato] = useState(false)

    //* Datos arrendatario

    const [arrendatario, setArrendatario] = useState({
        nombre: "",
        apellido: "",
        rut: "",
        fechaNacArrendatario: "",
        correo: "",
        telefono: ""
    })


    const [leaseholders, setLeaseholders] = useState([])

    useEffect(() => {
        let data = location.state.data
        console.log(data)
        document.title = 'Editar propiedad ' + data.property_id
        setData(data)
        setId(data.property_id)
        setDireccion(data.address)
        setEstacionamiento(data.parking)
        setBaños(data.bathrooms)
        setDormitorios(data.bedrooms)
        setBodega(data.cellar)
        setNroPiso(data.floor)
        setTipo(data.type_property)
        setIdProp(data.id)
        let inito = data?.leases[0]?.initial_date.slice(0, 10)
        let endo = data?.leases[0]?.end_date.slice(0, 10)
        console.log(inito)
        setInicioContrato(inito)
        setTerminoContrato(endo)
        console.log("ID DE CONTRATO", data?.leases[0]?.id)

        if (data.leases.length > 0) {
            setArrendatario({
                nombre: data?.leases[0]?.leaseholder.name,
                apellido: data?.leases[0]?.leaseholder.lastname,
                rut: data?.leases[0]?.leaseholder.rut,
                fechaNacArrendatario: data?.leases[0]?.leaseholder.birthday.slice(0, 10),
                correo: data?.leases[0]?.leaseholder.email,
                telefono: data?.leases[0]?.leaseholder.phone
            })
        }

        if (data.leases.length === 0) {
            console.log("NO TIENE CONTRATOS")
        }

        const getArrendatarios = async () => {
            const resp = await getLeaseholder()
            let data = resp.data.leaseholder
            setLeaseholders(data)
        }
        getArrendatarios()

    }, [])

    const uploadImage = async () => {

        console.log(idProp, fotoUri)
        if (fotoUri === "") {
            console.log("No hay foto")
        } else {

            const form = new FormData();
            form.append("id", Number(idProp));
            form.append("image", fotoUri);

            console.log(form)
            const resp = await uploadPropiedadImagen(form)
            console.log(resp)
        }

    }

    const addContrato = async () => {
        let objContrato = {}
        console.log(inicioContrato, terminoContrato)


        let init = new Date(inicioContrato)
        let end = new Date(terminoContrato)

        objContrato.initial_date = init.toISOString()
        objContrato.end_date = end.toISOString()


        if (data.leases.length !== 0) {
            objContrato.id = data.leases[0].id
            console.log(objContrato)
            let resp = await editLease(objContrato)
            console.log(resp)
            console.log("Tiene lease y se edita")
            setOpen(true)
        } else {
            console.log("No tiene lease")
            //* Crear lease
            if (newArrendatario) {
                //* Se crea un leaseholder
                console.log("Nuevo arrendatario")
                objContrato.name = arrendatario.nombre
                objContrato.lastname = arrendatario.apellido
                objContrato.rut = arrendatario.rut
                objContrato.email = arrendatario.correo
                objContrato.phone = arrendatario.telefono
                let fecha = new Date(arrendatario.fechaNacArrendatario)
                objContrato.birthday = fecha.toISOString()
                objContrato.propertyId = idProp
                let resp = await addLease(objContrato)
                console.log(resp)
                setOpen(true)
            } else {
                //* Se selecciona un leaseholder ya creado
                console.log("Buscar arrendatario")
                console.log(selected)
                objContrato.leaseholderId = selected.id
                objContrato.propertyId = idProp
                let resp = await addLease(objContrato)
                console.log(resp)
                setOpen(true)
            }
        }
        console.log(objContrato)
    }

    const overwriteContrato = async () => {
        let objContrato = {}
        console.log(inicioContrato, terminoContrato)


        let init = new Date(inicioContrato)
        let end = new Date(terminoContrato)

        objContrato.initial_date = init.toISOString()
        objContrato.end_date = end.toISOString()

        if (newArrendatario) {
            //* Se crea un leaseholder
            console.log("Nuevo arrendatario")
            objContrato.name = arrendatario.nombre
            objContrato.lastname = arrendatario.apellido
            objContrato.rut = arrendatario.rut
            objContrato.email = arrendatario.correo
            objContrato.phone = arrendatario.telefono
            let fecha = new Date(arrendatario.fechaNacArrendatario)
            objContrato.birthday = fecha.toISOString()
            objContrato.propertyId = idProp
            let resp = await addLease(objContrato)
            console.log(resp)
            setOpen(true)
        } else {
            //* Se selecciona un leaseholder ya creado
            console.log("Buscar arrendatario")
            console.log(selected)
            objContrato.leaseholderId = selected.id
            objContrato.propertyId = idProp
            let resp = await addLease(objContrato)
            console.log(resp)
            setOpen(true)
        }

        console.log(objContrato)
    }

    const cleanContrato = () => {
        setNewContrato(true)
        setArrendatario({
            nombre: "",
            apellido: "",
            rut: "",
            fechaNacArrendatario: "",
            correo: "",
            telefono: ""
        })
        setInicioContrato('')
        setTerminoContrato('')
        setSelected('')

        // console.log(data.leases[0].id)
    }

    const deleteContrato = async () => {
        console.log(arrendatario)
        let resp = await deactivateLease(data.leases[0].id)
        console.log(resp)
        cleanContrato()
        // window.location.reload(false);
    }

    const checkInput = () => {

        let resp = checkInputRut.validaRut(arrendatario.rut.replaceAll('.', ''))
        console.log(resp, "Validación Rut Arrendatario")

        const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

        const emailCheck = emailRegex.test(arrendatario.correo)
        console.log("Revision de correo: ", emailCheck);

        // if (resp === false && arrendatario.rut.length !== 0) {
        //     setRutArrendadorCheck(true)
        //     return
        // }

        // if (emailCheck === false && arrendador.correo.length !== 0) {
        //     setEmailArrendadorCheck(true)
        //     return
        // }

        // if (newContrato === true && newArrendatario === true) {
        //     console.log("PROBANDO ARRENDATARIO")
        // let respArrendatario = checkInputRut.validaRut(arrendatario.rut.replaceAll('.', ''))
        //     console.log(respArrendatario, "Validacion Rut Arrendatario")

        //     const emailCheckArrendatario = emailRegex.test(arrendatario.correo)
        //     console.log("Revision de correo arrendatario: ", emailCheckArrendatario)

        if (resp === false && arrendatario.rut.length !== 0) {
            // setRutArrendatarioCheck(true)
            console.log("RUT INVALIDO ARRENDATARIO")
            return
        }

        // if (emailCheckArrendatario === false && arrendatario.correo.length !== 0) {
        //     setEmailArrendatarioCheck(true)
        //     console.log("EMAIL INVALIDO ARRENDATARIO")
        //     return
        // }

        //     console.log(fechaContratoError, "Error contrato?")

        //     if (inicioContrato !== "" && terminoContrato !== "" && Date.parse(inicioContrato) >= Date.parse(terminoContrato)) {
        //         setFechaContratoError(true)
        //         console.log(fechaContratoError, "Error contrato?")
        //         console.log("LA FECHA INICIO ES MAYOR A LA DE TERMINO")
        //     }
        // }

        console.log("SE EJECUTA ADDPROPIEDAD")
        overwriteContrato()
        // addPropiedad()
    }

    const checkInputContrato = () => {

        if (inicioContrato == "") {
            console.log("Falta agregar Inicio de contrato")
        }

        if (terminoContrato == "") {
            console.log("Falta agregar Término de contrato")
        }

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

    return (
        <div className='w-screen flex justify-center items-center bg-white'>
            <div className={`w-[100vw] sm:w-[100vw] md:w-[100vw] lg:w-[70vw] xl:w-[65vw] shadow-lg  p-6 flex items-center`}>
                <div className='w-full h-full flex flex-col justify-start items-center 
                sm:px-4 md:px-20 lg:px-6 xl:px-32'>

                    <button
                        onClick={() => {
                            let nav = `/propiedades/propiedad`
                            navigate(nav, {
                                state: {
                                    id: idProp
                                }
                            })
                        }}
                        className="w-[100px] top-[110px]  flex justify-between items-center h-12 
                    absolute sm:left-[10vw] md:left-[17vw]  lg:left-[23vw]    xl:left-[31vw]
                    ">
                        <FontAwesomeIcon icon={faArrowLeft} className={`w-5 h-5`} />
                        <span className="bg-white text-[25px]">
                            Volver
                        </span>
                    </button>

                    <p className="flex mb-[7.3vh] mt-4 text-xl">
                        Datos de la propiedad
                    </p>
                    <div className="mb-1 w-[90%] flex flex-col justify-center items-start">
                        <input
                            value={id} onChange={text => {

                                setId(text.target.value)

                            }}
                            className={`bg-gray-100 appearance-none
                            border h-[4vh]  rounded-sm w-[100%] py-2 px-3 text-grey-darker`} min={0}
                            placeholder="Id*" />
                    </div>
                    <div className="mb-1 w-[90%] flex flex-col justify-center items-start py-2">
                        <input
                            value={direccion} onChange={text => { setDireccion(text.target.value) }}
                            className={`bg-gray-100 appearance-none h-[4vh] border  
                            rounded-sm w-[100%] py-2 px-3 text-grey-darke`} type="text"
                            placeholder="Direccion*" />
                    </div>
                    <div className="mb-1 w-[90%] flex flex-col justify-center items-start">
                        <p className='font-medium'>Tipo</p>
                        <select
                            value={tipo}
                            onChange={e => {
                                console.log(e.target.value)
                                setTipo(e.target.value)
                            }}
                            className={`bg-gray-100 appearance-none  border  h-[4vh]  rounded-sm w-[100%] py-0  px-3 text-grey-darker`}>
                            <option value={tipo} disabled > Tipo </option>
                            <option value="CASA">Casa</option>
                            <option value="DEPARTAMENTO">Departamento</option>
                            <option value="OFICINA">Oficina</option>
                        </select>
                    </div>
                    <div className="mb-1 w-[90%] flex flex-col justify-center items-start py-2">
                        <input
                            value={nroPiso}
                            onChange={e => {
                                if (e.target.value.length < 3 && e.target.value >= 0) {
                                    setNroPiso(e.target.value)
                                }
                            }}
                            className={`bg-gray-100 appearance-none border  h-[4vh]  rounded-sm w-[100%] py-2 px-3 text-grey-darker`} min={0}
                            placeholder="Nro piso" />
                    </div>
                    <div className="py-2 w-[90%]">
                        <label htmlFor="teal-toggle" className="inline-flex relative items-center mr-5 cursor-pointer">
                            <input type="checkbox" value="" id="teal-toggle" className="sr-only peer"
                                checked={estacionamiento} onChange={(e) => {
                                    setEstacionamiento(e.target.checked)
                                }} />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700  peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#A0D8CE]"></div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-900">Estacionamiento</span>
                        </label>
                        <label htmlFor="d-toggle" className="inline-flex relative items-center mr-5 cursor-pointer">
                            <input type="checkbox" value="" id="d-toggle" className="sr-only peer"
                                checked={bodega} onChange={(e) => { setBodega(e.target.checked) }} />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700  peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#A0D8CE]"></div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-900">Bodega</span>
                        </label>
                    </div>
                    <div className="w-[90%] mb-3 flex justify-around flex-row">
                        <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                            <input
                                value={baños} onChange={text => {
                                    if (text.target.value.length < 3 && text.target.value >= 0) {
                                        setBaños(text.target.value)
                                    }
                                }}
                                className={`appearance-none bg-gray-100 
                                border  h-[4vh]  rounded-sm w-[95%] px-3 text-grey-darker`} min={0}
                                placeholder="Baños" />
                        </div>
                        <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
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
                    <b className='pb-4'> Foto de la propiedad</b>
                    <div className="mb-3 w-[90%] flex flex-col justify-center items-start">
                        {foto === "" ?
                            <div className="flex justify-center items-center mb-1 h-[25vh] w-[100%] ">
                                <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-full bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-100 hover:bg-gray-100 dark:border-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                        <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                        <p className="mb-2 text-sm text-center text-gray-500 dark:text-gray-400"><span className="font-semibold">Presiona para subir una foto</span></p>
                                    </div>
                                    <input id="dropzone-file" onChange={(e) => {
                                        setFoto(e.target.files[0].name)
                                        setFotoUri(e.target.files[0])
                                        let fileImg = e.target.files[0]
                                        console.log(fileImg)
                                    }} type="file" className="hidden" />
                                </label>
                            </div>
                            : <div className='flex rounded justify-center flex-col  mb-1 items-center  h-[25vh] w-[100%] bg-gray-200'>
                                <p>{foto}</p>
                                <button
                                    onClick={() => {
                                        setFoto("")
                                        setFotoUri("")
                                    }}
                                    className='bg-teal-300 w-2/4 rounded-lg h-[10%] hover:bg-red-600  hover:text-white active:bg-blue-600'>Eliminar foto</button>
                            </div>
                        }

                    </div>

                    <div className='flex justify-center items-center h-[12vh] w-[85%]'>
                        <button
                            type="button"
                            className="inline-flex w-[50%] mt-4 mb-4 justify-center rounded-md border border-transparent bg-[#A0D8CE] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-[#3A4348] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:ml-3 sm:text-sm"
                            onClick={async () => {
                                let objProp = {
                                    id: idProp,
                                    property_id: id,
                                    bathrooms: Number(baños),
                                    bedrooms: Number(dormitorios),
                                    address: direccion,
                                    cellar: bodega,
                                    parking: estacionamiento,
                                    type_property: tipo,
                                    floor: Number(nroPiso)
                                }

                                console.log(objProp)
                                const resp = await editPropiedad(objProp)
                                console.log(resp)

                                uploadImage()
                                setOpen(true)
                            }}
                        >
                            Guardar Propiedad
                        </button>
                    </div>

                    <div className="h-[1px] w-[90%] bg-gray-300 mb-4" />
                    {newContrato === false && data.leases?.length > 0 &&

                        <div className="w-[90%] h-10 flex justify-between  items-center">
                            <button
                                onClick={() => {
                                    setOpenModalDeactivate(true)
                                }}
                                className={`w-[42%] inline-block  px-s py-2 border-2 border-[#A0D8CE] text-[#A0D8CE] font-medium text-[14px] leading-normal uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out`}>
                                <FontAwesomeIcon className="mx-2 " icon={faTrash} />
                                Eliminar contrato
                            </button>
                            <button
                                onClick={() => { setOpenModalContrato(true) }}
                                className={`w-[52%] inline-block  px-s py-2 border-2 border-[#A0D8CE] text-[#A0D8CE] font-medium text-[14px] leading-normal uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out`}>
                                <FontAwesomeIcon className="mx-2 " icon={faFileCirclePlus} />
                                Agregar nuevo contrato
                            </button>
                        </div>
                    }

                    <div className='w-[90%] h-auto mt-2 flex flex-col items-start justify-center'>
                        <div className='flex justify-between shadow-md items-center w-[100%] h-auto  '>
                            <div className='w-full h-full flex flex-col justify-start items-center '>
                                <p className="flex my-4 text-xl">
                                    Contrato
                                </p>
                                <div className="mb-3 w-[85%] flex flex-col justify-center items-start">
                                    <p className='font-medium'>Inicio de contrato</p>
                                    <input
                                        value={inicioContrato}
                                        onChange={e => {
                                            setInicioContrato(e.target.value)
                                        }}
                                        className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[100%] py-2 px-3 text-grey-darker
                                            ${contratoIncomplete == true && inicioContrato === "" && "outline outline-2 outline-red-300"}`} type="date"
                                        placeholder="Inicio de contrato" />
                                </div>
                                <div className="mb-5 w-[85%] flex flex-col justify-center items-start">
                                    <p className='font-medium'>Termino de contrato</p>
                                    <input
                                        min={inicioContrato}
                                        value={terminoContrato}
                                        onChange={e => { setTerminoContrato(e.target.value) }}
                                        className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[100%] py-2 px-3 text-grey-darker
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
                                        <div className='w-full h-[36vh] flex flex-col justify-start items-center '>
                                            <b className='mb-3'>Datos Arrendatario</b>
                                            <div className="mb-3 w-[85%] flex justify-around flex-row">
                                                <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                                                    <input

                                                        value={arrendatario.nombre}
                                                        onChange={text => { setArrendatario({ ...arrendatario, nombre: text.target.value }) }}
                                                        className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[95%] py-2 px-3 text-grey-darker
                                                            ${arrendatarioIncomplete && arrendatario.nombre.length <= 0 && " outline outline-2 outline-red-300"}`}
                                                        type="text"
                                                        placeholder="Nombre" />
                                                </div>
                                                <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                                                    <input
                                                        value={arrendatario.apellido}
                                                        onChange={text => { setArrendatario({ ...arrendatario, apellido: text.target.value }) }}
                                                        className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[100%] py-2 px-3 text-grey-darker
                                                            ${arrendatarioIncomplete && arrendatario.apellido.length <= 0 && " outline outline-2 outline-red-300"}`}
                                                        type="text"
                                                        placeholder="Apellido" />
                                                </div>
                                            </div>
                                            <div className="mb-3 w-[85%] flex flex-col justify-center items-start">
                                                <input
                                                    value={arrendatario.rut}
                                                    onChange={text => {
                                                        if (text.target.value.length < 13) {
                                                            let resp = checkRut(text.target.value)
                                                            setArrendatario({ ...arrendatario, rut: resp })
                                                        }
                                                    }}
                                                    className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[100%] py-2 px-3 text-grey-darker
                                                        ${arrendatarioIncomplete && arrendatario.rut.length <= 0 && " outline outline-2 outline-red-300"}`}
                                                    type="text"
                                                    placeholder="Rut" />
                                            </div>
                                            <div className="mb-3 w-[85%] flex flex-col justify-center items-start">
                                                <p className='font-medium'>Fecha de nacimiento</p>
                                                <input
                                                    value={arrendatario.fechaNacArrendatario}
                                                    onChange={text => { setArrendatario({ ...arrendatario, fechaNacArrendatario: text.target.value }) }}
                                                    className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[100%] py-2 px-3 text-grey-darker
                                                        ${arrendatarioIncomplete && arrendatario.fechaNacArrendatario.length <= 0 && " outline outline-2 outline-red-300"}`}
                                                    type="date"
                                                    placeholder="Inicio de contrato" />
                                            </div>
                                            <div className="mb-5 w-[85%] flex justify-around flex-row">
                                                <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                                                    <input
                                                        value={arrendatario.correo}
                                                        onChange={text => { setArrendatario({ ...arrendatario, correo: text.target.value }) }}
                                                        className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[95%] py-2 px-3 text-grey-darker
                                                            ${arrendatarioIncomplete && arrendatario.correo.length <= 0 && " outline outline-2 outline-red-300"}`} type="text"
                                                        placeholder="Correo" />
                                                </div>
                                                <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                                                    <input
                                                        value={arrendatario.telefono}
                                                        onChange={text => { setArrendatario({ ...arrendatario, telefono: text.target.value }) }}
                                                        className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[100%] py-2 px-3 text-grey-darker
                                                            ${arrendatarioIncomplete && arrendatario.telefono.length <= 0 && " outline outline-2 outline-red-300"}`}
                                                        placeholder="Telefono" />
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className='h-[36vh]'>
                                            <ArrendatarioFinder selected={selected} setSelected={setSelected}
                                                selectIncomplete={selectIncomplete} setSelectIncomplete={setSelectIncomplete}
                                                leaseholders={leaseholders}
                                            />
                                        </div>
                                    }
                                </div>
                                {newContrato === true ?
                                    <button
                                        className="inline-flex w-[50%] mb-3 justify-center rounded-md border border-transparent bg-[#FF6F00] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-[#3A4348] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:ml-3 sm:text-sm"
                                        onClick={async () => {
                                            if (inicioContrato === "" || terminoContrato === "") {
                                                setContratoIncomplete(true)
                                            } else {
                                                if (newArrendatario) {
                                                    if (arrendatario.nombre === "" || arrendatario.apellido === "" || arrendatario.correo === "" || arrendatario.fechaNacArrendatario === "" || arrendatario.rut === "" || arrendatario.telefono === "") {
                                                        console.log("El arrendatario esta incompleto")
                                                        setArrendatarioIncomplete(true)
                                                    } else {
                                                        console.log("El arrendatario esta completo")
                                                        console.log(arrendatario)
                                                        let resp = await deactivateLease(data.leases[0].id)
                                                        console.log(resp)
                                                        overwriteContrato()
                                                    }
                                                } else {
                                                    if (selected === "") {
                                                        console.log("El arrendatario no se selecciono")
                                                        setSelectIncomplete(true)
                                                    } else {
                                                        console.log("El arrendatario esta seleccionado")
                                                        let resp = await deactivateLease(data.leases[0].id)
                                                        console.log(resp)
                                                        overwriteContrato()
                                                    }
                                                }
                                            }
                                        }}
                                    >
                                        Crear Contrato
                                    </button>
                                    :
                                    <button
                                        className="inline-flex w-[50%] mb-3 justify-center rounded-md border border-transparent bg-[#A0D8CE] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-[#3A4348] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:ml-3 sm:text-sm"
                                        onClick={() => {
                                            if (inicioContrato === "" || terminoContrato === "") {
                                                setContratoIncomplete(true)
                                            } else {
                                                if (newArrendatario) {
                                                    if (arrendatario.nombre === "" || arrendatario.apellido === "" || arrendatario.correo === "" || arrendatario.fechaNacArrendatario === "" || arrendatario.rut === "" || arrendatario.telefono === "") {
                                                        console.log("El arrendatario esta incompleto")
                                                        setArrendatarioIncomplete(true)
                                                    } else {
                                                        console.log("El arrendatario esta completo")
                                                        console.log(arrendatario)
                                                        addContrato()
                                                    }
                                                } else {
                                                    if (selected === "") {
                                                        console.log("El arrendatario no se selecciono")
                                                        setSelectIncomplete(true)
                                                    } else {
                                                        console.log("El arrendatario esta seleccionado")
                                                        addContrato()
                                                    }
                                                }
                                            }
                                        }}
                                    >
                                        Guardar Contrato
                                    </button>
                                }
                            </div>
                        </div>


                    </div>



                </div>
                <ModalEditPropiedad open={open} setOpen={setOpen} id={idProp} />

                <ModalNewContrato open={openModalContrato} setOpen={setOpenModalContrato}
                    cleanContrato={cleanContrato} />

                <ModalDeleteContrato open={openModalDeactivate} setOpen={setOpenModalDeactivate}
                    cleanContrato={deleteContrato} />
            </div>
        </div>
    )
}