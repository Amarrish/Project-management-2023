import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BASEURL } from '../Services/baseUrl';
import { editprojectAPI } from '../Services/allApi';
import { editprojectResponseContext} from '../Context/Contextshare'
const Editproject = ({projectid}) => {

  const {editprojectResponse,setEditProjectResponse} = useContext(editprojectResponseContext)
    const [project,setProject] = useState({
      id:projectid._id,
      title:projectid.title,
      languages:projectid.languages,
      github:projectid.github,
      websites:projectid.websites,
      overview:projectid.overview,
      projectimage:""
    })
    const[preview,setPreview] = useState("")
    const [show, setShow] = useState(false);
    const handleClose = () => {
      setShow(false);
      setProject({
        id:projectid._id,
        title:projectid.title,
        languages:projectid.languages,
        github:projectid.github,
        websites:projectid.websites,
        overview:projectid.overview,
        projectimage:""
      })
    }
    const handleShow = () => setShow(true);
    // console.log(projectid);

    // update data
    const handleupdate = async(e)=>{
      e.preventDefault();
      const {id,title,languages,github,websites,overview,projectimage} = project
      if(!title || !languages || !github || !websites || !overview){
        alert("Please fill the form Completely!!!...")
      }else{
        const token = sessionStorage.getItem('token')
        const reqbody = new FormData()
        reqbody.append("title",title)
        reqbody.append("languages",languages)
        reqbody.append("github",github)
        reqbody.append("websites",websites)
        reqbody.append("overview",overview)
        projectimage?reqbody.append("projectimage",projectimage):reqbody.append("projectimage",projectid.projectImage)

        if(projectimage){
          const reqHeader = {"Content-Type":"multipart/form-data", 'Authorization':`Bearer ${token}`}

          const result = await editprojectAPI(id,reqbody,reqHeader)
          if(result.status===200){
            // modal closed, reset state
            handleClose();
            // shareresponse with my project
            setEditProjectResponse(result.data)
          }else{
            console.log(result);
            alert(result.response.data)
          }
        }else{
          const reqHeader = {"Content-Type":"application/json", 'Authorization':`Bearer ${token}`}

          const result = await editprojectAPI(id,reqbody,reqHeader)
          if(result.status===200){
            // modal closed, reset state
            handleClose();
            // shareresponse with my project
            setEditProjectResponse(result.data)
          }else{
            console.log(result);
            alert(result.response.data)
          }
        }
      }
     
    }

    useEffect(()=>{
      if(project.projectimage){
        setPreview(URL.createObjectURL(project.projectimage))
      }else{
        setPreview("")
      }
    },[project.projectimage])
    // console.log(project);
    
  return (
    <>
    <button onClick={handleShow} className='btn bg-success'><i  class="fa-regular fa-pen-to-square"></i></button>

    <>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6">
            <label htmlFor="profilepic">
                <input id='profilepic' type="file" style={{display:'none'}} onChange={e=>setProject({...project,projectimage:e.target.files[0]})} />
                <img style={{width:'100px', height:'100px', borderRadius:'50%'}} className='img-fluid' src={preview?preview:`${BASEURL}/uploads/${projectid?.projectImage}`} alt="profile pic" />
            </label> 
            </div>
            <div className="col-lg-6">
                <input type="text" className='form-control' placeholder='Project Name' value={project.title? project.title:projectid.title} 
                onChange={e=>setProject({...project,title:e.target.value})} />

                <input type="text" className='form-control' placeholder='Language Used'  value={project.languages? project.languages:projectid.languages} onChange={e=>setProject({...project,languages:e.target.value})} />

                <input type="text" className='form-control' placeholder='GitHub Link'  value={project.github? project.github:projectid.github} 
                onChange={e=>setProject({...project,github:e.target.value})}/>

                <input type="text" className='form-control' placeholder='LinkedIn'  value={project.websites? project.websites:projectid.websites} 
                onChange={e=>setProject({...project,websites:e.target.value})}/>

            </div>
            <input type="text" className='form-control' placeholder='Project Overview' value={project.overview? project.overview:projectid.overview} 
            onChange={e=>setProject({...project,overview:e.target.value})}/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleupdate} >Save</Button>
        </Modal.Footer>
      </Modal>
    </>
    </>
  )
}

export default Editproject