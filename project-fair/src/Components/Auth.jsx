import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authimg from '../Assets/multi-factor-authentication-gif.gif'
import { Form,Button } from 'react-bootstrap'
import { loginAPI, registerAPI } from '../Services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = ({register}) => {
    const registerForm = register? true:false
    const [userData,setUserData] = useState({
        username:"",
        email:"",
        password:""
    })

    const navigate = useNavigate();
    // console.log(userData);

    // registeration
    const handleRegister = async(e)=>{
        e.preventDefault()
        const {username,email,password} = userData
        if(!username || !email || !password){
            toast("Please fill the form completely")
        }else{
            // api call
            const res = await registerAPI(userData)
            console.log(res);
            if(res.status===200){
                console.log(res.data);
                toast(`${res.data.username} has successfully registered...`)
                // reset state
                setUserData({
                    username:"",email:"",password:""
                })
                navigate('/login')
            }else{
                toast(res.response.data)
            }
        }
    }

    // login
    const handlelogin = async(e)=>{
        e.preventDefault()
        const {email,password} = userData
       try {
        if( !email || !password){
            toast("Please fill the form completely")
        }else{
            // api call
            const res = await loginAPI({email,password})
            console.log(res);
            if(res.status===200){
            //    save res
            localStorage.setItem("existingUser",JSON.stringify(res.data.existingUser))
            localStorage.setItem("Role",res.data.role)
            sessionStorage.setItem("token",res.data.token)
                // reset state
                setUserData({
                    email:"",password:""
                })
                navigate('/')
            }else{
                toast(res.response.data)
            }
        }
       } catch (error) {
        console.log('error',error);
        
       }
    }
  return (
    <div style={{height:'100vh', width:'100%'}} className='d-flex justify-content-center  align-items-center'>
        <div className="containert mt-5 w-75">
            <Link to={'/'} style={{textDecoration:'none'}} className='d-flex align-items-center'><i class='fa-solid fa-arrow-left me-2'></i><h5>Back to Home</h5>
            </Link>
            <div className="card shadow p-2 bg-secondary">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                       <img className='rounded-start w-100' src={authimg} alt="" /> 
                    </div>
                    <div className="col-lg-6">
                        <div className="d-flex flex-column">
                            <div className="d-flex mt-2 text-light">
                                <i class='fa-brands fa-stack-overflow fa-bounce fa-3x me-1'></i>
                                <span className='h1 fw-bolder mb-0'>Project Fair</span>
                            </div>
                            <h5 className='fw-normal mt-4 pb-3 text-light'>
                                {
                                    registerForm?'Sign Up to your Account' : 'Sign In to your Account'
                                }
                            </h5>
                                    <Form className="text-light">
                                    { registerForm&&
                                    <Form.Group className="mb-3" controlId="formBasicUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control value={userData.username} onChange={e=>setUserData({...userData,username:e.target.value})} type="text" placeholder="Enter your name" />
                                    <Form.Text className="text-muted">
                                    We'll never share your Username with anyone else.
                                    </Form.Text>
                                    </Form.Group>
                                    }
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control value={userData.email} onChange={e=>setUserData({...userData,email:e.target.value})} type="email" placeholder="Enter your Email" />
                                    <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                    </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control value={userData.password} onChange={e=>setUserData({...userData,password:e.target.value})} type="password" placeholder="Password" />
                                    </Form.Group>
                                    
                                    { registerForm?
                                        <div>
                                            <Button onClick={handleRegister} variant='light' type='submit' size='lg'>Register</Button>
                                            <ToastContainer />
                                            <p>Already have an account? <Link to={'/login'}>Login Here</Link></p>
                                        </div>:
                                        <div>
                                        <Button onClick={handlelogin} variant='light' type='submit' size='lg'>Login</Button>
                                        <ToastContainer />
                                        <p>New User ? <Link to={'/register'}>Register Here</Link></p>
                                    </div>
                                    }
                                    </Form>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Auth