import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { login, logout } from "./utils";
import "./global.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import FlipData from "./components/FlipData/FlipData";
import CoinLogoTails from "./assets/svg/tails-logo.png";
import CoinLogoHeads from "./assets/svg/heads-logo.png";
import getConfig from "./config";

const { networkId } = getConfig(process.env.NODE_ENV || "development");

export default function App() {
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [showNotification, setShowNotification] = React.useState(false);

  React.useEffect(() => {
    // in this case, we only care to query the contract when signed in
    if (window.walletConnection.isSignedIn()) {
      // window.contract is set by initContract in index.js
      window.contract
        .get_greeting({ account_id: window.accountId })
        .then((greetingFromContract) => {
          set_greeting(greetingFromContract);
        });
    }
  }, []);

  const baseURL =
    "https://indexer.havendao.community/api/coinflip-house.near?api_key=f743dcb217d1d615dd1bf652&limit=7";
  const MAX = 5;

  const [active, setActive] = useState(false);

  const [rangeval, setRangeval] = useState(null);
  const [value, setValue] = useState(0);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    fetch('https://randomuser.me/api/')
      .then(results => results.json())
      .then(data => {
        setUser(data.results[0]);
        console.log(user, "testing")
      });
  }, []); // Pass empty array to only run once on mount.


  

  const handleChangeActive = () => {
    console.log();
    setActive((previousStar) => {
      return !previousStar;
    });
  };

  return (
    <>
      <div>
        <Header />
        <div className="container">
          <div className="row justify-content-center">
            {active ? (
              <img src={CoinLogoTails} alt="Tails" className="coin" />
            ) : (
              <img src={CoinLogoHeads} alt="Heads" className="coin" />
            )}
          </div>
          <div className="row justify-content-center">
            <button class="button-clear" onClick={() => handleChangeActive()}>
              Heads
            </button>
            <button
              class="button-not-clicked"
              onClick={() => handleChangeActive()}
            >
              Tails
            </button>
          </div>
          <div className="row justify-content-center mt-4">
            <label class="label-item">0.1 Ⓝ</label>
            <input
              type="range"
              min="0"
              max={MAX}
              onChange={(e) => setValue(e.target.value)}
              class="slider"
              value={value}
            />
            <label class="label-item"> 0.2 Ⓝ!</label>
          </div>
          <div className="row justify-content-center mt-4">
            <button class="button-flip">Flip 0.2 Ⓝ!</button>
          </div>
        <FlipData/>
        </div>
        <Footer />
      </div>
    </>
  );
}
