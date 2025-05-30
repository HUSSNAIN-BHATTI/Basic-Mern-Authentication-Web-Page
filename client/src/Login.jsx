import React,{useState} from 'react'
import './login.css'
import {useNavigate} from "react-router-dom"
import {useAuth} from './store/auth';
import {toast} from 'react-toastify';

const URL = "http://localhost:3000/api/auth/login";

export function Login() {
 
  const [user,setUser] = useState({
  email: "",
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

const handleSubmit = async (e) =>{
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

    if(response.ok){
      console.log("log data",res_data);
      storetokenInLS(res_data.token);
      setUser({ email: "", password: ""});
      toast.success("Login success");
      navigate("/");
    }
    else{
      toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
    }
  } catch (error) {
    console.log("login",error);
    
  }
}
  return (

    <>
    <div className="login">
      <div className="logleft">
        <img src="/images/about.png" alt="login" 
        width="500" height="500"/>
      </div>
      <div className="logright">
        <div className="logform">
          <h1>Login Form</h1>
          <br />
          <form onSubmit={handleSubmit}>
            <div>
              <label className='label' htmlFor="email">email</label>
              <input type="email" name='email' placeholder='enter your email' id='email' required autoComplete='off' value={user.email} onChange={handleInput}/>
            </div>
            <div>
              <label className='label' htmlFor="password">password</label>
              <input type="password" name='password' placeholder='password' id='password' required autoComplete='off' value={user.password} onChange={handleInput}/>
            </div>
            <br />
            <button type='submit' className='submit'>Login Now</button>
          </form>

        </div>       
      </div>
    </div>
    </>
  )
};

