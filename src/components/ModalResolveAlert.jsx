import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckToSlot } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom"
import { resolveAlert } from '../api/resolveAlert'

export default function ModalResolveAlert({ row, setCheckStateFalse, refreshAlerts }) {

    const [open, setOpen] = useState(true)

    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef}
                onClose={() => {
                    setOpen(false)
                    setCheckStateFalse(row)
                }}>
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl  w-96 transition-all sm:my-8 ">
                                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex  justify-center">

                                    <div className="sm:flex sm:items-start">

                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3" className="text-lg font-medium flex flex-col justify-center items-center leading-6 text-gray-900">
                                                <FontAwesomeIcon icon={faCheckToSlot} className={` w-[4vh] h-[4vh] `} />
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-md text-gray-500">
                                                    ??Estas seguro que quieres resolver este pendiente critico?
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse flex justify-center items-center sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-[40%] justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:ml-3 sm:text-sm"
                                        onClick={async () => {
                                            let resp = await resolveAlert(row.id)
                                            console.log(resp)
                                            setOpen(false)
                                            setCheckStateFalse(row)
                                            refreshAlerts()
                                        }}
                                    >
                                        Si
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex w-[40%] justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-base font-medium text-teal-600 shadow-sm hover:bg-teal-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:ml-3 sm:text-sm"
                                        onClick={() => {
                                            setOpen(false)
                                            setCheckStateFalse(row)
                                        }}
                                    >
                                        No
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