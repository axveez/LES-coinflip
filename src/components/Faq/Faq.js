import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FaAngleDown } from "react-icons/fa";
import "./faq.css";

import faq from '../../assets/svg/faq.svg';

export const Faq = () => {
  console.log(fab);
  return (
    <>
      <div className="d-flex justify-content-center">
        <img src={faq} className="phase"/>
      </div>
      <div id="accordion">

        <div className="d-flex flex-column m-2">
          <div className="card-header d-flex flex-row">
            <p className="flex-grow-1">What are the Dons?</p>
            <a className="btn" data-bs-toggle="collapse" href="#collapse-1">
              <FaAngleDown />
            </a>
          </div>
          <div id="collapse-1" className="collapse" data-bs-parent="#accordion">
            <div className="card-body">
              The Dons is a collection of Mafia Bosses coming to overtake the NEAR Protocol.
            </div>
          </div>
        </div>
        <div className="d-flex flex-column m-2">
          <div className="card-header d-flex flex-row">
            <p className="flex-grow-1">How many Dons will there be?</p>
            <a className="btn" data-bs-toggle="collapse" href="#collapse-2">
              <FaAngleDown />
            </a>
          </div>
          <div id="collapse-2" className="collapse" data-bs-parent="#accordion">
            <div className="card-body">
              There will only be 3,500 Dons released onto the network.
            </div>
          </div>
        </div>
        <div className="d-flex flex-column m-2">
          <div className="card-header d-flex flex-row">
            <p className="flex-grow-1">How much will mint be?</p>
            <a className="btn" data-bs-toggle="collapse" href="#collapse-3">
              <FaAngleDown />
            </a>
          </div>
          <div id="collapse-3" className="collapse" data-bs-parent="#accordion">
            <div className="card-body">
              $100 USD worth of NEAR
            </div>
          </div>
        </div>
        <div className="d-flex flex-column m-2">
          <div className="card-header d-flex flex-row">
            <p className="flex-grow-1">When will this project mint?</p>
            <a className="btn" data-bs-toggle="collapse" href="#collapse-4">
              <FaAngleDown />
            </a>
          </div>
          <div id="collapse-4" className="collapse" data-bs-parent="#accordion">
            <div className="card-body">
              Whitelist Mint: 6:00PM UTC 11th March 2022(24 our mint window)
              Public Mint: 6:00PM UTC 12th March 2022
            </div>
          </div>
        </div>
      </div>
    </>
  )
};