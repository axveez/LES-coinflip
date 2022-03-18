import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { login, logout } from '../../utils';
import routerPath from '../../constants/routerPath';
import Logo from '../../assets/img/kangaroo-logo.png';

function Header() {

    const location = useLocation();

    const ShowHeder = () => {
        return (
        <div className="m-logo header-container">
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <Link to='/' className="navbar-brand text-center">
                       <img src = {Logo}/>
                    </Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
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
        );
    }
      
    const HideHeder = () => {
        return (
            <></>
        )
    }

    return (
        routerPath.includes(location.pathname) ? <ShowHeder /> : <HideHeder />
    );
}

export default Header;