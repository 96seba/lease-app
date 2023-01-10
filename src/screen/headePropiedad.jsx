const checkInput = () => {

    let resp = checkInputRut.validaRut(arrendador.rut.replaceAll('.', ''))
    console.log(resp, "Validación Rut Dueño")

    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    const emailCheck = emailRegex.test(arrendador.correo)
    console.log("Revision de correo: ", emailCheck);

    if (resp === false && arrendador.rut.length !== 0) {
        setRutArrendadorCheck(true)
        return
    }

    if (emailCheck === false && arrendador.correo.length !== 0) {
        setEmailArrendadorCheck(true)
        return
    }

    if (newContrato === true && newArrendatario === true) {
        console.log(newContrato, "new Contrato?")
        console.log("PROBANDO ARRENDATARIO")
        let respArrendatario = checkInputRut.validaRut(arrendatario.rut.replaceAll('.', ''))
        console.log(respArrendatario, "Validacion Rut Arrendatario")

        const emailCheckArrendatario = emailRegex.test(arrendatario.correo)
        console.log("Revision de correo arrendatario: ", emailCheckArrendatario)

        if (respArrendatario === false && arrendatario.rut.length !== 0) {
            setRutArrendatarioCheck(true)
            console.log("RUT INVALIDO ARRENDATARIO")
            return
        }

        if (emailCheckArrendatario === false && arrendatario.correo.length !== 0) {
            setEmailArrendatarioCheck(true)
            console.log("EMAIL INVALIDO ARRENDATARIO")
            return
        }

        console.log(fechaContratoError, "Error contrato?")

        if (inicioContrato !== "" && terminoContrato !== "" && Date.parse(inicioContrato) >= Date.parse(terminoContrato)) {
            setFechaContratoError(true)
            console.log(fechaContratoError, "Error contrato?")
            console.log("LA FECHA INICIO ES MAYOR A LA DE TERMINO")
        }
    }

    console.log("SE EJECUTA ADDPROPIEDAD")
    addPropiedad()
}







