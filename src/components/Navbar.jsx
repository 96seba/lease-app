import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCurentUser } from '../api/getCurrentUser'
import { TOKEN } from '../utils/constants'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Navbar() {

    const [navigation, setNavigation] = useState([])
    const [data, setData] = useState('')

    useEffect(() => {
        const renderNavbar = async () => {
            const userNow = await getCurentUser(TOKEN)
            console.log(userNow, "Usuario")
            console.log(userNow.data.user.name)
            setData(userNow.data.user)
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

    const [egg, setEgg] = useState(0)

    if (data === '') {
        return <></>
    }

    if (navigation.length === 0) {
        return <></>
    }
    return (
        <Disclosure as="nav" className="bg-[#383D48] p-0.5">
            {({ open }) => (
                <>
                    <div className="mx-auto sm:w-[100vw] md:w-[100vw] lg:w-[100vw] xl:w-[85vw] 2xl:w-[80vw] px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-[8vh] items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                                <div className="flex items-center flex-shrink-0">
                                    {/* <img
                                        className="block w-auto h-8 lg:hidden"
                                        src={require("../assets/logo.jpg")}
                                        alt="Your Company"
                                    /> */}
                                    {/* <img
                                        className="hidden w-auto h-8 lg:block"
                                        src={require("../assets/logo.jpg")}
                                        alt="Your Company"
                                    /> */}
                                    <span onClick={() => {
                                        setEgg(egg + 1)
                                        if (egg === 50) {
                                            window.open("https://estudiofragua.cl/", "_blank");
                                        }
                                    }} className='text-lg font-bold text-white mr-14'>Lease</span>
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
                                                    item.current ? ' text-white' : 'text-white hover:bg-[#A0D8CE] hover:text-white',
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
                            <div className="absolute inset-y-0 right-0 flex flex-row items-center justify-end pr-2 w-60 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <div className='font-medium text-white'>
                                    {data.name} {data.lastname}
                                </div>
                                <Menu as="div" className="relative ml-3">

                                    <div>
                                        <Menu.Button className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="bg-gray-100 rounded-full h-9 w-9"
                                                src={require('../assets/userIcon.png')}
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

                                        <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                        <div className="px-2 pt-2 pb-3 space-y-1">
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
