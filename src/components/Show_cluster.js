import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar'
import { useContext } from 'react'
import Sitecontext from '../context/Sitecontext'
import { useNavigate } from 'react-router-dom'
const Show_cluster = () => {
  const { delete_image_from_server, total_received_images, current_cluster, unique_images, socket, fetched_cluster_info, set_fetched_cluster_info } = useContext(Sitecontext)
  const [position, set_position] = useState('-right-[500px]')
  const cluster_id_params = useParams()
  const Navigate = useNavigate()

  const [current_unique_file_id, set_current_unique_file_id] = useState("")
  const [current_unique_image_axis, set_current_unique_image_axis] = useState("")

  const [imagesrc,set_imagesrc]=useState("")

  const [croppedImagePath, setCroppedImagePath] = useState(null);

  
  useEffect(() => {
    const cropImage = async (imagePath) => {
      const x1=current_unique_image_axis[0]
      const y1=current_unique_image_axis[1]
      const x2=current_unique_image_axis[2]
      const y2=current_unique_image_axis[3]
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const width = x2 - x1;
        const height = y2 - y1;

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, x1, y1, width, height, 0, 0, width, height);

        canvas.toBlob((blob) => {
          const newImagePath = URL.createObjectURL(blob);
          set_imagesrc(newImagePath)
        }, 'image/png');
      };

      img.onerror = (error) => {
        console.error('Error loading image:', error);
      };

      img.src = imagePath;
      set_imagesrc(imagePath)
    };

    if (total_received_images[current_unique_file_id]) {
      cropImage(total_received_images[current_unique_file_id]);
    }
  }, [total_received_images[current_unique_file_id]]);



  const ref = useRef(null)

  useEffect(() => {
    const doesClusterIdExist = () => {
      return unique_images.data.some(item => item.clusterId === cluster_id_params.clusterId);
    };
    if (!doesClusterIdExist()) {
      Navigate('/false')
    }
    const current_file_id = unique_images.data.filter(image => image.clusterId === current_cluster)
      .map(image => image.fileId);
    set_current_unique_file_id(current_file_id[0])
    const current_image_axis = unique_images.data.filter(image => image.clusterId === current_cluster)
    set_current_unique_image_axis([...current_image_axis[0].coords])
  }, [])






  const handle_suggestion_box = () => {
    if (position == '-right-[500px]')
      set_position('right-0')
    else
      set_position('-right-[500px]')
  }

  useEffect(() => {
    if (!ref.current) {
      if (!fetched_cluster_info.hasOwnProperty(cluster_id_params.clusterId)) {
        socket.emit("cluster_id", ({ "clusterId": cluster_id_params.clusterId }))
      }
      socket.on("cluster_id_refreshed", (clustered_data) => {
        const clusterId = clustered_data.data.clusterId;
        const dataArray = clustered_data.data.data;
        set_fetched_cluster_info(prevState => ({
          ...JSON.parse(JSON.stringify(prevState)),
          [clusterId]: [
            ...dataArray
          ]
        }));
      })
      ref.current = true
    }
  }, [])


  // useEffect(()=>{
  //   const clusterId = "67c45a8d_1ce2_4682_ae56_d41b3aad4a19";
  //   const dataArray = [ {
  //     "file_id": "bdfcf69f_1abf_442f_a657_b4afc14f0c9d",
  //     "coords": [429, 653, 1081, 1153],
  //     "matchedScore": 100
  //   },
  //   {
  //     "file_id": "37hcf69f_1abf_442f_a657_b4afc1430c9d",
  //     "coords": [309, 403, 997, 153],
  //     "matchedScore": 90
  //   }];
  //   set_fetched_cluster_info(prevState => ([
  //     ...JSON.parse(JSON.stringify(prevState)),
  //     {
  //       [clusterId]: [
  //         ...dataArray
  //       ]
  //     }
  //   ]));
  // },[])


  // useEffect(()=>{
  //   console.log(fetched_cluster_info)
  // },[fetched_cluster_info])

  return (
    <>
      <div className='fixed w-full z-20'>
        <Navbar nav_bg="bg-blue-800" />
        <div className=' bg-white px-2 sm:px-5 flex h-30 sm:h-36 w-full'>
          {/* <div className='w-1/4 sm:w-4/12 flex items-center'>
            <img src="/gourav.jpeg" className='h-20 w-20 sm:h-32 sm:w-32 rounded-full' />
          </div> */}

          <div className='w-1/4 sm:w-4/12 flex items-center relative'>
            <img src={imagesrc} className='h-20 w-20 sm:h-32 sm:w-32 rounded-full' />
            <div className="absolute top-0 left-0 w-full h-full">
              {current_unique_image_axis && (
                <div className="absolute" style={{
                  left: current_unique_image_axis[0],
                  top: current_unique_image_axis[1],
                  width: current_unique_image_axis[2] - current_unique_image_axis[0],
                  height: current_unique_image_axis[3] - current_unique_image_axis[1],
                  pointerEvents: 'none', // Make sure the axis doesn't interfere with clicks
                }}></div>
              )}
            </div>
          </div>

          <div className='ml-2 w-3/4 items-center flex sm:w-8/12'>
            <div className='h-5/6 sm:h-full xl:w-4/6'>
              <div className="flex p-1 sm:gap-3 h-full bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-start">
                <div className="relative w-1/4 lg:w-1/5 h-full">
                  <img className="w-full h-full rounded-md" loading="lazy" src={imagesrc} />
                </div>
                <div className="flex flex-col w-3/4 gap-2 px-2 py-2">
                  <p className="text-sm sm:text-lg font-semibold">Is This Image is Clustered Correctly ?</p>
                  <div className='flex items-center'>
                    <button type="button" className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1 text-center inline-flex items-center me-2 ">
                      <svg width="24" fill='white' height="24" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M 250 475C 279 504 359 586 390 615C 400 625 410 615 410 615C 410 615 625 400 750 275C 765 260 785 260 800 275C 816 292 837 313 850 325C 865 340 865 360 850 375C 700 525 583 642 425 800C 410 815 390 815 375 800C 292 717 150 575 150 575C 135 560 135 540 150 525C 150 525 200 475 200 475C 215 461 235 460 250 475C 250 475 250 475 250 475" /></svg>
                    </button>
                    <button onClick={handle_suggestion_box} type="button" className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1 text-center inline-flex items-center me-2 ">
                      <svg width="24" fill='white' height="24" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M 253 677C 242 666 242 652 253 641C 253 641 394 500 394 500C 394 500 253 359 253 359C 242 348 242 334 253 323C 253 323 323 253 323 253C 334 242 348 242 359 253C 359 253 500 394 500 394C 500 394 641 253 641 253C 652 242 666 242 677 253C 677 253 747 323 747 323C 758 334 758 348 747 359C 747 359 606 500 606 500C 606 500 747 641 747 641C 758 652 758 666 747 677C 747 677 677 747 677 747C 666 758 652 758 641 747C 641 747 500 606 500 606C 500 606 359 747 359 747C 348 758 334 758 323 747C 323 747 253 677 253 677" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className='pt-48 sm:pt-56'>
      <div className="grid mt-5 mb-10 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 px-5 md:px-10">

        {fetched_cluster_info[cluster_id_params.clusterId]?.map((data1, data1Index) => {
          return (
            <React.Fragment key={data1Index}>
              {/* <div className='px-5 md:px-10 text-xl mb-14 lg:mb-0 font-bold'>{months[`${month}`]} {year}</div> */}
                {/* {data1?.[cluster_id_params.clusterId]?.map((data2, data2Index) => {
                  return ( */}
                  {
                    total_received_images[data1.file_id] ? (
                      <div className='flex h-52' key={data1Index}>
                        <img
                          src={total_received_images[data1.file_id]}
                          className="h-full w-full object-fill rounded-lg cursor-pointer"
                        />
                        <div className='flex justify-end'>
                          <button onClick={() => delete_image_from_server(data1.file_id)} className="absolute px-1 mt-1 rounded-sm">
                            <svg width="24" height="24" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                              <path d="M 357 378C 344 378 332 390 333 403C 333 403 329 848 329 848C 329 857 333 866 341 870C 349 875 359 875 366 870C 374 866 379 858 379 849C 379 849 383 404 383 404C 383 397 380 391 375 386C 371 381 364 378 357 378C 357 378 357 378 357 378M 650 375C 636 375 625 386 625 400C 625 400 625 850 625 850C 625 859 630 867 637 872C 645 876 655 876 663 872C 670 867 675 859 675 850C 675 850 675 400 675 400C 675 393 672 387 668 382C 663 377 656 375 650 375C 650 375 650 375 650 375M 500 375C 486 375 475 386 475 400C 475 400 475 850 475 850C 475 859 480 867 487 872C 495 876 505 876 513 872C 520 867 525 859 525 850C 525 850 525 400 525 400C 525 393 522 387 518 382C 513 377 506 375 500 375C 500 375 500 375 500 375M 198 299C 198 299 800 299 800 299C 800 299 800 850 800 850C 800 913 759 950 700 950C 700 950 300 950 300 950C 238 950 200 911 201 855C 201 855 198 299 198 299M 438 138C 438 138 438 187 438 187C 438 187 563 187 563 187C 563 187 563 138 563 138C 563 138 438 138 438 138M 425 63C 425 63 575 63 575 63C 609 63 638 91 638 125C 638 125 638 187 638 187C 638 187 849 187 849 187C 870 187 887 204 887 225C 887 245 870 262 849 262C 849 262 151 263 151 263C 130 263 113 246 113 225C 113 205 130 188 151 188C 151 188 363 188 363 188C 363 188 363 125 363 125C 363 125 362 125 362 125C 362 91 391 63 425 63C 425 63 425 63 425 63" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className='flex h-52 bg-gray-300 animate-pulse rounded-md' key={data1Index}>
                        <img className="h-full w-full object-fill rounded-lg" />
                      </div>
                    )
                  }
                
            </React.Fragment>
          );
        })}
              </div>

      </div>


      <div className={`fixed z-30 mt-[31.5vh] pt-3 md:pt-6 px-3 bg-white rounded-lg shadow-2xl ${position} transition-all duration-700 top-0 w-2/3 sm:w-[50%] lg:w-1/3 xl:w-1/4 h-[67vh] border-2 border-gray-300`}>
        <div className='flex justify-between h-1/5 items-center'>
          <img className='h-24 w-24 lg:h-28 lg:w-28 rounded-lg border-2 border-gray-300' src="/gourav.jpeg" />
          <p class="text-md sm:text-xl ml-5 font-medium text-gray-900">Move This Image</p>
          <div className='h-full flex flex-col justify-start'>
            <button onClick={handle_suggestion_box} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto flex justify-center items-center">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>

        </div>



        <div className='overflow-y-scroll h-[70%] mt-7 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 flex-wrap'>
          {/* n publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is
          n publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is
          n publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is
          n publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is
          n publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is
          n publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is
          n publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is
          n publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is
          n publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is */}
          {
            unique_images?.data?.map((element, index) => {
              return (
                current_cluster != element.clusterId ?
                  <div key={index} className='h-14 w-14 cursor-pointer'>
                    <img className='h-full w-full rounded-full' src={`${total_received_images[element.fileId]}`} alt={`Image ${index + 1}`} />
                  </div> : ""
              );
            })
          }
        </div>




      </div>
    </>
  );
};
export default Show_cluster