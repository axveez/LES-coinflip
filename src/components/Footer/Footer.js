import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { login, logout } from '../../utils';
import parasLogo from '../../assets/img/paraslogo.png';



export default function Footer() {



    const icons = [
        {faIcon: faTwitter, href: 'https://twitter.com/TheDonsProject'},
        {faIcon: faDiscord, href: 'https://discord.com/invite/thedons'}
    ];

  return (
    <div>        <div className="m-1 mt-5">
    <div className="row justify-content-center">
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

    <div className='row justify-content-center'>        <ul className="d-flex flex-row justify-content-center social">
            <li className="nav-item nav-link">
                <a href='https://paras.id'>
                    <img src={parasLogo} alt='paras' style={{ width: 25 }} />
                </a>
            </li>
            {icons.map((icon, i) => 
            <li className="nav-item nav-link" key={i}>
                <a href={icon.href}>
                <FontAwesomeIcon
                    icon={icon.faIcon}
                    style={{ fontSize: 30, color: "black", paddingTop: 10 }}
                />
                </a>
            </li>
            )}
        </ul>  </div>
</div></div>
  )
}
