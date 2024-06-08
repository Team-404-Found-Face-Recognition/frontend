import React, { useEffect, useState } from 'react';
import axios from 'axios';

const File_handling_test = () => {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [failedFiles, setFailedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(1);
  const [total_file_size, set_total_file_size] = useState(1);
  const [current_file_size,set_current_file_size]=useState(0)
  const [till_nth_upload_size,set_nth_upload_Size]=useState(0)


  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setFiles(selectedFiles);
    let temp=0
    selectedFiles.forEach((file) => {
        temp += file.size;
    });

    set_total_file_size(temp)
  
    // console.log(total_file_size)
  };

  // useEffect(()=>{
  //   console.log(total_file_size)
  // },[total_file_size])

  useEffect(()=>{
    let temp=current_file_size;
    // console.log(temp)
    // console.log(total_file_size)
    temp=(temp/total_file_size)*100;
    // console.log(temp)
    temp+=till_nth_upload_size
    // console.log(temp)
    // console.log(till_nth_upload_size)
    set_nth_upload_Size(temp)
  
  },[current_file_size])

  useEffect(()=>{
    setUploadProgress(till_nth_upload_size)
  },[till_nth_upload_size])

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('photo', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      setUploadedFiles((prevUploadedFiles) => [...prevUploadedFiles, response.data.file]);
      console.log("size : ",response.data.file.size)
      set_current_file_size(response.data.file.size)
    //    console.log(response.data.file.size)
    } catch (error) {
      // console.error('Error uploading file:', error);
      let temp_new_size=total_file_size-file.size;
      set_total_file_size(temp_new_size)
      setFailedFiles((prevFailedFiles) => [...prevFailedFiles, file]);
    }
  };

  const handleUpload = async () => {
    for (const file of files) {
      await uploadFile(file);
    }
    setUploadProgress(0);
  };


  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <div>
      {uploadProgress > 1 && uploadProgress < 99 && (
          <div>Uploading... {Math.round(uploadProgress)}%</div>
        )}
                {uploadProgress > 99 && <div>All files uploaded successfully!</div>}

        <h3>Uploaded Files:</h3>
        {uploadedFiles.map((file, index) => (
          <img key={index} src={`http://localhost:5000/uploads/${file.filename}`} alt={`Uploaded ${index}`} />
        ))}
        <h3>Failed Files:</h3>
        {failedFiles.map((file, index) => (
          // <div key={index}>{file.name}</div>
          <img src={URL.createObjectURL(file)}  alt={`Uploaded ${index}`} />
        ))}
        
      </div>
    </div>
  );
};

export default File_handling_test;
