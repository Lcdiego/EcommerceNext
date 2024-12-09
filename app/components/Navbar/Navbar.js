'use client'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { IoCart } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { IoMdLogOut } from "react-icons/io";
import Link from 'next/link';
import { FaWhatsapp } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import Image from 'next/image';
import { ProductoContext } from '../contex/contex';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Moon, Sun } from '../Icons/icons';



const navigation = [
    { name: 'Todos los productos', href: '/pages/TodosLosProductos', current: false },
    { name: 'Mas vendidos', href: '', current: false },
    { name: 'Segui tu compra', href: '#', current: false },
    { name: 'Contactos', href: '#', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const router = useRouter();
    const { usuario, logout, count, BuscarProduct, dark, handledark } = useContext(ProductoContext);

    const [Query, setQuery] = useState('');


    const searchProduct = async (e) => {
        e.preventDefault();
        if (Query.trim()) {
            await BuscarProduct(Query);
            setTimeout(() => {
                setQuery('')
            }, 5000);

            router.push('/pages/SearchInput');

        }
    };



    return (
        <Disclosure as="nav" className="fixed w-full z-20 bg-white ">
            {({ open, close }) => (
                <>
                    <div className={`${!dark? 'bg-white': 'dark'}`}>
                        <div className='border-b-2 border-b-gray-200'>
                            <div className='mx-10 flex lg:mx-40 justify-between '>
                                <div className='hidden w-60  justify-center sm:flex sm:justify-start  items-center'>
                                    <FaWhatsapp className='mr-3 size-10 text-green-500' />
                                    <p className='text-sm hidden xl:block'>
                                        222-222-222
                                    </p>
                                </div>
                                <div className='w-full h-40 flex flex-col justify-center sm:flex-row sm:h-20 sm:justify-center items-center'>
                                    <form onSubmit={searchProduct} action="" className="w-full sm:w-80">
                                        <div className="relative flex items-center border border-gray-300 rounded-l">
                                            <input
                                                type="text"
                                                value={Query}
                                                onChange={(e) => setQuery(e.target.value)}
                                                className="w-full px-4 py-0.5 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-l"
                                                placeholder="Buscar"
                                            />
                                            <CiSearch className="absolute left-3 text-gray-400" />
                                        </div>
                                    </form>

                                    <select className="w-full sm:w-36 text-gray-400 px-4 py-[2.7px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" id="options" name="options">
                                        <option value="option1">Categorias</option>
                                        <option value="option2">Option 1</option>
                                        <option value="option3">Option 2</option>
                                    </select>
                                </div>
                                <div onClick={handledark} className='flex items-center'>
                                    {dark ? <Sun width={'30'} height={'30'} colo='yellows' /> : <Moon width={'30'} height={'30'} color="#00ff00" />}
                                </div>


                                <Menu as="div" className="relative mr-2 hidden w-28   sm:flex sm:items-center sm:justify-end">
                                    <div>
                                        <MenuButton className="flex justify-center items-center rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-400">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <div className='hidden sm:block  '>


                                                {usuario ? <p className='text-sm font-semibold sm:w-28  xl:block px-2 py-3  '>Hola {usuario.name}!</p> : (<div className='flex justify-center items-center w-10 h-10'><FaRegUser size={25} /></div>
                                                )}

                                            </div>

                                        </MenuButton>

                                    </div>
                                    <MenuItems
                                        transition
                                        className="absolute right-0 sm:right-0 z-10 sm:mt-16 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        <MenuItem>
                                            {({ focus }) => (
                                                <Link
                                                    href={'/pages/Login'}
                                                    className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    Iniciar sesion
                                                </Link>
                                            )}
                                        </MenuItem>
                                        <MenuItem>
                                            {({ focus }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    Settings
                                                </a>
                                            )}
                                        </MenuItem>
                                        <MenuItem>
                                            {({ focus }) => (
                                                <Link
                                                    href={''}
                                                    onClick={logout}
                                                    className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    <IoMdLogOut />
                                                    Cerrar sesión
                                                </Link>
                                            )}
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                            </div>

                        </div>

                        <div className='border-b-2 border-b-gray-200'>
                            <div className="relative mx-10 lg:mx-40 flex h-16 items-center justify-center sm:justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </DisclosureButton>
                                </div>
                                <div className="mr-8 flex  items-center justify-center sm:items-stretch sm:justify-between">
                                    <div className="flex flex-shrink-0 items-center">
                                        <Link href={'/'}>
                                            <Image
                                                className="h-16 w-auto"
                                                width={100}
                                                height={100}
                                                src="/logo.jpg"
                                                alt="Your Company"
                                            />
                                        </Link>
                                    </div>
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium',
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                                onClick={close}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    <Link href={'/pages/carrito'}
                                        type="button"
                                        className="relative rounde p-1 text-gray-600 hover:text-black "
                                    >
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">View notifications</span>

                                        <div className='text-center'>
                                            {count}
                                        </div>

                                        <IoCart className="h-6 w-6" aria-hidden="true" />
                                    </Link>



                                    <Menu as="div" className="relative ml-3">
                                        <div className='' >
                                            <MenuButton className="flex justify-center sm:hidden items-center h-10 w-10  rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Open user menu</span>
                                                <div className=' sm:hidden '>


                                                    {usuario ? <p className='text-sm font-semibold  xl:block px-2 py-3  '>Hola {usuario.name}!</p> : (<FaRegUser size={25} />
                                                    )}

                                                </div>

                                            </MenuButton>

                                        </div>
                                        <MenuItems
                                            transition
                                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                        >
                                            <MenuItem>
                                                {({ focus }) => (
                                                    <Link
                                                        href={'/pages/Login'}
                                                        className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}

                                                    >
                                                        Iniciar sesion
                                                    </Link>
                                                )}
                                            </MenuItem>
                                            <MenuItem>
                                                {({ focus }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Settings
                                                    </a>
                                                )}
                                            </MenuItem>
                                            <MenuItem>
                                                {({ focus }) => (
                                                    <a

                                                        onClick={logout}
                                                        className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Cerrar sesión
                                                    </a>
                                                )}
                                            </MenuItem>
                                        </MenuItems>
                                    </Menu>

                                </div>
                            </div>
                        </div>

                    </div>

                    <DisclosurePanel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (

                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium',
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                    onClick={close}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    )
}

