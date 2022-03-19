import 'regenerator-runtime/runtime'
import React, {useState}from 'react'
import { login, logout } from './utils'
import './global.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import CoinLogoTails from './assets/svg/tails-logo.png';
import CoinLogoHeads from './assets/svg/heads-logo.png';
import RealTimeIcon from './assets/img/realtime.png';
import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {
  // use React Hooks to store greeting in component state


  // when the user has not yet interacted with the form, disable the button
  const [buttonDisabled, setButtonDisabled] = React.useState(true)

  // after submitting the form, we want to show Notification
  const [showNotification, setShowNotification] = React.useState(false)

  // The useEffect hook can be used to fire side-effects during render
  // Learn more: https://reactjs.org/docs/hooks-intro.html
  React.useEffect(
    () => {
      // in this case, we only care to query the contract when signed in
      if (window.walletConnection.isSignedIn()) {

        // window.contract is set by initContract in index.js
        window.contract.get_greeting({ account_id: window.accountId })
          .then(greetingFromContract => {
            set_greeting(greetingFromContract)
          })
      }
    },

    // The second argument to useEffect tells React when to re-run the effect
    // Use an empty array to specify "only run on first render"
    // This works because signing into NEAR Wallet reloads the page
    []
  )

  // // if not signed in, return early with sign-in prompt
  // if (!window.walletConnection.isSignedIn()) {
  //   return (
  //       <Header /> 

  //   )
  // }


  const MAX = 5;

  const [active, setActive] = useState(false);
  const [rangeval, setRangeval] = useState(null);
  const [value, setValue] = useState(0);

  const getBackgroundSize = () => {
    return { backgroundSize: `${(value * 100) / MAX}% 100%` };
  };

  const handleChangeActive = () => {
    console.log()
    setActive((previousStar) => {
      return !previousStar;
    });
  };

  return (
    // use React Fragment, <>, to avoid wrapping elements in unnecessary divs
    <>
      <div>
        <Header />
        <div className='container'>
            <div className='row justify-content-center'>

            {active ? (
          <img src={CoinLogoTails} alt='Tails' className='coin'     />
        ) : (
          <img src={CoinLogoHeads} alt='Heads' className='coin'     />)
         
               
}
            </div>
            <div className='row justify-content-center'>
            <button class = "button-clear"  onClick={() => handleChangeActive()}>Heads</button>
            <button class = "button-not-clicked"  onClick={() => handleChangeActive()}>Tails</button>
            </div>
            <div className='row justify-content-center mt-4'>
           <label class = "label-item">0.1 Ⓝ</label>
           <input
        type="range"
        min="0"
        max={MAX}
        onChange={(e) => setValue(e.target.value)}
        class="slider"
        value={value}
      />
           
           <label class = "label-item" > 0.2 Ⓝ!</label>
            </div>
            <div className='row justify-content-center mt-4'>
            <button class = "button-flip">Flip  0.2 Ⓝ!</button>
            </div>
            <div className='row justify-content-center mt-5'>
               <div className = "recent-flips-card">
                <label class = "label-item">Recent Flips</label>
                <div className='row justify-content-center mt-4'>
                <img src = {RealTimeIcon}/> 
                <p class = "realtime-info">swiftyyy.near flipped <span class = "near-amount">0.5 Ⓝ</span> and lost</p>
                <span class = "realtime-info" >1m</span>
                </div>
               </div>
            </div>
        </div>
     <Footer /> 
      </div>

    </>
  )
}

// // this component gets rendered by App after the form is submitted
// function Notification() {
//   const urlPrefix = `https://explorer.${networkId}.near.org/accounts`
//   return (
//     <aside>
//       <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.accountId}`}>
//         {window.accountId}
//       </a>
//       {' '/* React trims whitespace around tags; insert literal space character when needed */}
//       called method: 'set_greeting' in contract:
//       {' '}
//       <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.contract.contractId}`}>
//         {window.contract.contractId}
//       </a>
//       <footer>
//         <div>✔ Succeeded</div>
//         <div>Just now</div>
//       </footer>
//     </aside>
//   )
// }
