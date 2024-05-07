import React from 'react'
import './Header.css'
import Clock from './clock/Clock';
import Logo3 from '../../assets/img/logo3.png'
import DriwerRight from '../../material/DriwerRight/DriwerRight';


const Header = () => {
  return (
    <header className="header">
        <nav className="header-nav">
            <div>
                <img src={Logo3} className="header-nav_logo" alt="logo"/>   
            </div>
            <Clock />
            <DriwerRight />
        </nav>
    </header>
  )
}

export default Header

