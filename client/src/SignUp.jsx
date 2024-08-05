import React from 'react';
import {useState} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css'

function Signup() {
    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/register',{name,email,password})
        .then(result => {
            console.log(result.data)
            if(result.data=="User Already exists"){
                toast.error("User Already exists");
                return;
            }
            if(result.status==200){
                localStorage.setItem("id",result.data.id)
                navigate('/dietinfo')
            }
            else{
                toast.error("Please Fill all the fields")
            }
        })
        .catch(err=> {
            console.log(err)
        })
    }

  return (
    <div className='bg'>
    <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className='glass-bg p-3 rounded w-25'>
            <h2 className='d-flex justify-content-center align-items-center'>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='email'>
                        <strong>Name</strong>
                    </label>
                    <input
                      type="text"
                      placeholder='Enter Name'
                      autoComplete='off'
                      name="email"
                      className='form-control rounded-0'
                      onChange={(e) => setName(e.target.value)}
                      />
                </div>
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
                    Register
                </button>
                </form>
                <p>Already have an Account? </p>
                <Link to='/login' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
                    Login
                </Link>

        </div>
    </div>
    <ToastContainer />
    </div>
  );
}

export default Signup;
