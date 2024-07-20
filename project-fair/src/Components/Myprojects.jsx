import React, { useContext, useEffect, useState } from 'react'
import Addprojects from '../Components/Addprojects'
import { deleteprojectAPI, userProjectAPI } from '../Services/allApi'
import { addprojectResponseContext, editprojectResponseContext } from '../Context/Contextshare'
import Editproject from './Editproject'


const Myprojects = () => {
const [token,setToken] = useState('')
const [projects,setProjects] = useState([])
const {addprojectResponse,setAddprojectResponce} = useContext(addprojectResponseContext)
const {editprojectResponse,setEditProjectResponse} = useContext(editprojectResponseContext)

useEffect(()=>{
  if(sessionStorage.getItem('token')){
    setToken(sessionStorage.getItem('token'))
  }
},[]);


useEffect(()=>{
  if(token){
    getuserProjects()
  }
},[token,addprojectResponse,editprojectResponse]);


const getuserProjects = async ()=>{
  const reqHeader = {
    "Content-Type":"application/json",
    'Authorization':`Bearer ${token}`
  }
  // console.log("Request Header:", reqHeader);

 const result = await userProjectAPI(reqHeader);
//  console.log(result);
 if(result.status===200){
  setProjects(result.data)
 }else{
  alert(result.response.data)
 }
}

useEffect(() => {
  // console.log(projects); 
}, [projects]);

const handledelete = async (e,projectId)=>{
  e.preventDefault()
  const reqHeader = {
    "Content-Type":"application/json", 'Authorization':`Bearer ${token}`
  }

  const result = await deleteprojectAPI(projectId,reqHeader)
  if(result.status===200){
    alert('successfully deleted')
    getuserProjects()
  }
  else{
    alert(result.response.data)
    console.log(result);
  }
}

  return (
    <>
        <div className='card shadow p-3 m-2' style={{backgroundColor:'#c5def0'}}>
        <div className='d-flex justify-content-between'>
        <h4>My Projects</h4>
        <div className='ms-auto'><Addprojects/></div>
        </div>
        
        <div className='mt-4'>
          { projects?.length>0?
          projects?.map((project)=>(
            <div key={project.id} className="border d-flex align-items-center rounded-p-2">
            <h4>{project.title}</h4>
            <div className='icons ms-auto'>
                <Editproject projectid={project}/>
                <button onClick={(e)=>handledelete(e,project._id)} className='btn bg-danger'><i class="fa-solid fa-trash"></i></button>
                <button className='btn bg-warning'><i class="fa-brands fa-github"></i> </button>
            </div>
            </div>
          )):
          <p className='text-danger fw-bolder'>No Projects Uploaded!!!</p>
          }
          </div>
      </div>
    </>
  )
}

export default Myprojects