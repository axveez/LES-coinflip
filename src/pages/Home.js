import React, { useState, useEffect } from 'react';
import CoinSelect from '../components/CoinSelect';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecentFlips from '../components/RecentFlips';
import FlipBoard from '../components/FlipBoard';
import { Row, Col, Stack, Image, ThemeProvider } from 'react-bootstrap';
import axios from 'axios';

import { initContract } from '../utils.js';
import { FLIP_GOING, FLIP_WON, FLIP_LOST, FLIP_NONE, FLIP_DOUBLE, HEAD, TAIL } from '../constants';

const API_URL = process.env.API_URL || 'https://localhost:5000';
const API_KEY = process.env.API_KEY || 0;
const Home = () => {

  const [status, setStatus] = useState(FLIP_NONE);
  const [choice, setChoice] = useState(HEAD);
  // const [result, setResult] = useState(FLIP_NONE);
  const [value, setValue] = useState(0.1);
  const [txHistory, setTxHistory] = useState([]);
  const [limit, setLimit] = useState(10);
  const [logo, setLogo] = useState(null);

  useEffect(async () => {
    // setStatus(FLIPPING);
    await initContract();
    await loadTxHistory();
    console.log('get credit from ' + window.accountId);
    await window.contract.get_credits({ account_id: window.accountId})
    .then(res=>{
      console.log(res)
      if(res == 0) {
        deposit();
      }
    })
    .catch(err=>{
      console.log(err);
    })
  }, []);

  const deposit = async () => {
    await window.contract.deposit(
      {},
      '300000000000000',
      '5000000000000000000'
    )
    .then(res=>{
      console.log(res)
    })
    .catch(err=>{
      console.log(err);
    })
  }

  const flip = () => {

    let size = (value*1e18).toString();
    // let size = (value).toString();

    console.log(size);
    setStatus(FLIP_GOING);
    window.contract.play({_bet_type: true, bet_size: size})
    .then(res=>{
      console.log(res);
      if(res === true)
        setStatus(FLIP_WON);
      else setStatus(FLIP_LOST);
    })
    .catch(err => {
      setStatus(FLIP_LOST);
      console.log(err);
    })
  }
  const loadTxHistory = async () => {
    await axios.get(`${API_URL}?api_key=${API_KEY}&limit=${limit}`)
      .then(res => {
        if(res && res.data && res.data.data && res.data.data.length) {
          setTxHistory(res.data.data);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    >
      <div className="home">
        <Row style={{margin: "0px"}}>
          <Header />
        </Row>    
        <Row className={`home_block home_start ${status === FLIP_NONE ? "home_active" : ''}`}>
          <Col md={12}>
            <CoinSelect
            choice={choice}
            setChoice={setChoice}
            value={value}
            setValue={setValue}
            flip={flip}
            />
          </Col>        
        </Row>
        <Row className={`home_block ${status != FLIP_NONE ? "home_active" : ''}`}>
          <FlipBoard
          choice={choice}
          status={status}
          setStatus={setStatus}
          value={value}
          />
        </Row>
        <Row className = "mt-5 m-auto"style={{display: `${status===FLIP_NONE ? 'block' : 'none'}`}}>
          <RecentFlips history={ txHistory }/>
        </Row>
        <Footer />
      </div>
      {/* <div className="background" /> */}
    </ThemeProvider>
  );
};

export default Home;