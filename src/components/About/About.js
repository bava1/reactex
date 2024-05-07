import React from 'react'
import './About.css'
import LogoProfil from '../../assets/img/LogoProfil.jpg'

const About = () => {
  return (
    <section className="about">
        <h1>About Us</h1>
        <div className="about-main">
          <span>
            This website and all the projects presented here were created in the bava design studio.
          </span>
          <a href="https://bavastudio.eu/#/" target="_blank" rel="noreferrer">
            <img src={LogoProfil} className="about-main_logo" alt={LogoProfil}/>
          </a>
        </div>
    </section>
  )
}

export default About
