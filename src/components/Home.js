import React from 'react'
import Sitecontext from '../context/Sitecontext'
import { useContext } from 'react';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import Sec_2 from './Sec_2';
import { useGSAP } from '@gsap/react';
import Explore_sec from './Explore_sec';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import lottie from 'lottie-web'
const Home = () => {
    const heading_ref = useRef(null)
    const paragraph_ref = useRef(null)
    const button_ref = useRef(null)
    const details_ref = useRef(null)

    useEffect(() => {
        let arr = [];

        const movingDiv = document.getElementById("moving-div");
        const section = document.getElementById("background-section");
        const sectionWidth = section.offsetWidth;
        const sectionHeight = section.offsetHeight;

        function moveDiv() {
            const randomX = Math.floor(Math.random() * (sectionWidth - movingDiv.offsetWidth));
            const randomY = Math.floor(Math.random() * (sectionHeight - movingDiv.offsetHeight));

            if (arr.length !== 0 && randomX < arr[0]) {
                const val = movingDiv.style.transform;
                if (val !== "scaleX(-1)") {
                    movingDiv.style.transform = 'scaleX(-1)';
                }
                arr.pop();
            } else if (arr.length !== 0 && randomX > arr[0]) {
                const val = movingDiv.style.transform;
                if (val !== 'scaleX(1)') {
                    movingDiv.style.transform = 'scaleX(1)';
                }
                arr.pop();
            }

            arr.push(randomX);
            movingDiv.style.left = randomX + "px";
            movingDiv.style.top = randomY + "px";
        }

        const intervalId = setInterval(moveDiv, 6000);

        const lottieContainer = document.getElementById('lottie-animation');
        const lottieAnimation = lottie.loadAnimation({
            container: lottieContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '/shark_lottie.json'
        });


        return () => {
            clearInterval(intervalId);
            lottieAnimation.destroy();
        };
    }, []);


    useEffect(() => {
        const tl = gsap.timeline();
        gsap.set([heading_ref.current, paragraph_ref.current, button_ref.current, details_ref.current], { opacity: 0, y: 150 });
        tl.to(heading_ref.current, { zIndex: "20", opacity: 1, y: 0, duration: 0.5 })
            .to(paragraph_ref.current, { zIndex: "20", opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
            .to(button_ref.current, { zIndex: "20", opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
            .to(details_ref.current, { zIndex: "20", opacity: 1, y: 0, duration: 0.5 }, '-=0.3');

      
    }, []);

    const { isChecked, setIsChecked } = useContext(Sitecontext)
    useEffect(() => {
        setIsChecked(true)
    })
    return (
        <>
            <Navbar nav_bg="bg-black" />
            <section id="background-section" className='dark:bg-black h-screen pt-5'>


                <div style={{
                    left: '1px', top: '10px',
                    position: 'absolute',
                    width: '15%',
                    height: '15%',
                    transition: 'left 2s ease, top 2s ease',
                    zIndex: 40,
                }} className='hidden md:block' id="moving-div">
                    {/* <span class="tooltiptext">Hello</span>  */}
                    {/* <img  src="new_shark.gif" alt="GIF Video" style="width: 100%; height: 100%; object-fit: contain;"/>  */}
                    <div id="lottie-animation"></div>
                </div>



                <div className='h-4/5 sm:h-3/4 flex flex-col justify-evenly items-center space-y-2 m-auto w-11/12 sm:w-10/12'>
                    <div ref={heading_ref}>
                        <h1 className="z-20 relative mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">Simplify Your Photo Management</h1>
                        <h1 className="z-20 relative mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white text-center">with Digiboxx</h1>
                    </div>
                    <div ref={paragraph_ref}>
                        <p className="z-20 relative text-sm font-normal text-gray-500 lg:text-base dark:text-gray-400 text-center">Experience effortless photo organization with advanced face recognition.</p>
                    </div>
                    <div ref={button_ref}>
                        <Link to="/login">
                            <button type="button" className="z-20 relative focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-8 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" style={{ backgroundImage: "linear-gradient(#CE9FFC,#A582F7,#7367F0)" }}>Get Started</button>
                        </Link>
                    </div>
                    <div ref={details_ref} className='flex justify-between items-center w-9/12 sm:w-7/12 md:w-5/12 lg:w-4/12'>
                        <div className='flex flex-col justify-center items-center'>
                            <h1 className="z-20 relative mb-2 text-2xl sm:text-3xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white text-center">10M+</h1>
                            <p className="z-20 relative text-sm pr-3 font-normal text-gray-500 lg:text-base dark:text-gray-400 text-center">Users</p>
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <h1 className="z-20 relative mb-2 text-2xl sm:text-3xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white text-center">500K+</h1>
                            <p className="z-20 relative text-sm pr-3 font-normal text-gray-500 lg:text-base dark:text-gray-400 text-center">Image Scanned</p>
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <h1 className="z-20 relative mb-2 text-2xl sm:text-3xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white text-center">98%</h1>
                            <p className="z-20 relative text-sm pr-3 font-normal text-gray-500 lg:text-base dark:text-gray-400 text-center">Accuracy</p>
                        </div>
                    </div>
                </div>

                <div className='w-full mt-8 relative z-20' style={{ height: "60px" }}>
                    <div className='w-full h-14' style={{ backgroundImage: "linear-gradient(#CE9FFC,#A582F7,#7367F0)", transform: "rotate(-1deg)" }}>

                    </div>
                    <div className='relative w-full h-14 flex justify-around items-center px-6' style={{ backgroundImage: "linear-gradient(#CE9FFC,#A582F7,#7367F0)", bottom: "60px", transform: "rotate(1deg)" }}>
                        <h1 className="z-20 relative mb-2 text-lg sm:text-3xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white text-center">Google</h1>
                        <h1 className="z-20 relative mb-2 text-lg sm:text-3xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white text-center">Facebook</h1>
                        <h1 className="z-20 relative mb-2 text-lg sm:text-3xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white text-center">Twitter</h1>
                        <h1 className="z-20 relative mb-2 text-lg sm:text-3xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white text-center">Meta</h1>
                    </div>
                </div>


                <div className='absolute z-10 top-64 sm:left-24 sm:top-64 md:left-1/4 md:top-1/4'>
                    <img width={200} src="/arrow1.svg"></img>
                </div>

               

                <div className='hidden sm:block absolute z-30 sm:bottom-72 2xl:bottom-10 sm:right-1/2'>
                    <img width={100} src="/arrow2.svg"></img>
                </div>

            </section>

            <Sec_2 />
            <Explore_sec />
            <Footer />
        </>
    )
}

export default Home