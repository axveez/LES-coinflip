import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../components/AppContext';
import { NearContext } from '../../components/NearContext';
import CoinLogo from '../../assets/svg/tails-logo.png';
import { initContract, login, logout } from '../../utils'

import * as nearAPI from 'near-api-js';



function Home() {


  const { status, setStatus } = useContext(AppContext);
  const { NearStatus, setNearStatus } = useContext(NearContext); 
   


  useEffect(async () => {
    // console.log(status.loading);
    console.log(process.env.CONTRACT_NAME);
    // console.log(process.env.ACCOUNT_ID);
    // console.log(process.env.ENV_TEST);

    await initContract();
    window.login = login;
    window.logout = logout;
  
    const authKeys = window.walletConnection._authData.allKeys;
    // console.log(authKeys);
    setConnected(authKeys.length > 0);
   
    // const connection = nearAPI
}, [])

    return(
        <div className='container'>
            <div className='row justify-content-center'>
                <img src={CoinLogo} alt='Coin' className='coin' />
            </div>
            <div className='row justify-content-center'>
            <button class = "button-clear">Heads</button>
            <button class = "button-not-clicked">Tails</button>
            </div>
            <div className='row justify-content-center mt-4'>
           <label>1Ⓝ</label> <input   type="range"  min="1" max="5" value="2" class="slider" id="myRange"></input><label>2Ⓝ!</label>
            </div>
            <div className='row justify-content-center mt-4'>
            <button class = "button-flip">Flip  0.2 Ⓝ!</button>
            </div>
            <div className='row justify-content-center mt-5'>
                <h1 class = "wip-data">Realtime data WIP</h1> asd
            </div>
        </div>
    )
}
export default Home;