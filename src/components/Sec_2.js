import React from 'react'

const Sec_2 = () => {
    return (
        <>
            <section className='flex justify-center items-center flex-col space-y-9 sm:flex-row sm:px-20 md:px-28 lg:px-36 sm:space-x-10 dark:bg-black' style={{ marginTop: "-2px" }}>
                <div className='w-3/4 sm:w-1/2'>
                    <img className='w-full' src="/companies.svg"></img>
                </div>

                <div className='w-3/4 sm:w-1/2 flex flex-col space-y-7'>
                    <div className='flex justify-start'>
                        <h1 className="z-20 relative mb-2 text-3xl  sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">Work With <span className='text-violet-500'>Exciting</span> Companies</h1>
                    </div>
                    <div className='flex justify-start'>
                        <p className="z-20 relative text-sm pr-3 font-normal text-gray-500 lg:text-base dark:text-gray-400">Explore opportunities to work with innovative and dynamic companies that drive excellence in their respective industries.</p>
                    </div>
                    <div className='flex justify-start'>
                        <button type="button" className="z-20 relative focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-8 py-2.5 my-3 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" style={{ backgroundImage: "linear-gradient(#CE9FFC,#A582F7,#7367F0)" }}>Get Started</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Sec_2