import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import logo1 from '../../assets/img/foterLogo3.png' // relative path to image 
import github from '../../assets/img/github.png' // relative path to image 

const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer-main">
            <div className="footer-main_blocklink">
                <Link to='/' className="footer-main_link">Home</Link>
                <Link to='/tasks' className="footer-main_link">Tasks</Link>
                <Link to='/articles' className="footer-main_link">Articles</Link>
                <Link to='/about' className="footer-main_link">About</Link>
                <Link to='/contact' className="footer-main_link">Contact</Link>
            </div>
            <h3>Used to create technology</h3>
            <img src={logo1} className="footer-main_logo1" alt={logo1}/>
            <h3>Project source code</h3>
            <a href="https://github.com/bava1/reactex" target="_blank"><img src={github} className="footer-main_logo2" alt={github}/></a> 
        </div>
    </footer>
  )
}

export default Footer
