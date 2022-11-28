if (id.length === 0 || direccion.length === 0 || monto.length === 0 || administracion.length === 0 || tipo === "Tipo") {
    //* Minimo un input required esta vacio de la propiedad
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

        //* Se sube a la imagen, se espera a que se cree la propiedad antes
        uploadImage(respProp.data.property.id)
        console.log(respProp.data.property.id)

        var respHolder

        if (newArrendatario === true) {






        }

        // if (newArrendatario === true && contArrendatario === 0) {
        //     // objHolder.name = objContrato.name
        //     // objHolder.lastname = objContrato.lastname
        //     // objHolder.rut = objContrato.rut
        //     // objHolder.phone = objContrato.phone
        //     // objHolder.email = objContrato.email
        //     // objHolder.birthday = objContrato.birthday

        //     respHolder = await addLeaseholder(objHolder)
        //     console.log(respHolder)
        //     objContrato.propertyId = respHolder.data.leaseholder.id
        // }

        // //* Se crea el contrato
        // const respLease = await addLease(objContrato)
        // console.log(respLease)

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