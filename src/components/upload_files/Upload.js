import React from 'react'
import { useState } from 'react';
import Navbar from '../Navbar'
import Footer from '../Footer';
import './submit_button.css'
const Upload = () => {

  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages(prevImages => [...prevImages, ...newImages]);
  };

  const handleDeleteImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <>

      <Navbar nav_bg="bg-blue-800" />

      <section className='p-3 bg-slate-50' >
        <div className='h-[85vh]'>

          <div className='px-5 md:px-10 w-full'>
            <div className=' w-full mt-2 h-10 flex items-center justify-between'>
              <div className='flex justify-center items-center'>
                <div className='flex justify-center items-center rounded-[50%] bg-gray-200 p-1.5 mr-2'>
                  <img className='h-[80%] w-[80%] ml-[1px]' src="https://app.digiboxx.com/assets/post-login/breadcrumb/myboxx.svg"></img>
                </div>
                <p className='font-semibold text-gray-600 text-xs' style={{ fontFamily: 'Poppins, sans-serif' }}>MyBoxx</p>
              </div>
            </div>
            <div class="flex items-center justify-center w-full mt-2">
              <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-96 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" type="file" accept="image/*" className="hidden" multiple onChange={handleImageUpload} />
              </label>
            </div>
            <div>
              {
                images.length ?   <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl p-6 pl-0">
                <span class="block">
                  Preview
                  <span class="text-transparent bg-clip-text bg-gradient-to-tr to-cyan-500 from-blue-600">
                    Images
                  </span>
                </span>
              </h1> : ""
              }
             
            </div>
            {/* <div className="image-preview-container">
              {images.map((image, index) => (
                <div key={index} className="image-wrapper">
                  <img src={image} alt={`upload-${index}`} className="uploaded-image" />
                  <button className="delete-button" onClick={() => handleDeleteImage(index)}>✕</button>
                </div>
              ))}
            </div> */}
          </div>
        </div>
        <div className="grid -mt-10 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 px-5 md:px-10">
        {images.map((image, index) => (
            <>
          <div className='flex h-52'>
              <img src={image} className="h-full w-full object-fill rounded-lg" />
              <div className='flex justify-end'>
                <button onClick={() => handleDeleteImage(index)} className="absolute mr-2 bg-slate-100 hover:bg-white px-1 mt-1 rounded-sm">
                  ✕
                </button>
              </div>
              </div>
            </>
          ))}
           
        </div>

        {
          images.length ?  <div className='flex justify-center mt-4'>
          <button type="button" className="px-5 submit-button relative overflow-hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <span className="mr-2 text-2xl font-semibold font-sans">Submit</span>
            <svg className="w-5 h-6 mt-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
            <span class="absolute inset-0 bg-blue-800 transition-transform duration-500 transform -translate-x-full submit-button-hover"></span>
          </button>

          {/* <button type="button" class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 ">Submit </button> */}
        </div> : ""
        }
       

      </section>

      <Footer />
    </>
  )
}

export default Upload