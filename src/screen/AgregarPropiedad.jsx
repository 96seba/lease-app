export default function AgregarPropiedad() {



    return (
        <div className="w-screen h-[91.5vh] p-6 flex justify-between items-center">
            <div className="flex rounded flex-col justify-center items-start p-6 w-5/12 h-full shadow-md bg-slate-200">
                <p className="flex my-4 text-xl">
                    Datos de la propiedad
                </p>
                <div className="mb-3 w-full">
                    <input className="shadow appearance-none border h-[90%] rounded w-full py-2 px-3 text-grey-darker" id="username" type="text"
                        placeholder="Dormitorios" />
                </div>
                <div className="mb-3 w-full">
                    <input className="shadow appearance-none border h-[90%] rounded w-full py-2 px-3 text-grey-darker" id="username" type="text"
                        placeholder="Baños" />
                </div>
                <div className="mb-3 w-full">
                    <label for="teal-toggle" class="inline-flex relative items-center mr-5 cursor-pointer">
                        <input type="checkbox" value="" id="teal-toggle" class="sr-only peer" checked />
                        <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-900">Estacionamiento</span>
                    </label>
                    <label for="teal-toggle" class="inline-flex relative items-center mr-5 cursor-pointer">
                        <input type="checkbox" value="" id="teal-toggle" class="sr-only peer" checked />
                        <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-900">Bodega</span>
                    </label>
                </div>
                <div className="mb-3 w-full">

                    <input className="shadow appearance-none border h-[90%] rounded w-full py-2 px-3 text-grey-darker" id="username" type="text"
                        placeholder="Bodega" />
                </div>
                <div className="mb-3 w-full">

                    <input className="shadow appearance-none border h-[90%] rounded w-full py-2 px-3 text-grey-darker" id="username" type="text"
                        placeholder="Id" />
                </div>
                <div className="mb-3 w-full">

                    <input className="shadow appearance-none border h-[90%] rounded w-full py-2 px-3 text-grey-darker" id="username" type="text"
                        placeholder="Direccion" />
                </div>
                <div className="mb-3 w-full">

                    <input className="shadow appearance-none border h-[90%] rounded w-full py-2 px-3 text-grey-darker" id="username" type="text"
                        placeholder="Dueño" />
                </div>
                <div className="mb-3 w-full">

                    <input className="shadow appearance-none border h-[90%] rounded w-full py-2 px-3 text-grey-darker" id="username" type="text"
                        placeholder="Rut arrendador" />
                </div>
                <div className="mb-3 w-full">

                    <input className="shadow appearance-none border h-[90%] rounded w-full py-2 px-3 text-grey-darker" id="username" type="text"
                        placeholder="Arrendador" />
                </div>
                <div className="mb-3 w-full">

                    <input className="shadow appearance-none border h-[90%] rounded w-full py-2 px-3 text-grey-darker" id="username" type="text"
                        placeholder="Rut arrendatario" />
                </div>
                <div className="mb-3 w-full">

                    <input className="shadow appearance-none border h-[90%] rounded w-full py-2 px-3 text-grey-darker" id="username" type="text"
                        placeholder="Arrendatario" />
                </div>
            </div>


            <div className="flex   justify-between flex-col items-center w-6/12 h-full ">
                <div className="flex flex-col p-6 rounded w-full h-[45%] justify-center items-center shadow-md bg-slate-200">
                    <p>Contrato</p>
                    <div className="mb-3 w-full">

                        <input className="shadow appearance-none border h-[90%] rounded w-full py-2 px-3 text-grey-darker" id="username" type="text"
                            placeholder="Monto" />
                    </div>
                    <div className="mb-3 w-full">

                        <input className="shadow appearance-none border h-[90%] rounded w-full py-2 px-3 text-grey-darker" id="username" type="text"
                            placeholder="Gastos comunes" />
                    </div>
                    <div className="mb-3 w-full">

                        <input className="shadow appearance-none border h-[90%] rounded w-full py-2 px-3 text-grey-darker" id="username" type="text"
                            placeholder="Inicio de contrato" />
                    </div>
                    <div className="mb-3 w-full">

                        <input className="shadow appearance-none border h-[90%] rounded w-full py-2 px-3 text-grey-darker" id="username" type="text"
                            placeholder="Termino de contrato" />
                    </div>
                </div>
                <div className="flex rounded w-full h-[45%] justify-center items-center shadow-md bg-slate-200">
                    <img alt="propiedad"
                        className='w-[35vw] h-full rounded-l' src={require('../assets/lamoneda.jpeg')} />
                </div>
            </div>

        </div>
    )
}