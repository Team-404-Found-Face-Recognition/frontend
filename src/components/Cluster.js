import React from 'react'
import { useState, useEffect , useRef } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import Sitecontext from '../context/Sitecontext'
const Cluster = () => {

    const { unique_images , total_received_images , cropped_unique_images, set_current_cluster ,change_name_unique_image } = useContext(Sitecontext)


    const [show_modal, set_show_modal] = useState("hidden")
    const [modal_image, set_modal_image] = useState("")
    const [change_name, set_change_name] = useState("")
    const [current_changing_cluster_id,set_current_changing_cluster_id]=useState("")
    const handle_modal = (image_name,cluster_id) => {
        set_modal_image(image_name)
        set_current_changing_cluster_id(cluster_id)
        set_show_modal("block")
    }

    const handle_input_name = (e) => {
        set_change_name(e.target.value)
    }

    const submit_name_change = (e) => {
        e.preventDefault()
        change_name_unique_image(current_changing_cluster_id,change_name)
        set_change_name("")
        set_show_modal("hidden")
    }

    const close_modal = () => {
        set_show_modal("hidden")
        set_modal_image("")
    }

    const [cropped_image,set_cropped_image]=useState([])


    // useEffect(() => {
    //     const cropImage = async (imagePath,coords) => {
    //       const x1=coords[0]
    //       const y1=coords[1]
    //       const x2=coords[2]
    //       const y2=coords[3]
    //       const img = new Image();
    
    //       img.onload = () => {
    //         const canvas = document.createElement('canvas');
    //         const ctx = canvas.getContext('2d');
    
    //         const width = x2 - x1;
    //         const height = y2 - y1;
    
    //         canvas.width = width;
    //         canvas.height = height;
    
    //         ctx.drawImage(img, x1, y1, width, height, 0, 0, width, height);
    
    //         canvas.toBlob((blob) => {
    //           const newImagePath = URL.createObjectURL(blob);
    //         //   set_imagesrc(newImagePath)
              
    //           set_cropped_image(prev=>[...prev,newImagePath])
              
    //           console.log([...cropped_image,newImagePath])

    //         }, 'image/png');
    //       };
    
    //       img.onerror = (error) => {
    //         console.error('Error loading image:', error);
    //       };
    
    //       img.src = imagePath;
    //       set_cropped_image((prev)=> [...prev,imagePath])   
    //       console.log([...cropped_image,imagePath])
     
    //     };

    //     unique_images?.data?.map((element,index)=>{
    //         if (total_received_images[element.fileId]) {
    //             cropImage(total_received_images[element.fileId],element.coords);
    //         }
    //     })
    
      
    //   },[unique_images]);
    
    
  

    return (
        <>
            <Navbar nav_bg="bg-blue-800" />

            <section className='bg-slate-50 px-5 py-3'>
                <div className='ml-3 lg:mb-3'>
                    <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl p-6 pl-0">
                        <span class="block">
                            Unique
                            <span class="text-transparent bg-clip-text bg-gradient-to-tr to-cyan-500 from-blue-600">
                                Faces
                            </span>
                        </span>
                    </h1>
                </div>
                <div className='grid h-screen overflow-y-scroll grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2'>

                    {/* {
                        all_card_color.map((element, index) => {
                            return (
                                <div className='mb-5 flex flex-col items-center'>
                                    <Link to="/cluster/788_ujnj_889_ghfhhf">
                                        <img className='h-32 w-32 rounded-full' src="/gourav.jpeg" />
                                    </Link>
                                    <div className='flex w-full justify-center px-3 items-center mt-3'>
                                        <p class="text-md w-4/5 font-semibold text-center text-gray-900">Jatin</p>
                                        <svg className='cursor-pointer' onClick={() => handle_modal('/gourav.jpeg')} width="20" fill='#1d4ed8' height="20" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M 227 681C 227 681 205 791 205 791C 205 791 316 769 316 769C 316 769 227 681 227 681M 688 221C 688 221 326 578 326 578C 326 578 419 670 419 670C 419 670 781 313 781 313C 781 313 688 221 688 221M 810 100C 810 100 790 119 790 119C 790 119 882 211 882 211C 882 211 902 192 902 192C 902 192 810 100 810 100M 809 23C 827 23 846 30 860 44C 860 44 958 141 958 141C 959 142 960 143 961 144C 986 172 984 214 959 241C 959 242 958 242 958 243C 958 243 908 291 908 291C 898 301 883 304 869 299C 871 303 872 307 872 312C 872 312 872 312 872 312C 872 313 872 313 872 313C 872 326 866 337 856 344C 856 344 446 749 446 749C 435 759 420 763 407 758C 408 762 409 765 409 769C 409 769 409 770 409 770C 409 770 409 771 409 771C 409 783 403 794 393 801C 393 801 373 821 373 821C 361 835 348 839 339 841C 338 841 338 841 337 841C 337 841 214 866 214 866C 214 866 214 866 213 866C 165 874 120 830 130 781C 130 781 155 662 155 662C 157 644 166 633 170 628C 171 626 172 625 174 624C 174 624 199 599 199 599C 209 589 224 585 238 590C 233 577 236 561 247 551C 247 551 661 141 661 141C 672 131 688 128 701 133C 695 119 699 102 710 92C 710 92 759 45 759 45C 772 30 791 23 809 23C 809 23 809 23 809 23M 150 13C 150 13 650 13 650 13C 664 12 676 19 683 31C 690 43 690 57 683 69C 676 81 664 88 650 88C 650 88 150 88 150 88C 138 88 121 95 108 108C 95 121 88 138 88 150C 88 150 88 850 88 850C 88 862 95 879 108 892C 121 905 138 912 150 912C 150 912 850 912 850 912C 862 912 879 905 892 892C 905 879 912 862 912 850C 912 850 912 350 912 350C 912 336 919 324 931 317C 943 310 957 310 969 317C 981 324 988 336 987 350C 987 350 987 850 987 850C 987 887 970 920 945 945C 921 970 888 987 850 987C 850 987 150 987 150 987C 113 987 79 970 55 945C 30 921 13 887 13 850C 13 850 13 150 13 150C 13 113 30 79 55 55C 79 30 113 13 150 13C 150 13 150 13 150 13" /></svg>
                                    </div>
                                </div>
                            )
                        })
                    } */}

                    {
                        unique_images?.data?.map((element,index)=>{
                        
                            // console.log(temp)
                            // console.log("->",total_received_images[temp])
                            return(
                                <div className='mb-5 flex flex-col items-center'>
                                    <Link onClick={()=>{set_current_cluster((prev)=>element.clusterId)}} to={`${element.clusterId}`}>
                                        <img className='h-32 w-32 rounded-full' src={cropped_unique_images[`${element.fileId}`]} />
                                    </Link>
                                    <div className='flex w-full justify-center px-3 items-center mt-3'>
                                        <p class="text-md w-4/5 font-semibold text-center text-gray-900">{element.clusterName?element.clusterName:"Add Name"}</p>
                                        <svg className='cursor-pointer' onClick={() => handle_modal(cropped_unique_images[element.fileId],element.clusterId)} width="20" fill='#1d4ed8' height="20" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M 227 681C 227 681 205 791 205 791C 205 791 316 769 316 769C 316 769 227 681 227 681M 688 221C 688 221 326 578 326 578C 326 578 419 670 419 670C 419 670 781 313 781 313C 781 313 688 221 688 221M 810 100C 810 100 790 119 790 119C 790 119 882 211 882 211C 882 211 902 192 902 192C 902 192 810 100 810 100M 809 23C 827 23 846 30 860 44C 860 44 958 141 958 141C 959 142 960 143 961 144C 986 172 984 214 959 241C 959 242 958 242 958 243C 958 243 908 291 908 291C 898 301 883 304 869 299C 871 303 872 307 872 312C 872 312 872 312 872 312C 872 313 872 313 872 313C 872 326 866 337 856 344C 856 344 446 749 446 749C 435 759 420 763 407 758C 408 762 409 765 409 769C 409 769 409 770 409 770C 409 770 409 771 409 771C 409 783 403 794 393 801C 393 801 373 821 373 821C 361 835 348 839 339 841C 338 841 338 841 337 841C 337 841 214 866 214 866C 214 866 214 866 213 866C 165 874 120 830 130 781C 130 781 155 662 155 662C 157 644 166 633 170 628C 171 626 172 625 174 624C 174 624 199 599 199 599C 209 589 224 585 238 590C 233 577 236 561 247 551C 247 551 661 141 661 141C 672 131 688 128 701 133C 695 119 699 102 710 92C 710 92 759 45 759 45C 772 30 791 23 809 23C 809 23 809 23 809 23M 150 13C 150 13 650 13 650 13C 664 12 676 19 683 31C 690 43 690 57 683 69C 676 81 664 88 650 88C 650 88 150 88 150 88C 138 88 121 95 108 108C 95 121 88 138 88 150C 88 150 88 850 88 850C 88 862 95 879 108 892C 121 905 138 912 150 912C 150 912 850 912 850 912C 862 912 879 905 892 892C 905 879 912 862 912 850C 912 850 912 350 912 350C 912 336 919 324 931 317C 943 310 957 310 969 317C 981 324 988 336 987 350C 987 350 987 850 987 850C 987 887 970 920 945 945C 921 970 888 987 850 987C 850 987 150 987 150 987C 113 987 79 970 55 945C 30 921 13 887 13 850C 13 850 13 150 13 150C 13 113 30 79 55 55C 79 30 113 13 150 13C 150 13 150 13 150 13" /></svg>
                                    </div>
                                </div>
                            )
                        })
                    }
                    





                </div>
            </section>


            <div id="default-modal" class={`${show_modal} overflow-y-auto overflow-x-hidden fixed top-[15%] right-0 left-[9%] sm:left-[23%] md:left-[30%] lg:left-[40%] z-50 justify-center w-80 items-center`}>
                <div class="relative p-4 w-full max-w-2xl max-h-full">
                    <div class="relative bg-white rounded-lg shadow">
                        <div class="flex items-center justify-between p-4 md:p-5 border-b border-gray-300 rounded-t ">
                            <h3 class="text-xl font-semibold text-gray-900">
                                Change Image Name
                            </h3>
                            <button onClick={close_modal} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div class="p-4 md:p-5 space-y-4">
                            <img className='w-full h-64 rounded-xl object-fill' src={modal_image} />
                        </div>
                        <form onSubmit={submit_name_change}>
                            <div class=" p-4 md:p-5 border-t border-gray-200 rounded-b ">
                                <div className='mb-2 -mt-2'>
                                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900">First name</label>
                                    <input onChange={handle_input_name} value={change_name} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" minLength={2} placeholder="John" required />
                                </div>
                                <button type="submit" class="text-white bg-blue-700 flex justify-center items-center hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    Change Name
                                    {/* <svg width="20" height="20" fill='white' className='ml-2 animate-spin' viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M 401 118C 404 136 393 153 376 159C 210 220 112 389 143 563C 174 736 324 863 500 863C 676 862 826 736 857 563C 888 389 790 220 624 159C 604 152 594 131 601 111C 608 91 630 81 650 89C 849 161 968 367 931 576C 894 785 712 937 500 938C 288 938 106 785 69 576C 32 367 151 161 350 89C 355 87 359 86 364 86C 382 87 398 100 401 118C 401 118 401 118 401 118" /></svg> */}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>



            <Footer />

        </>
    )
}

export default Cluster