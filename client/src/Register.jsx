import React, { useState } from 'react'
import './register.css'
import {useNavigate} from "react-router-dom"
import { useAuth } from './store/auth';
import { toast } from 'react-toastify'

const URL = "http://localhost:3000/api/auth/register";



export function Register() {
  
  const [user,setUser] = useState({
  username: "",
  email: "",
  phone: "",
  password: ""
});

const navigate = useNavigate();
const {storetokenInLS} = useAuth();

const handleInput = (e) =>{
  let name = e.target.name;
  let value = e.target.value;

  setUser({
    ...user,
    [name]:value,
  });
};

const handleSubmit =async (e) =>{
  e.preventDefault();
  console.log(user);

  try {
    const response = await fetch(URL,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  const res_data = await response.json();
      console.log("res from server",res_data.message);

  if (response.ok){
    storetokenInLS(res_data.token);
    setUser({username: "", email: "", phone: "",password: ""});
    toast.success("Ragisteration successful")
    navigate("/");
  }
  else{
     toast.error(`server: ${res_data.extraDetails ? res_data.extraDetails : res_data.message}`);
  }
    
  } 
  
  
  catch (error) {
    console.log('register', error);    
  }

  
};

return (
    <>
    <div className="register">
      <div className="regleft">
        <img src="/images/about.png" alt="register" 
        width="500" height="500"/>
      </div>
      <div className="regright">
        <div className="regform">
          <h1>Registration Form</h1>
          <br />
          <form onSubmit={handleSubmit}>
            <div>
              <label id='rr' htmlFor="username">username</label>
              <input className='r2' type="text" name='username' placeholder='username' id='username' required autoComplete='off' value={user.username} onChange={handleInput}/>
            </div>
            <div>
              <label id='rr' htmlFor="email">email</label>
              <input className='r2' type="email" name='email' placeholder='enter your email' id='email' required autoComplete='off'  value={user.email} onChange={handleInput} />
            </div>
            <div>
              <label id='rr' htmlFor="phone">phone</label>
              <input className='r2' type="number" name='phone' placeholder='phone' id='phone' required autoComplete='off'  value={user.phone} onChange={handleInput}/>
            </div>
            <div>
              <label id='rr' htmlFor="password">password</label>
              <input className='r2' type="text" name='password' placeholder='password' id='password' required autoComplete='off'  value={user.password} onChange={handleInput} />
            </div>
            <br />
            <button type='submit' className='submit'>Register Now</button>
          </form>

        </div>       
      </div>
    </div>
    </>
  )
};

