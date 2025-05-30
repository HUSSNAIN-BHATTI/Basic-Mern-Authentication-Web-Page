import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Navbar.css"
import { useAuth } from '../store/auth'

export const Navbar = () => {
  const {isLoggedIn} = useAuth();
  return (
    <>
    <header className='header'>
        
            <div className='left'>Project</div>
            <div className='right'>
                <NavLink className="r" to="/">Home</NavLink>
                <NavLink className="r" to="/about">About</NavLink>
                <NavLink className="r" to="/contact">Contact</NavLink>
                <NavLink className="r" to="/service">Service</NavLink>
                
                {isLoggedIn ? <NavLink className="r" to="/logout">Logout</NavLink> : <><NavLink className="r" to="/register">Register</NavLink>
                <NavLink className="r" to="/login">Login</NavLink>
                </>}
                
            
        </div>
    </header>
    </>
  )
}

