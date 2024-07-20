import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'react-toastify/dist/ReactToastify.css';
import { addprojectAPI } from '../Services/allApi';
import { addprojectResponseContext } from '../Context/Contextshare';

const Addproject = () => {

  const {addprojectResponse,setAddprojectResponce} = useContext(addprojectResponseContext)
    const [show, setShow] = useState(false);
    const [preview,setPreview] = useState("");
    const [token,setToken] = useState('')
    const [projectDetails,setProjectDetails] = useState({
      title:"",
      languages:"",
      github:"",
      websites:"",
      overview:"",
      image:"",
      userId:""
    });

    useEffect(()=>{
      if(localStorage.getItem("existingUser") && sessionStorage.getItem("token")){
        setProjectDetails({...projectDetails,userId:JSON.parse(localStorage.getItem("existingUser"))._id});
        setToken(sessionStorage.getItem("token"))
      }
    },[])
    // console.log(projectDetails);

    useEffect(()=>{
      if(projectDetails.image){
        setPreview(URL.createObjectURL(projectDetails.image))
      }
    },[projectDetails.image])

    const handlesave =async (e)=>{
      e.preventDefault()
      const {title,languages,github,websites,overview,image,userId} = projectDetails
      if(!title || !languages || !github || !websites || !overview || !image || !userId){
        alert("Please fill the form Completely!!!...")
        console.log(projectDetails);
      }else{
        const reqbody = new FormData()
        reqbody.append("title",title)
        reqbody.append("languages",languages)
        reqbody.append("github",github)
        reqbody.append("websites",websites)
        reqbody.append("overview",overview)
        reqbody.append("projectImage",image)
        reqbody.append("userId",userId)
       
        const reqHeader ={
          "Content-Type":"multipart/form-data", 'Authorization':`Bearer ${token}`
        }
        console.log(reqbody);
        const result = await addprojectAPI(reqbody,reqHeader)
        // console.log(result);
        if(result.status===200){
          alert(`Project ${result.data.title} added successfully...`)
          setProjectDetails({ 
          title:"",
          languages:"",
          github:"",
          websites:"",
          overview:"",
          image:""
        });
          handleClose();
          setAddprojectResponce(result.data)
        }
        else{
          alert(result.response.data)
          console.log(result);
        }
      }
    }


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
         <Button variant="primary" onClick={handleShow}>
        Add Project
      </Button>

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
                <input id='profilepic' type="file" style={{display:'none'}} onChange={e=>setProjectDetails({...projectDetails,image:e.target.files[0]})} />
                <img style={{width:'100px', height:'100px', borderRadius:'50%'}} className='img-fluid' src={preview?preview:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&usqp=CAU"} alt="profile pic" />
            </label> 
            </div>
            <div className="col-lg-6">
                <input type="text" className='form-control' placeholder='Project Name' value={projectDetails.title} onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})} />

                <input type="text" className='form-control' placeholder='Language Used'  value={projectDetails.languages} onChange={e=>setProjectDetails({...projectDetails,languages:e.target.value})}/>

                <input type="text" className='form-control' placeholder='GitHub Link'  value={projectDetails.github} onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})}/>

                <input type="text" className='form-control' placeholder='LinkedIn'  value={projectDetails.websites} onChange={e=>setProjectDetails({...projectDetails,websites:e.target.value})}/>

            </div>
            <input type="text" className='form-control' placeholder='Project Overview' value={projectDetails.overview} onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})}/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handlesave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Addproject