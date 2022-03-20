import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";

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

  const MAX = 5;

  const [active, setActive] = useState(false);

  const [rangeval, setRangeval] = useState(null);
  const [value, setValue] = useState(0);


  

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
