import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'


export default function ModalNewContrato({ open, setOpen, cleanContrato }) {

    const cancelButtonRef = useRef(null)

    return (
        <div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
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
                                                    <FontAwesomeIcon icon={faCircleExclamation} className={` w-[4vh] h-[4vh] `} />
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-md text-gray-500">
                                                        ??Seguro que deseas crear un nuevo contrato?
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
                                                setOpen(false)
                                            }}
                                        >
                                            No
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex w-[40%] justify-center rounded-md border border-transparent bg-white px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:ml-3 sm:text-sm"
                                            onClick={async () => {
                                                cleanContrato()
                                                setOpen(false)
                                            }}
                                        >
                                            Si
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>

                    {/* <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-6 text-center sm:items-center sm:p-0">
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
                                    <div className="w-full bg-white rounded-lg shadow  md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700 p-2 pb-4">
                                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-full  flex justify-center items-center flex-col">
                                            <h1 className="text-xl font-bold leading-tight  tracking-tight text-black md:text-2xl dark:text-white  text-center">
                                                ??Seguro que deseas crear un nuevo contrato?
                                            </h1>

                                            <div className='w-full h-14  flex justify-center items-center'>
                                                <button
                                                    type="button"
                                                    className="inline-flex w-[30%] mt-4 mb-4 justify-center rounded-md border border-transparent bg-[#FF6F00] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-[#3A4348] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:ml-3 sm:text-sm"
                                                    onClick={async () => {
                                                        cleanContrato()
                                                        setOpen(false)
                                                    }}
                                                >
                                                    Si
                                                </button>
                                                <button
                                                    type="button"
                                                    className="inline-flex w-[30%] mt-4 mb-4 justify-center rounded-md border border-transparent bg-gray-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-[#3A4348] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:ml-3 sm:text-sm"
                                                    onClick={async () => {
                                                        setOpen(false)
                                                    }}
                                                >
                                                    No
                                                </button>


                                            </div>

                                        </div>
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div> */}
                </Dialog>
            </Transition.Root>
        </div>
    )
}