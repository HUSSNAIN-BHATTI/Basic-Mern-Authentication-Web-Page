import React, { useState } from 'react'
import './contact.css'
import { useAuth } from './store/auth';
import { toast } from 'react-toastify';

export function Contact() {

    const defaultContactFormData = {
    username: "",
    email: "",
    message: "",
  };

  const [contact, setContact] = useState(defaultContactFormData);
  const [userData , setUserData] = useState(true);

  const { user } = useAuth();
  

  if(userData && user){
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    });
    setUserData(false);
  }
  const  handleInput = async (e)=>{
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]:value,
     });

  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    console.log(contact);

     try {
        const response = await fetch(`http://localhost:3000/api/form/contact`,{
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(contact),
        });
        if(response.ok){
            const data= await response.json();
            setContact(defaultContactFormData);
            toast.success("Message send");
            console.log(data);
            
        }   
    }
    catch (error)
    {
        console.error("error fetching user");
    }
  }

  
  return (
    <>
    <div className='main'>
      <div className="mainleft">
        <h2>Contact Us</h2>
        <img src="/images/about.png" alt="img"/>
      </div>
      <div className="mainright">
         <form onSubmit={handleSubmit} >
          <div>
              <label htmlFor="username">username</label>
              <input type="text" name='username'  id='username' autoComplete='off' required value={contact.username} onChange={handleInput} />
            </div>
            <div>
              <label htmlFor="email">email</label>
              <input type="email" name='email'  id='email' autoComplete='off' required value={contact.email} onChange={handleInput} />
            </div>
            <div className='message'>
              <label htmlFor="message">message</label>
              <textarea type="text" name='message' id='message' autoComplete='off' required value={contact.message} onChange={handleInput} />
            </div>
            <br />
            <button type='submit' className='submit'>Submit</button>
          </form>
      </div>
    </div>
    </>
  )
}

