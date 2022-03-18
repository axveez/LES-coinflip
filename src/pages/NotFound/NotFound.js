import React from 'react';
import {Link} from 'react-router-dom';
import bombSvg from '../../assets/svg/bomb.svg';

function NotFound() {
    return(
        <>
            <div className="m-logo">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                        <Link to='/' className="navbar-brand text-center">
                            <div className='top'>THE DONS</div>
                            <div className='bottom'>NEAR PROTOCOL</div>
                        </Link>
                    </div>
                </nav>
            </div>
            <div className='container mt-10'>
                <div className='text-center h2'>The Dons Project</div>
                <div className='text-center h1 text-bold'>Our Website is currently under construction</div>
                <div className='row justify-content-center'>
                    <img src={bombSvg} alt='bomb' className='bomb' />
                </div>
            </div>
        </>
    )
}

export default NotFound;