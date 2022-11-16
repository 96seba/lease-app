import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { BsSaveFill } from "react-icons/bs";
import * as XLSX from 'xlsx'




export default function ModalGuardar({ open, setOpen }) {

    const [file, setFile] = useState("");

    const cancelButtonRef = useRef(null);

    // const getDataXlsx = async () => {

    //     let data = []
    //     const sheet = file.SheetNames[1]

    //     const temp = reader.utils.sheet_to_json(file.Sheets[sheet])
    //     temp.forEach(res => {
    //         if (res.Id !== 0 && res['Comisión Administración'] && res['Monto Arriendo'])
    //            data.push({ id: res.Id, comision: res['Comisión Administración'], arriendo: res['Monto Arriendo'] })
    //     })

    //     return data
    // }


    const getDataXlsx = async () => {
        const promise = new Promise((resolve, reject) => {

            let dataFinal = []

            const fileReader = new FileReader()
            fileReader.readAsArrayBuffer(file)

            fileReader.onload = (e) => {
                const bufferArray = e.target.result

                const wb = XLSX.read(bufferArray, { type: 'buffer' })

                const wsname = wb.SheetNames[1]

                const ws = wb.Sheets[wsname]

                const data = XLSX.utils.sheet_to_json(ws)

                data.forEach(res => {
                    if (res.Id !== 0 && res['Comisión Administración'] && res['Monto Arriendo'])
                        dataFinal.push({ id: res.Id, comision: res['Comisión Administración'], arriendo: res['Monto Arriendo'] })
                })
                resolve(dataFinal)

            }

            fileReader.onerror = (error) => {
                reject(error)
            }

        })

        promise.then((d) => {
            console.log(d)
        })

    }


    const checkExtension = (str) => {
        let arr = str.split('.');
        let ext = arr[arr.length - 1];
        console.log(ext)

        if (ext === 'xls' || ext === 'xlsx' || ext === 'csv') {
            setOpen(false)
            // llamar api
        }
        else {
            alert("El archivo debe ser de tipo excel (.xls, .xlsx o .csv)");
        }

    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-1000"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-1000"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex justify-center">

                                    <div className="sm:flex sm:items-start">

                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">

                                            <Dialog.Title as="h3" className="text-lg font-medium flex flex-col justify-center items-center leading-6 text-gray-900">
                                                <input
                                                    onChange={e => {
                                                        setFile(e.target.files[0])
                                                        console.log(e.target.files[0])
                                                    }} id="fileSelect" type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />

                                            </Dialog.Title>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse flex justify-center items-center sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-[40%] justify-center rounded-md border border-transparent bg-[#FF6F00] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-[#3A4348] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:ml-3 sm:text-sm"
                                        onClick={() => {
                                            getDataXlsx()
                                            // checkExtension(file)
                                        }} >
                                        Guardar
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex w-[40%] justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-base font-medium text-[#98D7D1]shadow-sm hover:bg-[#3A4348] hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:ml-3 sm:text-sm"
                                        onClick={() => setOpen(false)}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}