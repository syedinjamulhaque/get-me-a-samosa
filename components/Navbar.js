import React from 'react'
import Link from 'next/link'

const Navbar = () => {

    return (
        <nav className='bg-gray-900 shadow-xl shadow-white/20 text-white flex flex-wrap md:flex-nowrap justify-between items-center gap-3 px-4 py-3 md:py-0 md:h-16 sticky top-0 z-50'>

            <Link
                className="logo font-bold text-lg flex justify-center items-center gap-2 group transition-transform duration-300 hover:scale-105"
                href={"/"}
            >
                <img
                    className='invertImg transition-transform duration-500 group-hover:rotate-12'
                    src="samosa.gif"
                    width={44}
                    alt=""
                />
                <span className='text-lg sm:text-xl md:text-base my-1 md:my-0 transition-colors duration-300 group-hover:text-purple-400'>
                    Get Me a Samosa!
                </span>
            </Link>

            <div className='relative flex flex-wrap sm:flex-nowrap justify-center items-center gap-2 sm:gap-3'>
                <>
                    <button
                        id="dropdownDefaultButton"
                        data-dropdown-toggle="dropdown"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/40"
                        type="button"
                    >
                        Account
                        <svg className="w-2.5 h-2.5 ms-2 sm:ms-3 transition-transform duration-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>

                    <div
                        id="dropdown"
                        className="absolute left-0 sm:left-[15px] top-12 bg-white divide-y divide-gray-100 rounded-lg shadow-xl w-44 dark:bg-gray-700 transition-all duration-200 ease-in-out origin-top z-50"
                    >
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li>
                                <Link href="/dashboard" className="block px-4 py-2 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                            </li>
                            <li>
                                <Link href="/" className="block px-4 py-2 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                            </li>
                            <li>
                                <Link href="#" className="block px-4 py-2 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                            </li>
                        </ul>
                    </div>
                </>

                <button className='text-white w-fit bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 active:scale-95'>
                    Logout
                </button>

                <Link href={"/login"}>
                    <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 active:scale-95'>
                        Login
                    </button>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar