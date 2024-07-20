import React, { useEffect, useState } from 'react'
import { Row,Col } from 'react-bootstrap'
import Designicon from '../Assets/81178b47a8598f0c81c4799f2cdd4057.gif'
import Homeprojects from '../Components/Homeprojects'
import { Link } from 'react-router-dom'
import { homeprojects } from '../Services/allApi';


const PFHome = () => {

    const [homesprojects,setHomesprojects] = useState([])

    const gethomeprojects = async () => {
      try {
          const result = await homeprojects();
          if (result.status === 200) {
              setHomesprojects(result.data);
          } else {
              alert(result.response.data);
          }
      } catch (error) {
          console.error("Error in gethomeprojects:", error);
      }
  };

    console.log(homesprojects);

  const [isloggedin,setLoggedin] = useState(false)
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setLoggedin(true)
    }else{
      setLoggedin(false)
    }
    gethomeprojects()
  },[])

  return (
    <>
    <div className="container-fluid rounded w-100 align-items-center p-5" style={{height:'auto',backgroundColor:'#c485ff'}}>
      <Row  className='mt-2'>
        <Col className='align-items-center justify-content-center' sm={12} md={6}>
          <h1 style={{fontSize:'80px'}} className='text-light'><i class="fa-brands fa-stack-overflow fa-bounce"></i>Project Fair</h1>
          <p>One Stop Destination for all Software Development Projects Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum pariatur fuga voluptatibus. Molestias impedit tempore omnis dignissimos excepturi. Mollitia suscipit voluptatibus voluptates aperiam sint quisquam, repellendus nihil officia cumque quasi!</p>
          {
            isloggedin? 
            <Link to={'/dashboard'} className='btn btn-warning'>Manage Your Projects <i class="fa-solid fa-right-long fa-beat ms-2"></i></Link> 
            :
            <Link to={'/login'} className='btn btn-warning'>Start to Explore <i class="fa-solid fa-right-long fa-beat ms-2"></i></Link>
          }
         
        </Col>
         
        <Col className=' align-items-center justify-content-center' sm={12} md={6}>
        <img style={{width:'350px', height:'350px',borderRadius:'270px 339px 197px 185px'}} src={Designicon} alt="Design icon" />
        </Col>
      </Row>

      <div>
      <Homeprojects homesprojects={homesprojects}/>
      </div>
      

    </div>  
    </>
  )
}

export default PFHome