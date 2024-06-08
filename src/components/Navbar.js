import React, { useContext, Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';
import Sitecontext from '../context/Sitecontext';
import { useLocation } from 'react-router-dom';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = ({ theme_fun, nav_bg }) => {
    const { isChecked, setIsChecked, logged_in, uid, signout } = useContext(Sitecontext)

    const handle_signout=()=>{
        signout()
    }

    const navigation = [
        { name: 'Home', href: '/', current: true },
        { name: 'Upload', href: `/${uid}`, current: false },
        // { name: 'Projects', href: '#', current: false },
        // { name: 'Calendar', href: '#', current: false },
    ]

    // const [isChecked, setIsChecked] = useState(false)
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
        theme_fun()
    }

    
    const location = useLocation();
    return (
        <>
            <Disclosure as="nav">
                {({ open }) => (
                    <>
                        <div className={`${nav_bg} px-2 sm:px-6 lg:px-14 py-2`}>
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="absolute -inset-0.5" />
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
                                            className="h-8 w-24"
                                            src="https://digiboxx.com/dist/assets/img/digibox-logo-bluebg.png"
                                            alt="Your Company"
                                        />
                                    </div>
                                    <div className="hidden sm:ml-6 sm:flex justify-center items-center">
                                        <div className="flex space-x-4">
                                            {navigation.map((item) => {
                                                // console.log(location.pathname," ",item.current);
                                                return (
                                                    <Link
                                                        key={item.name}
                                                        to={item.href}
                                                        className={`${location.pathname === item.href ? 'text-yellow-400 font-semibold' : 'text-white font-semibold hover:text-yellow-600'}`}
                                                        // className={classNames(
                                                        //     item.current ? 'text-violet-600' : 'dark:text-white hover:text-violet-400 dark:hover:text-violet-400',
                                                        //     'block rounded-md px-3 py-2 text-base font-medium '
                                                        // )}
                                                        aria-current={item.current ? 'page' : undefined}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                );
                                            })}

                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    {/* <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                                    {/* Profile dropdown */}
                                    {
                                        !logged_in ? <Link to="/signup"><button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-8 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" style={{ backgroundImage: "linear-gradient(#CE9FFC,#A582F7,#7367F0)" }}>Sign Up</button></Link>
                                            : <Menu as="div" className="relative z-10 ml-3">
                                                <div>
                                                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                        <span className="absolute -inset-1.5" />
                                                        <span className="sr-only">Open user menu</span>
                                                        <img
                                                            className="h-8 w-8 rounded-full"
                                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
                                                                <Link
                                                                    to="/cluster"
                                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                                >
                                                                    Cluster
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        {/* <Menu.Item>
                                                                {({ active }) => (
                                                                    <a
                                                                        href="#"
                                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                                    >
                                                                        Settings
                                                                    </a>
                                                                )}
                                                            </Menu.Item> */}
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link
                                                                    onClick={handle_signout}
                                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                                >
                                                                    Sign out
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                    }

                                    {/* <div>
                                            <label className='cursor-pointer select-none items-center hidden sm:block'>
                                                <input
                                                    type='checkbox'
                                                    checked={false}
                                                    onChange={handleCheckboxChange}
                                                    className='sr-only'

                                                />
                                                <span
                                                    className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 dark:bg-gray-700 ${isChecked ? 'bg-[#212b36]' : 'bg-[#CCCCCE]'
                                                        }`}
                                                >
                                                    <img
                                                        src={`${!isChecked ? `/moon.png` : `/night-mode.png`}`}
                                                        className={`dot h-6 w-6 rounded-full bg-white duration-200 ${isChecked ? 'translate-x-[28px]' : ''
                                                            }`}
                                                    />
                                                </span>
                                            </label>

                                        </div> */}

                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="sm:hidden absolute z-30 w-full bg-white">
                            <div className="space-y-1 px-2 pb-3 pt-2 dark:bg-gray-800">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        as="a"
                                        to={item.href}
                                        className={classNames(
                                            item.current ? 'text-violet-500' : 'dark:text-white hover:text-violet-400 dark:hover:text-violet-400',
                                            'block rounded-md px-3 py-2 text-base font-medium bg-gray-100 dark:bg-gray-800'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>


        </>
    )
}

export default Navbar