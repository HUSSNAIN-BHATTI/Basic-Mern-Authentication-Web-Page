import React from 'react';
import './error.css';


export function Error() {
  return (
    <>
    <div className="main1">
       <div className="maindown">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist. Please try again.</p>
       </div>
       <div className="maindown2">
        
        <a href="/">
        <button className='connect'>Return Home</button>
        </a>
      <a href="/contact">
        <button className='learn'>Report Problem</button>
        </a>
       </div>
        
    </div>
    </>
  )
}
