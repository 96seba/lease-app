import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Navbar() {

    const [navigation, setNavigation] = useState([])

    useEffect(() => {
        const renderNavbar = async () => {
            if (localStorage.getItem('type_user') === 'ADMIN') {
                setNavigation([
                    { name: 'Dashboard', href: '/dashboard', current: false },
                    { name: 'Propiedades', href: '/propiedades', current: false },
                    { name: 'Boletas', href: '/boletas', current: false },
                    { name: 'Usuarios', href: '/usuarios', current: false },
                ])
            } else {
                setNavigation([
                    { name: 'Dashboard', href: '/dashboard', current: false },
                    { name: 'Propiedades', href: '/propiedades', current: false },
                    { name: 'Boletas', href: '/boletas', current: false },
                ])
            }

        }
        renderNavbar()
    }, [])

    let navigate = useNavigate()


    if (navigation.length === 0) {
        return <></>
    }
    return (
        <Disclosure as="nav" className="bg-[#FF6F00] p-0.5">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-[8vh] items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <img
                                        className="block h-8 w-auto lg:hidden"
                                        src={require("../assets/logo.jpg")}
                                        alt="Your Company"
                                    />
                                    <img
                                        className="hidden h-8 w-auto lg:block"
                                        src={require("../assets/logo.jpg")}
                                        alt="Your Company"
                                    />
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <button
                                                key={item.name}
                                                onClick={() => {
                                                    navigate(item.href)
                                                }}
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? ' text-white' : 'text-white hover:bg-[#3a4348] hover:text-white',
                                                    'px-3 py-2 rounded-md text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-8 w-8 rounded-full bg-gray-100"
                                                src={require('../assets/logo.jpg')}
                                                alt=""
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        onClick={() => { navigate('/login') }}
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block text-left px-4 w-full py-2 text-sm text-gray-700')}
                                                    >
                                                        Cerrar sesión

                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>
                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pt-2 pb-3">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    onClick={() => { navigate(item.href) }}
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-white hover:bg-gray-700 hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
export default Navbar;
