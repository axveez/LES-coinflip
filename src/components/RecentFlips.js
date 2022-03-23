import React from 'react';
import { Row, Col, Stack, Image } from 'react-bootstrap';
import RealtimeIcon from '../assets/realtime.png';

import '../styles/recent_flips.scss'
const recentFlips = [
  'hunnaharms.near flipped 0.25 Ⓝ and doubled',
  'x4232333444232ss.near flipped 0.3 Ⓝ and has doubled',

]
const RecentFlips = (props) => {

  const { history } = props;

  const getTime = (time) => {
    
    let currentTime = new Date().getTime();

    console.log(currentTime);
    console.log(time);
    let min = parseInt((currentTime - time ) / 60);
    let hour = 0;

    if(min >= 60) {
      hour = parseInt(min / 60);
      min = min %60;
    }
    return (hour > 0) ? hour + ' h ' + min + ' m' : min + ' m';
  }

  const convertWin = (result) => {
    if (result) {
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
    <Col md={8} className="recent_flips">
      <h2 className="bold-font">Recent Flips</h2>
      <Stack gap={3}>
        {
          history.map((item, key)=>{  
            return (
              <Stack direction="horizontal" className="recent_flips_item" gap={2} key={key}>
                <Image src={RealtimeIcon} />
                <p>{item.signer_id + ` flipped ` +convertBet(item.bet_type)+ ` betting ` +nearConversion(item.bet_size) + ' Ⓝ and ' + convertWin(item.result) }</p>
                <p>{ getTime(item.timestamp) }</p>
              </Stack>
            )
          })
        }
      </Stack>
    </Col>
  );
};

export default RecentFlips;