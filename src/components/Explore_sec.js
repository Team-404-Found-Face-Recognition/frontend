import React from 'react'

const Explore_sec = () => {
    return (
        <>
            <section style={{ marginTop: "-2px", paddingTop: "5%" }} className=' dark:bg-black'>
                <div style={{ marginBottom: "5%" }} className='px-14 sm:px-20 md:px-28 flex justify-center flex-col items-start sm:items-center'>
                    <div className='flex justify-start '>
                        <h1 className="z-20 relative mb-2 text-3xl  sm:text-3xl md:text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">Explore By <span className='text-violet-500'>Categories</span></h1>
                    </div>
                    <div className='flex justify-start'>
                        <p className="z-20 relative text-sm pr-3 font-normal text-gray-500 lg:text-base dark:text-gray-400">Discover job opportunities in various categories and find the perfect match for your skills and interests.</p>
                    </div>
                </div>
                <div className='flex justify-center items-center flex-col space-y-9 xl:flex-row md:px-28 sm:space-x-10' style={{ marginTop: "-2px" }}>
                    <div className='w-full flex flex-col space-y-7'>
                        <div class="body-font text-white">
                            <div class="container px-2 py-10 mx-auto">
                                <div class="grid grid-cols-1 px-10 sm:grid-cols-2 xl:grid-cols-4 -m-2">
                                    <div class="p-2 w-full">
                                        <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                                            <img alt="team" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="/arts_media.svg" />
                                            <div class="flex-grow">
                                                <h2 class="text-white title-font font-medium">Arts Media</h2>
                                                {/* <p class="text-white">UI Designer</p> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="p-2 w-full">
                                        <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                                            <img alt="team" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="/human.svg" />
                                            <div class="flex-grow">
                                                <h2 class="text-white title-font font-medium">Human Resource</h2>
                                                {/* <p class="text-white">CTO</p> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="p-2 w-full">
                                        <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                                            <img alt="team" class="p-5 w-16 h-16 bg-violet-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="/business.svg" />
                                            <div class="flex-grow">
                                                <h2 class="text-white title-font font-medium">Sales & Business</h2>
                                                {/* <p class="text-white">Founder</p> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="p-2 w-full">
                                        <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                                            <img alt="team" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="/finance.svg" />
                                            <div class="flex-grow">
                                                <h2 class="text-white title-font font-medium">Financial Accounting</h2>
                                                {/* <p class="text-white">DevOps</p> */}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className='flex justify-center mt-6'>
                                    <button type="button" className="z-20 relative focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-8 py-2.5 my-3 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" style={{ backgroundImage: "linear-gradient(#CE9FFC,#A582F7,#7367F0)" }}>View All</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div style={{ marginTop: "-2px" }} class="bg-black py-14">
                <div class="mx-auto max-w-7xl px-6 lg:px-8">
                    <h1 className="z-20 relative mb-2 text-3xl  sm:text-3xl md:text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white text-center">Work with Exciting 100+ <span className='text-violet-500'>Companies</span> In The World</h1>
                    <div class="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                        <img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="/transistor-logo-white.svg" alt="Transistor" width="158" height="48" />
                        <img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="/reform-logo-white.svg" alt="Reform" width="158" height="48" />
                        <img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="/tuple-logo-white.svg" alt="Tuple" width="158" height="48" />
                        <img class="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1" src="/savvycal-logo-white.svg" alt="SavvyCal" width="158" height="48" />
                        <img class="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1" src="/statamic-logo-white.svg" alt="Statamic" width="158" height="48" />
                    </div>
                </div>
            </div>



            <section className='flex justify-center items-center flex-col-reverse space-y-10 sm:flex-row-reverse sm:px-20 md:px-28 lg:px-36 sm:space-x-10 dark:bg-black' style={{ marginTop: "-2px" }}>
                <div className='w-3/4 sm:w-1/2 mt-6'>
                    <img className='w-full xl:p-10' src="/Group.svg"></img>
                </div>

                <div className='w-3/4 sm:w-1/2 flex flex-col space-y-7'>
                    <div className='flex justify-start'>
                        <h1 className="z-20 relative mb-2 text-3xl  sm:text-3xl md:text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">So Many People Are<span className='text-violet-500'> Engaged</span> All Over The World</h1>
                    </div>
                    <div className='flex justify-start'>
                        <p className="z-20 relative text-sm pr-3 font-normal text-gray-500 lg:text-base dark:text-gray-400">Explore diverse job opportunities and connect with professionals from around the globe. Discover a world of exciting careers waiting for you.</p>
                    </div>
                    <div className='flex justify-start'>
                        <button type="button" className="z-20 relative focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-8 py-2.5 my-3 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" style={{ backgroundImage: "linear-gradient(#CE9FFC,#A582F7,#7367F0)" }}>Post Job</button>
                    </div>
                </div>
            </section>


        </>
    )
}

export default Explore_sec