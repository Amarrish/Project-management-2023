import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Myprofile from '../Components/Myprofile';
import Myprojects from '../Components/Myprojects';
import { Col, Row } from 'react-bootstrap';


const Dashboard = () => {
  const [username,setUsername] = useState("")
  useEffect(()=>{
    if(localStorage.getItem("existingUser")){
      setUsername(JSON.parse(localStorage.getItem("existingUser")).username.toUpperCase())
    }
  },[])
  return (
    <>
    <Header insidedashboard={true}/>

    <Row className='container-fluid mt-2'>
      <Col sm={12} md={8}>
      <h1 className='mt-5'>Welcome <span className='text-success'>{username}</span></h1>
      <Myprojects/>
      </Col>
        
      <Col sm={12} md={4}>
          <Myprofile/>
      </Col>
    </Row>
    </>
  )
}

export default Dashboard