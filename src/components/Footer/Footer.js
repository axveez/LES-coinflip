import React from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faTwitter } from "@fortawesome/free-brands-svg-icons";
import routerPath from '../../constants/routerPath';
import parasLogo from '../../assets/img/paraslogo.png';

function Footer() {

    const location = useLocation();

    const icons = [
        {faIcon: faTwitter, href: 'https://twitter.com/TheDonsProject'},
        {faIcon: faDiscord, href: 'https://discord.com/invite/thedons'}
    ];

    const ShowFooter = () => {
        return (
        <div>
            <div className="row justify-content-center">
                <ul className="d-flex flex-row justify-content-center social">
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
                </ul>  
            </div>

            <div className='row justify-content-center'><span className='bottom-line'></span></div>
        </div>
        )
    }

    const HideFooter = () => {
        return (
            <></>
        );
    }

    return(
        routerPath.includes(location.pathname) ? <ShowFooter /> : <HideFooter />
    )
}

export default Footer;