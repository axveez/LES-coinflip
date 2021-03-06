import React from 'react';
import { Row, Col, Stack, Image } from 'react-bootstrap';
import RealtimeIcon from '../assets/realtime.png';
import TailsCoin from "../assets/tails-logo-min.png";
import HeadsCoin from "../assets/heads-logo-min.png";

import '../styles/recent_flips.scss'

const RecentFlips = (props) => {

  const { history } = props;

  const getTime = (time) => {
    
    let currentTime = new Date().getTime();

    let min = parseInt((currentTime - time ) / 60000);
    let hour = 0;

    if(min >= 60) {
      hour = parseInt(min / 60);
      min = min %60;
    }
    return (hour > 0) ? hour + ' h ' + min + ' m' : min + ' m';
  }

  const convertWin = (result) => {
    if (result=="true") {
      return "won";
    } else {
      return "lost";
    }
  }

  const convertBet = (result) => {
    if (result) {
      return "HEADS";
    } else {
      return "TAILS";
    }
  }

  const nearConversion = (amount) => {
    if (amount == null) {
      return null;
    } else if (amount.length > 24) {
      return amount.slice(0, amount.length - 24) + "." + amount.slice(amount.length - 24, (amount.length - 24) + 2);
    } else {
      return "0." + amount.slice(0, 3);
    }
  }

  return (
    <Col md={8} className="recent_flips text-center">
      <h2 className="bold-font">Recent Flips</h2>
      <Stack gap={3}>
        {
          history.map((item, key)=>{  
            return (
              <Stack direction="horizontal" className="recent_flips_item" gap={2} key={key}>
                <Image src={item.bet_type ? RealtimeIcon : RealtimeIcon} width="37px"/>
                <p>{`${item.signer_id} flipped ${convertBet(item.bet_type)} betting ${nearConversion(item.bet_size)} Ⓝ and ${convertWin(item.result)}` }</p>
                <p>{ getTime(item.timestamp) }</p>
              </Stack>
            )
          })
        }
      </Stack>

      <small>powered by <a href="https://havendao.community/" target="_blank">Haven</a></small>
    </Col>
  );
};

export default RecentFlips;