<div className='flex items-center justify-center w-screen bg-white'>
    <div className={`w-[100vw] sm:w-[100vw] md:w-[100vw] lg:w-[70vw] xl:w-[58vw] shadow-lg 
${newContrato ? "h-[250.5vh]" : "h-[170.5vh]"} p-6 flex items-center`}>
        {open === true ?
            <ModalGuardar open={open} setOpen={setOpen} /> : <></>
        }
        <div className='flex flex-col items-center justify-start w-full h-full sm:px-4 md:px-20 lg:px-6 xl:px-8'>
            <p className="flex mb-[7.3vh] mt-4 text-xl">
                Datos de la propiedad
            </p>
            <div ref={inputRef} className="mb-1 w-[90%] flex flex-col justify-center items-start">
                <input
                    value={id} onChange={text => {
                        if (text.target.value.length < 10 && text.target.value >= 0) {
                            setId(text.target.value)
                        }
                    }}
                    className={`bg-gray-100 appearance-none
                ${error && id.length <= 0 && " outline outline-2 outline-red-300"}
                border h-[4vh]  rounded-sm w-[100%] py-2 px-3 text-grey-darker`} min={0}
                    placeholder="Id*" />
            </div>
            <div className="mb-1 w-[90%] flex flex-col justify-center items-start py-2">
                <input
                    value={direccion} onChange={text => { setDireccion(text.target.value) }}
                    className={`bg-gray-100 appearance-none h-[4vh] border  
                ${error && direccion.length <= 0 && " outline outline-2 outline-red-300"}
                rounded-sm w-[100%] py-2 px-3 text-grey-darke`} type="text"
                    placeholder="Direccion*" />
            </div>
            <div className="mb-1 w-[90%] flex flex-col justify-center items-start">
                <p className='font-medium'>Tipo</p>
                <select
                    defaultValue={tipo}
                    onChange={e => {
                        console.log(e.target.value)
                        setTipo(e.target.value)
                    }}
                    className={`bg-gray-100 appearance-none cursor-pointer  border  h-[4vh]  rounded-sm w-[100%] py-0  px-3 text-grey-darker
                ${error && tipo === 'Tipo' && " outline outline-2 outline-red-300"}`}>
                    {/* <option selected disabled value="Tipo">Tipo</option> */}
                    <option value={tipo} disabled > Tipo </option>
                    <option value="CASA">Casa</option>
                    <option value="DEPARTAMENTO">Depto</option>
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
                    className={`bg-gray-100 appearance-none border  h-[4vh]  rounded-sm w-[100%] py-2 px-3 text-grey-darker`}
                    placeholder="Nro piso" />
            </div>
            <div className="w-[90%] mb-3 flex justify-around flex-row">
                <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                    <input
                        value={estacionamiento} onChange={text => {
                            if (text.target.value.length < 3 && text.target.value >= 0) {
                                setEstacionamiento(text.target.value)
                            }
                        }}
                        className={`appearance-none bg-gray-100 
                    border  h-[4vh]  rounded-sm w-[95%] px-3 text-grey-darker`} min={0}
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
            <div ref={newDuenoRef} className="mb-3 w-[90%] flex flex-col justify-center items-start">
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
            <div className="mb-3 w-[90%] flex flex-col justify-center items-start">
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
            <div className='w-[90%] h-[70%] flex flex-col justify-start items-center '>
                <div
                    className='flex justify-between  items-center w-[100%] h-[5vh]   bg-gray-100'>
                    <button className={`h-full w-1/2  flex justify-center items-center
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
                        className={`h-full w-1/2 bg-slate-50 
        ${newDuenoError && ' outline outline-2 outline-red-400 rounded-sm'}
        flex justify-center items-center hover:bg-gray-300
                    ${newDueno === true && 'bg-white'}`}>
                        Agregar dueño
                    </button>
                </div>
                <div className='w-full h-auto pt-4 shadow-md'>
                    {newDueno === true ?
                        <div className='w-[full] h-[36vh] flex flex-col justify-start items-center '>
                            <b className='mb-3'>Datos Dueño</b>
                            <div className="mb-3 w-[85%] flex justify-around flex-row">
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
                            <div className="mb-3 w-[85%] flex flex-col justify-center items-start">
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
                            <div className="mb-3 w-[85%] flex flex-col justify-center items-start">
                                <p className='font-medium'>Fecha de nacimiento</p>
                                <input
                                    value={arrendador.fechaNacArrendador}
                                    onChange={text => { setArrendador({ ...arrendador, fechaNacArrendador: text.target.value }) }}
                                    className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[100%] py-2 px-3 text-grey-darker
                                ${error && arrendador.fechaNacArrendador.length <= 0 && " outline outline-2 outline-red-300"}`}
                                    type="date"
                                    placeholder="Fecha de Nacimiento" />
                            </div>
                            <div className="mb-5 w-[85%] flex justify-around flex-row">
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
                        <div className='h-[36vh]'>
                            <p className='text-center'><i>Proximamente</i></p>
                            <p className={`text-center text-red-500
            ${newDuenoError ? 'block' : 'hidden'}
            `}>Debes seleccionar la opcion agregar dueño</p>
                        </div>
                    }
                </div>
            </div>
            <b className='pb-4'> Foto de la propiedad</b>
            <div className="mb-3 w-[90%] flex flex-col justify-center items-start">
                {foto === "" ?
                    <div className="flex justify-center items-center mb-1 h-[25vh] w-[100%] ">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-100 hover:bg-gray-100 dark:border-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
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
                            }}
                            className='bg-teal-300 w-2/4 rounded-lg h-[10%] hover:bg-red-600  hover:text-white active:bg-blue-600'>Eliminar foto</button>
                    </div>
                }
            </div>
            {/* Agregar contrato */}
            <div className='w-[90%] h-auto mt-2 flex flex-col items-start justify-center'>
                <button onClick={() => {
                    setNewContrato(!newContrato)
                    setNewArrendatario(false)
                }}
                    className='flex justify-between px-4 items-center w-[100%] h-[5vh] bg-gray-100 hover:bg-gray-200'>
                    <span className='font-bold'>
                        Agregar contrato
                    </span>
                    <span className='text-2xl'>
                        <FontAwesomeIcon icon={faCirclePlus} />
                    </span>
                </button>
                {newContrato === true &&
                    <div ref={bottomRef} className='flex justify-between shadow-md items-center w-[100%] h-auto  '>
                        <div className='flex flex-col items-center justify-start w-full h-full '>
                            <p className="flex my-4 text-xl">
                                Contrato
                            </p>
                            <div className="mb-3 w-[85%] flex flex-col justify-center items-start">
                                <p className='font-medium'>Inicio de contrato</p>
                                <input
                                    value={inicioContrato}
                                    onChange={e => { setInicioContrato(e.target.value) }}
                                    className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[100%] py-2 px-3 text-grey-darker
                    ${error && inicioContrato.length <= 0 && "outline outline-2 outline-red-300 border border-red-500"}`
                                    }
                                    type="date"
                                    placeholder="Inicio de contrato" />
                            </div>
                            <div className="mb-5 w-[85%] flex flex-col justify-center items-start">
                                <p className='font-medium'>Termino de contrato</p>
                                <input
                                    value={terminoContrato}
                                    onChange={e => { setTerminoContrato(e.target.value) }}
                                    className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[100%] py-2 px-3 text-grey-darker
                    ${error && terminoContrato.length <= 0 && "outline outline-2 outline-red-300"}`} type="date"
                                    placeholder="Termino de contrato" min={inicioContrato} />
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
                            <div className='w-full h-auto pt-4'>
                                {newArrendatario === true ?
                                    <div className='w-full h-[36vh] flex flex-col justify-start items-center '>
                                        <b className='mb-3'>Datos Arrendatario</b>
                                        <div className="mb-3 w-[85%] flex justify-around flex-row">
                                            <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                                                <input
                                                    value={arrendatario.nombre}
                                                    onChange={text => { setArrendatario({ ...arrendatario, nombre: text.target.value }) }}
                                                    className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[95%] py-2 px-3 text-grey-darker
                                    ${error && newArrendatario === true && arrendatario.nombre.length <= 0 && " outline outline-2 outline-red-300"}`}
                                                    type="text"
                                                    placeholder="Nombre" />
                                            </div>
                                            <div className='w-1/2 h-[4vh] flex flex-col justify-center items-start'>
                                                <input
                                                    value={arrendatario.apellido}
                                                    onChange={text => { setArrendatario({ ...arrendatario, apellido: text.target.value }) }}
                                                    className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[100%] py-2 px-3 text-grey-darker
                                    ${error && newArrendatario === true && arrendatario.apellido.length <= 0 && " outline outline-2 outline-red-300"}`}
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
                                ${error && arrendatario.rut?.length === 0 && " outline outline-2 outline-red-300"}`
                                                }
                                                type="text"
                                                placeholder="Rut" />
                                        </div>
                                        <div className="mb-3 w-[85%] flex flex-col justify-center items-start">
                                            <p className='font-medium'>Fecha de nacimiento</p>
                                            <input
                                                value={arrendatario.fechaNacArrendatario}
                                                onChange={text => { setArrendatario({ ...arrendatario, fechaNacArrendatario: text.target.value }) }}
                                                className={`appearance-none bg-gray-100  border h-[4vh] rounded-sm w-[100%] py-2 px-3 text-grey-darker
                                ${error && newArrendatario === true && arrendatario.fechaNacArrendatario.length <= 0 && " outline outline-2 outline-red-300"}`}
                                                type="date"
                                                placeholder="Fecha de Nacimiento" />
                                        </div>
                                        <div className="mb-5 w-[85%] flex justify-around flex-row">
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
                                    <div className='h-[36vh]'>
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
                    </div>
                }
            </div>
            <div className='flex justify-center items-center h-[12vh] w-[85%]'>
                <button
                    type="button"
                    className="inline-flex w-[70%] mt-4 mb-4 justify-center rounded-md border border-transparent bg-[#FF6F00] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-[#3A4348] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:ml-3 sm:text-sm"
                    onClick={async () => {
                        checkInput()
                    }}
                >
                    Guardar
                </button>
            </div>
        </div>
    </div>
</div>