 import React from 'react'
import { Navigate, NavLink ,Outlet} from 'react-router-dom';
import { useAuth } from '../store/auth'; 
import './adminLayout.css';
export function AdminLayout() {
  const { user,isloading } = useAuth();
  console.log(`Admin Layout` , user);

  if(isloading){
    return <h1>Loading...</h1>;
  }

  if(!user.isAdmin) {
    return <Navigate to="/"/>;  
  }
  
   return (
     <div className="container">
      <div className="list">
        <NavLink className="row" to={"/"}>Home</NavLink>
        <NavLink className="row" to={"/admin/users"}>users</NavLink>
        <NavLink className="row" to={"/admin/contacts"}>contacts</NavLink>
        <NavLink className="row" to={"/service"}>services</NavLink>
      </div>
       <Outlet/>
     </div>
   )
 }
 
