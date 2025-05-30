import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import { useAuth } from './store/auth';
import './admin_contact.css'
import {toast} from 'react-toastify'

export function AdminContacts() {

  const [contact , setContact] = useState([]);
  const { AuthorizationToken } = useAuth();

  const Allcontacts = async()=>{
  try {
    const response = await fetch(`http://localhost:3000/api/admin/contacts`,{
      method:'GET',
      headers: {
        Authorization: AuthorizationToken,
      },
    })
    const data = await response.json();
    console.log(data);
    if(response.ok){
      setContact(data);
    }
  }
   catch (error) {
    console.log(error)
  }
}

const DeleteContact = async(id)=>{
  try {
    const response = await fetch(`http://localhost:3000/api/admin/contacts/delete/${id}`,{
      method:'DELETE',
      headers: {
        Authorization: AuthorizationToken,
      },
    })
    if (response.ok){
      toast.success('Message Deleted Successfully')
      Allcontacts();
    }
    else{
      toast.error('Failed to delete contact')
    }
  } catch (error) {
    
  }

}



useEffect(() => {
  Allcontacts();
}, [])





  return (
    <div className='contactpage'>
      <h1>Admin Contacts</h1>
      {
        contact.map((currrent_msg,index)=>{ 
          return(
        <div className="con" key={index}>
        <div className="msg">
          <h4>{currrent_msg.email}</h4>
          <h4>{currrent_msg.username}</h4>
          <h4>{currrent_msg.message}</h4>
          <button onClick={()=> DeleteContact(currrent_msg._id)} >Delete</button>
        </div>
      </div>
      )
        })
      }
     
      <Outlet/>
    </div>
  )
}
