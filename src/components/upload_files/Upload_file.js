import React, { useEffect, useContext, useRef, useState } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer';
import './submit_button.css'
import lottie from 'lottie-web';
import axios from 'axios';
import { createPortal } from 'react-dom';
import Sitecontext from '../../context/Sitecontext';
// import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const Upload_file = () => {
  const { sorted_data, total_received_images, uid, upload_live_server, uploadProgress, total_file_size, set_total_file_size, current_file_size,  setUploadProgress, delete_image_from_server } = useContext(Sitecontext)
  const Navigate = useNavigate()
  const { userId } = useParams()

  useEffect(() => {
    if (uid != userId) {
      Navigate(`/${uid}`)
    }
  })



  const firstSectionRef = useRef(null);
  const lottie_container = useRef(null);

  const [files, setFiles] = useState([]);
  const [till_nth_upload_size, set_nth_upload_Size] = useState(0)

  const [change_lottie, set_change_lottie] = useState(false)

  const [images, setImages] = useState([]);
  const [handle_upload_click, set_handle_upload_click] = useState(false)

  const [total_images,set_total_images]=useState(false)

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    set_total_images(files.length)
    const newImages = files.map(file => URL.createObjectURL(file))
    setImages(prevImages => [...prevImages, ...newImages])
    setFiles(files);
    let temp = 0
    files.forEach((file) => {
      temp += file.size;
    });
    set_total_file_size(temp)
  };

  useEffect(() => {
    let temp = current_file_size;
    temp = (temp / total_file_size) * 100;
    temp += till_nth_upload_size
    set_nth_upload_Size(temp)
  }, [current_file_size])

  useEffect(() => {
    setUploadProgress(till_nth_upload_size)
  }, [till_nth_upload_size])

  const handleDeleteImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setFiles(files.filter((_, i) => i !== index))
  };

  useEffect(() => {
    const lottieContainer = document.getElementById('uploading_lottie');
    const lottieAnimation = lottie.loadAnimation({
      container: lottieContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/uploading_lottie.json'
    });
    return () => {
      lottieAnimation.destroy();
    };

  }, [handle_upload_click])

  useEffect(() => {
    const lottieContainer = document.getElementById('uploading_lottie');
    if (lottieContainer)
      document.getElementById('uploading_lottie').innerHTML = ""
    const lottieAnimation = lottie.loadAnimation({
      container: lottieContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/success_lottie.json'
    });
    return () => {
      lottieAnimation.destroy();
    };
  }, [change_lottie])

  async function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), ms);
    });
  }

  const handle_upload = async () => {
    set_handle_upload_click(true)
    document.body.style.overflowY = 'hidden'

    if (firstSectionRef.current) {
      firstSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    for (const file of files) {
      // setTimeout(async () => {
      await upload_live_server(file);
      await sleep(1000)
      // }, 1000 );
    }


    setUploadProgress(-1);

    set_change_lottie(true)

    setTimeout(() => {
      document.body.style.overflowY = 'scroll'
      set_handle_upload_click(false)
      set_change_lottie(false)
      set_total_images(false)
      setImages([])
    }, 1900);
  }


  const months = {
    "1": "January",
    "2": "February",
    "3": "March",
    "4": "April",
    "5": "May",
    "6": "June",
    "7": "July",
    "8": "August",
    "9": "September",
    "10": "October",
    "11": "November",
    "12": "December"
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [currentData1Index, setCurrentData1Index] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedImage) {
        if (event.key === 'ArrowRight') {
          handleNext();
        } else if (event.key === 'ArrowLeft') {
          handlePrev();
        } else if (event.key === 'Escape') {
          handleClose();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage, selectedIndex, currentData1Index]);

  const handleImageClick = (data1Index, data2Index, fileId) => {
    setSelectedIndex(data2Index);
    setCurrentData1Index(data1Index);
    setSelectedImage(total_received_images[fileId]);
  };

  const handleNext = () => {
    if (selectedIndex + 1 < sorted_data.data[currentData1Index].info.length) {
      const newIndex = selectedIndex + 1;
      setSelectedIndex(newIndex);
      setSelectedImage(total_received_images[sorted_data.data[currentData1Index].info[newIndex].fileId]);
    }
  };

  const handlePrev = () => {
    if (selectedIndex - 1 >= 0) {
      const newIndex = selectedIndex - 1;
      setSelectedIndex(newIndex);
      setSelectedImage(total_received_images[sorted_data.data[currentData1Index].info[newIndex].fileId]);
    }
  };

  const handleClose = () => {
    setSelectedImage(null);
    setSelectedIndex(null);
    setCurrentData1Index(null);
  };

  return (
    <>
      <Navbar nav_bg="bg-blue-800" />
      <section ref={firstSectionRef} className='p-3 bg-slate-50 ' >
        <div className='h-[75vh]'>
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
                images.length ? <h1 class="font-bold mb-10 lg:mb-0 tracking-tight text-gray-900 text-5xl md:text-6xl p-6 pl-0">
                  <span class="block">
                    Preview
                    <span class="text-transparent bg-clip-text bg-gradient-to-tr to-cyan-500 from-blue-600">
                      Images
                    </span>
                  </span>
                </h1> : ""
              }
            </div>
            {
              total_images && <h2 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">{total_images}</h2>
            }
          </div>
        </div>




        <div className="grid -mt-10 lg:mt-5 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 px-5 md:px-10">
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
          images.length ? <div className='flex justify-center mt-4'>
            <button onClick={handle_upload} type="button" className="px-5 submit-button relative overflow-hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <span className="mr-2 text-2xl font-semibold font-sans">Submit</span>
              <svg className="w-5 h-6 mt-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
              <span class="absolute inset-0 bg-blue-800 transition-transform duration-500 transform -translate-x-full submit-button-hover"></span>
            </button>
          </div> : ""
        }
      </section>


      <div className='px-5 md:px-10 lg:mb-0 '>
        <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl p-6 pl-0">
          <span class="block">
            Your
            <span class="text-transparent bg-clip-text bg-gradient-to-tr to-cyan-500 from-blue-600">
              Images
            </span>
          </span>
        </h1>
      </div>



      <div>
        {
          sorted_data?.data?.map((data1, data1Index) => {
            const dateStr = data1.date;
            const [month, year] = dateStr.split('/');

            return (
              <React.Fragment key={data1Index}>
                <div className='px-5 md:px-10 text-xl mb-14 lg:mb-0 font-bold'>{months[`${month}`]} {year}</div>
                <div className="grid -mt-10 lg:mt-5 mb-10 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 px-5 md:px-10">
                  {
                    data1?.info?.map((data2, data2Index) => {
                      return (
                        total_received_images[data2.fileId] ?
                          <div className='flex h-52' key={data2Index}>
                            <img
                              src={total_received_images[data2.fileId]}
                              className="h-full w-full object-fill rounded-lg cursor-pointer"
                              onClick={() => handleImageClick(data1Index, data2Index, data2.fileId)}
                            />
                            <div className='flex justify-end'>
                              <button onClick={() => delete_image_from_server(data2.fileId)} className="absolute px-1 mt-1 rounded-sm">
                                <svg width="24" height="24" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M 357 378C 344 378 332 390 333 403C 333 403 329 848 329 848C 329 857 333 866 341 870C 349 875 359 875 366 870C 374 866 379 858 379 849C 379 849 383 404 383 404C 383 397 380 391 375 386C 371 381 364 378 357 378C 357 378 357 378 357 378M 650 375C 636 375 625 386 625 400C 625 400 625 850 625 850C 625 859 630 867 637 872C 645 876 655 876 663 872C 670 867 675 859 675 850C 675 850 675 400 675 400C 675 393 672 387 668 382C 663 377 656 375 650 375C 650 375 650 375 650 375M 500 375C 486 375 475 386 475 400C 475 400 475 850 475 850C 475 859 480 867 487 872C 495 876 505 876 513 872C 520 867 525 859 525 850C 525 850 525 400 525 400C 525 393 522 387 518 382C 513 377 506 375 500 375C 500 375 500 375 500 375M 198 299C 198 299 800 299 800 299C 800 299 800 850 800 850C 800 913 759 950 700 950C 700 950 300 950 300 950C 238 950 200 911 201 855C 201 855 198 299 198 299M 438 138C 438 138 438 187 438 187C 438 187 563 187 563 187C 563 187 563 138 563 138C 563 138 438 138 438 138M 425 63C 425 63 575 63 575 63C 609 63 638 91 638 125C 638 125 638 187 638 187C 638 187 849 187 849 187C 870 187 887 204 887 225C 887 245 870 262 849 262C 849 262 151 263 151 263C 130 263 113 246 113 225C 113 205 130 188 151 188C 151 188 363 188 363 188C 363 188 363 125 363 125C 363 125 362 125 362 125C 362 91 391 63 425 63C 425 63 425 63 425 63" /></svg>
                              </button>
                            </div>
                          </div> : <div className='flex h-52 bg-gray-300 animate-pulse rounded-md' key={data2Index}>
                            <img className="h-full w-full object-fill rounded-lg" />
                          </div>
                      )
                    })
                  }
                  <br />
                </div>
              </React.Fragment>
            );
          })
        }

        {selectedImage && createPortal(
          <div className="fixed inset-0 px-10 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <button className="absolute top-5 right-5 text-white text-3xl" onClick={handleClose}>✕</button>
            <div className="flex justify-center items-center">
              <button onClick={handlePrev} className="text-white text-3xl mx-5" disabled={selectedIndex === 0}>←</button>
              <img src={selectedImage} className="w-[90%] lg:w-[60%]" />
              <button onClick={handleNext} className="text-white text-3xl mx-5" disabled={selectedIndex + 1 === sorted_data.data[currentData1Index].info.length}>→</button>
            </div>
          </div>,
          document.body
        )}
      </div>



      {
        handle_upload_click &&
        <section className='fixed top-0 flex flex-col justify-center items-center left-0 h-screen w-full z-20 bg-white bg-opacity-20 backdrop-filter  backdrop-blur-[2px] overflow-y-hidden border-2 border-red-600'>
          <div ref={lottie_container} id="uploading_lottie" className='h-64 w-64'>
          </div>
          <h1 className='flex -mt-8 justify-center text-3xl font-semibold items-center'>
            {uploadProgress > -1 && uploadProgress < 99 && (
              <div className='font-bold text-5xl font-sans h-full' style={{ color: "#8093EE" }}>
                <span className='text-black'>Uploading &nbsp;</span>{Math.floor(uploadProgress)}%
              </div>
            )}

            {uploadProgress > 99 &&
              <div className='font-bold text-5xl font-sans h-full' style={{ color: "#8093EE" }}>
                All files uploaded successfully!
              </div>}
          </h1>

        </section>

      }



      <Footer />



    </>
  )
}

export default Upload_file