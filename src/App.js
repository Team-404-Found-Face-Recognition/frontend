import React from 'react'
import Sitecontext from './context/Sitecontext'
import { useContext } from 'react';
import Home from './components/Home';
import Login from './components/login';
import { BrowserRouter,Navigate,Route,Routes } from 'react-router-dom';
import Upload_file from './components/upload_files/Upload_file';
import Signup from './components/signup';
import File_handling_test from './components/File_handling_test';
import Cluster from './components/Cluster';
import Show_cluster from './components/Show_cluster';

const App = () => {
  const {isChecked,logged_in,uid}=useContext(Sitecontext)

  return (
    <>
     <div className={isChecked ? "dark" :""}>
     {/* <BrowserRouter> */}
       <Routes>
         <Route path="/" element={<><Home/></>}></Route>
         <Route path="/:userId" element={!logged_in ? <Navigate to="../login" replace={true}/>:<><Upload_file/></>}></Route>
         <Route path="/login" element={logged_in ? <Navigate to={`../${uid}`} replace={true}/>:<><Login/></>}></Route>
         <Route path="/signup" element={logged_in ? <Navigate to={`../${uid}`} replace={true}/>:<><Signup/></>}></Route>
         <Route path="/testupload" element={<File_handling_test/>}></Route>
         <Route path="/cluster" element={!logged_in ? <Navigate to="../login" replace={true}/>:<Cluster/>}></Route>
         <Route path="/cluster/:clusterId" element={!logged_in ? <Navigate to="../login" replace={true}/>:<Show_cluster/>}></Route>
         <Route path="*" element={<Navigate to="/"/>}></Route>
       </Routes>
      {/* </BrowserRouter> */}
    </div>
      {/* <Navbar></Navbar> */}
    </>
  )
}

export default App