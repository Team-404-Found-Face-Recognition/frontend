import React from 'react'
import { Link } from 'react-router-dom'

const Explore_sec = () => {
    return (
        <>

            <section className='flex justify-center items-center flex-col-reverse space-y-10 sm:flex-row-reverse sm:px-20 md:px-28 lg:px-36 sm:space-x-10 dark:bg-black' style={{ marginTop: "-2px" }}>
                <div className='w-3/4 sm:w-1/2 mt-6'>
                    <img className='w-full xl:p-10' src="/Group.svg"></img>
                </div>

                <div className='w-3/4 sm:w-1/2 flex flex-col space-y-7'>
                    <div className='flex justify-start'>
                        <h1 className="z-20 relative mb-2 text-3xl  sm:text-3xl md:text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">Revolutionize Your Image Management with Face <span className='text-violet-500'> Recognition</span></h1>
                    </div>
                    <div className='flex justify-start'>
                        <p className="z-20 relative text-sm pr-3 font-normal text-gray-500 lg:text-base dark:text-gray-400">Digiboxx leverages cutting-edge face recognition technology to transform how you manage your digital assets. Whether you are a photographer, a business owner, or an individual, making it easy to sort and find specific images</p>
                    </div>
                    <div className='flex justify-start'>
                        <Link to="/login">
                            <button type="button" className="z-20 relative focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-8 py-2.5 my-3 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" style={{ backgroundImage: "linear-gradient(#CE9FFC,#A582F7,#7367F0)" }}>Get Started</button>
                        </Link>
                    </div>
                </div>
            </section>


        </>
    )
}

export default Explore_sec