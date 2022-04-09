import React from 'react';
import '../styles/header.scss';
import { Image, Stack } from 'react-bootstrap';
import KangarooLogo from '../assets/kangaroo-logo.png';
import { login, logout } from '../utils.js';


const Header = (props) => {
  
  let connectionButton;
  if (window.accountId == null || typeof window.accountId === 'undefined' || accountId == '') {
    connectionButton = <button className="bold-font btn-transparent header_connect_btn" onClick={()=>login()}>Connect Wallet</button>;
  } else {
    connectionButton = <div className="d-flex"><button className="bold-font px-5 btn-transparent btn-header" onClick={()=>props.setshowDeposit(true)}>Ⓝ {props.balanceProps}</button><button className="bold-font btn-transparent btn-header" onClick={()=>logout()}>Logout</button></div>;
  }

  return (
    <div className='header'>
      <div className='header_background'></div>
      <Stack direction='horizontal' className="header_navbar header-mobile" gap={3}>
        <div><Image src={KangarooLogo}  className = "logo-header"/></div>
        <div></div>
        <Stack direction="horizontal" className="pull-right" gap={2}>
          <a href="/#" onClick={()=>props.setShowsFunc({...props.showsProps, about: true})}>Flip Responsibly</a>
          <a href="/#" onClick={()=>props.setShowsFunc({...props.showsProps, howTo: true})}>How To Play</a>
          <a href="/#" onClick={()=>props.setShowsFunc({...props.showsProps, faq: true})}>FAQ</a>
          <a href="/leaderboard">Leaderboard</a>

        </Stack>
        {connectionButton}
      </Stack>      
    </div>
  );
};

export default Header;