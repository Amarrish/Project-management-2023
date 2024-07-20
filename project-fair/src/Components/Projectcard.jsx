import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import designicon from '../Assets/81178b47a8598f0c81c4799f2cdd4057.gif';
import { BASEURL } from '../Services/baseUrl';
import img1 from '../Assets/81178b47a8598f0c81c4799f2cdd4057.gif'

const ProjectCard = ({projects}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
console.log(`${BASEURL}/uploads/${projects.projectImage}`);
console.log('projects', projects);
  return (
    <>
     {projects&&
       <Card style={{ width: '18rem' }} onClick={handleShow}  className='align-items-center justify-content-center '>
       <Card.Img
       style={{width:'200px',height:'200px',padding:'20px'}}
         variant="top"
         src={projects.projectImage?`${BASEURL}/uploads/${projects.projectImage}`:img1}
       />
       <Card.Body>
         <Card.Title>{projects.title}</Card.Title>
       </Card.Body>
     </Card>
}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{projects.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <img
                style={{ width: '150px', height: '150px', borderRadius: '20px' }}
                src={projects?.projectImage?`${BASEURL}/uploads/${projects.projectImage}`:img1}
                alt="oops img !!!"
              />
            </Col>

            <Col>
              <p><span className='text-primary'>Technologies:</span> {projects.languages}</p>
              <p><span className='text-primary'>Overview:</span> {projects.overview}</p>
            </Col>
          </Row>
          <hr />
          <div className="d-flex">
          <a href={projects.github} target='_blank' className='btn me-5'> <i class="fa-brands fa-github fa-2x"></i> </a>
          <a href={projects.websites} target='_blank' className='btn me-5'> <i class="fa-solid fa-link fa-2x"></i> </a>
          </div>
        </Modal.Body>
      </Modal>

    </>
  );
};

export default ProjectCard;
