import React, { useEffect, useState } from 'react';
import {Button} from 'react-bootstrap';
import { BASEURL } from '../Services/baseUrl';
import { updateuserAPI } from '../Services/allApi';

const Myprofile = () => {

  const [userProfile,setUserProfile] = useState({
    _id:JSON.parse(localStorage.getItem('existingUser'))._id,
    username:JSON.parse(localStorage.getItem('existingUser')).username,
    email:JSON.parse(localStorage.getItem('existingUser')).email,
    password:JSON.parse(localStorage.getItem('existingUser')).password,
    github:"",
    linkedin:"",
    userImage: "",
  })
  // console.log(userProfile);

  const [preview,setPreview] = useState('')
  const [existingImage,setExistingImage] = useState('')

  useEffect(()=>{
    if(userProfile.userImage){
      setPreview(URL.createObjectURL(userProfile.userImage))
    }
    else{
      setPreview("")
    }
  },[userProfile.userImage])

  const handleupdate = async(e)=>{
    e.preventDefault()
    const {_id,username,email,password,github,linkedin,userImage} = userProfile;
    // console.log(userProfile);
    if (!_id || !username || !email || !password || !github || !linkedin){
      alert('please fill the form completely')
    }
    else{
      const reqBody = new FormData()
      reqBody.append('username',username)
      reqBody.append('email',email)
      reqBody.append('password',password)
      reqBody.append('userImage',userImage)
      reqBody.append('github',github)
      reqBody.append('linkedin',linkedin)

      console.log(reqBody);
      const token = sessionStorage.getItem('token')
      if(preview){
        const reqHeader = {"Content-Type":"multipart/form-data", 'Authorization':`Bearer ${token}`}
        const result = await updateuserAPI(reqBody,reqHeader)
        console.log(result);
        if(result.status===200){
          alert('profile updated')
          setUserProfile({
            _id:result.data._id,
            username:result.data.username,
            email:result.data.email,
            password:result.data.password,
            github:result.data.github,
            linkedin:result.data.linkedin,            
          })
          setExistingImage(result.data.image)
          console.log(existingImage);
        }else{
          console.log(result);
          // console.log(result.response.data);
        }
      }else{
        const reqHeader = {"Content-Type":"application/json", 'Authorization':`Bearer ${token}`}
        const result = await updateuserAPI(reqBody,reqHeader)
        if(result.status===200){
          alert('profile updated')
          setUserProfile({
            _id:result.data._id,
            username:result.data.username,
            email:result.data.email,
            password:result.data.password,
            github:result.data.github,
            linkedin:result.data.linkedin,
            userImage:""
          })
          setExistingImage(result.data.image)
          console.log(result);
        }else{
          console.log(result);
        }
      }
    }
  }


  console.log(existingImage);
  return (
    <>
    <div className='card shadow p-5'>
        <div className='d-flex justify-content-between'>
          <h6>Myprofile</h6>
          <Button onClick={handleupdate}><i class="fa-solid fa-check"></i></Button>
        </div>
       <div className='justify-content-center text-center align-items-center'>

        <label htmlFor="profile">
            <input id='profile' type="file" style={{display:'none'}} onChange={e=>setUserProfile({...userProfile,userImage:e.target.files[0]})} />
        <img style={{width:'100px', height:'100px', borderRadius:'50%'}} className='img-fluid' src={preview?preview:`${BASEURL}/uploads/${existingImage}`}  alt="profile pic" />
        </label>
       

       <div className=' mb-2'>
        <input className='form-control' placeholder='username' value={userProfile.username} onChange={e=>setUserProfile({...userProfile,username:e.target.value})} type="text" name="" id="" />
        </div>
       
        <div className=' mb-2'>
        <input className='form-control' placeholder='LinkedIn' value={userProfile.linkedin} onChange={e=>setUserProfile({...userProfile,linkedin:e.target.value})} type="text" name="" id="" />
        </div>

        <div className=' mb-2'>
        <input className='form-control' placeholder='GitHub' value={userProfile.github} onChange={e=>setUserProfile({...userProfile,github:e.target.value})} type="text" name="" id="" />
        </div>
         
       </div>
      </div>
      </>
  )
}

export default Myprofile