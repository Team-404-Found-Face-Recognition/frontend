import React, { useEffect, useState, useRef } from 'react';
import Sitecontext from './Sitecontext';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const SOCKET_URL = 'http://127.0.01:5000/data';

const All_context = (props) => {
  const Navigate = useNavigate()
  const host = "http://localhost:5000";
  const socketRef = useRef(null); // Use ref to store the socket instance
  const [isChecked, setIsChecked] = useState(true);
  const [logged_in, set_logged_in] = useState(false);
  const [uid, set_uid] = useState(false);
  const [access_token, set_access_token] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(1);
  const [total_file_size, set_total_file_size] = useState(1);
  const [current_file_size, set_current_file_size] = useState(0)
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [failedFiles, setFailedFiles] = useState([]);
  const [sorted_data, set_sorted_data] = useState({})
  const [intial_fetch_image_flag, set_fetch_image_flag] = useState(true)
  const [total_received_images, set_received_images] = useState({})
  const [current_cluster,set_current_cluster]=useState("")
  const [fetched_cluster_info,set_fetched_cluster_info]=useState({
  //   "79c45a8d_1ce2_4682_ae56_d41b3aad4a19":[
  //   {
  //     "file_id": "bdfcf69f_1abf_442f_a657_b4afc14f0c9d",
  //     "coords": [429, 653, 1081, 1153],
  //     "matchedScore": 100
  //   },
  //   {
  //     "file_id": "37hcf69f_1abf_442f_a657_b4afc1430c9d",
  //     "coords": [309, 403, 997, 153],
  //     "matchedScore": 90
  //   }
  // ]
})
  const [unique_images,set_unique_images]=useState({
  //   "message": "Cluster data refreshed!",
  //   "data": [
  //       {
  //           "clusterId": "79c45a8d_1ce2_4682_ae56_d41b3aad4a19",
  //           "clusterName": "srk",
  //           "fileId": "0e06e663_cc01_43c8_9474_92815f76be3d",
  //           "coords": [
  //               49,
  //               0,
  //               174,
  //               169
  //           ]
  //       },
  //       {
  //           "clusterId": "0bfa3218_9492_4708_b58c_e4c9205baf21",
  //           "clusterName": null,
  //           "fileId": "1341b382_dc47_47b8_9926_9d807fc164eb",
  //           "coords": [
  //               19,
  //               11,
  //               140,
  //               180
  //           ]
  //       },
  //       {
  //           "clusterId": "a6161edc_31bd_45c8_8a8b_50cf93b09952",
  //           "clusterName": null,
  //           "fileId": "4cad0068_10fe_4122_8970_2d6e6e9869b4",
  //           "coords": [
  //               31,
  //               33,
  //               163,
  //               197
  //           ]
  //       },
  //       {
  //           "clusterId": "11382922_f59f_45fd_b92a_65155d688039",
  //           "clusterName": null,
  //           "fileId": "57a4fbdd_3fda_4059_a8b4_886a6f12c64e",
  //           "coords": [
  //               32,
  //               6,
  //               166,
  //               185
  //           ]
  //       },
  //       {
  //           "clusterId": "9a2ba60c_5a4a_48c0_94d7_d6a9c54e4174",
  //           "clusterName": null,
  //           "fileId": "60aba036_e464_4ba9_bd5e_81ea18bd598d",
  //           "coords": [
  //               134,
  //               90,
  //               924,
  //               1126
  //           ]
  //       },
  //       {
  //           "clusterId": "4fed5a99_e776_4c03_9bbe_769bb2b0405a",
  //           "clusterName": null,
  //           "fileId": "826d668b_d2cb_4d33_a5dd_2113ac7e4c94",
  //           "coords": [
  //               104,
  //               12,
  //               190,
  //               102
  //           ]
  //       },
  //       {
  //           "clusterId": "2f0a2311_e090_4ffb_84fc_1091630751c3",
  //           "clusterName": null,
  //           "fileId": "826d668b_d2cb_4d33_a5dd_2113ac7e4c94",
  //           "coords": [
  //               53,
  //               30,
  //               136,
  //               118
  //           ]
  //       },
  //       {
  //           "clusterId": "e25527b2_0ce3_4e1f_b0af_f3d61e98ea8e",
  //           "clusterName": null,
  //           "fileId": "826d668b_d2cb_4d33_a5dd_2113ac7e4c94",
  //           "coords": [
  //               35,
  //               10,
  //               122,
  //               104
  //           ]
  //       },
  //       {
  //           "clusterId": "f436242d_7ec6_4047_8706_bfe261fc6bf1",
  //           "clusterName": null,
  //           "fileId": "826d668b_d2cb_4d33_a5dd_2113ac7e4c94",
  //           "coords": [
  //               137,
  //               0,
  //               222,
  //               88
  //           ]
  //       },
  //       {
  //           "clusterId": "bfee2f1f_9f70_4cec_a0af_78b4be6bc178",
  //           "clusterName": null,
  //           "fileId": "826d668b_d2cb_4d33_a5dd_2113ac7e4c94",
  //           "coords": [
  //               79,
  //               25,
  //               164,
  //               114
  //           ]
  //       },
  //       {
  //           "clusterId": "08e94ed8_e693_4f24_b7fc_d451f8e58a00",
  //           "clusterName": null,
  //           "fileId": "88ea1003_62a8_4f21_b864_0de882047fe5",
  //           "coords": [
  //               147,
  //               0,
  //               452,
  //               276
  //           ]
  //       },
  //       {
  //           "clusterId": "432c2af4_b97b_4659_acf1_c241b011249d",
  //           "clusterName": null,
  //           "fileId": "8d639c30_5b64_480b_a3ef_e641a8626798",
  //           "coords": [
  //               187,
  //               0,
  //               455,
  //               177
  //           ]
  //       },
  //       {
  //           "clusterId": "2e89af84_aa6b_4b10_9a41_2b1ae0f449b0",
  //           "clusterName": null,
  //           "fileId": "8d639c30_5b64_480b_a3ef_e641a8626798",
  //           "coords": [
  //               60,
  //               0,
  //               328,
  //               181
  //           ]
  //       },
  //       {
  //           "clusterId": "48379d88_9b49_4489_9a20_988a426f0ea4",
  //           "clusterName": null,
  //           "fileId": "8d639c30_5b64_480b_a3ef_e641a8626798",
  //           "coords": [
  //               375,
  //               128,
  //               661,
  //               336
  //           ]
  //       },
  //       {
  //           "clusterId": "3f75d33e_1d4d_4b52_ae59_05125fe2f9da",
  //           "clusterName": null,
  //           "fileId": "8d639c30_5b64_480b_a3ef_e641a8626798",
  //           "coords": [
  //               65,
  //               117,
  //               344,
  //               314
  //           ]
  //       },
  //       {
  //           "clusterId": "ca5cca9c_3bde_496f_ab28_bb1d5260588c",
  //           "clusterName": null,
  //           "fileId": "8d639c30_5b64_480b_a3ef_e641a8626798",
  //           "coords": [
  //               455,
  //               0,
  //               732,
  //               190
  //           ]
  //       },
  //       {
  //           "clusterId": "84bda29d_27ae_4bea_b21b_2aba404d28ab",
  //           "clusterName": null,
  //           "fileId": "8d639c30_5b64_480b_a3ef_e641a8626798",
  //           "coords": [
  //               303,
  //               0,
  //               582,
  //               191
  //           ]
  //       },
  //       {
  //           "clusterId": "d46f617c_e1c2_4390_a028_a352cf3d1cba",
  //           "clusterName": null,
  //           "fileId": "8d639c30_5b64_480b_a3ef_e641a8626798",
  //           "coords": [
  //               0,
  //               77,
  //               224,
  //               260
  //           ]
  //       },
  //       {
  //           "clusterId": "68f2058b_5d07_4fad_a878_18726cee4231",
  //           "clusterName": null,
  //           "fileId": "8d639c30_5b64_480b_a3ef_e641a8626798",
  //           "coords": [
  //               512,
  //               100,
  //               740,
  //               300
  //           ]
  //       },
  //       {
  //           "clusterId": "a7f49cfb_4a6c_4c08_af9e_c01787ff2bf5",
  //           "clusterName": null,
  //           "fileId": "8dfcf69f_1abf_442f_a657_b4afc14f0c9d",
  //           "coords": [
  //               429,
  //               653,
  //               1081,
  //               1153
  //           ]
  //       },
  //       {
  //           "clusterId": "e91e1d92_7636_4e60_8b6e_26fd0b2b280d",
  //           "clusterName": null,
  //           "fileId": "bd1f643c_1466_406d_96b3_9684633ad312",
  //           "coords": [
  //               45,
  //               1,
  //               165,
  //               89
  //           ]
  //       },
  //       {
  //           "clusterId": "54243601_e354_4606_970c_82101b2fe619",
  //           "clusterName": null,
  //           "fileId": "c47b7369_8b2e_4b01_a636_e9b11fd8f89f",
  //           "coords": [
  //               138,
  //               44,
  //               363,
  //               208
  //           ]
  //       },
  //       {
  //           "clusterId": "ba2ae22e_b3b8_4609_b1d8_afe47f13521d",
  //           "clusterName": null,
  //           "fileId": "c47b7369_8b2e_4b01_a636_e9b11fd8f89f",
  //           "coords": [
  //               282,
  //               73,
  //               506,
  //               236
  //           ]
  //       },
  //       {
  //           "clusterId": "ba2bf2ad_ed1e_413d_a3a9_8aa174ad97f2",
  //           "clusterName": null,
  //           "fileId": "f9bb3d3a_15e7_497b_bcb5_dc9a59541cdb",
  //           "coords": [
  //               101,
  //               0,
  //               481,
  //               428
  //           ]
  //       }
  //   ]
})
  const [testing_data, set_testing_data] = useState({
    "message": "User data refreshed!",
    "data": [
      {
        "date": "6/2024",
        "info": [
          {
            "fileId": "03f8b991_5034_4305_98b0_716a6ba2ea91",
            "fileType": "image",
            "uploadDate": "5/6/2024"
          },
          {
            "fileId": "04014237_01b0_4b86_b221_0857d22a6953",
            "fileType": "image",
            "uploadDate": "5/6/2024"
          },
          {
            "fileId": "045fdb25_f4b2_46ed_b243_2351b48201e5",
            "fileType": "image",
            "uploadDate": "5/6/2024"
          },
        ]
      },
      {
        "date": "5/2024",
        "info": [
          {
            "fileId": "07bd76a1_3fed_4f4a_a964_73ee50327576",
            "fileType": "image",
            "uploadDate": "25/5/2024"
          },
          {
            "fileId": "0890f9ac_5d4e_467c_944c_41f79247b0c9",
            "fileType": "image",
            "uploadDate": "15/5/2024"
          },
          {
            "fileId": "08b02745_8565_489b_b090_98c64eb16538",
            "fileType": "image",
            "uploadDate": "6/5/2024"
          },
        ]
      }
    ]
  })
  // total_file_size, set_total_file_size ,current_file_size, set_current_file_size,uploadedFiles, setUploadedFiles,failedFiles, setFailedFiles




  const disconnect_user = () => {
    if (socketRef.current) {
      set_uid(false)
      set_access_token(false)
      set_logged_in(false)
      localStorage.removeItem('refresh_token')
      socketRef.current.disconnect()
      socketRef.current = null
    }
  };

  const initializeSocket = () => {
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL, {
        query: { jwt_token: access_token }
      });

      socketRef.current.emit("cluster")

      socketRef.current.on("cluster_refreshed",(data)=>{
        // console.log(data)
        set_unique_images(JSON.parse(JSON.stringify(data)))
      })

     

      socketRef.current.on('refreshed', async (data) => {
        // console.log(data)

        set_sorted_data(JSON.parse(JSON.stringify(data)))

        // try {
        //   const response = await axios.post("http://localhost:5000/get_temp_data", data)
        // }
        // catch (error) {
        //   toast.error(error.message)
        // }

      })

      socketRef.current.on("disconnect_user", () => {
        // console.log("Hlo")
        disconnect_user()
      })
    }
  };


  // useEffect(() => {
  //   fetch_sorted_images();
  // }, []);

  // useEffect(() => {
  //   const fetch_images=async()=>{
  //     if (Object.keys(sorted_data).length) {
  //       for (let data of sorted_data.data[0].info) {
  //         console.log(data)
  //         // console.log(sorted_data.data[0].info)
  //         try {
  //           const response = await fetch("https://http://127.0.01:5000/data/get", {
  //             method: 'POST',
  //             headers: {
  //               'Content-Type': 'application/json',
  //               'Authorization' : `${access_token}`
  //             },
  //             body : JSON.stringify({fileId : data.fileId})
  //           })
  //           const image = await response.blob()
  //           const imageURL = URL.createObjectURL(image)
  //           console.log(imageURL)

  //         }
  //         catch(error)
  //         {
  //           toast.error(error.message)
  //         }
  //       }
  //     }
  //   }
  //   fetch_images()
  // }, [sorted_data])


  const change_name_unique_image=async(cluster_id,cluster_name)=>{
    try{
      const response = await fetch("http://127.0.01:5000/cluster/change-name",{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `${access_token}`
        },
        body:JSON.stringify({clusterId:cluster_id,clusterName:cluster_name})
      })
      const json = await response.json()
      if(response.ok)
      {
        toast.success(json.message)
      }
      else
      {
        toast.message("Facing Technical Issue")
      }
    }
    catch(error)
    {
      toast.error("Facing Technical Issue")
    }
  }


  const updated_images_fetch = async () => {
    for (let index of sorted_data.data[0].info) {
      if(!total_received_images[index.fileId])     
      {
        try {
          const response = await fetch("http://127.0.01:5000/data/get", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${access_token}`
            },
            body: JSON.stringify({ fileId: index.fileId })
          })
          const image = await response.blob()
          // console.log(image)
          const imageURL = URL.createObjectURL(image)
          // console.log(imageURL)
          set_received_images(prevImages => ({
            ...prevImages,
            [index.fileId]: imageURL
          }))
        }
        catch (error) {
          toast.error(error.message)
        }
      } 
    }
  }

  async function fetch_images() {
    if (sorted_data?.data?.length && intial_fetch_image_flag) {
      let count = 0
      for (let data of sorted_data.data) {
        for (let index of data.info) {
          // count++;
          // console.log(count)
          try {
            const response = await fetch("http://127.0.01:5000/data/get", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `${access_token}`
              },
              body: JSON.stringify({ fileId: index.fileId })
            })
            const image = await response.blob()
            // console.log(image)
            const imageURL = URL.createObjectURL(image)
            // console.log(imageURL)
            set_received_images(prevImages => ({
              ...prevImages,
              [index.fileId]: imageURL
            }))
          }
          catch (error) {
            toast.error(error.message)
          }
        }
      }
      set_fetch_image_flag(false)
 
    }
    else if (sorted_data?.data?.length) {
      updated_images_fetch()
    }
  }



  useEffect(() => {
    fetch_images()
  }, [sorted_data])


  useEffect(() => {
    if (uid)
      initializeSocket()
  }, [uid])

  const login_request = async (email, password) => {
    try {
      const response = await fetch(`http://127.0.01:5000/auth/sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailId: email, password: password }),
      });

      const json = await response.json()
      if (response.status == 200) {
        toast.success("Signed In successfully")
        set_logged_in(true)
        set_access_token(json.access_token)
        // localStorage.setItem("access_token", json.access_token)
        set_uid(json.userId)
        localStorage.setItem("refresh_token", json.refresh_token)
      }
      else {
        toast.error(json.message)
      }
    }
    catch (error) {
      toast.error("Unable to process request at this moment")
    }

  };

  const signup_request = async (email, password) => {
    try {
      const response = await fetch(`http://127.0.01:5000/auth/sign-up`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailId: email, password: password }),
      });

      const json = await response.json();
      if (response.status === 200) {
        toast.success(json.message);
        localStorage.setItem("refresh_token", json.refresh_token);
        set_access_token(json.access_token);
        // localStorage.setItem("access_token", json.access_token)
        set_uid(json.userId)
        set_logged_in(true)
        initializeSocket()
      } else {
        toast.error(json.message);
      }
    }
    catch (error) {
      toast.error("Unable to process request at this moment")
    }

  };


  const delete_image_from_received_images_state = (fileId) => {
    set_received_images(prevImages => {
      const { [fileId]: _, ...newImages } = prevImages;
      return newImages;
    });
  };

  const change_cluster=async(cluster_id,file_id,new_cluster_id)=>{
    try{
      const response=await fetch("http://127.0.01:5000/",{
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${access_token}`
        },
        body : JSON.stringify({clusterId:cluster_id,fileId:file_id,targetClusterId:new_cluster_id})
      })
      const json=await response.json()
      if(response.ok)
      {
        toast.success("Successfully Clustered")
      }
      else 
      {
        toast.warning("Unable to fullfil")
      }
    }
    catch(error)
    {
      toast.warning("Unable to fullfil")
    }
  }


  const delete_image_from_server=async(file_id)=>{
    try {
      const response = await fetch("http://127.0.01:5000/data/delete", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${access_token}`
        },
        body: JSON.stringify({ fileId: file_id })
      })
      const json = await response.json()
      if(response.status==200)
      {
        toast.success(json.message)
        delete_image_from_received_images_state(file_id)
      }
      else 
      {
        toast.error("Unable to delete")
      }
    } catch (error) {
      toast.warning(error.message)
    }
  }



  const upload_live_server = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileType', "image")

    try {
      const response = await axios.post('http://127.0.01:5000/data/upload', formData, {
        headers: {
          'Authorization': `${access_token}`
        },
      });
    } catch (error) {
      setFailedFiles((prevFailedFiles) => [...prevFailedFiles, file]);
      toast.warning(`Unable to upload ${file.name}`)
    }
    set_current_file_size(file.size)
  }


  useEffect(() => {
    const authenticate = async () => {
      try {
        const refresh_token = localStorage?.getItem("refresh_token");
        if (refresh_token) {
          const response = await fetch(`http://127.0.01:5000/auth/authenticate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${refresh_token}`,
            },
          });
          const json = await response.json()
          if (response.status === 200) {
            // console.log(json.access_token)
            set_access_token(json.access_token);
            set_uid(json.userId)
            set_logged_in(true)
          } else {
            toast.warning("Unable To Authenticate");
          }
        }
      }
      catch (error) {
        // Do nothing
      }
    }
    authenticate();
  }, []);

  const signout = () => {
    socketRef.current.emit('disconnect_all_sockets', (uid))
  };

  return (
    <Sitecontext.Provider value={{ isChecked, total_received_images,fetched_cluster_info, logged_in, unique_images,set_current_cluster,current_cluster, sorted_data, uid, access_token, uploadProgress, total_file_size, set_total_file_size, current_file_size, set_current_file_size, uploadedFiles, failedFiles, setFailedFiles, setUploadProgress, setIsChecked,delete_image_from_server , signup_request, signout, change_name_unique_image, login_request, upload_live_server, set_fetched_cluster_info, socket: socketRef.current }}>
      {props.children}
    </Sitecontext.Provider>
  );
};

export default All_context;
