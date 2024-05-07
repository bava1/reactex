import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import logo1 from '../../assets/img/foterLogo3.png' 
import github from '../../assets/img/github.png'
import { linksList } from './linksList';

const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer-main">
            <div className="footer-main_blocklink">
              {linksList?.map((link) => (
                <Link key={link.name} to={link.link} className="footer-main_link">{link.name}</Link>
              ))
            }
            </div>
            <h3>Used to create technology</h3>
            <img src={logo1} className="footer-main_logo1" alt={logo1}/>
            <h3>Project source code</h3>
            <a href="https://git.com/bava1/reactex" target="_blank" rel="noreferrer">
              <img src={github} className="footer-main_logo2" alt={github}/>
            </a> 
        </div>
    </footer>
  )
}

export default Footer
