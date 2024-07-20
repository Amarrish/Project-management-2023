import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Col,Row } from 'react-bootstrap'
import ProjectCard from '../Components/Projectcard'
import { homeproject } from '../Services/allApi'


const Projects = () => {

  const[searchkey,setSearchkey] = useState("")
const [allprojects,setAllprojects] = useState([])

  const getallprojects = async (token)=>{
    const reqHeader = {
      "Content-Type":"application/json", "Authorization":`Bearer ${token}`
    }
    const result = await homeproject(searchkey,reqHeader)
    console.log(result);
    if(result.status===200){
      setAllprojects(result.data)
    }else{
      alert(result.data.response)
    }
  }


console.log('allproject',allprojects);

  useEffect (()=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem('token')
      getallprojects(token)
      console.log(token);
    }else{
      alert('Please Login')
    }
},[searchkey])
 console.log(searchkey);
  return (
    <div>
      {/* navbar */}
      <Header/>
      {/*all projects */}
      <div className='mt-5 text-center'>
    <h1 className='mt-5 mb-5'>All Projects</h1>
    {/* search */}
    <div className="d-flex  mb-5 justify-content-center w-100">
      <div className="d-flex w-50 align-items-center">
        <input className='form-control' placeholder='Search Project By Technologies' onChange={e=>setSearchkey(e.target.value)}/>
        <i style={{marginLeft:'-30px'}} class="fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
      </div>

      <div className="container-fluid d-flex flex-wrap justify-content-between">
        {allprojects?.length>0?
        allprojects?.map((projects)=>(
          <Row className='mt-2'>
          <Col sm={12} md={6} lg={4}>
            <ProjectCard projects={projects}/>
          </Col>
        </Row>
        )): null
        }
      </div>
    </div>
  )
}

export default Projects