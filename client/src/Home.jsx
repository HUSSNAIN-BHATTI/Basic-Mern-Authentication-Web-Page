import React from 'react'
import './home.css';

export function Home() {
  return (
    <>
    <div className="main">
    <div className="mainleft">
      <h3>we are the world best it company</h3>
      <h4>Welcome to React</h4>
      <p>are you ready to take your buisness to next level with cutting-edge it solutions? look no futher!here we just reimagine.
        Empowering businesses through technology that's our mission at react. We offer a range of IT services that help you achieve your goals efficiently and effectively.
      </p>
      <a href="/contact">
        <button className='connect'>Connect Now</button>
        </a>
      <a href="/about">
        <button className='learn'>Learn More</button>
        </a>
        
    </div>
    <div className="mainright">
      <img src="/images/about.png" alt="logo" />
    </div>
    </div>
    </>
  )
}
