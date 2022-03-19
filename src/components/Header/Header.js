import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../global.css"
import { login, logout } from '../../utils';

import Logo from '../../assets/img/kangaroo-logo.png';



function Header() {
  return (
    <div className="m-logo header-container">
    <nav className="navbar navbar-expand-lg navbar-light nav-bar">
        <div className="container-fluid">
            <a to='/' className="navbar-brand text-center">
               <img src = {Logo}/>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse nav-bar" id="collapsibleNavbar" >
                <div className="navbar-nav ms-auto">
                    <ul className="navbar-nav">
                        <li className="nav-item nav-link mr-4 m-b-3">
                            <a href=''>
                            About
                            </a>
                        </li>
                        <li className="nav-item nav-link mr-4">
                            <a className='mt-4' href=''>
                           How to Play
                            </a>
                        </li>
                        <li className="nav-item nav-link mr-4">
                            <a className='' href=''>
                           FAQ
                            </a>
                        </li>
                        <li className="nav-item nav-link">
                            <button className='btn wallet-btn' onClick={login}>Connect Wallet</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</div>
  )
}

export default Header