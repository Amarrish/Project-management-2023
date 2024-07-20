import React from 'react'
import {Col,Row} from 'react-bootstrap'
import Projectcard from '../Components/Projectcard'
import { Link } from 'react-router-dom';
import './scroll.css'
const Homeprojects = ({homesprojects}) => {
  return (
    <>
    <h3 className='text-center text-dark mt-2'>Explore our project</h3>
        <marquee scrollAmount={25}>
        <Row>
          {
          homesprojects?.length>0?
          homesprojects.map((projects)=>(
            <Col>
            <Projectcard projects={projects}/>
            </Col>
          )):null
          }
        </Row>
        </marquee>
        <div className='text-light text-center mt-5 '><Link className='text-dark' to={'/projects'}>View More Projects</Link></div>
    </>
  )
}

export default Homeprojects