import React from 'react';
import {useState} from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/login',{email,password})
        .then(result => {
          console.log(result.status)
          if(result.data=="No record exists."){
            toast.error("Incorrect Email or Password")
          }
          if(result.status == 200){
            localStorage.setItem("id",result.data.id);
            navigate('/dashboard')
          }
          else{
            toast.error("Incorrect Email or Password")
        }
        })
        .catch((err)=>{   toast.error("Incorrect Email or Password") 
        console.log(err)})
    }
  return (
    <div className='bg'>
    <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className='glass-bg p-3 rounded w-25'>
            <h2 className='d-flex justify-content-center align-items-center'>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='email'>
                        <strong>Email</strong>
                    </label>
                    <input
                      type="email"
                      placeholder='Enter Email'
                      autoComplete='off'
                      name="email"
                      className='form-control rounded-0'
                      onChange={(e) => setEmail(e.target.value)}
                      />
                </div>
                <div className='mb-3'>
                    <label htmlFor='email'>
                        <strong>Password</strong>
                    </label>
                    <input
                      type="password"
                      placeholder='Enter Password'
                      autoComplete='off'
                      name="password"
                      className='form-control rounded-0'
                      onChange={(e) => setPassword(e.target.value)}
                      />
                </div>
                <button type="submit" className='btn btn-success w-100 rounded-0'>
                    Submit
                </button>
                </form>
        </div>
    </div>
    <ToastContainer />
    </div>
  );
}

export default Login;
