import React, { useEffect, useState } from 'react';
import { Link ,Outlet} from 'react-router-dom';
import { useAuth } from './store/auth';
import './adminUser.css'
import {toast} from 'react-toastify';

export function AdminUsers() {
  const {AuthorizationToken} = useAuth();
  const [users , setUsers] = useState([]);
  
  const getAllUsersData = async()=>{
    try {
      const response = await fetch("http://localhost:3000/api/admin/users",{
        method:'GET',
        headers: {
          Authorization: AuthorizationToken,
        },
      });
     const data = await response.json();
     setUsers(data);
     console.log(`all users data = ${data}`);
     

      
    } catch (error) {
      console.log(error);
      
    }
  }

  const DeleteUser = async (id)=>{
    try {
        const response = await fetch(`http://localhost:3000/api/admin/users/delete/${id}`,{
        method:'DELETE',
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      const data = await response.json();
      console.log("datta",data);
      
      
      if(response.ok){
        toast.success("User deleted successfully");
        getAllUsersData();
      }
     console.log(`AFter deleting user = ${data}`);

    } catch (error) {
      console.log(error);  
    }
    
  };

    useEffect(()=>{
      getAllUsersData();
    },[]);

   return ( 
   <>
      <div className="Amain">   
        <div className="databox">
          <h5>Name</h5>
          <h5>Email</h5>
          <h5>Phone</h5>
          <h5>Edit</h5>
          <h5>Delete</h5>
          </div>     

          {
          users.map((currentUser,index)=>{
            return (
            <div className="box" key={index}>
            <div className="boxes">{currentUser.username}</div>
            <div className="boxes">{currentUser.email}</div>
            <div className="boxes">{currentUser.phone}</div>
            <div className="boxes"><Link to={`/admin/users/${currentUser._id}/edit`}>Modify</Link></div>
            <div className="boxes"><button  onClick={()=>DeleteUser(currentUser._id)}>Remove</button></div>
          </div>
            );
          })
          }
          
        <Outlet/>
      </div>
        </>
    )
}
  
  




   


    // { users.map((currentUser,index)=>{
    //     return <h2 key={index} >{currentUser.username}</h2>
    //   })
    // }

