import React from 'react'
import './service.css'
import { useAuth } from './store/auth';

export function Service() {
  const { services } = useAuth();


  return (
    <>
    <div className="Servicemain">
      <div className="elems">

        {services.map((curElem, index) => {
          const {price , description,provider,service}  = curElem;         
         return(<div className="elem" key={index}>
          <div className="up">
          <img src="/images/about.png" alt="" />
          </div>
          <div className="down">
            <div className="down1">
              <h4>{provider}</h4>
            <h4>{price}</h4>
            </div>
            <h6>{service}</h6>
            <h6>{description}</h6>
            </div>
        </div>);    
        })}



      </div>
    </div>
    
 </>
  )
}